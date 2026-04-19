"""Backend API tests for Spynad agency site"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

@pytest.fixture(scope="module")
def admin_token():
    r = requests.post(f"{BASE_URL}/api/admin/login", json={"email": "admin@spynad.com", "password": "Spynad@2025"})
    assert r.status_code == 200, f"Admin login failed: {r.text}"
    return r.json()["access_token"]

@pytest.fixture(scope="module")
def auth_headers(admin_token):
    return {"Authorization": f"Bearer {admin_token}"}

# Health check
def test_health():
    r = requests.get(f"{BASE_URL}/api/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"

# Contact creation
def test_create_contact():
    payload = {"name": "TEST_User", "email": "test_user@example.com", "project_type": "Website", "budget": "$5k-$10k", "message": "Test message for Spynad"}
    r = requests.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 200
    data = r.json()
    assert "id" in data
    assert "created_at" in data
    assert "_id" not in data
    assert data["name"] == "TEST_User"
    assert data["email"] == "test_user@example.com"
    return data["id"]

def test_create_contact_no_mongo_id():
    payload = {"name": "TEST_IDCheck", "email": "idcheck@example.com", "project_type": "Branding", "budget": None, "message": "Check no _id"}
    r = requests.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 200
    assert "_id" not in r.json()

def test_create_contact_invalid_email():
    r = requests.post(f"{BASE_URL}/api/contact", json={"name": "X", "email": "bademail", "project_type": "Web", "message": "hi"})
    assert r.status_code == 422

# Admin login
def test_admin_login_success():
    r = requests.post(f"{BASE_URL}/api/admin/login", json={"email": "admin@spynad.com", "password": "Spynad@2025"})
    assert r.status_code == 200
    data = r.json()
    assert "access_token" in data
    assert "email" in data
    assert data["email"] == "admin@spynad.com"

def test_admin_login_wrong_password():
    r = requests.post(f"{BASE_URL}/api/admin/login", json={"email": "admin@spynad.com", "password": "wrongpass"})
    assert r.status_code == 401

def test_admin_login_wrong_email():
    r = requests.post(f"{BASE_URL}/api/admin/login", json={"email": "fake@fake.com", "password": "Spynad@2025"})
    assert r.status_code == 401

# Protected routes
def test_list_contacts_no_token():
    r = requests.get(f"{BASE_URL}/api/admin/contacts")
    assert r.status_code == 401

def test_list_contacts_with_token(auth_headers):
    r = requests.get(f"{BASE_URL}/api/admin/contacts", headers=auth_headers)
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)

def test_contacts_sorted_desc(auth_headers):
    r = requests.get(f"{BASE_URL}/api/admin/contacts", headers=auth_headers)
    assert r.status_code == 200
    items = r.json()
    if len(items) >= 2:
        assert items[0]["created_at"] >= items[1]["created_at"]

# Delete contact
def test_delete_contact(auth_headers):
    # Create one first
    payload = {"name": "TEST_Delete", "email": "delete@example.com", "project_type": "App", "message": "to be deleted"}
    c = requests.post(f"{BASE_URL}/api/contact", json=payload).json()
    cid = c["id"]
    r = requests.delete(f"{BASE_URL}/api/admin/contacts/{cid}", headers=auth_headers)
    assert r.status_code == 200
    assert r.json()["ok"] is True

def test_delete_nonexistent_contact(auth_headers):
    r = requests.delete(f"{BASE_URL}/api/admin/contacts/nonexistent-id-xyz", headers=auth_headers)
    assert r.status_code == 404

def test_delete_contact_no_token():
    r = requests.delete(f"{BASE_URL}/api/admin/contacts/someid")
    assert r.status_code == 401
