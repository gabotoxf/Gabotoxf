import { useState, useRef, useEffect } from "react";

// ─────────────────────────────────────────────────────────
// Reemplaza con tu API key de Groq
// https://console.groq.com → API Keys
// IMPORTANTE: en producción mueve esto a una variable de
// entorno: import.meta.env.VITE_GROQ_API_KEY
// ─────────────────────────────────────────────────────────
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_MODEL = import.meta.env.VITE_GROQ_MODEL || "llama-3.1-8b-instant";
const AUTO_OPEN_DELAY_MS = 10_000;
const AUTO_OPEN_SESSION_KEY = "gm_chatbot_auto_opened_v2";
const THROTTLE_AUTO_OPEN = import.meta.env.PROD;
const WELCOME_MESSAGE =
  "Soy el asistente virtual de Gabriel. Pregúntame sobre su stack, proyectos o disponibilidad para freelance. 👋";

let audioCtx;
let audioUnlocked = false;
let pendingBeep = false;

function getAudioContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

async function unlockAudio() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return false;
    if (ctx.state === "suspended") await ctx.resume();
    audioUnlocked = ctx.state === "running";
    if (audioUnlocked && pendingBeep) {
      pendingBeep = false;
      requestMessageSound();
    }
    return audioUnlocked;
  } catch {
    return false;
  }
}

function requestMessageSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (!audioUnlocked) {
      pendingBeep = true;
      return;
    }

    const t = ctx.currentTime;
    
    // First tone (higher)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(880, t);
    osc1.frequency.exponentialRampToValueAtTime(1200, t + 0.1);
    gain1.gain.setValueAtTime(0.001, t);
    gain1.gain.exponentialRampToValueAtTime(0.1, t + 0.05);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    
    // Second tone (lower, softer)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(660, t + 0.05);
    gain2.gain.setValueAtTime(0.001, t + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.05, t + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc1.start(t);
    osc1.stop(t + 0.15);
    osc2.start(t + 0.05);
    osc2.stop(t + 0.2);

    osc1.onended = () => {
      osc1.disconnect();
      gain1.disconnect();
    };
    osc2.onended = () => {
      osc2.disconnect();
      gain2.disconnect();
    };
  } catch {}
}

const SYSTEM_PROMPT = `
Eres el asistente virtual del portafolio de Gabriel Meza, un desarrollador Fullstack colombiano.
Tu trabajo es responder preguntas sobre Gabriel de forma cercana, honesta y profesional.
Hablas en español, en primera persona como si fueras Gabriel, pero sin pretender ser humano.
Si alguien pregunta si eres una IA, responde que sí, que eres el asistente virtual de Gabriel.

═══════════════════════════════════════
SOBRE GABRIEL MEZA
═══════════════════════════════════════

PERFIL PROFESIONAL:
- Desarrollador Fullstack con más de 3 años de experiencia
- Ingeniero de Sistemas egresado de la Corporación Universitaria Antonio José de Sucre (UAJS), Sincelejo, Colombia
- Actualmente trabaja en XIRO, donde desarrolla soluciones digitales y automatización de procesos internos
- Disponible para proyectos freelance

STACK TÉCNICO:
- Frontend: React, Next.js, Vue.js, TypeScript, Tailwind CSS, Vite
- Backend: NestJS (favorito), Node.js, PHP, Laravel
- Bases de datos: PostgreSQL, MySQL, Redis, Prisma ORM
- Otros: Python, Machine Learning básico, Supabase, Docker, JWT, REST API, Swagger
- Se siente más cómodo con React + NestJS

PROYECTOS DESTACADOS:
1. Andrix — Plataforma de streaming fullstack con scraping, metadatos TMDB y recomendaciones por IA (Next.js, NestJS, Redis, Supabase)
2. Xinergia — Plataforma con IA para diagnósticos eléctricos y generación automática de reportes técnicos (React, NestJS, Python, ML) — proyecto confidencial de empresa
3. Brevio AI — App que resume documentos PDF con IA usando LLaMA 3.1 y Groq API — disponible en brevio-self.vercel.app
4. System HelpDesk — Sistema de tickets de soporte con dashboard admin y JWT (Laravel, React, MySQL) — proyecto confidencial
5. Sistema de Diagnóstico Eléctrico — Análisis con IA y generación de reportes Word automáticos (PHP, Python, ML) — proyecto confidencial
6. Tub Exports — Sitio corporativo para empresa exportadora — tub-exports.com
7. Ecommerce App — Tienda online con carrito y gestión de pedidos (PHP, MySQL)

PERSONALIDAD Y FORMA DE TRABAJO:
- Le gusta el fútbol
- Trabaja mejor en un ambiente cómodo y de su gusto — cuando está en su zona, los resultados se notan
- Enfocado en construir cosas que funcionen de verdad, no solo que se vean bien
- Directo, sin rodeos, pero amable
- Disfruta cualquier tipo de proyecto, trabaja con cualquier tipo de cliente

PRECIOS / TARIFAS:
- Los precios dependen del alcance, complejidad y tiempo del proyecto
- No tiene tarifas fijas publicadas — prefiere escuchar el proyecto primero y cotizar según lo que realmente necesita el cliente
- Para hablar de precios, lo mejor es contactarlo directamente por WhatsApp o el formulario

CONTACTO:
- WhatsApp: https://wa.link/r1zxye
- Email: juanmeza242001@gmail.com

═══════════════════════════════════════
REGLAS DE COMPORTAMIENTO
═══════════════════════════════════════

NUNCA debes:
- Inventar proyectos, clientes, empresas o experiencias que no están listadas arriba
- Dar precios exactos ni comprometer tiempos de entrega específicos
- Hablar mal de otras tecnologías, competidores o colegas
- Prometer disponibilidad inmediata sin que Gabriel lo confirme
- Compartir información personal sensible (dirección, teléfono personal, documentos)
- Responder preguntas que no tengan relación con Gabriel, su trabajo o desarrollo web
- Actuar como asistente general — no ayudas con tareas externas, solo representas a Gabriel

SIEMPRE debes:
- Ser breve y directo — máximo 3-4 oraciones por respuesta
- Si no sabes algo, decir honestamente "no tengo esa información, pero puedes preguntarle directamente a Gabriel"
- Redirigir al contacto cuando pregunten por precios, disponibilidad o quieran contratar
- Responder solo en español, a menos que el usuario escriba en otro idioma

Si alguien pregunta algo fuera de tu alcance, responde:
"Eso está fuera de lo que puedo responder aquí, pero puedes contactar a Gabriel directamente y él te ayuda."
`;

const SUGGESTIONS = [
  "¿Con qué tecnologías trabajas?",
  "¿Estás disponible para freelance?",
  "¿Cuánto cobras por un proyecto?",
  "¿Qué proyectos has hecho?",
];

export default function ChatBot() {
  const [open, setOpen]       = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "¡Hola! " + WELCOME_MESSAGE,
    },
  ]);

  useEffect(() => {
    // Avoid animation on mount
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef             = useRef(null);
  const openRef               = useRef(open);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    openRef.current = open;
    if (open) setHasUnread(false);
  }, [open]);

  useEffect(() => {
    const onFirstInteraction = () => {
      unlockAudio();
    };

    window.addEventListener("pointerdown", onFirstInteraction, { once: true, passive: true });
    window.addEventListener("keydown", onFirstInteraction, { once: true });
    window.addEventListener("touchstart", onFirstInteraction, { once: true, passive: true });

    return () => {
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
    };
  }, []);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      if (openRef.current) return;
      if (THROTTLE_AUTO_OPEN) {
        try {
          if (sessionStorage.getItem(AUTO_OPEN_SESSION_KEY) === "1") return;
        } catch {}
      }

      setOpen(true);
      // Solo reproducir sonido si ya está desbloqueado por interacción previa
      if (audioUnlocked) requestMessageSound();
      
      if (THROTTLE_AUTO_OPEN) {
        try {
          sessionStorage.setItem(AUTO_OPEN_SESSION_KEY, "1");
        } catch {}
      }
    }, AUTO_OPEN_DELAY_MS);

    return () => window.clearTimeout(timerId);
  }, []);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    if (!GROQ_API_KEY) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "El chat no está configurado aún. Puedes contactar a Gabriel directamente: WhatsApp https://wa.link/r1zxye · Email juanmeza242001@gmail.com",
        },
      ]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...newMessages.slice(-10),
          ],
          max_tokens: 350,
          temperature: 0.75,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message ?? "HTTP " + res.status);
      }

      const data = await res.json();
      const reply =
        data.choices?.[0]?.message?.content?.trim() ??
        "No pude generar una respuesta. Intenta de nuevo.";

      requestMessageSound();
      if (!openRef.current) setHasUnread(true);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Groq error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Ups, algo falló de mi lado. Puedes escribirle a Gabriel: WhatsApp https://wa.link/r1zxye",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const showSuggestions = messages.filter(m => m.role === "user").length === 0;

  return (
    <>
      {/* ── Chat window ── */}
      <div
        className={`fixed bottom-24 right-4 z-50 w-[90vw] max-w-[360px] origin-bottom-right ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
          mounted ? "transition-all duration-500" : ""
        } ${
          open
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-10 scale-90 pointer-events-none"
        }`}
      >
        <div className="rounded-[2rem] overflow-hidden border border-white/20 bg-[#0a0a0c]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col ring-1 ring-white/10"
          style={{ height: "min(500px, 80vh)" }}>

          {/* Header */}
          <div className="relative flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/30 to-fuchsia-500/30 border border-white/20 flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-white text-[24px]">smart_toy</span>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-primary border-[2px] border-[#0a0a0c] shadow-sm" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-sm tracking-tight">Gabotoxf AI</h3>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
                <p className="text-accent-lime text-[10px] font-medium uppercase tracking-wider">En línea</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="group p-1.5 rounded-xl hover:bg-white/10 transition-all"
            >
              <span className="material-symbols-outlined text-slate-400 group-hover:text-white text-[20px]">close</span>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 transition-all">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} transition-all duration-300`}>
                <div className={`max-w-[88%] px-4 py-3 rounded-[1.25rem] text-sm leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-primary to-fuchsia-600 text-white rounded-tr-none font-medium"
                    : "bg-white/5 border border-white/10 text-slate-200 rounded-tl-none"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Suggestions */}
            {showSuggestions && (
              <div className="flex flex-col gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-left text-xs px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:border-primary/50 hover:bg-primary/10 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-white/10 bg-white/5">
            <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2 border border-white/10 focus-within:border-primary/40 transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Escribe tu pregunta..."
                className="flex-1 bg-transparent text-white text-sm placeholder-slate-600 focus:outline-none"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="text-slate-500 hover:text-primary transition-colors disabled:opacity-30"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating button ── */}
      <button
        onClick={() =>
          setOpen((v) => {
            const next = !v;
            if (next) setHasUnread(false);
            return next;
          })
        }
        className={`group fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl active:scale-95 ${
          open 
            ? "bg-slate-800 rotate-90" 
            : "bg-gradient-to-tr from-primary via-primary to-fuchsia-500 hover:scale-110"
        }`}
        aria-label="Abrir asistente IA"
        title="Asistente IA"
      >
        {/* Outer Glow / Pulse */}
        {!open && (
          <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping opacity-20 group-hover:opacity-40 transition-opacity" />
        )}
        
        {/* Inner Glow */}
        <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
          open ? "opacity-0" : "opacity-100 bg-white/10 blur-[2px]"
        }`} />

        {!open && (
          <span className="hidden sm:flex absolute right-[80px] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-2xl bg-slate-900/95 backdrop-blur-md border border-white/10 px-4 py-2 text-sm font-medium text-white shadow-2xl opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            {hasUnread ? "¡Nuevo mensaje!" : "¿Necesitas ayuda?"}
          </span>
        )}

        <span className={`material-symbols-outlined text-white transition-all duration-300 ${
          open ? "text-[24px]" : "text-[32px] drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]"
        }`}>
          {open ? "close" : "smart_toy"}
        </span>

        {!open && (
          <div className="absolute -bottom-1 -left-1 flex items-center gap-1 rounded-full bg-slate-900/90 border border-white/20 px-2 py-0.5 shadow-lg backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold text-white tracking-wider">IA</span>
          </div>
        )}

        {hasUnread && !open && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-primary border-2 border-slate-900"></span>
          </span>
        )}
      </button>
    </>
  );
}
