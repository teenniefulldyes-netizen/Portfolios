"use client"
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { motion } from "motion/react";
import { Suspense, lazy } from "react";
import dynamic from "next/dynamic";

// Import the Hero section normally since it's the most important above-the-fold content
import { Hero } from "@/components/section/Hero-section";

// Lazy load all non-critical sections using dynamic imports
const AboutSection = dynamic(() => import("@/components/section/About-section"), {
  loading: () => <div className="min-h-[30vh] flex items-center justify-center">Loading...</div>
});

const SkillsSection = dynamic(() => import("@/components/section/Skill-section"), {
  loading: () => <div className="min-h-[30vh] flex items-center justify-center">Loading...</div>
});

const ProjectSection = dynamic(() => import("@/components/section/Project-section"), {
  loading: () => <div className="min-h-[30vh] flex items-center justify-center">Loading...</div>
});

const CertificatesSection = dynamic(() => import("@/components/section/Cretificats-section"), {
  loading: () => <div className="min-h-[30vh] flex items-center justify-center">Loading...</div>
});

const ContactSectionWithFooter = dynamic(() => 
  import("@/components/section/contact-section").then(mod => ({
    default: () => (
      <>
        <mod.ContactSection />
        <mod.Footer />
      </>
    )
  })),
  {
    loading: () => <div className="min-h-[30vh] flex items-center justify-center">Loading...</div>
  }
);

export default function Home() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <AnimatedGridPattern
          numSquares={20} // Reduced from 30 for better performance
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className="hidden md:block [mask-image:radial-gradient(500px_circle_at_center,white,transparent)] inset-x-[-40%] inset-y-[-50%] h-[150%] skew-y-15"
        />
      </motion.div>
      
      {/* Critical above-the-fold content loads immediately */}
      <Hero />
      
      {/* Non-critical content is lazy loaded */}
      <Suspense fallback={<div className="min-h-[30vh] flex items-center justify-center">Loading...</div>}>
        <AboutSection />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[30vh] flex items-center justify-center">Loading...</div>}>
        <SkillsSection />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[30vh] flex items-center justify-center">Loading...</div>}>
        <ProjectSection />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[30vh] flex items-center justify-center">Loading...</div>}>
        <CertificatesSection />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[30vh] flex items-center justify-center">Loading...</div>}>
        <ContactSectionWithFooter />
      </Suspense>
    </>
  );
}
