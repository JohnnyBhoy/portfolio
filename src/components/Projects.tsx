import { useEffect, useRef } from 'react';
import { ExternalLink, Star, Globe, ArrowUpRight } from 'lucide-react';
import { projects } from '../data/portfolio';

const colorMap: Record<string, { border: string; text: string; bg: string; badge: string }> = {
  cyan:   { border: 'border-ai-cyan/30',   text: 'text-ai-cyan',   bg: 'bg-ai-cyan/10',   badge: 'bg-ai-cyan/10 text-ai-cyan border-ai-cyan/20' },
  purple: { border: 'border-ai-purple/30', text: 'text-ai-purple', bg: 'bg-ai-purple/10', badge: 'bg-ai-purple/10 text-ai-purple border-ai-purple/20' },
  blue:   { border: 'border-ai-blue/30',   text: 'text-ai-blue',   bg: 'bg-ai-blue/10',   badge: 'bg-ai-blue/10 text-ai-blue border-ai-blue/20' },
};

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible'); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const featured = projects.filter(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div ref={ref} className="max-w-5xl mx-auto section-reveal">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-mono text-sm text-ai-blue mb-3 tracking-widest uppercase">
            &lt; Projects /&gt;
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Notable <span className="text-gradient-cyan">Work</span>
          </h2>
          <div className="mt-3 w-16 h-px bg-gradient-to-r from-transparent via-ai-blue to-transparent mx-auto" />
          <p className="text-slate-400 text-sm mt-4 max-w-lg mx-auto">
            Production applications built and deployed for real users.
          </p>
        </div>

        {/* Featured projects */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {featured.map((project) => {
            const c = colorMap[project.color];
            return (
              <div
                key={project.name}
                className={`glass-card rounded-2xl p-6 border ${c.border} group hover:scale-[1.02] transition-all duration-300 hover:shadow-xl relative overflow-hidden`}
              >
                {/* Glow background */}
                <div className={`absolute inset-0 ${c.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
                        <Globe size={18} className={c.text} />
                      </div>
                      <div>
                        <h3 className="text-white font-bold">{project.name}</h3>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star size={10} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-xs text-slate-500">Featured</span>
                        </div>
                      </div>
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg ${c.bg} border ${c.border} ${c.text} hover:scale-110 transition-transform`}
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className={`px-2 py-1 text-xs font-mono rounded-md border ${c.badge}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* URL */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-4 flex items-center gap-1.5 text-xs font-mono ${c.text} hover:underline`}
                  >
                    <ExternalLink size={11} />
                    {project.url.replace('https://', '').replace('http://', '')}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Other projects */}
        {rest.map((project) => {
          const c = colorMap[project.color];
          return (
            <div
              key={project.name}
              className={`glass-card rounded-2xl p-6 border ${c.border} group hover:border-opacity-60 transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-4 mb-6`}
            >
              <div className={`w-12 h-12 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center flex-shrink-0`}>
                <Globe size={20} className={c.text} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-white font-bold">{project.name}</h3>
                    <p className="text-slate-400 text-sm mt-1">{project.description}</p>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${c.text} hover:scale-110 transition-transform flex-shrink-0`}
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.tags.map(tag => (
                    <span key={tag} className={`px-2 py-0.5 text-xs font-mono rounded border ${c.badge}`}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* GitHub CTA */}
        <div className="mt-8 text-center">
          <a
            href="https://github.com/JohnnyBhoy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-ai-border text-slate-300 hover:border-ai-cyan/50 hover:text-ai-cyan hover:bg-ai-cyan/5 transition-all duration-200 text-sm font-medium"
          >
            <ExternalLink size={15} />
            View more projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
