import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import HireModal from './HireModal';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [showHireModal, setShowHireModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems.map(i => i.href.slice(1));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'navbar-blur' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ai-cyan to-ai-purple flex items-center justify-center">
               <img src="johnny.ico" alt="" />
            </div>
            <span className="font-mono text-sm font-semibold text-ai-cyan hidden sm:block">
              <span className="text-white/50"></span>AI-Engineer
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative group
                  ${active === item.href.slice(1)
                    ? 'text-ai-cyan bg-ai-cyan/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {item.label}
                {active === item.href.slice(1) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-ai-cyan" />
                )}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => setShowHireModal(true)}
            className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-ai-cyan/30 text-ai-cyan hover:bg-ai-cyan/10 transition-all duration-200"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-ai-green animate-pulse" />
            Hire Me
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="md:hidden navbar-blur border-t border-ai-border">
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navItems.map(item => (
                <button
                  key={item.href}
                  onClick={() => handleClick(item.href)}
                  className={`text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors
                    ${active === item.href.slice(1) ? 'text-ai-cyan bg-ai-cyan/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => { setIsOpen(false); setShowHireModal(true); }}
                className="mt-2 flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg border border-ai-cyan/30 text-ai-cyan"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-ai-green animate-pulse" />
                Hire Me
              </button>
            </div>
          </div>
        )}
      </nav>

      <HireModal open={showHireModal} onClose={() => setShowHireModal(false)} />
    </>
  );
}
