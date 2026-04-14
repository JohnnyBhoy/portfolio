import { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { X, Send, Loader2, CheckCircle, AlertCircle, Mail, User, MessageSquare, Briefcase } from 'lucide-react';

// ─── EmailJS config ───────────────────────────────────────────────
// 1. Go to https://www.emailjs.com and create a free account
// 2. Add an Email Service (Gmail) → copy the Service ID
// 3. Create an Email Template → copy the Template ID
//    Template variables used: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
// 4. Go to Account → API Keys → copy the Public Key
// 5. Add these to /client/.env (or .env at portfolio root):
//    VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
//    VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
//    VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
// ─────────────────────────────────────────────────────────────────

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;

const emailjsReady = SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY;

type Status = 'idle' | 'sending' | 'success' | 'error';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function HireModal({ open, onClose }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ from_name: '', from_email: '', subject: '', message: '' });

  // Reset when reopened
  useEffect(() => {
    if (open) {
      setStatus('idle');
      setForm({ from_name: '', from_email: '', subject: '', message: '' });
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    if (!emailjsReady) {
      // Fallback: open pre-filled mailto
      const body = encodeURIComponent(
        `Name: ${form.from_name}\nEmail: ${form.from_email}\n\n${form.message}`
      );
      window.open(
        `mailto:jrantiojobhoy@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${body}`,
        '_blank'
      );
      setStatus('success');
      return;
    }

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current!, PUBLIC_KEY);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (!open) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#0d1117] border border-ai-cyan/20 rounded-2xl shadow-2xl shadow-ai-cyan/10 overflow-hidden animate-fade-in">

        {/* Top accent bar */}
        <div className="h-0.5 w-full bg-gradient-to-r from-ai-cyan via-ai-blue to-ai-purple" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ai-border">
          <div>
            <h2 className="text-white font-bold text-lg">Get in Touch</h2>
            <p className="text-slate-500 text-xs mt-0.5">Send Johnny a message — he responds within 24 hours.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Success state */}
        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
              <CheckCircle size={32} className="text-green-400" />
            </div>
            <h3 className="text-white font-bold text-lg">Message Sent!</h3>
            <p className="text-slate-400 text-sm max-w-xs">
              Thanks for reaching out! Johnny will get back to you at <span className="text-ai-cyan">{form.from_email}</span> within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-ai-cyan to-ai-blue text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Close
            </button>
          </div>
        ) : (
          /* Form */
          <form ref={formRef} onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                  <User size={11} /> Your Name
                </label>
                <input
                  type="text"
                  name="from_name"
                  value={form.from_name}
                  onChange={handleChange}
                  required
                  placeholder="Jane Smith"
                  className="w-full bg-white/5 border border-ai-border rounded-xl px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-ai-cyan/50 transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                  <Mail size={11} /> Your Email
                </label>
                <input
                  type="email"
                  name="from_email"
                  value={form.from_email}
                  onChange={handleChange}
                  required
                  placeholder="jane@company.com"
                  className="w-full bg-white/5 border border-ai-border rounded-xl px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-ai-cyan/50 transition-colors"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <Briefcase size={11} /> Subject
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                placeholder="Job Opportunity / Project Collaboration / Freelance Work"
                className="w-full bg-white/5 border border-ai-border rounded-xl px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-ai-cyan/50 transition-colors"
              />
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <MessageSquare size={11} /> Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell Johnny about the role, project, or opportunity..."
                className="w-full bg-white/5 border border-ai-border rounded-xl px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-ai-cyan/50 transition-colors resize-none"
              />
            </div>

            {/* Error banner */}
            {status === 'error' && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                <AlertCircle size={14} />
                Something went wrong. Please try again or email directly at jrantiojobhoy@gmail.com
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-1">
              <p className="text-[11px] text-slate-600">
                Sends directly to <span className="text-slate-500">jrantiojobhoy@gmail.com</span>
              </p>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-ai-cyan to-ai-blue text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <><Loader2 size={14} className="animate-spin" /> Sending…</>
                ) : (
                  <><Send size={14} /> Send Message</>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
