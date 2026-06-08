import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import VersionBadge from "@/components/common/VersionBadge";
import HashScroller from "@/components/common/HashScroller";
import ContactMe from "@/sections/ContactMe";
import CV from "@/sections/CV";
import Footer from "@/sections/Footer";
import SectionHome from "@/sections/SectionHome";
import Work from "@/sections/Work";
import Pages from "@/sections/Pages";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <div>
      <Suspense fallback={null}>
        <HashScroller />
      </Suspense>
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
        <Pages/>
      </ScrollReveal>
      <ScrollReveal>
        <ContactMe/>
      </ScrollReveal>
      <Footer/>
      <VersionBadge/>
    </div>
  );
}
