'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

// นิยามประเภทข้อมูล
type Skill = {
  name: string;
  level: number;
  color: string;
  icon: string;
};

const skillsData: Skill[] = [
  { 
    name: 'React', 
    level: 50, 
    color: '#61DAFB', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' 
  },
  { 
    name: 'TypeScript', 
    level: 50, 
    color: '#3178C6', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' 
  },
  { 
    name: 'Next.js', 
    level: 50, 
    color: '#000000', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' 
  },
  { 
    name: 'TailwindCSS', 
    level: 68, 
    color: '#38B2AC', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' 
  },
  { 
    name: 'Node.js', 
    level: 45, 
    color: '#339933', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' 
  },
  { 
    name: 'Python', 
    level: 80, 
    color: '#009ae1', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' 
  },
  { 
    name: 'JavaScript', 
    level: 80, 
    color: '#009ae1', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' 
  },
  { 
    name: 'HTML5', 
    level: 80, 
    color: '#009ae1', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' 
  },
  { 
    name: 'CSS3', 
    level: 80, 
    color: '#009ae1', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' 
  },
];

const SkillsSection = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSkill, setModalSkill] = useState<Skill | null>(null);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  
  const { theme } = useTheme();

  // สลับทักษะอัตโนมัติทุก 5 วินาที
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isInView) {
      // ตั้งค่าทักษะเริ่มต้น
      setSelectedSkill(skillsData[0]);
      
      // ตั้งค่าช่วงเวลาสำหรับการสลับทักษะ
      intervalId = setInterval(() => {
        setCurrentSkillIndex(prevIndex => {
          const newIndex = (prevIndex + 1) % skillsData.length;
          setSelectedSkill(skillsData[newIndex]);
          return newIndex;
        });
      }, 10000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isInView]);

  useEffect(() => {
    setMounted(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('skills');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const handleCardClick = (skill: Skill) => {
    setModalSkill(skill);
    setModalOpen(true);
  };

  return (
    <section 
      id="skills" 
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* พื้นหลังเกรเดียนท์ 1 */}
        <div className="absolute top-60 -right-40 w-96 h-96 rounded-full bg-blue-500/20 dark:bg-blue-500/10 blur-3xl" />
        {/* พื้นหลังเกรเดียนท์ 2 */}
        <div className="absolute top-2/4 -left-40 w-80 h-80 rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-3xl" />
        {/* รูปแบบตารางที่ละเอียด */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(100,100,100,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,100,100,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-400/20 blur-2xl opacity-70"></div>
            <h2 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              Technical skills
            </h2>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-700 dark:text-gray-300 text-xl max-w-2xl mx-auto">
            Possesses strong technical expertise and hands-on proficiency in diverse modern web technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div
            data-aos="fade-right"
            // initial={{ opacity: 0, x: -30 }}
            // animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            // transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg shadow-xl h-full md:h-90">
              <CardContent className="p-6 flex flex-wrap gap-4">
                {skillsData.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className={`py-3 px-5 rounded-full cursor-pointer transition-all duration-300 flex items-center gap-2 ${
                      selectedSkill?.name === skill.name 
                        ? 'bg-gray-200 dark:bg-gray-700 shadow-lg' 
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => {
                      setSelectedSkill(skill);
                      setCurrentSkillIndex(skillsData.findIndex(s => s.name === skill.name));
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {skill.icon && (
                      <img 
                        src={skill.icon} 
                        alt={`ไอคอน ${skill.name}`} 
                        className="w-6 h-6" 
                      />
                    )}
                    <span className="font-medium text-gray-900 dark:text-gray-100">{skill.name}</span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div
          data-aos="fade-left"
            // initial={{ opacity: 0, x: 30 }}
            // animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            // transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg shadow-xl h-full">
              <CardContent className="p-6 flex flex-col justify-center h-full">
                {selectedSkill ? (
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        key={selectedSkill.name + "-icon"}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                        className="w-16 h-16 rounded-xl flex items-center justify-center p-2"
                        style={{ backgroundColor: `${selectedSkill.color}20` }}
                      >
                        <img 
                          src={selectedSkill.icon} 
                          alt={`ไอคอน ${selectedSkill.name}`} 
                          className="w-10 h-10" 
                        />
                      </motion.div>
                      <div>
                        <motion.h3 
                          key={selectedSkill.name + "-title"}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5 }}
                          className="text-2xl font-bold text-gray-900 dark:text-white"
                        >
                          {selectedSkill.name}
                        </motion.h3>
                        <p className="text-gray-600 dark:text-gray-400">Level of expertise</p>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                      <motion.div
                        key={selectedSkill.name + "-bar"}
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedSkill.level}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: selectedSkill.color }}
                      ></motion.div>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>Beginner</span>
                        <span>medium</span>
                        <span>Expert</span>
                    </div>

                    <motion.p 
                      key={selectedSkill.name + "-desc"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="text-gray-700 dark:text-gray-300 mt-4"
                    >
                      {getSkillDescription(selectedSkill.name)}
                    </motion.p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <svg 
                      className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    <p className="text-xl text-gray-500 dark:text-gray-400">
                      เลือกทักษะเพื่อดูรายละเอียด
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div
          // initial={{ opacity: 0, y: 30 }}
          // animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          // transition={{ duration: 0.6, delay: 0.6 }}
          data-aos="fade-up"
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8"
        >
          {skillsData.map((skill, index) => (
            <motion.div
              key={`skill-card-${skill.name}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="group"
              onClick={() => handleCardClick(skill)}
            >
              <Card className="relative z-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 h-full cursor-pointer">
                <CardContent className="p-5 flex flex-col items-center justify-center">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 p-3 transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${skill.color}20` }}
                  >
                    <img 
                      src={skill.icon} 
                      alt={`ไอคอน ${skill.name}`} 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <h3 className="font-medium text-center text-gray-900 dark:text-gray-100">{skill.name}</h3>
                  <div className="w-full bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-1.5 mt-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: skill.color }}
                    ></motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* รายละเอียดทักษะในโมดัล */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          {modalSkill && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${modalSkill.color}20` }}
                  >
                    <img 
                      src={modalSkill.icon} 
                      alt={`ไอคอน ${modalSkill.name}`} 
                      className="w-6 h-6" 
                    />
                  </div>
                  skills {modalSkill.name}
                </DialogTitle>
                <DialogDescription>
                  Details of expertise and technical expertise
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="font-medium">Level of expertise</span>
                    <span className="text-sm font-medium" style={{ color: modalSkill.color }}>
                      {modalSkill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${modalSkill.level}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: modalSkill.color }}
                    ></motion.div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
                    <span>Beginner</span>
                    <span>medium</span>
                    <span>Expert</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Skills and experience</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {getSkillDescription(modalSkill.name)}
                  </p>
                </div>
                
                {/* <div className="space-y-2">
                  <h4 className="font-semibold">โครงการที่เกี่ยวข้อง</h4>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                    {getSkillProjects(modalSkill.name).map((project, index) => (
                      <li key={index}>{project}</li>
                    ))}
                  </ul>
                </div> */}
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setModalOpen(false)}>
                  ปิด
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

// ฟังก์ชันช่วยสำหรับรายละเอียดทักษะ
function getSkillDescription(skillName: string): string {
  const descriptions: Record<string, string> = {
    'React': 'Basic knowledge of using components, state, and props to build various UI elements.',
    'TypeScript': 'Basic understanding of TypeScript for building efficient applications, including defining types, interfaces, and using it with React.',
    'Next.js': 'Fundamentals of Next.js features such as SSR, SSG, ISR, API routes, middleware, and the App Router, with ability to optimize performance and SEO.',
    'TailwindCSS': 'Proficient in utility-first CSS with Tailwind, capable of creating custom design systems, animations, and responsive layouts effectively.',
    'Node.js': 'Basic experience with Node.js for building websites and various bot systems.',
    'Python': 'Experience with Python for creating efficient data-fetching modules and writing bot systems.',
    'JavaScript': 'Basic knowledge of JavaScript including DOM manipulation, event handling, functions, and integration with frameworks.',
    'HTML5': 'Understanding of HTML5 for building web structure, using semantic tags, and handling forms, media, and canvas.',
    'CSS3': 'Ability to use CSS3 for styling web pages, utilizing Flexbox, Grid, Animations, and Responsive Design.'
  };

  return descriptions[skillName] || 'Proficient in using this technology to build robust and scalable web applications.';
}



// ฟังก์ชันช่วยสำหรับโครงการที่เกี่ยวข้องกับทักษะ
function getSkillProjects(skillName: string): string[] {
  const projects: Record<string, string[]> = {
    'React': [
      'แดชบอร์ด E-commerce พร้อมการวิเคราะห์แบบเรียลไทม์',
      'แพลตฟอร์มโซเชียลมีเดียที่มีการโหลดเนื้อหาแบบไดนามิก',
      'พอร์ทัลแสดงข้อมูลเชิงโต้ตอบ',
    ],
    'TypeScript': [
      'ระบบ CRM ระดับองค์กร',
      'ไลบรารี API client ที่มีความปลอดภัยในการใช้งาน type',
      'โซลูชันการจัดการ state ที่ขยายขนาดได้',
    ],
    'Next.js': [
      'เว็บไซต์การตลาดที่เหมาะกับ SEO',
      'แพลตฟอร์มบล็อกด้วยเนื้อหา MDX',
      'แอปพลิเคชัน SaaS พร้อมการตรวจสอบสิทธิ์',
    ],
    'TailwindCSS': [
      'ระบบการออกแบบที่ตอบสนองสำหรับหลายแบรนด์',
      'ไลบรารีคอมโพเนนต์ที่กำหนดเองพร้อมการสนับสนุนโหมดมืด',
      'แดชบอร์ดผู้ดูแลระบบพร้อมธีมที่ปรับแต่งได้',
    ],
    'Node.js': [
      'RESTful API สำหรับแอปพลิเคชันมือถือ',
      'เซิร์ฟเวอร์แชทเรียลไทม์ด้วย WebSockets',
      'สถาปัตยกรรมไมโครเซอร์วิสสำหรับการประมวลผลการชำระเงิน',
    ],
    'GraphQL': [
      'API gateway สำหรับไมโครเซอร์วิส',
      'บริการรวบรวมข้อมูลสำหรับการวิเคราะห์',
      'ระบบแจ้งเตือนแบบเรียลไทม์ตามการสมัครสมาชิก',
    ],
  };

  return projects[skillName] || [
    'โครงการลูกค้าต่างๆ ที่ใช้เทคโนโลยีนี้',
    'พอร์ตโฟลิโอส่วนตัวและโครงการเสริม',
    'การมีส่วนร่วมในโอเพ่นซอร์ส',
  ];
}

export default SkillsSection;
