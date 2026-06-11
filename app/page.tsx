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
      {/* SectionHome is always in viewport on load — don't animate it to avoid layout shift */}
      <ScrollReveal startVisible>
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