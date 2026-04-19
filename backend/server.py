from dotenv import load_dotenv
from pathlib import Path
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import asyncio
import logging
import uuid
from datetime import datetime, timezone, timedelta
from typing import List, Optional

import bcrypt
import jwt
import resend
from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from starlette.middleware.cors import CORSMiddleware


# ---------- Config ----------
JWT_SECRET = os.environ["JWT_SECRET"]
JWT_ALGORITHM = "HS256"
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@spynad.com").lower()
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "Spynad@2025")
NOTIFICATION_EMAIL = os.environ.get("NOTIFICATION_EMAIL", "hello@spynad.com")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# ---------- DB ----------
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# ---------- App ----------
app = FastAPI(title="Spynad API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ---------- Models ----------
class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    project_type: str = Field(min_length=1, max_length=80)
    budget: Optional[str] = Field(default=None, max_length=80)
    message: str = Field(min_length=1, max_length=2000)


class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    email: EmailStr
    project_type: str
    budget: Optional[str] = None
    message: str
    created_at: str


class AdminLogin(BaseModel):
    email: EmailStr
    password: str


class AdminOut(BaseModel):
    email: EmailStr
    role: str


# ---------- Auth helpers ----------
def hash_password(p: str) -> str:
    return bcrypt.hashpw(p.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


def create_access_token(email: str) -> str:
    payload = {
        "sub": email,
        "role": "admin",
        "exp": datetime.now(timezone.utc) + timedelta(hours=12),
        "type": "access",
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


async def get_current_admin(request: Request) -> dict:
    auth_header = request.headers.get("Authorization", "")
    token = None
    if auth_header.startswith("Bearer "):
        token = auth_header[7:]
    if not token:
        token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Forbidden")
        return {"email": payload["sub"], "role": payload["role"]}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ---------- Email ----------
async def send_lead_email(c: dict) -> None:
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not set — skipping email notification")
        return
    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background:#0a0a0a; color:#fff; padding:32px; border-radius:12px;">
      <h2 style="color:#fff; letter-spacing:-.02em;">New Spynad Lead</h2>
      <table style="width:100%; border-collapse:collapse;">
        <tr><td style="padding:8px 0; color:#a1a1aa;">Name</td><td style="padding:8px 0;">{c['name']}</td></tr>
        <tr><td style="padding:8px 0; color:#a1a1aa;">Email</td><td style="padding:8px 0;">{c['email']}</td></tr>
        <tr><td style="padding:8px 0; color:#a1a1aa;">Project Type</td><td style="padding:8px 0;">{c['project_type']}</td></tr>
        <tr><td style="padding:8px 0; color:#a1a1aa;">Budget</td><td style="padding:8px 0;">{c.get('budget') or '—'}</td></tr>
      </table>
      <h3 style="margin-top:24px;">Message</h3>
      <p style="line-height:1.6; color:#e5e5e5;">{c['message']}</p>
      <p style="margin-top:24px; color:#71717a; font-size:12px;">Submitted at {c['created_at']}</p>
    </div>
    """
    params = {
        "from": SENDER_EMAIL,
        "to": [NOTIFICATION_EMAIL],
        "subject": f"New Lead: {c['name']} — {c['project_type']}",
        "html": html,
    }
    try:
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info("Lead email sent to %s", NOTIFICATION_EMAIL)
    except Exception as e:
        logger.error("Failed to send lead email: %s", e)


# ---------- Routes ----------
@api_router.get("/health")
async def health():
    return {"status": "ok", "service": "spynad-api"}


@api_router.post("/contact", response_model=Contact)
async def create_contact(payload: ContactCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "name": payload.name.strip(),
        "email": payload.email.lower(),
        "project_type": payload.project_type.strip(),
        "budget": (payload.budget or "").strip() or None,
        "message": payload.message.strip(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.contacts.insert_one(doc)
    # Fire-and-forget email
    asyncio.create_task(send_lead_email(doc))
    return Contact(**{k: v for k, v in doc.items() if k != "_id"})


@api_router.post("/admin/login")
async def admin_login(payload: AdminLogin):
    admin = await db.admins.find_one({"email": payload.email.lower()}, {"_id": 0})
    if not admin or not verify_password(payload.password, admin["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(admin["email"])
    return {"access_token": token, "token_type": "bearer", "email": admin["email"]}


@api_router.get("/admin/me", response_model=AdminOut)
async def admin_me(admin=Depends(get_current_admin)):
    return AdminOut(email=admin["email"], role=admin["role"])


@api_router.get("/admin/contacts", response_model=List[Contact])
async def list_contacts(admin=Depends(get_current_admin)):
    items = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [Contact(**i) for i in items]


@api_router.delete("/admin/contacts/{contact_id}")
async def delete_contact(contact_id: str, admin=Depends(get_current_admin)):
    res = await db.contacts.delete_one({"id": contact_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"ok": True}


# ---------- Startup ----------
@app.on_event("startup")
async def seed_admin():
    existing = await db.admins.find_one({"email": ADMIN_EMAIL})
    hashed = hash_password(ADMIN_PASSWORD)
    if existing is None:
        await db.admins.insert_one({
            "email": ADMIN_EMAIL,
            "password_hash": hashed,
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info("Admin seeded: %s", ADMIN_EMAIL)
    elif not verify_password(ADMIN_PASSWORD, existing["password_hash"]):
        await db.admins.update_one(
            {"email": ADMIN_EMAIL}, {"$set": {"password_hash": hashed}}
        )
        logger.info("Admin password updated")
    # Indexes
    await db.admins.create_index("email", unique=True)
    await db.contacts.create_index("created_at")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
