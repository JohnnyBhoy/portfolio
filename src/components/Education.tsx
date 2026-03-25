import { useEffect, useRef } from 'react';
import { GraduationCap, Award, Brain, ExternalLink } from 'lucide-react';
import { education, certifications } from '../data/portfolio';

export default function Education() {
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
    <section id="education" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ai-purple/3 to-transparent pointer-events-none" />

      <div ref={ref} className="max-w-5xl mx-auto section-reveal">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-mono text-sm text-ai-purple mb-3 tracking-widest uppercase">
            &lt; Education /&gt;
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Education & <span className="text-gradient-purple">Certifications</span>
          </h2>
          <div className="mt-3 w-16 h-px bg-gradient-to-r from-transparent via-ai-purple to-transparent mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Education */}
          <div>
            <h3 className="text-slate-400 text-xs uppercase font-mono tracking-widest mb-6 flex items-center gap-2">
              <GraduationCap size={14} className="text-ai-cyan" />
              Academic Background
            </h3>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="glass-card rounded-2xl p-5 border border-ai-cyan/20 hover:border-ai-cyan/40 transition-all duration-200 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-ai-cyan/10 border border-ai-cyan/20 flex items-center justify-center flex-shrink-0 group-hover:bg-ai-cyan/20 transition-colors">
                      {edu.icon === 'brain' ? (
                        <Brain size={18} className="text-ai-cyan" />
                      ) : (
                        <GraduationCap size={18} className="text-ai-cyan" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold leading-tight">{edu.degree}</h4>
                      <p className="text-ai-cyan text-sm mt-1 font-medium">{edu.school}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-slate-500 text-xs">{edu.location}</span>
                        <span className="text-xs font-mono text-ai-cyan/70 bg-ai-cyan/10 px-2 py-0.5 rounded-full">
                          {edu.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-slate-400 text-xs uppercase font-mono tracking-widest mb-6 flex items-center gap-2">
              <Award size={14} className="text-ai-purple" />
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <a
                  key={i}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`glass-card rounded-2xl p-5 border ${cert.color === 'cyan' ? 'border-ai-cyan/20 hover:border-ai-cyan/40' : 'border-ai-purple/20 hover:border-ai-purple/40'} transition-all duration-200 group flex items-start gap-4 block`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors
                    ${cert.color === 'cyan' ? 'bg-ai-cyan/10 border border-ai-cyan/20 group-hover:bg-ai-cyan/20' : 'bg-ai-purple/10 border border-ai-purple/20 group-hover:bg-ai-purple/20'}`}>
                    <Award size={18} className={cert.color === 'cyan' ? 'text-ai-cyan' : 'text-ai-purple'} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-white font-semibold text-sm leading-tight">{cert.name}</h4>
                      <ExternalLink size={13} className={`flex-shrink-0 mt-0.5 ${cert.color === 'cyan' ? 'text-ai-cyan' : 'text-ai-purple'} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    </div>
                    <p className={`text-sm mt-1 font-medium ${cert.color === 'cyan' ? 'text-ai-cyan' : 'text-ai-purple'}`}>
                      {cert.issuer}
                    </p>
                    {cert.year && (
                      <span className={`inline-block mt-2 text-xs font-mono px-2 py-0.5 rounded-full
                        ${cert.color === 'cyan' ? 'bg-ai-cyan/10 text-ai-cyan/70' : 'bg-ai-purple/10 text-ai-purple/70'}`}>
                        {cert.year}
                      </span>
                    )}
                  </div>
                </a>
              ))}

              {/* Currently learning */}
              <div className="glass-card rounded-2xl p-5 border border-ai-green/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-ai-green/10 border border-ai-green/20 flex items-center justify-center">
                    <Brain size={18} className="text-ai-green" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Currently Learning</h4>
                    <span className="flex items-center gap-1 text-xs text-ai-green mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ai-green animate-pulse" />
                      In Progress
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['AI/ML Fundamentals', 'AWS Solutions Architect', 'LLM Integration', 'Generative AI'].map(topic => (
                    <span key={topic} className="px-2 py-1 text-xs font-mono rounded-lg bg-ai-green/10 text-ai-green border border-ai-green/20">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
