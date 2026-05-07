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
} from "lucide-react";
import Link from "next/link";

/* ── Project types ── */
type Project = {
  id: string;
  title: string;
  tagline: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  badge?: { label: string; color: string };
  neon?: boolean;
  comingSoon?: boolean;
  wide?: boolean;
};

/* ── Project data ── */
const projects: Project[] = [
  {
    id: "clipvault",
    title: "ClipVault",
    tagline: "Clip management & marketing",
    href: "https://clipvault.karyonlabs.com",
    icon: Clapperboard,
    accent: "from-blue-500/20 to-cyan-500/10",
    badge: { label: "LIVE", color: "text-red-400" },
    wide: true,
  },
  {
    id: "ky-esports",
    title: "KY eSports",
    tagline: "Competitive gaming hub",
    href: "#ky-esports",
    icon: Gamepad2,
    accent: "from-orange-500/20 to-rose-500/10",
    neon: true,
  },
  {
    id: "mlbb-stratos",
    title: "MLBB Stratos",
    tagline: "Advanced strategy analytics",
    href: "#mlbb-stratos",
    icon: Crosshair,
    accent: "from-purple-500/20 to-blue-500/10",
    comingSoon: true,
  },
  {
    id: "karyon-forge",
    title: "Karyon Forge",
    tagline: "Bots, apps & infrastructure",
    href: "#karyon-forge",
    icon: Hammer,
    accent: "from-emerald-500/20 to-teal-500/10",
  },
  {
    id: "karyon-review",
    title: "Karyon Review",
    tagline: "AI tool curation & reviews",
    href: "#karyon-review",
    icon: Star,
    accent: "from-amber-500/20 to-yellow-500/10",
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

/* ── Card component ── */
function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const Icon = project.icon;

  return (
    <article
      id={project.id}
      className="card-base group relative flex flex-col overflow-hidden p-7 md:p-8"
    >
      {/* Gradient accent overlay */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.accent} opacity-60`}
      />

      {/* Neon glow for KY eSports */}
      {project.neon && (
        <div className="pointer-events-none absolute inset-0 neon-glow" />
      )}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
              <Icon className="h-5 w-5 text-white/80" />
            </div>
            <div>
              <h3 className="text-base font-semibold tracking-tight text-white/90">
                {project.title}
              </h3>
              <p className="text-xs text-white/40">{project.tagline}</p>
            </div>
          </div>

          {/* Badge */}
          {project.badge && (
            <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium ring-1 ring-white/10">
              <span className={`live-dot inline-block ${project.badge.color}`} />
              <span className={project.badge.color}>{project.badge.label}</span>
            </div>
          )}
          {project.comingSoon && (
            <span className="coming-soon">Coming Soon</span>
          )}
        </div>

        {/* Card-specific body */}
        {project.id === "clipvault" && (
          <div className="mt-5 flex-1">
            <div className="flex items-center gap-2 rounded-2xl bg-white/[0.02] px-4 py-3 ring-1 ring-white/5">
              <div className="flex-1">
                <div className="h-2 w-3/4 rounded-full bg-white/5" />
                <div className="mt-2 h-2 w-1/2 rounded-full bg-white/5" />
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-white/30" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/40">
              Marketing subdomain · Content pipeline · Automated clips
            </p>
          </div>
        )}

        {project.id === "ky-esports" && (
          <div className="mt-5 flex-1">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/10 to-rose-500/10 ring-1 ring-white/5">
              <div className="flex items-center justify-center gap-4 px-4 py-8 md:py-10">
                <Gamepad2 className="h-8 w-8 text-orange-400/60" />
                <span className="text-2xl font-black tracking-tight text-orange-400/30">
                  FREE FIRE
                </span>
                <Gamepad2 className="h-8 w-8 text-orange-400/60" />
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/40">
              Tournament brackets · Team rosters · Live match tracking
            </p>
          </div>
        )}

        {project.id === "mlbb-stratos" && (
          <div className="mt-5 flex-1">
            <div className="grid grid-cols-3 gap-2 rounded-2xl bg-white/[0.02] p-4 ring-1 ring-white/5">
              {["Win Rate", "KDA", "CS"].map((label) => (
                <div key={label} className="text-center">
                  <div className="mx-auto mb-1 h-10 w-10 rounded-xl bg-purple-500/10 ring-1 ring-purple-500/20" />
                  <div className="h-1.5 w-full rounded-full bg-white/5" />
                  <span className="mt-1 block text-[10px] text-white/30">
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/40">
              Hero stats · Meta analysis · Draft simulator
            </p>
          </div>
        )}

        {project.id === "karyon-forge" && (
          <div className="mt-5 flex-1">
            <div className="flex items-center gap-3 rounded-2xl bg-white/[0.02] px-4 py-3 ring-1 ring-white/5">
              <Terminal className="h-4 w-4 text-emerald-400/60" />
              <div className="flex gap-1.5">
                <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-[11px] font-medium text-emerald-400/70">
                  bots
                </span>
                <span className="rounded-md bg-blue-500/10 px-2 py-1 text-[11px] font-medium text-blue-400/70">
                  apps
                </span>
                <span className="rounded-md bg-teal-500/10 px-2 py-1 text-[11px] font-medium text-teal-400/70">
                  api
                </span>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/40">
              Discord bots · Web apps · API microservices
            </p>
          </div>
        )}

        {project.id === "karyon-review" && (
          <div className="mt-5 flex-1">
            <div className="space-y-2 rounded-2xl bg-white/[0.02] p-4 ring-1 ring-white/5">
              {["GPT-5", "Claude 4", "Gemini 3"].map((tool) => (
                <div
                  key={tool}
                  className="flex items-center justify-between rounded-xl bg-white/[0.02] px-3 py-2 ring-1 ring-white/5"
                >
                  <span className="text-xs font-medium text-white/50">
                    {tool}
                  </span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 w-1.5 rounded-full ${
                          i < 4 ? "bg-amber-400/60" : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/40">
              Curated rankings · Feature comparisons · Pricing insights
            </p>
          </div>
        )}

        {/* Hover link indicator */}
        <div className="relative z-20 mt-auto flex items-center gap-1.5 pt-4 text-xs font-medium text-white/20 transition-colors group-hover:text-white/50">
          <span>Explore project</span>
          <ExternalLink className="h-3 w-3" />
        </div>
      </div>
    </article>
  );
}

/* ── Page ── */
export default function Home() {
  return (
    <div className="relative min-h-dvh bg-[#121212] bg-grid-pattern">
      {/* Subtle radial glow */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(79,195,247,0.06),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-32 pt-12 sm:px-6 md:pt-20">
        {/* ── Hero ── */}
        <header className="mb-12 text-center md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 text-xs text-white/40">
            <Zap className="h-3 w-3 text-cyan-400/60" />
            <span>Project Dock</span>
          </div>
          <h1 className="mt-6 text-5xl font-black tracking-tight text-white md:text-7xl">
            KARYON{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent neon-text">
              LABS
            </span>
          </h1>
          <p className="mt-3 text-sm font-medium tracking-widest text-white/30 uppercase">
            Research OS <span className="text-cyan-400/60">v2.1.0</span>
          </p>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </header>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-[auto_auto_auto]">
          {/* ClipVault — wide, spans 4 cols */}
          <div className="md:col-span-4 md:row-span-1">
            <ProjectCard project={projects[0]} />
          </div>

          {/* KY eSports — right side, spans 2 cols */}
          <div className="md:col-span-2 md:row-span-1">
            <ProjectCard project={projects[1]} />
          </div>

          {/* MLBB Stratos — left, 2 cols */}
          <div className="md:col-span-2 md:row-span-1">
            <ProjectCard project={projects[2]} />
          </div>

          {/* Karyon Forge — middle, 2 cols */}
          <div className="md:col-span-2 md:row-span-1">
            <ProjectCard project={projects[3]} />
          </div>

          {/* Karyon Review — right, 2 cols */}
          <div className="md:col-span-2 md:row-span-1">
            <ProjectCard project={projects[4]} />
          </div>
        </div>

        {/* ── Bottom tagline ── */}
        <footer className="mt-14 text-center">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} Karyon Labs ·{" "}
            <span className="text-white/30">All ventures deployed to subdomains</span>
          </p>
        </footer>
      </div>

      {/* ── Fixed Floating Dock ── */}
      <nav className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-2 shadow-2xl shadow-black/50 backdrop-blur-2xl">
          {dockItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="dock-item flex h-10 w-10 items-center justify-center rounded-full text-white/40 transition-colors hover:text-white/90"
                aria-label={item.label}
              >
                <Icon className="h-4 w-4" />
              </Link>
            );
          })}

          {/* Separator */}
          <div className="mx-1 h-6 w-px bg-white/10" />

          {/* Meta / sparkle icon */}
          <Link
            href="#"
            className="dock-item flex h-10 w-10 items-center justify-center rounded-full text-cyan-400/60 transition-colors hover:text-cyan-400"
            aria-label="Overview"
          >
            <Sparkles className="h-4 w-4" />
          </Link>
        </div>
      </nav>
    </div>
  );
}