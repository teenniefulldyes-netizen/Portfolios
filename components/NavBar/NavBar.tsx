"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { DarkModeToggle } from "./DarkMode";
import { Menu , X } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const navItems = [
  { name: "Home", href: "#home", nameTH: "หน้าแรก" },
  { name: "About", href: "#about", nameTH: "เกี่ยวกับ" },
  { name: "Skills", href: "#skills", nameTH: "ทักษะ" },
  { name: "Performance", href: "#projects", nameTH: "ผลงาน" },
  { name: "Certificates", href: "#certificates", nameTH: "ผลงานรางวัล" },
  { name: "Contact", href: "#contact", nameTH: "ติดต่อ" },
];

const NavBar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [isHeroSection, setIsHeroSection] = React.useState(true);
  const [activeSection, setActiveSection] = React.useState("home");

  // Check if we're on hero section (top of page and on home page)
  React.useEffect(() => {
    const isHome = pathname === "/";
    setIsHeroSection(isHome && !scrolled);
    
    const handleScroll = () => {
      const position = window.scrollY;
      if (position > 10) {
        setScrolled(true);
        setIsHeroSection(false);
      } else if (isHome) {
        setScrolled(false);
        setIsHeroSection(true);
      }
      
      // ตรวจสอบ active section
      checkActiveSection();
    };

    const checkActiveSection = () => {
        // ตรวจสอบว่าปัจจุบันอยู่ที่ section ไหน
        const sections = navItems.map(item => item.href.substring(1));
        
        // กรณีอยู่ด้านบนสุดของหน้าจอ ให้ตั้งค่าเป็น home
        if (window.scrollY < 100) {
          setActiveSection("home");
          return;
        }
        
        // ตรวจสอบแต่ละ section
        for (let i = 0; i < sections.length; i++) {
          const section = document.getElementById(sections[i]);
          if (section) {
            const rect = section.getBoundingClientRect();
            
            // ถ้า section อยู่ในช่วงที่มองเห็นได้
            if (rect.top <= 150 && rect.bottom >= 150) {
              setActiveSection(sections[i]);
              return;
            }
          }
        }
        
        // ถ้าเลื่อนลงด้านล่างสุดของหน้าจอ ให้ตั้งค่าเป็น section สุดท้าย (contact)
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
          setActiveSection(sections[sections.length - 1]);
        }
      };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, scrolled]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // ตรวจสอบว่าเป็นการลิงก์ภายในหน้าหรือไม่ (มี # นำหน้า)
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // เลื่อนไปยังส่วนที่ต้องการด้วย smooth behavior
        const offset = Math.max(0, targetElement.offsetTop - 80);
        window.scrollTo({
          top: offset,
          behavior: 'smooth',
        });
        // อัพเดท active section
        setActiveSection(targetId);
      }
    } else {
      // กรณีเป็นลิงก์ไปหน้าอื่น ให้นำทางตามปกติ
      window.location.href = href;
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-700 ease-in-out bg-transparent border-none py-4",
        // isHeroSection 
        //   ? "bg-transparent border-none py-4" 
        //   : "bg-background/70 backdrop-blur-xl border-b py-2"
      )}
    >
      <div className={cn(
        "container mx-auto px-4 md:px-6 transition-all duration-700 ease-in-out",
        isHeroSection 
          ? "max-w-full" 
          : "max-w-4xl"
      )}>
        <div className={cn(
          "flex items-center justify-between transition-all duration-700 ease-in-out rounded-full",
          isHeroSection 
            ? "bg-transparent shadow-none h-16 px-0" 
            : "bg-background/80 backdrop-blur-md shadow-lg shadow-black/5 border border-border/50 h-12 px-6"
        )}>
          {/* Logo */}
          <Link 
            href={"/"} 
            className={cn(
              "flex items-center space-x-2 text-center justify-center rounded-md h-6 bg-transparent w-auto z-10 transition-all duration-500"
            )}
          >
            <span className={cn(
              "font-semibold transition-all duration-500",
              isHeroSection ? "text-xl" : "text-lg"
            )}>PORTFOLIO</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={cn(
                  "text-sm  font-medium hover:text-primary transition-all duration-300 px-3 py-2 rounded-full relative",
                  activeSection === item.href.substring(1)
                    ? "text-primary bg-primary/10"
                    : "text-gray-800 dark:text-muted-foreground hover:bg-muted/50"
                )}
              >
                {item.name}
                {/* {activeSection === item.href.substring(1) && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary rounded-full" />
                )} */}
              </Link>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2">
            {/* <DarkModeToggle /> */}
            
            {/* Mobile Menu */}
            <div className="md:hidden">
              <Drawer>
                <DrawerTrigger className={cn(
                  "flex border w-9 h-9 justify-center rounded-full items-center transition-all duration-300",
                  isHeroSection 
                    ? "border-border/50 hover:bg-muted/50" 
                    : "border-border/30 hover:bg-muted/30"
                )}>
                  {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </DrawerTrigger>
                <DrawerContent className="rounded-t-3xl">
                  <DrawerHeader>
                    <DrawerTitle className="font-normal">กดข้อความด้านล่างเพื่อไปยังส่วนต่างๆ</DrawerTitle>
                    <DrawerDescription>เมนูนำทาง</DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter className="gap-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={(e) => scrollToSection(e, item.href)}
                        className={cn(
                          "text-lg font-medium hover:text-primary transition-all duration-300 py-3 px-4 rounded-xl text-center",
                          activeSection === item.href.substring(1)
                            ? "text-primary bg-primary/10 font-semibold"
                            : "text-muted-foreground hover:bg-muted/50"
                        )}
                      >
                        {item.name} | {item.nameTH}
                      </Link>
                    ))}
                    <DrawerClose className="mt-4">
                      <Button variant="outline" className="w-full rounded-xl">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;