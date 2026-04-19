import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import WhySpynad from "@/components/sections/WhySpynad";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import Branding from "@/components/sections/Branding";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="bg-black text-white" data-testid="home-page">
      <Navigation />
      <Hero />
      <Services />
      <WhySpynad />
      <Portfolio />
      <Process />
      <Branding />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
