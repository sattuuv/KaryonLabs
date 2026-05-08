"use client";

import {
  Clapperboard,
  Gamepad2,
  Crosshair,
  Hammer,
  Star,
  ExternalLink,
  Terminal,
  Sparkles,
  Zap,
  Code2,
  Layers,
  Rocket,
  ChevronRight,
  Globe,
  ArrowUpRight,
  Quote,
  Lightbulb,
  Workflow,
  GripHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";

/* ── Types ── */
type Project = {
  id: string;
  title: string;
  tagline: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  accentColor: string;
  badge?: { label: string; color: string };
  neon?: boolean;
  comingSoon?: boolean;
  wide?: boolean;
  description: string;
};

type Feature = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
};

/* ── Project data ── */
const projects: Project[] = [
  {
    id: "clipvault",
    title: "ClipVault",
    tagline: "Clip management & marketing",
    href: "https://clipvault.karyonlabs.com",
    icon: Clapperboard,
    gradient: "from-blue-500 to-cyan-400",
    accentColor: "text-cyan-400",
    badge: { label: "LIVE", color: "text-red-400" },
    wide: true,
    description: "Automated clip pipeline · Content distribution · Marketing analytics",
  },
  {
    id: "ky-esports",
    title: "KY eSports",
    tagline: "Competitive gaming hub",
    href: "#ky-esports",
    icon: Gamepad2,
    gradient: "from-orange-500 to-rose-500",
    accentColor: "text-orange-400",
    neon: true,
    description: "Tournament brackets · Team rosters · Live match tracking",
  },
  {
    id: "mlbb-stratos",
    title: "MLBB Stratos",
    tagline: "Advanced strategy analytics",
    href: "#mlbb-stratos",
    icon: Crosshair,
    gradient: "from-purple-500 to-blue-500",
    accentColor: "text-purple-400",
    comingSoon: true,
    description: "Hero stats · Meta analysis · Draft simulator",
  },
  {
    id: "karyon-forge",
    title: "Karyon Forge",
    tagline: "Bots, apps & infrastructure",
    href: "#karyon-forge",
    icon: Hammer,
    gradient: "from-emerald-500 to-teal-400",
    accentColor: "text-emerald-400",
    description: "Discord bots · Web apps · API microservices",
  },
  {
    id: "karyon-review",
    title: "Karyon Review",
    tagline: "AI tool curation & reviews",
    href: "#karyon-review",
    icon: Star,
    gradient: "from-amber-400 to-yellow-400",
    accentColor: "text-amber-400",
    description: "Curated rankings · Feature comparisons · Pricing insights",
  },
];

/* ── Features data ── */
const features: Feature[] = [
  {
    icon: Lightbulb,
    title: "R&D Studio",
    description: "We incubate, build, and ship digital products — from esports platforms to AI tools.",
    gradient: "from-cyan-500/20 to-blue-600/20",
  },
  {
    icon: Workflow,
    title: "Full-Stack Craft",
    description: "End-to-end development across web, gaming, and automation infrastructure.",
    gradient: "from-purple-500/20 to-pink-600/20",
  },
  {
    icon: GripHorizontal,
    title: "Multi-Product",
    description: "A growing portfolio of ventures, each deployed on its own subdomain.",
    gradient: "from-emerald-500/20 to-teal-600/20",
  },
];

/* ── Dock items ── */
const dockItems = [
  { id: "clipvault", label: "ClipVault", icon: Clapperboard, href: "#clipvault" },
  { id: "ky-esports", label: "KY eSports", icon: Gamepad2, href: "#ky-esports" },
  { id: "mlbb-stratos", label: "MLBB Stratos", icon: Crosshair, href: "#mlbb-stratos" },
  { id: "karyon-forge", label: "Karyon Forge", icon: Hammer, href: "#karyon-forge" },
  { id: "karyon-review", label: "Karyon Review", icon: Star, href: "#karyon-review" },
] as const;

/* ── Cursor Background Light + Particles ── */

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  targetX: number;
  targetY: number;
  r: number;
  g: number;
  b: number;
};

function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let mouseX = -200;
    let mouseY = -200;
    let glowX = -200;
    let glowY = -200;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const animate = () => {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = `${glowX}px`;
      glow.style.top = `${glowY}px`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-0 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
        background:
          "radial-gradient(circle, rgba(0,229,255,0.08) 0%, rgba(0,229,255,0.04) 30%, rgba(0,229,255,0.01) 60%, transparent 80%)",
      }}
    />
  );
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Color palette for particles
    const colors = [
      { r: 0, g: 229, b: 255 },   // cyan
      { r: 79, g: 195, b: 247 },   // light blue
      { r: 179, g: 136, b: 255 },  // purple
      { r: 0, g: 255, b: 136 },    // green
    ];

    // Create particles spread across the full screen
    const count = 150;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      // Spread across the full viewport
      const col = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: 1 + Math.random() * 3,
        alpha: 0.05 + Math.random() * 0.15,
        targetX: Math.random() * canvas.width,
        targetY: Math.random() * canvas.height,
        r: col.r,
        g: col.g,
        b: col.b,
      });
    }

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    let animId: number;

    const animate = () => {
      timeRef.current += 0.002;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const w = canvas.width;
      const h = canvas.height;
      const t = timeRef.current;

      // ── Draw large floating gradient orbs ──
      const orbCount = 3;
      for (let i = 0; i < orbCount; i++) {
        const ox = w * 0.2 + w * 0.6 * (0.5 + 0.5 * Math.sin(t * 0.3 + i * 2.1));
        const oy = h * 0.2 + h * 0.6 * (0.5 + 0.5 * Math.cos(t * 0.4 + i * 1.7));
        const or = 200 + 100 * Math.sin(t * 0.2 + i * 3.0);
        const colors_orb = [
          "rgba(0, 229, 255, 0.03)",
          "rgba(179, 136, 255, 0.03)",
          "rgba(0, 255, 136, 0.02)",
        ];
        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, or);
        grad.addColorStop(0, colors_orb[i]);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // ── Extra slow-moving ambient haze layers ──
      for (let i = 0; i < 2; i++) {
        const hx = w * (0.3 + 0.4 * Math.sin(t * 0.1 + i * 1.3));
        const hy = h * (0.3 + 0.4 * Math.cos(t * 0.15 + i * 2.7));
        const haze = ctx.createRadialGradient(hx, hy, 0, hx, hy, 300);
        haze.addColorStop(0, `rgba(0, 229, 255, ${0.02 + i * 0.01})`);
        haze.addColorStop(1, "transparent");
        ctx.fillStyle = haze;
        ctx.fillRect(0, 0, w, h);
      }

      // ── Draw particles ──
      for (const p of particles) {
        // Gentle ambient drift
        p.x += p.vx + Math.sin(t * 0.5 + p.y * 0.01) * 0.1;
        p.y += p.vy + Math.cos(t * 0.4 + p.x * 0.01) * 0.1;

        // Wrap around screen edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Cursor repulsion
        const distX = p.x - mx;
        const distY = p.y - my;
        const dist = Math.sqrt(distX * distX + distY * distY);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          p.x += (distX / (dist || 1)) * force * 3;
          p.y += (distY / (dist || 1)) * force * 3;
        }

        // Draw particle with its color
        const near = dist < 200;
        const alpha = Math.min(p.alpha + (near ? 0.25 : 0), 0.4);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + (near ? 1.5 : 0), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${alpha})`;
        ctx.fill();

        // Draw connection lines
        if (p.size > 1.8) {
          for (const other of particles) {
            if (other === p || other.size < 1.8) continue;
            const dx2 = p.x - other.x;
            const dy2 = p.y - other.y;
            const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
            if (dist2 < 100 && dist2 > 0) {
              const nearCursor = Math.sqrt((p.x - mx) ** 2 + (p.y - my) ** 2) < 220 ||
                                 Math.sqrt((other.x - mx) ** 2 + (other.y - my) ** 2) < 220;
              const distAlpha = (1 - dist2 / 100) * (nearCursor ? 0.18 : 0.05);
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(${(p.r + other.r) / 2}, ${(p.g + other.g) / 2}, ${(p.b + other.b) / 2}, ${distAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}

/* ── Navbar ── */
function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between border-b border-white/[0.06] backdrop-blur-2xl">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold tracking-tight text-white">
              KARYON <span className="text-cyan-400">LABS</span>
            </span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {["Products", "About", "Contact"].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="nav-link text-sm font-medium">
                {link}
              </a>
            ))}
            <Link
              href="#"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1.5 text-sm font-semibold text-white transition-all hover:brightness-110"
            >
              <span>Get Started</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </nav>

          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] md:hidden"
            aria-label="Menu"
          >
            <div className="space-y-1">
              <div className="h-px w-4 bg-white/40" />
              <div className="h-px w-4 bg-white/40" />
              <div className="h-px w-3 bg-white/40" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

/* ── Hero - Split Layout ── */
function Hero() {
  return (
    <section className="relative overflow-hidden pb-12 pt-28 md:pb-16 md:pt-40">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-orb-glow" />
      <div className="pointer-events-none absolute inset-0 bg-orb-glow-secondary" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Left: Editorial content */}
          <div className="order-2 md:order-1">
            {/* Badge */}
            <div className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.6)]" />
              <span className="text-xs font-medium text-cyan-300">Research OS v2.1.0</span>
            </div>

            {/* Headline - editorial style */}
            <h1 className="animate-fade-up-delay-1 mt-6 text-left text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Building the <br />
              <span className="gradient-text relative">
                future
                <span className="absolute -right-4 -top-2 text-2xl text-cyan-400/40 md:-right-6 md:-top-4 md:text-4xl">
                  ✦
                </span>
              </span>
              <br />
              <span className="text-white/40">of</span> digital
              <br />
              products
            </h1>

            {/* Description */}
            <p className="animate-fade-up-delay-2 mt-6 max-w-lg text-left text-base leading-relaxed text-[#b0b0c0] md:text-lg">
              Karyon Labs is a research & development studio that builds ambitious
              digital products. From esports platforms to AI tools — each venture
              deployed on its own subdomain.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up-delay-3 mt-8 flex flex-col items-start gap-4 sm:flex-row">
              <Link
                href="#products"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:brightness-110"
              >
                Explore Products
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="#about"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-medium text-[#b0b0c0] transition-all hover:border-white/20 hover:text-white"
              >
                <Globe className="h-4 w-4" />
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="animate-fade-up-delay-3 mt-10 flex items-center gap-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">5</div>
                <div className="text-xs font-medium text-[#707080]">Products</div>
              </div>
              <div className="h-8 w-px bg-white/[0.06]" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-xs font-medium text-[#707080]">Verticals</div>
              </div>
              <div className="h-8 w-px bg-white/[0.06]" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">∞</div>
                <div className="text-xs font-medium text-[#707080]">Ambition</div>
              </div>
            </div>
          </div>

          {/* Right: Visual showcase card */}
          <div className="order-1 md:order-2">
            <div className="relative mx-auto max-w-sm">
              {/* Decorative quote card */}
              <div className="animate-fade-up rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-transparent p-8 shadow-2xl shadow-cyan-500/5">
                <Quote className="mb-4 h-8 w-8 text-cyan-400/30" />
                <blockquote className="text-lg font-medium leading-relaxed text-white/80">
                  &ldquo;We don't just build code. We ship ventures. Each product is an
                  independent brand with its own identity, domain, and roadmap.&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-[10px] font-bold text-white">
                    KL
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Karyon Labs</div>
                    <div className="text-xs text-[#707080]">R&D Studio</div>
                  </div>
                </div>
              </div>

              {/* Mini stats row */}
              <div className="animate-fade-up-delay-2 mt-4 grid grid-cols-3 gap-3">
                {[
                  { label: "Live", value: "1", color: "text-cyan-400" },
                  { label: "In Dev", value: "2", color: "text-purple-400" },
                  { label: "Planned", value: "2", color: "text-emerald-400" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3 text-center"
                  >
                    <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-[10px] font-medium text-[#707080]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── What We Do - Visual Timeline ── */
function WhatWeDo() {
  return (
    <section id="about" className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
      <div className="text-center">
        <span className="tag-chip">
          <Zap className="h-3 w-3 text-cyan-400" />
          What We Do
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
          From idea to deployment
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-[#707080]">
          We identify opportunities, build fast, and iterate across the full product lifecycle.
        </p>
      </div>

      {/* Visual pipeline - horizontal flow on desktop */}
      <div className="mt-14">
        {/* Desktop: horizontal connected flow */}
        <div className="hidden items-start gap-0 md:flex">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const isLast = idx === features.length - 1;
            return (
              <div key={feature.title} className="flex-1">
                <div className="relative px-6">
                  {/* Step number */}
                  <div className="mb-4 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent ring-1 ring-white/[0.08]">
                      <Icon className="h-6 w-6 text-cyan-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center transition-all hover:border-white/[0.14] hover:bg-white/[0.04]">
                    <div className="mb-2 inline-flex items-center justify-center rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-cyan-400">
                      0{idx + 1}
                    </div>
                    <h3 className="mt-2 text-base font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#b0b0c0]">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Connector arrow */}
                {!isLast && (
                  <div className="flex items-center justify-center py-4">
                    <div className="flex items-center gap-1">
                      <div className="h-px w-8 bg-gradient-to-r from-cyan-500/40 to-purple-500/40" />
                      <ChevronRight className="h-4 w-4 text-white/20" />
                      <div className="h-px w-8 bg-gradient-to-r from-purple-500/40 to-transparent" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical stacked */}
        <div className="relative md:hidden">
          {/* Vertical line */}
          <div className="absolute left-7 top-0 h-full w-px bg-gradient-to-b from-cyan-500/30 via-purple-500/30 to-transparent" />

          <div className="space-y-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="relative pl-16">
                  {/* Step dot */}
                  <div className="absolute left-4 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 ring-1 ring-cyan-500/30">
                    <div className="h-2 w-2 rounded-full bg-cyan-400" />
                  </div>
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10">
                        <Icon className="h-4 w-4 text-cyan-400" />
                      </div>
                      <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-400">
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-white">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#b0b0c0]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Project Card ── */
function ProjectCard({ project }: { project: Project }) {
  const Icon = project.icon;

  return (
    <article
      id={project.id}
      className="card-base group relative flex flex-col overflow-hidden p-7 md:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
      {project.neon && <div className="pointer-events-none absolute inset-0 neon-glow" />}

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${project.gradient}/20 ring-1 ring-white/10`}
            >
              <Icon className={`h-5 w-5 ${project.accentColor}`} />
            </div>
            <div>
              <h3 className="text-base font-semibold tracking-tight text-white">
                {project.title}
              </h3>
              <p className="text-xs text-[#707080]">{project.tagline}</p>
            </div>
          </div>

          {project.badge && (
            <div className="flex items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1.5 text-xs font-medium ring-1 ring-white/[0.08]">
              <span className={`live-dot inline-block ${project.badge.color}`} />
              <span className={project.badge.color}>{project.badge.label}</span>
            </div>
          )}
          {project.comingSoon && <span className="coming-soon">Coming Soon</span>}
        </div>

        <div className="mt-5 flex-1">
          {project.id === "clipvault" && (
            <div className="rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 p-4 ring-1 ring-white/5">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 rounded-xl bg-white/[0.03] px-3 py-2 ring-1 ring-white/5">
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-cyan-400/60" />
                  <span className="text-xs font-medium text-[#b0b0c0]">clipvault.karyonlabs.com</span>
                </div>
                <div className="flex gap-2">
                  <span className="rounded-md bg-blue-500/10 px-2 py-1 text-[10px] font-medium text-blue-400">marketing</span>
                  <span className="rounded-md bg-cyan-500/10 px-2 py-1 text-[10px] font-medium text-cyan-400">pipeline</span>
                </div>
              </div>
            </div>
          )}

          {project.id === "ky-esports" && (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/10 to-rose-500/10 ring-1 ring-white/5">
              <div className="flex items-center justify-center gap-4 px-4 py-8 md:py-10">
                <Gamepad2 className="h-8 w-8 text-orange-400/60" />
                <span className="text-2xl font-black tracking-tight text-orange-400/40">FREE FIRE</span>
                <Gamepad2 className="h-8 w-8 text-orange-400/60" />
              </div>
            </div>
          )}

          {project.id === "mlbb-stratos" && (
            <div className="grid grid-cols-3 gap-2 rounded-2xl bg-white/[0.02] p-4 ring-1 ring-white/5">
              {["Win Rate", "KDA", "CS"].map((label) => (
                <div key={label} className="text-center">
                  <div className="mx-auto mb-1 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 ring-1 ring-purple-500/20">
                    <Crosshair className="h-4 w-4 text-purple-400/60" />
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/5">
                    <div
                      className={`h-full rounded-full ${
                        label === "Win Rate" ? "w-3/4 bg-purple-500/40" : label === "KDA" ? "w-1/2 bg-blue-500/40" : "w-2/3 bg-cyan-500/40"
                      }`}
                    />
                  </div>
                  <span className="mt-1 block text-[10px] font-medium text-[#707080]">{label}</span>
                </div>
              ))}
            </div>
          )}

          {project.id === "karyon-forge" && (
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 p-4 ring-1 ring-white/5">
              <div className="flex items-center gap-3">
                <Terminal className="h-4 w-4 text-emerald-400/60" />
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-md bg-emerald-500/15 px-2 py-1 text-[11px] font-medium text-emerald-400/80">bots</span>
                  <span className="rounded-md bg-blue-500/15 px-2 py-1 text-[11px] font-medium text-blue-400/80">apps</span>
                  <span className="rounded-md bg-teal-500/15 px-2 py-1 text-[11px] font-medium text-teal-400/80">api</span>
                </div>
              </div>
            </div>
          )}

          {project.id === "karyon-review" && (
            <div className="space-y-2 rounded-2xl bg-white/[0.02] p-4 ring-1 ring-white/5">
              {[["GPT-5", 4], ["Claude 4", 5], ["Gemini 3", 3]].map(([tool, rating]) => (
                <div
                  key={tool as string}
                  className="flex items-center justify-between rounded-xl bg-white/[0.02] px-3 py-2 ring-1 ring-white/5"
                >
                  <span className="text-xs font-medium text-[#b0b0c0]">{tool as string}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={`h-1.5 w-1.5 rounded-full ${i < (rating as number) ? "bg-amber-400/60" : "bg-white/10"}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="mt-3 text-sm leading-relaxed text-[#808090]">{project.description}</p>
        </div>

        <div className="relative z-20 mt-auto flex items-center gap-1.5 pt-4 text-xs font-medium text-[#606070] transition-colors group-hover:text-[#b0b0c0]">
          <span>Explore Project</span>
          <ExternalLink className="h-3 w-3" />
        </div>
      </div>
    </article>
  );
}

/* ── Projects section ── */
function ProjectsSection() {
  return (
    <section id="products" className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
      <div className="mb-10 text-center">
        <span className="tag-chip">
          <Rocket className="h-3 w-3 text-cyan-400" />
          Our Products
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Venture Portfolio
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-[#707080]">
          Each product is a fully independent venture with its own brand, domain, and roadmap.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-[auto_auto_auto]">
        <div className="md:col-span-4 md:row-span-1">
          <ProjectCard project={projects[0]} />
        </div>
        <div className="md:col-span-2 md:row-span-1">
          <ProjectCard project={projects[1]} />
        </div>
        <div className="md:col-span-2 md:row-span-1">
          <ProjectCard project={projects[2]} />
        </div>
        <div className="md:col-span-2 md:row-span-1">
          <ProjectCard project={projects[3]} />
        </div>
        <div className="md:col-span-2 md:row-span-1">
          <ProjectCard project={projects[4]} />
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="mx-auto mt-20 max-w-7xl border-t border-white/[0.06] px-4 py-8 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <span className="text-sm font-semibold text-white">
            KARYON <span className="text-cyan-400">LABS</span>
          </span>
        </div>
        <p className="text-xs text-[#606070]">
          © {new Date().getFullYear()} Karyon Labs · All ventures deployed to subdomains
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-xs text-[#606070] transition-colors hover:text-white">
            Twitter
          </a>
          <a href="#" className="text-xs text-[#606070] transition-colors hover:text-white">
            GitHub
          </a>
          <a href="#" className="text-xs text-[#606070] transition-colors hover:text-white">
            Discord
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ── Dock ── */
function Dock() {
  return (
    <nav className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-black/70 px-3 py-2 shadow-2xl shadow-black/60 backdrop-blur-3xl">
        {dockItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={item.href}
              className="dock-item flex h-10 w-10 items-center justify-center rounded-full text-[#707080] transition-colors hover:text-white/90"
              aria-label={item.label}
            >
              <Icon className="h-4 w-4" />
            </Link>
          );
        })}
        <div className="mx-1 h-6 w-px bg-white/[0.08]" />
        <Link
          href="#"
          className="dock-item flex h-10 w-10 items-center justify-center rounded-full text-cyan-400/60 transition-colors hover:text-cyan-400"
          aria-label="Overview"
        >
          <Sparkles className="h-4 w-4" />
        </Link>
      </div>
    </nav>
  );
}

/* ── Page ── */
export default function Home() {
  return (
    <div className="relative min-h-dvh bg-[#07070d]">
      {/* Fixed background */}
      <div className="pointer-events-none fixed inset-0 bg-grid-pattern" />
      <ParticleBackground />

      {/* Custom cursor */}
      <CursorGlow />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <WhatWeDo />
        <ProjectsSection />
        <Footer />
        <Dock />
      </div>
    </div>
  );
}