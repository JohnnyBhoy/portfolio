import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, User, Loader2 } from 'lucide-react';

type Message = {
  role: 'user' | 'bot';
  text: string;
};

const HF_BASE = 'https://johnnybhoy1993-johnny-bot.hf.space/gradio_api';
const FN_INDEX = 6; // chat function: inputs [textbox, state], outputs [json, state]

// Generate a random session hash once per page load
const SESSION_HASH = Math.random().toString(36).slice(2, 12);

async function queryBot(message: string): Promise<string> {
  // Step 1 — Join the queue
  const joinRes = await fetch(`${HF_BASE}/queue/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fn_index: FN_INDEX,
      data: [message, null],
      session_hash: SESSION_HASH,
    }),
  });

  if (!joinRes.ok) throw new Error(`Queue join failed: ${joinRes.status}`);
  const { event_id } = await joinRes.json();
  if (!event_id) throw new Error('No event_id returned');

  // Step 2 — Stream SSE until process_completed
  return new Promise((resolve, reject) => {
    const url = `${HF_BASE}/queue/data?session_hash=${SESSION_HASH}`;
    const es = new EventSource(url);
    const timeout = setTimeout(() => {
      es.close();
      reject(new Error('Timeout'));
    }, 30_000);

    es.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.event_id && msg.event_id !== event_id) return; // different event, ignore

        if (msg.msg === 'process_completed') {
          clearTimeout(timeout);
          es.close();
          if (!msg.success) {
            reject(new Error('Bot returned an error'));
            return;
          }
          const reply = msg.output?.data?.[0];
          resolve(typeof reply === 'string' ? reply : JSON.stringify(reply));
        } else if (msg.msg === 'unexpected_error') {
          clearTimeout(timeout);
          es.close();
          reject(new Error(msg.message ?? 'Unexpected error'));
        }
      } catch {
        // Non-JSON SSE frame — skip
      }
    };

    es.onerror = () => {
      clearTimeout(timeout);
      es.close();
      reject(new Error('SSE connection error'));
    };
  });
}

export default function JohnnyBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: "Hi! I'm Virtual Johnny 👋 I'm Johnny's online self. Ask me anything about my skills, experience, or projects!",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-open after 3 seconds on page load
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setLoading(true);

    try {
      const reply = await queryBot(trimmed);
      setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: "Sorry, I couldn't reach Johnny's brain right now. Try again in a moment!" },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[340px] flex flex-col rounded-2xl border border-ai-cyan/20 bg-[#0d1117] shadow-2xl shadow-ai-cyan/10 transition-all duration-300 ${
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
        style={{ maxHeight: '520px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-ai-border rounded-t-2xl bg-gradient-to-r from-ai-cyan/10 to-ai-blue/10 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                src="/johnny.ico"
                alt="Virtual Johnny"
                className="w-9 h-9 rounded-full object-cover border-2 border-ai-cyan/40"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#0d1117]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-none">Virtual Johnny</p>
              <p className="text-[10px] text-ai-cyan mt-0.5 font-mono">Johnny's Online Assistant · Always here</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
          style={{ minHeight: 0, maxHeight: '340px' }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {msg.role === 'bot' ? (
                <img
                  src="/johnny.ico"
                  alt="Virtual Johnny"
                  className="w-6 h-6 rounded-full flex-shrink-0 object-cover border border-ai-cyan/30"
                />
              ) : (
                <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white bg-gradient-to-br from-ai-purple to-ai-blue">
                  <User size={12} />
                </div>
              )}
              <div
                className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'bot'
                    ? 'bg-white/5 border border-ai-border text-slate-300 rounded-tl-sm'
                    : 'bg-gradient-to-br from-ai-cyan to-ai-blue text-white rounded-tr-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-2 items-center">
              <img
                src="/johnny.ico"
                alt="Virtual Johnny"
                className="w-6 h-6 rounded-full flex-shrink-0 object-cover border border-ai-cyan/30"
              />
              <div className="px-3 py-2.5 rounded-2xl rounded-tl-sm bg-white/5 border border-ai-border">
                <div className="flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-ai-cyan animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-ai-cyan animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-ai-cyan animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-3 border-t border-ai-border flex-shrink-0">
          <div className="flex gap-2 items-center bg-white/5 border border-ai-border rounded-xl px-3 py-2 focus-within:border-ai-cyan/50 transition-colors">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask Johnny anything…"
              className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-600 outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="p-1.5 rounded-lg bg-gradient-to-br from-ai-cyan to-ai-blue text-white hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-600 mt-1.5 font-mono">
            Virtual Johnny · Powered by OpenAI
          </p>
        </div>
      </div>

      {/* Floating trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-ai-cyan to-ai-blue text-white shadow-lg shadow-ai-cyan/30 hover:scale-110 transition-all duration-200 flex items-center justify-center glow-cyan"
        title="Chat with Virtual Johnny"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  );
}
