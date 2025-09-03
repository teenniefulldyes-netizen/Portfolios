'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { ChevronRight, ExternalLink, Github, Star, Sparkles } from 'lucide-react';


// Type definitions
type Technology = {
    name: string;
    color: string;
};

type Project = {
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    imageUrl: string;
    technologies: Technology[];
    demoUrl?: string;
    repoUrl?: string;
    featured: boolean;
};

// Mock data for projects
const projectsData: Project[] = [
    {
        id: 'project-1',
        title: 'Coming Soon | GP-Tech',
        description: 'Participated in the United Nations Forum, contributing to discussions and representing key perspectives on global issues.',
        fullDescription: 'Participated in the United Nations Forum, contributing to discussions and representing key perspectives on global issues.',
        imageUrl: '/performance/project_01.jpg',
        technologies: [
            { name: 'React', color: '#61DAFB' },
            { name: 'Next.js', color: '#ffffff' },
            { name: 'TypeScript', color: '#3178C6' },
            { name: 'TailwindCSS', color: '#38B2AC' },
            // { name: 'GraphQL', color: '#E10098' }
        ],
        demoUrl: '',
        repoUrl: '',
        featured: true
    },
    {
        id: 'project-2',
        title: 'Coming Soon | GP-Tech',
        description: 'Developed an innovative face recognition system for school use, enhancing security and efficiency.',
        fullDescription: 'Developed an innovative face recognition system for school use, enhancing security and efficiency.',
        imageUrl: '/performance/project_02.jpg',
        technologies: [
            { name: 'React', color: '#61DAFB' },
            { name: 'Next.js', color: '#ffffff' },
            { name: 'TypeScript', color: '#3178C6' },
            { name: 'TailwindCSS', color: '#38B2AC' },
            // { name: 'GraphQL', color: '#E10098' }
        ],
        demoUrl: '',
        repoUrl: '',
        featured: true
    },
    {
        id: 'project-3',
        title: 'Coming Soon | GP-Tech',
        description: 'Participated in a stage dance performance at ACN Showcase 2024.',
        fullDescription: 'Participated in a stage dance performance at ACN Showcase 2024.',
        imageUrl: '/performance/project_03.jpg',
        technologies: [
            { name: 'React', color: '#61DAFB' },
            { name: 'Next.js', color: '#ffffff' },
            { name: 'TypeScript', color: '#3178C6' },
            { name: 'TailwindCSS', color: '#38B2AC' },
            // { name: 'GraphQL', color: '#E10098' }
        ],
        demoUrl: '',
        repoUrl: '',
        featured: true
    },
    {
        id: 'project-4',
        title: 'Coming Soon | GP-Tech',
        description: 'Be a candidate of a student council',
        fullDescription: 'Be a candidate of a student council',
        imageUrl: '/performance/project_04.jpg',
        technologies: [
            { name: 'React', color: '#61DAFB' },
            { name: 'Next.js', color: '#ffffff' },
            { name: 'TypeScript', color: '#3178C6' },
            { name: 'TailwindCSS', color: '#38B2AC' },
            // { name: 'GraphQL', color: '#E10098' }
        ],
        demoUrl: '',
        repoUrl: '',
        featured: true
    },
    {
        id: 'project-5',
        title: 'Coming Soon | GP-Tech',
        description: 'Undertook a 2-month internship in Japan, enhancing professional skills and cross-cultural experience.',
        fullDescription: 'Undertook a 2-month internship in Japan, enhancing professional skills and cross-cultural experience.',
        imageUrl: '/performance/project_05.jpg',
        technologies: [
            { name: 'React', color: '#61DAFB' },
            { name: 'Next.js', color: '#ffffff' },
            { name: 'TypeScript', color: '#3178C6' },
            { name: 'TailwindCSS', color: '#38B2AC' },
            // { name: 'GraphQL', color: '#E10098' }
        ],
        demoUrl: '',
        repoUrl: '',
        featured: true
    },
    {
        id: 'project-6',
        title: 'Coming Soon | GP-Tech',
        description: 'Participated in cosplay event at Universal Studios Japan, Osaka.',
        fullDescription: 'Participated in cosplay event at Universal Studios Japan, Osaka.',
        imageUrl: '/performance/project_06.jpg',
        technologies: [
            { name: 'React', color: '#61DAFB' },
            { name: 'Next.js', color: '#ffffff' },
            { name: 'TypeScript', color: '#3178C6' },
            { name: 'TailwindCSS', color: '#38B2AC' },
            // { name: 'GraphQL', color: '#E10098' }
        ],
        demoUrl: '',
        repoUrl: '',
        featured: true
    },
    {
        id: 'project-7',
        title: 'Coming Soon | GP-Tech',
        description: 'Participated in Aice Warp, showcased team UFO’s project, and won 1st place.',
        fullDescription: 'Participated in Aice Warp, showcased team UFO’s project, and won 1st place.',
        imageUrl: '/performance/project_07.jpg',
        technologies: [
            { name: 'React', color: '#61DAFB' },
            { name: 'Next.js', color: '#ffffff' },
            { name: 'TypeScript', color: '#3178C6' },
            { name: 'TailwindCSS', color: '#38B2AC' },
            // { name: 'GraphQL', color: '#E10098' }
        ],
        demoUrl: '',
        repoUrl: '',
        featured: true
    },
    {
        id: 'project-8',
        title: 'Coming Soon | GP-Tech',
        description: 'Built significant relationships with foreign schools, promoting academic and cultural collaboration.',
        fullDescription: 'Built significant relationships with foreign schools, promoting academic and cultural collaboration.',
        imageUrl: '/performance/project_08.jpg',
        technologies: [
            { name: 'React', color: '#61DAFB' },
            { name: 'Next.js', color: '#ffffff' },
            { name: 'TypeScript', color: '#3178C6' },
            { name: 'TailwindCSS', color: '#38B2AC' },
            // { name: 'GraphQL', color: '#E10098' }
        ],
        demoUrl: '',
        repoUrl: '',
        featured: true
    },
    {
        id: 'project-9',
        title: 'Coming Soon | GP-Tech',
        description: 'Designed and developed games on the Roblox platform, demonstrating creativity and programming skills.',
        fullDescription: 'Designed and developed games on the Roblox platform, demonstrating creativity and programming skills.',
        imageUrl: '/performance/project_09.jpg',
        technologies: [
            { name: 'React', color: '#61DAFB' },
            { name: 'Next.js', color: '#ffffff' },
            { name: 'TypeScript', color: '#3178C6' },
            { name: 'TailwindCSS', color: '#38B2AC' },
            // { name: 'GraphQL', color: '#E10098' }
        ],
        demoUrl: '',
        repoUrl: '',
        featured: true
    },
    {
        id: 'project-10',
        title: 'Coming Soon | GP-Tech',
        description: 'Organized and managed a booth selling goods at Maruya event.',
        fullDescription: 'Organized and managed a booth selling goods at Maruya event.',
        imageUrl: '/performance/project_10.jpg',
        technologies: [
            { name: 'React', color: '#61DAFB' },
            { name: 'Next.js', color: '#ffffff' },
            { name: 'TypeScript', color: '#3178C6' },
            { name: 'TailwindCSS', color: '#38B2AC' },
            // { name: 'GraphQL', color: '#E10098' }
        ],
        demoUrl: '',
        repoUrl: '',
        featured: true
    },
    {
        id: 'project-11',
        title: 'Coming Soon | GP-Tech',
        description: 'Served as a fitness trainer at a gym, offering professional training and guidance while managing a part-time position.',
        fullDescription: 'Served as a fitness trainer at a gym, offering professional training and guidance while managing a part-time position.',
        imageUrl: '/performance/project_11.jpg',
        technologies: [
            { name: 'React', color: '#61DAFB' },
            { name: 'Next.js', color: '#ffffff' },
            { name: 'TypeScript', color: '#3178C6' },
            { name: 'TailwindCSS', color: '#38B2AC' },
            // { name: 'GraphQL', color: '#E10098' }
        ],
        demoUrl: '',
        repoUrl: '',
        featured: true
    },
    {
        id: 'project-12',
        title: 'Coming Soon | GP-Tech',
        description: 'Participated in K Engineering workshops to enhance technical skills.',
        fullDescription: 'Participated in K Engineering workshops to enhance technical skills.',
        imageUrl: '/performance/project_12.jpg',
        technologies: [
            { name: 'React', color: '#61DAFB' },
            { name: 'Next.js', color: '#ffffff' },
            { name: 'TypeScript', color: '#3178C6' },
            { name: 'TailwindCSS', color: '#38B2AC' },
            // { name: 'GraphQL', color: '#E10098' }
        ],
        demoUrl: '',
        repoUrl: '',
        featured: true
    },
];

const ProjectSection = () => {
    const [isInView, setIsInView] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [open, setOpen] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const { theme } = useTheme();

    // Display only featured projects initially
    const visibleProjects = showAll
        ? projectsData
        : projectsData.filter(project => project.featured);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        const section = document.getElementById('projects');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setOpen(true);
    };

    return (
        <section
            id="projects"
            className="relative py-20 md:py-32 overflow-hidden"
        >
            {/* Background effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {/* Gradient background 1 */}
                <div className="absolute top-60 -right-40 w-96 h-96 rounded-full bg-purple-500/20 dark:bg-purple-500/10 blur-3xl" />
                {/* Gradient background 2 */}
                <div className="absolute top-2/4 -left-40 w-80 h-80 rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-3xl" />
                {/* Subtle Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, rgba(100,100,100,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,100,100,0.1) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>
            <div className="absolute inset-0 pointer-events-none top-36">
                <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
                    <defs>
                        <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
                            <stop offset="50%" stopColor="rgb(59, 130, 246)" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,200 L300,200 L300,400 L600,400 L600,100 L900,100 L900,500 L1200,500"
                        stroke="url(#circuitGradient)"
                        strokeWidth="2"
                        fill="none"
                        className="animate-pulse"
                    />
                    <circle cx="300" cy="200" r="4" fill="rgb(59, 130, 246)" className="animate-pulse" />
                    <circle cx="600" cy="400" r="4" fill="rgb(16, 185, 129)" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <circle cx="900" cy="100" r="4" fill="rgb(236, 72, 153)" className="animate-pulse" style={{ animationDelay: '1s' }} />
                </svg>
            </div>

            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <div className="relative inline-block mb-6">
                        {/* Floating icons */}
                        <motion.div
                            animate={{ 
                                y: [0, -10, 0],
                                rotate: [0, 5, 0]
                            }}
                            transition={{ 
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -top-4 -left-8"
                        >
                            <Sparkles className="w-6 h-6 text-purple-500/60" />
                        </motion.div>
                        <motion.div
                            animate={{ 
                                y: [0, -8, 0],
                                rotate: [0, -5, 0]
                            }}
                            transition={{ 
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5
                            }}
                            className="absolute -top-2 -right-10"
                        >
                            <Star className="w-5 h-5 text-blue-500/60" />
                        </motion.div>
                        
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-2xl opacity-70"></div>
                        <h2 className="relative text-6xl md:text-7xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 drop-shadow-2xl">
                            performance
                        </h2>
                    </div>
                    
                    <motion.div 
                        className="w-32 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-600 mx-auto rounded-full mb-8 shadow-lg"
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                    
                    <motion.p 
                        className="text-gray-700 dark:text-gray-300 text-2xl max-w-3xl mx-auto leading-relaxed font-medium"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <span className="block text-lg text-gray-500 dark:text-gray-400 mt-2 font-light">
                            Engaged in various creative activities and projects aimed at enhancing learning and developing essential skills.
                        </span>
                    </motion.p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {visibleProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                            transition={{ 
                                duration: 0.6, 
                                delay: 0.1 * index,
                                type: "spring",
                                stiffness: 100
                            }}
                            whileHover={{ 
                                y: -8,
                                scale: 1.02,
                                rotateY: 2,
                                rotateX: 2
                            }}
                            className="h-full group"
                            style={{ perspective: "1000px" }}
                        >
                            <Card
                                key={project.id}
                                className="overflow-hidden hover:border-yellow-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl h-full w-full max-w-[600px]  border-amber-200 cursor-pointer group"
                                onClick={() => handleProjectClick(project)}
                            >
                                <CardContent className="p-6">
                                    <div className="relative h-40 w-full mb-4">
                                        <Image
                                            src={project.imageUrl}
                                            alt={project.title}
                                            fill
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                    {/* <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                                        {project.title}
                                    </h3> */}
                                    <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                                        {project.description}
                                    </p>
                                    {/* <div className="flex flex-wrap gap-2 mt-3 mb-1">
                                        {project.technologies.slice(0, 3).map((tech) => (
                                            <Badge
                                                key={`${project.id}-${tech.name}`}
                                                variant="outline"
                                                // className="bg-gradient-to-r from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-800/60 backdrop-blur-sm text-xs py-1 px-3 border-2 hover:shadow-lg transition-all duration-300"
                                                style={{
                                                    borderColor: `${tech.color}60`,
                                                    color: theme === 'dark' ? `${tech.color}DD` : tech.color,
                                                    boxShadow: `0 0 20px ${tech.color}30`
                                                }}
                                            >
                                                {tech.name}
                                            </Badge>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <Badge
                                                variant="outline"
                                                // className="bg-gradient-to-r from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-800/60 backdrop-blur-sm text-xs py-1 px-3 border-2"
                                            >
                                                +{project.technologies.length - 3}
                                            </Badge>
                                        )}
                                    </div> */}
                                <div className="flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors cursor-pointer">
                                    ดูเพิ่มเติม
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </div>
                                </CardContent>
                                {/* <CardFooter className="p-6 pt-0">
                                </CardFooter> */}
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Enhanced Show More/Less Button */}
                {/* {projectsData.length > 3 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-16 flex justify-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="outline"
                                size="lg"
                                className="bg-gradient-to-r from-white/90 to-white/80 dark:from-gray-800/90 dark:to-gray-800/80 backdrop-blur-xl border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 text-lg font-semibold"
                                onClick={() => setShowAll(!showAll)}
                            >
                                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    {showAll ? 'Show Less Projects' : 'View All Projects'}
                                </span>
                            </Button>
                        </motion.div>
                    </motion.div>
                )} */}
            </div>

            {/* Enhanced Project Detail Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-5xl max-h-[95vh] overflow-y-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-0 shadow-3xl">
                    <AnimatePresence mode="wait">
                        {selectedProject && (
                            <motion.div
                                key={selectedProject.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* <DialogHeader className="space-y-4">
                                    <DialogTitle className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                        {selectedProject.title}
                                    </DialogTitle>
                                    <DialogDescription className="text-xl text-gray-600 dark:text-gray-300">
                                        {selectedProject.description}
                                    </DialogDescription>
                                </DialogHeader> */}

                                {/* Enhanced Project Image */}
                                <motion.div 
                                    className="relative w-full pt-[60%] my-6 rounded-2xl overflow-hidden shadow-2xl"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                >
                                    <Image
                                        src={selectedProject.imageUrl}
                                        alt={selectedProject.title}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </motion.div>

                                {/* Enhanced Technologies */}
                                {/* <motion.div 
                                    className="flex flex-wrap gap-3 mb-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    {selectedProject.technologies.map((tech, index) => (
                                        <motion.div
                                            key={`modal-${selectedProject.id}-${tech.name}`}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <Badge
                                                variant="outline"
                                                // className="py-2 px-4 text-base font-semibold border-2 shadow-lg hover:shadow-xl transition-all duration-300"
                                                style={{
                                                    borderColor: `${tech.color}60`,
                                                    color: theme === 'dark' ? `${tech.color}DD` : tech.color,
                                                    boxShadow: `0 0 20px ${tech.color}30`
                                                }}
                                            >
                                                {tech.name}
                                            </Badge>
                                        </motion.div>
                                    ))}
                                </motion.div> */}

                                {/* Enhanced Full Description */}
                                <motion.div 
                                    className="text-gray-700 dark:text-gray-300 my-8 space-y-6 text-lg leading-relaxed"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    {selectedProject.fullDescription.split('\n\n').map((paragraph, i) => (
                                        <motion.p 
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                                        >
                                            {paragraph}
                                        </motion.p>
                                    ))}
                                </motion.div>

                                <DialogFooter className="flex flex-col sm:flex-row gap-4 sm:gap-0 pt-6">
                                    <div className="flex gap-4">
                                        {selectedProject.demoUrl && (
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Button
                                                    size="lg"
                                                    className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-6 py-3"
                                                    onClick={() => window.open(selectedProject.demoUrl, '_blank')}
                                                >
                                                    <ExternalLink size={20} />
                                                    Visit Website
                                                </Button>
                                            </motion.div>
                                        )}
                                        {selectedProject.repoUrl && (
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Button
                                                    variant="outline"
                                                    size="lg"
                                                    className="flex items-center gap-3 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 mr-3"
                                                    onClick={() => window.open(selectedProject.repoUrl, '_blank')}
                                                >
                                                    <Github size={20} />
                                                    View Code
                                                </Button>
                                            </motion.div>
                                        )}
                                    </div>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className="border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 px-6 py-3"
                                            onClick={() => setOpen(false)}
                                        >
                                            Close
                                        </Button>
                                    </motion.div>
                                </DialogFooter>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default ProjectSection;