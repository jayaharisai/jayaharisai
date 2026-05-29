import Navbar from "@/components/layout/Navbar";
import ContactMe from "@/sections/ContactMe";
import CV from "@/sections/CV";
import Footer from "@/sections/Footer";
import SectionHome from "@/sections/SectionHome";
import Work from "@/sections/Work";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <ScrollReveal>
        <SectionHome/>
      </ScrollReveal>
      <ScrollReveal>
        <Work/>
      </ScrollReveal>
      <ScrollReveal>
        <CV/>
      </ScrollReveal>
      <ScrollReveal>
        <ContactMe/>
      </ScrollReveal>
      <Footer/>
    </div>
  );
}