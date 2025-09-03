"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView , easeOut} from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar, ExternalLink, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

export function CertificatesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [mounted, setMounted] = useState(false);

  // Ensure components relying on window are only rendered client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Content Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
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

  // Certificate Data
  const certificates = [
    {
      date: "21 - 22 August 2025",
      title: "รางวัลระดับเหรียญทอง",
      // organization: "Meta",
      description: "Participated in the United Nations Conference Centre, Bankok, from ",
      // skills: ["c", "c++", "Arduino"],
      // credentialId: "FSW-2023-00142",
      // credentialURL: "#",
      imageUrl: "/certificate/certificate_01.jpg", // Replace with actual path
      color: "from-blue-500 to-cyan-400",
    },
    {
      date: "2025",
      // title: "รางวัลรองชนะเลิศอันดับที่ 4",
      // organization: "Frontend Masters",
      description: `Participated in a series of Samsung Solve for Tomorrow 2025`,
      // skills: ["c", "c++", "Arduino"],
      // credentialId: "AR-2023-78259",
      // credentialURL: "#",
      imageUrl: "/certificate/certificate_02.jpg", // Replace with actual path
      color: "from-purple-500 to-indigo-500",
    },
    {
      date: "2025",
      // title: "รางวัลรองชนะเลิศอันดับที่ 4",
      // organization: "Frontend Masters",
      description: `Participating in Business Communication Course By City College Plymouth, UK`,
      // skills: ["c", "c++", "Arduino"],
      // credentialId: "AR-2023-78259",
      // credentialURL: "#",
      imageUrl: "/certificate/certificate_03.jpg", // Replace with actual path
      color: "from-purple-500 to-indigo-500",
    },
    {
      date: "2025",
      // title: "รางวัลรองชนะเลิศอันดับที่ 4",
      // organization: "Frontend Masters",
      description: `Participated and completing in leagues of code`,
      // skills: ["c", "c++", "Arduino"],
      // credentialId: "AR-2023-78259",
      // credentialURL: "#",
      imageUrl: "/certificate/certificate_04.jpg", // Replace with actual path
      color: "from-purple-500 to-indigo-500",
    },
    {
      date: "2025",
      // title: "รางวัลรองชนะเลิศอันดับที่ 4",
      // organization: "Frontend Masters",
      description: `Completed an intensive Japanese language and culture program at the Kyoto Institute of Culture and Language (KICL). The program emphasized practical communication skills, cultural immersion, and academic study of Japanese language`,
      // skills: ["c", "c++", "Arduino"],
      // credentialId: "AR-2023-78259",
      // credentialURL: "#",
      imageUrl: "/certificate/certificate_05.jpg", // Replace with actual path
      color: "from-purple-500 to-indigo-500",
    },
    {
      date: "2025",
      // title: "รางวัลรองชนะเลิศอันดับที่ 4",
      // organization: "Frontend Masters",
      description: `Certificated from AICE warp program organized by CMKL University`,
      // skills: ["c", "c++", "Arduino"],
      // credentialId: "AR-2023-78259",
      // credentialURL: "#",
      imageUrl: "/certificate/certificate_06.jpg", // Replace with actual path
      color: "from-purple-500 to-indigo-500",
    },
    {
      date: "2025",
      // title: "รางวัลรองชนะเลิศอันดับที่ 4",
      // organization: "Frontend Masters",
      description: `Certificated IT TNI CAMP#16 from Thai nichi`,
      // skills: ["c", "c++", "Arduino"],
      // credentialId: "AR-2023-78259",
      // credentialURL: "#",
      imageUrl: "/certificate/certificate_07.jpg", // Replace with actual path
      color: "from-purple-500 to-indigo-500",
    },
    {
      date: "2025",
      // title: "รางวัลรองชนะเลิศอันดับที่ 4",
      // organization: "Frontend Masters",
      description: `Certificate from SUT Science Camp`,
      // skills: ["c", "c++", "Arduino"],
      // credentialId: "AR-2023-78259",
      // credentialURL: "#",
      imageUrl: "/certificate/certificate_08.jpg", // Replace with actual path
      color: "from-purple-500 to-indigo-500",
    },
    {
      date: "2025",
      // title: "รางวัลรองชนะเลิศอันดับที่ 4",
      // organization: "Frontend Masters",
      description: `Myself lerning from coddytech`,
      // skills: ["c", "c++", "Arduino"],
      // credentialId: "AR-2023-78259",
      // credentialURL: "#",
      imageUrl: "/certificate/certificate_09.jpg", // Replace with actual path
      color: "from-purple-500 to-indigo-500",
    },
    {
      date: "2025",
      // title: "รางวัลรองชนะเลิศอันดับที่ 4",
      // organization: "Frontend Masters",
      description: `GPA`,
      // skills: ["c", "c++", "Arduino"],
      // credentialId: "AR-2023-78259",
      // credentialURL: "#",
      imageUrl: "/certificate/certificate_10.jpg", // Replace with actual path
      color: "from-purple-500 to-indigo-500",
    },

  ];

  return (
    <section
      ref={ref}
      id="certificates"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {mounted && (
        <>
          {/* Gradient Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            {/* Gradient background elements */}
            <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl" />
            <div className="absolute bottom-1/4 -left-40 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute top-2/4 right-20 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl" />
            
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
              className="max-w-5xl mx-auto"
            >
              {/* Section Title */}
              <motion.div
                variants={itemVariants}
                className="text-center mb-12 md:mb-16"
              >
                <div className="relative inline-block">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-400/20 blur-xl opacity-70"></div>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 whitespace-nowrap max-w-full ovserflow-x-hidden ">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600 overflow-y-hidden">
                      Certificates & Achievements
                    </span>
                  </h2>
                </div>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6"></div>
                <p className="text-base md:text-xl text-muted-foreground max-w-full break-words mx-auto">
                  เกียรติบัตรต่างๆของผม
                </p>
              </motion.div>

              {/* Certificates Timeline */}
              <motion.div
                variants={itemVariants}
                className="mt-12"
              >
                <div className="relative">
                  {/* Timeline center line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-purple-500 to-blue-500"></div>
                  
                  {/* Timeline items */}
                  <div className="space-y-16">
                    {certificates.map((cert, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                        className={`flex ${
                          index % 2 === 0
                            ? "flex-row"
                            : "flex-row-reverse"
                        } items-center`}
                      >
                        {/* Timeline content */}
                        <div className={`w-1/2 px-6 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                          <span className="text-sm font-semibold text-purple-500">{cert.date}</span>
                          {/* <h4 className="text-lg md:text-xl font-bold mt-1 whitespace-nowrap max-w-full ">{cert.title}</h4> */}
                          {/* <h4 className="text-lg md:text-xl font-bold mt-1  max-w-full ">{cert.title}</h4> */}
                          {/* <p className="text-blue-500">{cert.organization}</p> */}
                          <p className="text-muted-foreground mt-2 break-words max-w-full">{cert.description}</p>
                          
                          {/* Skills Tags */}
                          {/* <div className={`mt-4 flex flex-wrap gap-2 ${index % 2 === 0 ? "justify-end" : "justify-start"}`}>
                            {cert.skills.map((skill, i) => (
                              <Badge key={i} variant="outline" className="bg-background/50 border-muted/30 whitespace-nowrap">
                                {skill}
                              </Badge>
                            ))}
                          </div> */}
                          
                          {/* Certificate Links */}
                          <div className={`mt-4 flex ${index % 2 === 0 ? "justify-end" : "justify-start"} space-x-4`}>
                            {/* View Certificate Dialog */}
                            <Dialog>
                              <DialogTrigger asChild>
                                <button className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-blue-500 transition-colors">
                                  <Eye className="mr-1 w-4 h-4" /> View Certificate
                                </button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <div className="aspect-video w-full relative rounded-lg overflow-hidden">
                                  <img
                                    src={cert.imageUrl}
                                    alt={`${cert.title} Certificate`}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                                <div className="mt-4">
                                  {/* <h3 className="text-lg font-semibold">{cert.title}</h3> */}
                                  <p className="text-sm font-semibold">{cert.description}</p>
                                  {/* <p className="text-blue-500">{cert.organization}</p> */}
                                  {/* <p className="text-sm text-muted-foreground mt-1">Credential ID: {cert.credentialId}</p> */}
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            {/* Verify Link */}
                            {/* <a 
                              href={cert.credentialURL} 
                              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-blue-500 transition-colors"
                            >
                              <ExternalLink className="mr-1 w-4 h-4" /> Verify
                            </a> */}
                          </div>
                        </div>
                        
                        {/* Center dot with icon */}
                        <div className="relative z-10">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg">
                            <Award className="h-6 w-6 text-white" />
                          </div>
                          
                          {/* Animated glow effect */}
                          <motion.div 
                            className="absolute -inset-1 rounded-full bg-white/30 blur-sm opacity-0"
                            animate={isInView ? { 
                              opacity: [0, 0.5, 0],
                              scale: [0.8, 1.2, 0.8],
                            } : {}}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "loop",
                              delay: index * 0.3,
                            }}
                          />
                        </div>
                        
                        {/* Empty space for the other side */}
                        <div className="w-1/2"></div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Additional Professional Development Section */}
              {/* <motion.div
                variants={itemVariants}
                className="mt-24 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl p-8 border border-blue-500/10 relative overflow-hidden"
              >
                <h3 className="text-xl font-bold mb-4 relative z-10">Continued Professional Development</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                  {[
                    { title: "TypeScript Advanced Concepts", org: "Microsoft", date: "2022" },
                    { title: "Figma UI/UX Masterclass", org: "Design Academy", date: "2022" },
                    { title: "Next.js Enterprise Patterns", org: "Vercel", date: "2021" },
                    { title: "TailwindCSS for Designers", org: "Frontend Masters", date: "2021" }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 text-blue-200" />
                      </div>
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{item.org}</span>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Decorative Elements */}
                {/* <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-gradient-to-tr from-purple-500/10 to-blue-500/5 blur-2xl"></div>
                <motion.div 
                  className="absolute -bottom-2 right-8 text-blue-500/10"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Award className="w-20 h-20" />
                </motion.div>
              </motion.div> */} 
            </motion.div>
          </div>
        </>
      )}
    </section>
  );
}

export default CertificatesSection;