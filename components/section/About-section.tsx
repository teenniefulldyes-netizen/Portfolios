"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { motion, useInView, useReducedMotion, easeInOut, easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Code, GraduationCap, Terminal, Coffee, ExternalLink, Instagram } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypingAnimation } from "@/components/magicui/typing-animation";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" }); // Changed to once: true for better performance
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Ensure components relying on window are only rendered client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoized age calculation to prevent recalculation
  const birthDateThai = "01/10/2554";
  const ageText = useMemo(() => calculateThaiAge(birthDateThai), [birthDateThai]);

  // Optimized animation variants with reduced motion support
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15, // Reduced stagger for faster load
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  }), [shouldReduceMotion]);

  const itemVariants = useMemo(() => ({
    hidden: { y: shouldReduceMotion ? 0 : 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0.2 : 0.4, ease: easeOut },
    },
  }), [shouldReduceMotion]);

  // Optimized floating animation with reduced motion
  const floatingVariants = useMemo(() => {
    if (shouldReduceMotion) {
      return { y: 0 };
    }
    return {
      y: [0, -4, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: easeInOut,
        repeatType: "reverse" as const
      }
    };
  }, [shouldReduceMotion]);

  const floatingVariants2 = useMemo(() => {
    if (shouldReduceMotion) {
      return { y: 0 };
    }
    return {
      y: [0, -6, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: easeInOut,
        delay: 0.3,
        repeatType: "reverse" as const
      }
    };
  }, [shouldReduceMotion]);

  // Memoized timeline data
  const timelineData = useMemo(() => [
    {
      year: "2553 - 2561",
      title: "KINDERGARTEN - PRIMARY",
      company: "SARASASNAKHONRATCHASIMA",
      link: "#"
    },
    {
      year: "2565 - 2569",
      title: "SECONDARY",
      company: "ASSUMPTION NAKHONRATCHASIMA",
      link: "#"
    },
  ], []);

  const skillsList = useMemo(() => [
  "Communication",
  "Teamwork",
  "Leadership & management", 
  "Critical thinking", 
  "Creativity", 
  "Adaptability", 
  "Emotional intelligence", 
  "Hybrid working"
  ], []);
  const HobbyList = useMemo(() => [
  "Chess",
  "practice coding skills",
  "Find and learn things I don’t know",
  "Disassemble stuff that I don’t use",
  "Sports and body weight training",
  "Drawing"

  ], []);

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-16 md:py-32 overflow-hidden"
    >

      {mounted && (
        <>
          {/* Simplified Background Elements for mobile performance */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            {/* Reduced number of gradient backgrounds */}
            <div className="absolute top-20 -right-20 md:-right-40 w-64 md:w-96 h-64 md:h-96 rounded-full bg-red-500/8 md:bg-red-500/10 blur-2xl md:blur-3xl" />
            <div className="absolute top-1/4 -left-20 md:-left-40 w-56 md:w-80 h-56 md:h-80 rounded-full bg-blue-500/8 md:bg-blue-500/10 blur-2xl md:blur-3xl" />
            <div className="absolute top-3/4 left-20 md:left-30 w-56 md:w-80 h-56 md:h-80 rounded-full bg-red-900/6 md:bg-red-900/10 blur-2xl md:blur-3xl opacity-40 md:opacity-60" />

            {/* Simplified grid pattern for mobile */}
            <div
              className="absolute inset-0 opacity-5 md:opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "30px 30px", // Smaller grid on mobile
              }}
            />
          </div>

          {/* Content Container */}
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
              className="max-w-5xl mx-auto"
            >
              {/* Section Title */}
              <div
              data-aos="fade-up"
              data-aos-duration="1200"
                // variants={itemVariants}
                className="text-center mb-8 md:mb-16"
              >
                <div className="relative inline-block">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500/15 md:from-blue-500/20 to-blue-400/15 md:to-blue-400/20 blur-lg md:blur-xl opacity-70"></div>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                      About Me
                    </span>
                  </h2>
                </div>
                    <motion.div
                      className="w-32 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-600 mx-auto rounded-full mb-8 shadow-lg"
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                {/* <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4 md:mb-6"></div> */}
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Left Column - Profile Info */}
                <div data-aos='fade-right' 
                  data-aos-duration="2000"
                  className="space-y-4 md:space-y-6">
                  <div className="relative group">
                    <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600/30 md:from-blue-600/50 to-blue-600/15 md:to-blue-600/20 opacity-70 blur group-hover:opacity-100 transition duration-500 md:duration-1000"></div>
                    <div className="relative">
                      <img
                        src="/about_profile.jpg"
                        alt="Developer Profile"
                        className="rounded-lg w-full object-cover aspect-[4/3] bg-gray-800 group-hover:scale-[1.005] md:group-hover:scale-[1.01] transition duration-300 md:duration-500"
                        loading="lazy" // Add lazy loading for better performance
                      />

                      {/* Optimized floating elements */}
                      <motion.div
                        className="absolute -bottom-3 md:-bottom-5 right-1 md:-right-5 bg-background/80 backdrop-blur-sm p-2 md:p-3 rounded-lg shadow-lg border border-purple-500/20"
                        animate={floatingVariants}
                      >
                        <Code className="w-6 md:w-8 h-6 md:h-8 text-purple-500" />
                      </motion.div>

                      <motion.div
                        className="absolute -top-3 md:-top-5 left-1 md:-left-5 bg-background/80 backdrop-blur-sm p-2 md:p-3 rounded-lg shadow-lg border border-blue-500/20"
                        animate={floatingVariants2}
                      >
                        <Terminal className="w-6 md:w-8 h-6 md:h-8 text-blue-500" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Quick stats - Optimized grid */}
                  <div className="grid grid-cols-2 gap-3 md:gap-4 mt-6 md:mt-8">
                    <Card className="bg-background/70 backdrop-blur-sm p-3 md:p-4 rounded-lg border border-purple-500/10">
                      <p className="text-xs md:text-sm text-muted-foreground mb-1">Name:</p>
                      <TypingAnimation className="text-xs font-semibold">Thumthakorn Wanghamklang</TypingAnimation>
                      {!shouldReduceMotion && (
                        <>
                          <BorderBeam
                            duration={8} // Slower for better performance
                            size={80}
                            className="from-transparent via-red-500 to-transparent"
                          />
                          <BorderBeam
                            duration={8}
                            delay={4}
                            size={80}
                            className="from-transparent via-blue-500 to-transparent"
                          />
                        </>
                      )}
                    </Card>
                    <Card className="bg-background/70 backdrop-blur-sm p-3 md:p-4 rounded-lg border border-blue-500/10">
                      <p className="text-xs md:text-sm text-muted-foreground mb-1">Age:</p>
                      <p className="text-lg md:text-2xl font-bold">17 years old</p>
                      {!shouldReduceMotion && (
                        <>
                          <BorderBeam
                            duration={8}
                            delay={4}
                            size={80}
                            className="from-transparent via-blue-500 to-transparent"
                          />
                          <BorderBeam
                            duration={8}
                            size={80}
                            className="from-transparent via-red-500 to-transparent"
                          />
                        </>
                      )}
                    </Card>
                    <Card className="bg-background/70 backdrop-blur-sm p-3 md:p-4 rounded-lg border border-blue-500/10">
                      <p className="text-xs md:text-sm text-muted-foreground mb-1">Birthday:</p>
                      <p className="text-lg md:text-xl font-bold">20 September 2007</p>
                      {/* <Link href="https://www.instagram.com/apsr._.10?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="text-lg md:text-2xl flex gap-2 font-bold text-blue-500"><Instagram className="top-2" />มีแฟนแล้ว</Link> */}
                      {!shouldReduceMotion && (
                        <>
                          <BorderBeam
                            duration={8}
                            size={80}
                            className="from-transparent via-red-500 to-transparent"
                          />
                          <BorderBeam
                            duration={8}
                            delay={4}
                            size={80}
                            className="from-transparent via-blue-500 to-transparent"
                          />
                        </>
                      )}
                    </Card>
                    <Card className="bg-background/70 backdrop-blur-sm p-3 md:p-4 rounded-lg border border-purple-500/10">
                      <p className="text-xs md:text-sm text-muted-foreground mb-1">computer skills:</p>
                      <p className="text-xs font-bold">Video & Audio Editing
Web Development
Basic Graphic Tools
Email & Communication Tools</p>
                      {!shouldReduceMotion && (
                        <>
                          <BorderBeam
                            duration={8}
                            delay={4}
                            size={80}
                            className="from-transparent via-blue-500 to-transparent"
                          />
                          <BorderBeam
                            duration={8}
                            size={80}
                            className="from-transparent via-red-500 to-transparent"
                          />
                        </>
                      )}
                    </Card>
                  </div>
                </div>

                {/* Right Column - Bio */}
                <div data-aos="fade-left" 
                data-aos-duration="2000"
                className="space-y-4 md:space-y-6">
                  <h3 className="text-xl md:text-2xl font-bold">Who am I?</h3>
                  <div className="space-y-3 md:space-y-4 text-sm md:text-base">
                    <p className="text-muted-foreground">
                      I come from a large family of nine siblings, and since the age of fifteen I have supported myself financially while my father, who carries many responsibilities, continues to cover only my school tuition. To pursue independence, I co-founded a startup with a team of around 260 people, an experience that taught me resilience, patience, and leadership through many trials and setbacks. My goal in joining CMKL University is to develop the knowledge and network needed to build a strong team capable of launching impactful large-scale businesses. Given my family’s financial situation, I would be deeply grateful for a scholarship that would allow me to fully dedicate myself to my studies and contribute actively to the CMKL community.
                    </p>
                  </div>

                  <div className="space-y-3 flex space-x-4">
                    <div>
                      <h4 className="font-semibold text-base md:text-lg">soft skills:</h4>
                      <ul className="space-y-2">
                        {skillsList.map((item, index) => (
                          <li key={index} className="flex items-start text-sm md:text-base">
                            <span className="mr-2 text-blue-500 mt-0.5 flex-shrink-0">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-base md:text-lg">Hobby:</h4>
                      <ul className="space-y-2">
                        {HobbyList.map((item, index) => (
                          <li key={index} className="flex items-start text-sm md:text-base">
                            <span className="mr-2 text-blue-500 mt-0.5 flex-shrink-0">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
                    <Button variant="outline" asChild className="w-full sm:w-auto">
                      <Link href="#contact">Contact Me</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Education & Experience Timeline - Optimized for mobile */}
              <motion.div
                variants={itemVariants}
                className="mt-16 md:mt-32"
              >
                <h3 className="text-xl md:text-3xl font-semibold text-center mb-8 md:mb-10">
                  Education
                </h3>

                <div className="relative" data-aos="fade-up">
                  {/* Timeline center line - responsive */}
                  <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-px bg-gradient-to-b from-purple-500 to-blue-500"></div>

                  {/* Timeline items - mobile-first layout */}
                  <div className="space-y-8 md:space-y-16">
                    {timelineData.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.3 + index * 0.15, duration: 0.4 }}
                        className={`flex md:${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} items-center`}
                      >
                        {/* Mobile layout (single column) */}
                        <div className="md:hidden flex items-center w-full">
                          {/* Dot */}
                          <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg flex-shrink-0">
                            <GraduationCap className="h-4 w-4 text-white" />
                          </div>
                          {/* Content */}
                          <div className="ml-6 flex-1">
                            <span className="text-xs font-semibold text-purple-500">{item.year}</span>
                            <h4 className="text-base font-bold mt-1">{item.title}</h4>
                            <Link href={item.link} className="text-blue-500 text-sm whitespace-pre-line">
                              {item.company}
                            </Link>
                          </div>
                        </div>

                        {/* Desktop layout (two columns) */}
                        <div className={`hidden md:flex items-center w-full ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                          {/* Timeline content */}
                          <div className={`w-1/2 px-6 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                            <span className="text-sm font-semibold text-purple-500">{item.year}</span>
                            <h4 className="text-xl font-bold mt-1">{item.title}</h4>
                            <Link href={item.link} className="text-blue-500 items-center gap-2 whitespace-pre-line">
                              {item.company}
                            </Link>
                          </div>

                          {/* Center dot */}
                          <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg">
                            <GraduationCap className="h-5 w-5 text-white" />
                          </div>

                          {/* Empty space for the other side */}
                          <div className="w-1/2"></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </section>
  );
}

function calculateThaiAge(thaiDateStr: string): string {
  const [dayStr, monthStr, buddhistYearStr] = thaiDateStr.split('/');
  const day = parseInt(dayStr, 10);
  const month = parseInt(monthStr, 10) - 1; // เดือนใน JS เริ่มที่ 0
  const buddhistYear = parseInt(buddhistYearStr, 10);
  const gregorianYear = buddhistYear - 543; // แปลง พ.ศ. -> ค.ศ.

  const birthDate = new Date(gregorianYear, month, day);
  const today = new Date();

  if (isNaN(birthDate.getTime())) {
    return "รูปแบบวันเกิดไม่ถูกต้อง";
  }

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years} ปี ${months} เดือน ${days} วัน`;
}

export default AboutSection;