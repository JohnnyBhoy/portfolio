import { useEffect, useRef } from 'react';
import { Briefcase, CheckCircle } from 'lucide-react';
import { experiences } from '../data/portfolio';

const colorMap: Record<string, { border: string; text: string; bg: string; dot: string }> = {
  cyan:   { border: 'border-ai-cyan/30',   text: 'text-ai-cyan',   bg: 'bg-ai-cyan/10',   dot: 'bg-ai-cyan' },
  purple: { border: 'border-ai-purple/30', text: 'text-ai-purple', bg: 'bg-ai-purple/10', dot: 'bg-ai-purple' },
  blue:   { border: 'border-ai-blue/30',   text: 'text-ai-blue',   bg: 'bg-ai-blue/10',   dot: 'bg-ai-blue' },
};

export default function Experience() {
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
    <section id="experience" className="py-24 px-6 relative">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div ref={ref} className="max-w-4xl mx-auto section-reveal">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-mono text-sm text-ai-purple mb-3 tracking-widest uppercase">
            &lt; Experience /&gt;
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Work <span className="text-gradient-purple">History</span>
          </h2>
          <div className="mt-3 w-16 h-px bg-gradient-to-r from-transparent via-ai-purple to-transparent mx-auto" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 md:left-8 top-0 bottom-0 w-px timeline-line" />

          <div className="space-y-10">
            {experiences.map((exp, i) => {
              const c = colorMap[exp.color];
              return (
                <div key={i} className="relative flex gap-6 md:gap-10">
                  {/* Timeline dot */}
                  <div className="relative flex-shrink-0 flex flex-col items-center">
                    <div className={`w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center z-10 relative`}>
                      <Briefcase size={16} className={c.text} />
                    </div>
                    <div className={`absolute top-5 md:top-8 w-2 h-2 rounded-full ${c.dot} left-4 md:left-7 z-20`} />
                  </div>

                  {/* Content */}
                  <div className={`flex-1 glass-card rounded-2xl p-6 border ${c.border} hover:shadow-lg transition-all duration-300 mb-2`}>
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-white font-bold text-lg leading-tight">{exp.title}</h3>
                        <p className={`font-semibold text-sm mt-1 ${c.text}`}>{exp.company}</p>
                        <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-mono rounded-full ${c.bg} ${c.text} border ${c.border}`}>
                          {exp.type}
                        </span>
                      </div>
                      <div className={`flex items-center gap-1.5 text-xs font-mono ${c.text} bg-transparent px-3 py-1.5 rounded-lg border ${c.border} h-fit whitespace-nowrap`}>
                        {exp.period}
                      </div>
                    </div>

                    {/* Bullets */}
                    <ul className="space-y-2">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-slate-400 text-sm leading-relaxed">
                          <CheckCircle size={14} className={`${c.text} flex-shrink-0 mt-0.5`} />
                          {b}
                        </li>
                      ))}
                    </ul>
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
