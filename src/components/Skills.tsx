import { useEffect, useRef } from 'react';
import { Monitor, Server, Settings, Database } from 'lucide-react';
import {
  SiReact, SiTypescript, SiVuedotjs, SiTailwindcss, SiHtml5,
  SiRedux, SiJquery, SiBootstrap, SiJest,
  SiNodedotjs, SiExpress, SiPhp, SiLaravel, SiDotnet,
  SiGit, SiDocker, SiFirebase, SiNginx, SiVite, SiWebpack,
  SiMysql, SiPostgresql, SiMongodb, SiRedis, SiElasticsearch,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { TbApi } from 'react-icons/tb';
import { VscGitMerge } from 'react-icons/vsc';
import { DiMsqlServer } from 'react-icons/di';

const iconMap: Record<string, React.ReactNode> = {
  react: <SiReact />,
  typescript: <SiTypescript />,
  vue: <SiVuedotjs />,
  tailwind: <SiTailwindcss />,
  html: <SiHtml5 />,
  css: <SiHtml5 />,
  redux: <SiRedux />,
  zustand: <VscGitMerge />,
  jquery: <SiJquery />,
  bootstrap: <SiBootstrap />,
  jest: <SiJest />,
  mobile: <SiReact />,
  node: <SiNodedotjs />,
  express: <SiExpress />,
  php: <SiPhp />,
  laravel: <SiLaravel />,
  dotnet: <SiDotnet />,
  api: <TbApi />,
  git: <SiGit />,
  docker: <SiDocker />,
  aws: <FaAws />,
  firebase: <SiFirebase />,
  nginx: <SiNginx />,
  cicd: <VscGitMerge />,
  vite: <SiVite />,
  webpack: <SiWebpack />,
  mysql: <SiMysql />,
  postgres: <SiPostgresql />,
  mongo: <SiMongodb />,
  sqlserver: <DiMsqlServer />,
  redis: <SiRedis />,
  elastic: <SiElasticsearch />,
};

const categoryIcons: Record<string, React.ReactNode> = {
  monitor: <Monitor size={18} />,
  server: <Server size={18} />,
  tool: <Settings size={18} />,
  database: <Database size={18} />,
};

const colorMap: Record<string, { border: string; text: string; bg: string; glow: string }> = {
  cyan:   { border: 'border-ai-cyan/20',   text: 'text-ai-cyan',   bg: 'bg-ai-cyan/10',   glow: 'hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]' },
  purple: { border: 'border-ai-purple/20', text: 'text-ai-purple', bg: 'bg-ai-purple/10', glow: 'hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]' },
  blue:   { border: 'border-ai-blue/20',   text: 'text-ai-blue',   bg: 'bg-ai-blue/10',   glow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]' },
  green:  { border: 'border-ai-green/20',  text: 'text-ai-green',  bg: 'bg-ai-green/10',  glow: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]' },
};

import { skillCategories } from '../data/portfolio';

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible'); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ai-cyan/2 to-transparent pointer-events-none" />

      <div ref={ref} className="max-w-5xl mx-auto section-reveal">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-mono text-sm text-ai-cyan mb-3 tracking-widest uppercase">
            &lt; Skills /&gt;
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Technical <span className="text-gradient-cyan">Arsenal</span>
          </h2>
          <div className="mt-3 w-16 h-px bg-gradient-to-r from-transparent via-ai-cyan to-transparent mx-auto" />
          <p className="text-slate-400 text-sm mt-4 max-w-lg mx-auto">
            A comprehensive toolkit built over 6+ years across diverse projects and industries.
          </p>
        </div>

        {/* Skill categories */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((cat) => {
            const c = colorMap[cat.color];
            return (
              <div
                key={cat.title}
                className={`glass-card rounded-2xl p-6 border ${c.border} ${c.glow} transition-all duration-300`}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center ${c.text}`}>
                    {categoryIcons[cat.icon]}
                  </div>
                  <h3 className="text-white font-semibold">{cat.title}</h3>
                </div>

                {/* Skills grid */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`skill-badge flex items-center gap-2 px-3 py-2 rounded-lg ${c.bg} border ${c.border} text-xs font-medium text-slate-300 cursor-default`}
                    >
                      <span className={`text-sm ${c.text}`}>
                        {iconMap[skill.icon] ?? <span className="w-3 h-3 rounded-sm bg-current inline-block" />}
                      </span>
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional skills row */}
        <div className="mt-6 glass-card rounded-2xl p-6 border border-ai-border">
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest font-mono">Also Proficient In</h3>
          <div className="flex flex-wrap gap-2">
            {['WordPress', 'Agile/Scrum', 'Tableau', 'OWASP Basics', 'TLS/SSL', 'Web Accessibility', 'UI/UX', 'Code Review', 'Elasticsearch', 'SQLite', 'MariaDB'].map(skill => (
              <span key={skill} className="px-3 py-1.5 text-xs font-mono rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
