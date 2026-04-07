import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Phone,
  ChevronDown,
  Cpu,
  Zap,
  Globe,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { personalInfo } from "../data/portfolio";

const roles = [
  "Full-Stack Developer",
  "React / TypeScript Expert",
  "Node.js & PHP Engineer",
  "UI/UX Enthusiast",
  "Cloud & DevOps Practitioner",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          60,
        );
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
      } else {
        timeout = setTimeout(() => {
          setRoleIndex((i) => (i + 1) % roles.length);
          setTyping(true);
        }, 0);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      alpha: number;
    }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6,182,212,${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6,182,212,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Radial glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ai-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ai-purple/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ai-blue/3 rounded-full blur-3xl pointer-events-none" />

      {/* Floating badges */}
      <div
        className="absolute top-1/4 right-10 hidden lg:flex flex-col gap-3 animate-float"
        style={{ animationDelay: "1s" }}
      >
        {[
          { icon: <Cpu size={14} />, label: "Clean Code" },
          { icon: <Zap size={14} />, label: "Performance" },
          { icon: <Globe size={14} />, label: "Full-Stack" },
        ].map((b) => (
          <div
            key={b.label}
            className="flex items-center gap-2 px-3 py-2 glass-card rounded-lg text-xs text-slate-400 border border-ai-border"
          >
            <span className="text-ai-cyan">{b.icon}</span>
            {b.label}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Status badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ai-cyan/20 bg-ai-cyan/5 text-sm text-ai-cyan mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-ai-green animate-pulse" />
            <span className="font-mono">Available for new opportunities</span>
          </div>
        </div>

        {/* Name */}
        <h1
          className="text-5xl md:text-7xl font-bold mb-4 leading-tight animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="text-white">Hi, I'm </span>
          <span className="text-gradient-main">Johnny</span>
        </h1>
        <p
          className="text-lg md:text-xl text-slate-400 font-light mb-2 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Antiojo Jr.
        </p>

        {/* Typewriter */}
        <div
          className="h-10 flex items-center justify-center mb-8 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <span className="text-xl md:text-2xl font-mono font-medium text-ai-cyan">
            {displayed}
            <span className="typing-cursor" />
          </span>
        </div>

        {/* Stats */}
        <div
          className="flex items-center justify-center gap-8 mb-10 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          {[
            { value: "6+", label: "Years Exp." },
            { value: "3", label: "Companies" },
            { value: "10+", label: "Projects" },
            { value: "4", label: "Tech Stacks" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-gradient-cyan">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-ai-cyan to-ai-blue text-white font-semibold text-sm hover:opacity-90 hover:scale-105 transition-all duration-200 glow-cyan"
          >
            View Projects
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 rounded-xl border border-ai-border text-slate-300 font-semibold text-sm hover:border-ai-cyan/50 hover:text-ai-cyan hover:bg-ai-cyan/5 transition-all duration-200"
          >
            About Me
          </a>
        </div>

        {/* Contact links */}
        <div
          className="flex items-center justify-center gap-4 animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          {[
            {
              icon: <Mail size={16} />,
              label: personalInfo.email,
              href: `mailto:${personalInfo.email}`,
            },
            {
              icon: <Phone size={16} />,
              label: personalInfo.phone,
              href: `tel:${personalInfo.phone}`,
            },
            {
              icon: <FaGithub size={16} />,
              label: "GitHub",
              href: personalInfo.github,
            },
            {
              icon: <FaLinkedin size={16} />,
              label: "LinkedIn",
              href: personalInfo.linkedin,
            },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-500 hover:text-ai-cyan transition-colors text-sm"
            >
              {link.icon}
              <span className="hidden sm:inline">{link.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown size={20} className="text-slate-600" />
      </div>
    </section>
  );
}
