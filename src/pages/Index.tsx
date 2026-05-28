import { useState, useEffect } from "react";
import { NAV_ITEMS } from "@/components/server/constants";
import { Navbar, Footer } from "@/components/server/Navbar";
import { HeroSection, AboutSection } from "@/components/server/HeroAboutSection";
import { RulesSection, FAQSection, ContactsSection } from "@/components/server/ContentSections";

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.25, rootMargin: "-80px 0px 0px 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="scanlines min-h-screen bg-[#080808]">
      <Navbar active={activeSection} onNav={setActiveSection} />
      <HeroSection />
      <AboutSection />
      <RulesSection />
      <FAQSection />
      <ContactsSection />
      <Footer />
    </div>
  );
}