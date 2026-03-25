import { useEffect, useRef } from 'react';
import { User, Target, Lightbulb, Shield } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

const highlights = [
  { icon: <Target size={18} />, title: 'Results-Driven', desc: '6+ years delivering scalable, production-grade applications' },
  { icon: <Lightbulb size={18} />, title: 'Clean Code Advocate', desc: 'SOLID, DRY, KISS, YAGNI principles in every project' },
  { icon: <Shield size={18} />, title: 'Security-Focused', desc: 'OWASP basics, TLS/SSL, input validation, secure APIs' },
  { icon: <User size={18} />, title: 'Full-Cycle Dev', desc: 'Architecture → development → testing → deployment' },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible'); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ai-purple/3 to-transparent pointer-events-none" />

      <div ref={ref} className="max-w-5xl mx-auto section-reveal">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block font-mono text-sm text-ai-cyan mb-3 tracking-widest uppercase">
            &lt; About /&gt;
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Professional <span className="text-gradient-cyan">Summary</span>
          </h2>
          <div className="mt-3 w-16 h-px bg-gradient-to-r from-transparent via-ai-cyan to-transparent mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Summary text */}
          <div className="space-y-5">
            <p className="text-slate-300 leading-relaxed text-base">
              {personalInfo.summary}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {['React', 'TypeScript', 'Node.js', 'PHP', 'C# .NET', 'TailwindCSS', 'AWS', 'Docker'].map(tag => (
                <span key={tag} className="px-3 py-1 text-xs font-mono rounded-full bg-ai-cyan/10 text-ai-cyan border border-ai-cyan/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Highlight cards */}
          <div className="grid grid-cols-1 gap-4">
            {highlights.map((h, i) => (
              <div
                key={h.title}
                className="glass-card rounded-xl p-4 flex items-start gap-4 hover:border-ai-cyan/30 transition-all duration-200 group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-lg bg-ai-cyan/10 flex items-center justify-center text-ai-cyan flex-shrink-0 group-hover:bg-ai-cyan/20 transition-colors">
                  {h.icon}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">{h.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
