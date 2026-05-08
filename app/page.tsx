"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import CubeLogo from "./components/CubeLogo";

const projects = [
  {
    id: "clipvault",
    title: "ClipVault",
    description: "YouTube clip management and marketing automation",
    status: "LIVE",
    statusType: "live",
    url: "https://clipvault.karyonlabs.com",
    tech: ["Next.js", "Automation", "API"]
  },
  {
    id: "ky-esports",
    title: "KY eSports",
    description: "Competitive gaming tournament platform",
    status: "BETA",
    statusType: "soon",
    url: "#",
    tech: ["React", "Gaming", "Real-time"]
  },
  {
    id: "mlbb-stratos",
    title: "MLBB Stratos",
    description: "Mobile Legends strategy analytics and stats",
    status: "SOON",
    statusType: "soon",
    url: "#",
    tech: ["Analytics", "Mobile", "Data"]
  },
  {
    id: "karyon-forge",
    title: "Karyon Forge",
    description: "Developer tools and infrastructure utilities",
    status: "WIP",
    statusType: "soon",
    url: "#",
    tech: ["Tools", "Dev", "CLI"]
  },
  {
    id: "karyon-review",
    title: "Karyon Review",
    description: "AI tool testing and comparison platform",
    status: "PLANNED",
    statusType: "soon",
    url: "#",
    tech: ["AI", "Testing", "Reviews"]
  }
];

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setTheme(systemTheme);
      document.documentElement.setAttribute("data-theme", systemTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <svg className="theme-icon" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="theme-icon" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 6.707a8.001 8.001 0 00-10.586 10.586A1 1 0 006.09 15.09l3.907-3.907a1 1 0 011.414 0l3.907 3.907a1 1 0 00.031-1.414 8.001 8.001 0 006.944-6.293z" />
        </svg>
      )}
    </button>
  );
}

function MouseBlob() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (blobRef.current) {
        const x = e.clientX - 100;
        const y = e.clientY - 100;
        blobRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <div ref={blobRef} className="blob-cursor" />;
}

function ParallaxBlobs() {
  return (
    <>
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="blob blob-4" />
    </>
  );
}

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 backdrop-blur-lg bg-black/50">
      <div className="modern-container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Karyon Labs" 
              className="h-8 w-auto"
            />
            <span className="brutalist-heading text-lg">THIS IS RESEARCH LAB</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#projects" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">PROJECTS</Link>
            <Link href="#about" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">ABOUT</Link>
            <Link href="#contact" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">CONTACT</Link>
            <Button className="hybrid-button-primary">
              GET STARTED
            </Button>
            <ThemeToggle />
          </nav>
          <div className="md:flex items-center gap-4">
            <Button variant="outline" className="md:hidden border-gray-700 text-gray-400">
              MENU
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.05;
        heroRef.current.style.transform = `translateY(${parallax}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pattern-subtle overflow-hidden">
      <div ref={heroRef} className="modern-container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="status-badge status-soon">RESEARCH OS v2.1.0</Badge>
              <h1 className="heading-xl modern-heading">
                WE BUILD
                <br />
                <span className="brutalist-heading-accent">DIGITAL</span>
                <br />
                PRODUCTS
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                We're a research lab that builds ambitious digital products. 
                From esports platforms to AI tools — each venture deployed on its own subdomain.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="hybrid-button-primary">
                EXPLORE PROJECTS
              </Button>
              <Button variant="outline" className="hybrid-button">
                LEARN MORE
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">5</div>
                <div className="text-sm text-gray-500 font-mono">PROJECTS</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">3</div>
                <div className="text-sm text-gray-500 font-mono">VERTICALS</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">∞</div>
                <div className="text-sm text-gray-500 font-mono">AMBITION</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <Card className="brutalist-card">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">KL</span>
                    </div>
                    <div>
                      <h3 className="brutalist-heading text-lg">RESEARCH LAB</h3>
                      <p className="text-sm text-gray-500 font-mono">R&D STUDIO</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-300 italic">
                    "We don't just build code. We ship ventures. Each product is an independent brand with its own identity, domain, and roadmap."
                  </blockquote>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                      <div className="text-lg font-bold text-green-400">1</div>
                      <div className="text-xs text-gray-500 font-mono">LIVE</div>
                    </div>
                    <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                      <div className="text-lg font-bold text-yellow-400">2</div>
                      <div className="text-xs text-gray-500 font-mono">BETA</div>
                    </div>
                    <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                      <div className="text-lg font-bold text-blue-400">2</div>
                      <div className="text-xs text-gray-500 font-mono">WIP</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (aboutRef.current) {
        const scrolled = window.pageYOffset;
        const speed = 0.1;
        const yPos = -(scrolled * speed);
        aboutRef.current.style.transform = `translateY(${yPos}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Smooth transition section */}
      <div className="relative h-32 bg-gradient-to-b from-black via-gray-900/50 to-gray-900/50">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/20"></div>
      </div>
      
      <section id="about" ref={aboutRef} className="py-24 px-4 bg-gradient-to-b from-gray-900/50 via-gray-900/30 to-gray-900/50 relative overflow-hidden">
            <div className="modern-container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <Badge className="status-badge status-soon mb-4">ABOUT US</Badge>
              <h2 className="heading-lg modern-heading mb-4">
                RESEARCH & <span className="brutalist-heading-accent">DEVELOPMENT</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed mb-6">
                Karyon Labs is a research & development studio that builds ambitious digital products. 
                We identify opportunities, build fast, and iterate across the full product lifecycle.
              </p>
              <p className="text-xl text-gray-400 leading-relaxed">
                From esports platforms to AI tools — each venture deployed on its own subdomain.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                <h3 className="brutalist-heading text-md mb-2">R&D STUDIO</h3>
                <p className="text-gray-400 text-sm font-mono">
                  We incubate, build, and ship digital products
                </p>
              </div>
              <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                <h3 className="brutalist-heading text-md mb-2">FULL-STACK</h3>
                <p className="text-gray-400 text-sm font-mono">
                  End-to-end development across web, gaming, and automation
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-500/20 rounded-2xl blur-3xl"></div>
            <Card className="modern-card relative border-gray-800 bg-gray-900/50 backdrop-blur">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <h3 className="brutalist-heading text-xl text-center">
                    WHAT WE <span className="brutalist-heading-accent">DO</span>
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">Web Applications</h4>
                        <p className="text-sm text-gray-500 font-mono">Modern web apps with cutting-edge tech</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">Gaming Platforms</h4>
                        <p className="text-sm text-gray-500 font-mono">Esports and gaming tournament systems</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-purple-500 rounded"></div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">AI Tools</h4>
                        <p className="text-sm text-gray-500 font-mono">AI-powered utilities and automation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

function ProjectsSection() {
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (projectsRef.current) {
        const scrolled = window.pageYOffset;
        const speed = 0.08;
        const yPos = -(scrolled * speed);
        projectsRef.current.style.transform = `translateY(${yPos}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="projects" ref={projectsRef} className="py-24 px-4 pattern-bold relative overflow-hidden">
            <div className="modern-container relative z-10">
        <div className="text-center mb-16">
          <Badge className="status-badge status-soon mb-4">PROJECT PORTFOLIO</Badge>
          <h2 className="heading-lg brutalist-heading mb-4">
            OUR <span className="brutalist-heading-accent">VENTURES</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Each product is a fully independent venture with its own brand, domain, and roadmap.
          </p>
        </div>
        
        <div className="modern-grid modern-grid-3">
          {projects.map((project, index) => (
            <Card key={project.id} className={`modern-card group ${index === 0 ? 'md:col-span-2' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="brutalist-heading text-lg mb-2">
                      {project.title}
                    </CardTitle>
                    <p className="text-gray-400 text-sm font-mono">
                      {project.description}
                    </p>
                  </div>
                  <Badge className={`status-badge status-${project.statusType === 'live' ? 'live' : 'soon'}`}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-gray-800 text-gray-400 text-xs font-mono rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <Button className="w-full hybrid-button">
                    {project.statusType === 'live' ? 'VISIT SITE' : 'VIEW DETAILS'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black py-12 px-4">
      <div className="modern-container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">KL</span>
              </div>
              <span className="brutalist-heading text-sm">THIS IS RESEARCH LAB</span>
            </div>
            <p className="text-gray-500 text-sm font-mono">
              Building the future of digital products, one venture at a time.
            </p>
          </div>
          
          <div>
            <h4 className="brutalist-heading text-sm mb-4">PRODUCTS</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-500 hover:text-white text-sm font-mono">ClipVault</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-white text-sm font-mono">KY eSports</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-white text-sm font-mono">MLBB Stratos</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="brutalist-heading text-sm mb-4">COMPANY</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-500 hover:text-white text-sm font-mono">About</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-white text-sm font-mono">Contact</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-white text-sm font-mono">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="brutalist-heading text-sm mb-4">CONNECT</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-500 hover:text-white text-sm font-mono">GitHub</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-white text-sm font-mono">Twitter</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-white text-sm font-mono">Discord</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm font-mono mb-4 md:mb-0">
            © 2024 This is Research Lab. Built with human hands.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-500 hover:text-red-400 text-sm font-mono">PRIVACY</Link>
            <Link href="#" className="text-gray-500 hover:text-red-400 text-sm font-mono">TERMS</Link>
            <Link href="#" className="text-gray-500 hover:text-red-400 text-sm font-mono">LICENSE</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <CubeLogo />
      <MouseBlob />
      <Navbar />
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <Footer />
    </div>
  );
}
