import { Mail, Phone, Code2, Heart } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { personalInfo } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-ai-border">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-ai-cyan to-transparent" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* CTA */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Let's Build Something <span className="text-gradient-cyan">Amazing</span>
          </h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-8">
            Open to full-time roles, freelance contracts, and exciting collaborations. Let's connect.
          </p>
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-ai-cyan to-ai-blue text-white font-semibold text-sm hover:opacity-90 hover:scale-105 transition-all duration-200"
          >
            <Mail size={16} />
            Get in Touch
          </a>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ai-cyan to-ai-purple flex items-center justify-center">
              <Code2 size={14} className="text-white" />
            </div>
            <span className="font-mono text-sm text-slate-400">
              Johnny P. Antiojo Jr.
            </span>
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: <Mail size={16} />, href: `mailto:${personalInfo.email}`, label: 'Email' },
              { icon: <Phone size={16} />, href: `tel:${personalInfo.phone}`, label: 'Phone' },
              { icon: <FaGithub size={16} />, href: personalInfo.github, label: 'GitHub' },
              { icon: <FaLinkedin size={16} />, href: personalInfo.linkedin, label: 'LinkedIn' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                title={link.label}
                className="w-9 h-9 rounded-lg bg-white/5 border border-ai-border flex items-center justify-center text-slate-400 hover:text-ai-cyan hover:border-ai-cyan/40 hover:bg-ai-cyan/10 transition-all duration-200"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-ai-border/50 flex items-center justify-center gap-1.5 text-xs text-slate-600">
          <span>Built with</span>
          <Heart size={11} className="text-red-500 fill-red-500" />
          <span>using React, TypeScript & TailwindCSS</span>
        </div>
      </div>
    </footer>
  );
}
