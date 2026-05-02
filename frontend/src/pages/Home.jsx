import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import MarketingServices from "@/components/sections/MarketingServices";
import WhySpynad from "@/components/sections/WhySpynad";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="bg-black text-white" data-testid="home-page">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <MarketingServices />
      <WhySpynad />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
