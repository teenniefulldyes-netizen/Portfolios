"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, easeOut } from "framer-motion";
import { Facebook, Instagram, Github, Mail, Linkedin, Twitter, ExternalLink, Heart, YoutubeIcon } from "lucide-react";
import Link from "next/link";
import { Dock, DockIcon } from "@/components/magicui/dock";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [mounted, setMounted] = useState(false);

  // Ensure components relying on window are only rendered client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  // คอมโพเนนต์ไอคอน Discord
  const DiscordIcon = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.02.06.03.09.02c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/>
    </svg>
  );

  // Social Media Links
  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/reijidayo?locale=th_TH",
      color: "from-blue-600 to-blue-400",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/rosine._.rei/",
      color: "from-pink-600 to-purple-400",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/Xexatoth",
      color: "from-gray-800 to-gray-600",
    },
    {
      name: "Discord",
      icon: DiscordIcon,
      url: "https://discord.gg/gHnk5gJ9",
      color: "from-blue-700 to-blue-500",
    },
    {
      name: "YouTube",
      icon: YoutubeIcon,
      url: "https://www.youtube.com/@Reijiwatatsuki",
      color: "from-blue-700 to-blue-500",
    },

  ];

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-20 overflow-hidden"
    >
      {mounted && (
        <>
          {/* Gradient Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            {/* Gradient background elements */}
            <div className="absolute top-2/3 -right-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl" />
            {/* <div className="absolute bottom-1/4-left-20 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl" /> */}
            
            {/* Subtle Grid Pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Content Container */}
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
              className="max-w-3xl mx-auto text-center"
            >
              {/* Section Title */}
              <motion.div
                variants={itemVariants}
                className="mb-12"
              >
                <div className="relative inline-block">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-400/20 blur-xl opacity-70"></div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
                      Get In Touch
                    </span>
                  </h2>
                </div>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6"></div>
                {/* <p className="text-xl text-muted-foreground">
                  Connect with me on social media or drop me a message
                </p> */}
              </motion.div>

              {/* Social Icons */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-6 mb-12"
              >
                {/* {socialLinks.map((social, index) => ( */}
                  {/* <motion.a
                    // key={index}
                    // href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.3  * 0.1, duration: 0.5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                    {/* <div className="relative flex items-center justify-center w-16 h-16 bg-background rounded-full border border-muted/20 shadow-lg">
                      <div className="absolute inset-0.5 bg-gradient-to-br rounded-full opacity-0 group-hover:opacity-10"></div>
                      <social.icon className="w-7 h-7 group-hover:text-blue-500 transition-colors duration-300" />
                    </div> */}
                    <div className="flex flex-wrap gap-2">
                    <TooltipProvider>
                    <Dock direction="middle" iconMagnification={60} iconDistance={100}>
                    {socialLinks.map((link, linkIndex) => {
                      // const Icon = linkIcons[link.type];
                      return (
                        <DockIcon key={linkIndex} className="bg-black/10 dark:bg-white/10">
                        <Link
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-200 dark:bg-gray-600  transition-colors group relative"
                          title={link.name}
                        >
                          {/* <Icon className="w-5 h-5" /> */}
                          <link.icon className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors duration-300" />
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {link.name}
                          </span>
                        </Link>
                        </DockIcon>
                      );
                    })}
                    </Dock>
                    </TooltipProvider>
                  </div>
                    {/* <span className="block mt-2 text-sm font-medium opacity-80 group-hover:opacity-100 group-hover:text-blue-500 transition-colors duration-300">{social.name}</span> */}
                  {/* </motion.a> */} 

                {/* ))} */}
              </motion.div>

              {/* Email Contact */}
              <motion.div
                variants={itemVariants}
                className="relative w-full max-w-md mx-auto"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-md"></div>
                <a 
                  href="mailto:teenniefulldyes@gmail.com" 
                  className="relative flex items-center justify-center gap-3 py-4 px-6 bg-background/80 backdrop-blur-sm border border-muted/30 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Mail className="w-5 h-5 text-blue-500" />
                  <span className="text-lg font-medium">teenniefulldyes@gmail.com</span>
                  <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative py-12 overflow-hidden border-t border-muted/10">
      {/* Gradient Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Gradient background elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl" />
        
        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo/Brand */}
          <div className="mb-6 md:mb-0">
            <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
              x2Stiftz
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-8 mb-6 md:mb-0">
            {["Home", "About", "Projects", "Certificates", "Contact"].map((item, index) => (
              <Link
                key={index}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-blue-500 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <span>© {new Date().getFullYear()}</span>
            <span className="px-1">•</span>
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-500 mx-1" />
            <span>All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default { ContactSection, Footer };