import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
      <div className="glass bg-white/70 dark:bg-glass-bg rounded-full px-6 py-3 flex items-center justify-between relative">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-lime animate-pulse lime-glow" />
          <span className="text-2xl font-bold uppercase tracking-widest text-accent-lime">
            Gmeza
          </span>
        </div>


        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm font-medium hover:text-primary">
            Sobre mí
          </a>
          <a href="#skills" className="text-sm font-medium hover:text-primary">
            Habilidades
          </a>
          <a href="#projects" className="text-sm font-medium hover:text-primary">
            Proyectos
          </a>
          <a
            href="https://wa.link/r1zxye"
            className="bg-primary text-white px-5 py-2 rounded-full text-sm font-bold hover:opacity-90"
          >
            Hablemos
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5"
          aria-label="Abrir menú"
        >
          <span
            className={`h-0.5 w-6 bg-current transition-transform ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-current transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-current transition-transform ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute top-full mt-4 left-0 w-full rounded-3xl bg-white/80 dark:bg-glass-bg backdrop-blur-xl shadow-xl md:hidden">
            <div className="flex flex-col items-center gap-6 py-8">
              <a
                href="#about"
                onClick={() => setOpen(false)}
                className="text-sm font-medium hover:text-primary"
              >
                Sobre mí
              </a>
              <a
                href="#skills"
                onClick={() => setOpen(false)}
                className="text-sm font-medium hover:text-primary"
              >
                Habilidades
              </a>
              <a
                href="#projects"
                onClick={() => setOpen(false)}
                className="text-sm font-medium hover:text-primary"
              >
                Proyectos
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold hover:opacity-90"
              >
                Hablemos
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
