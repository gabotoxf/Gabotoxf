export default function Footer() {
  return (
    <footer className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
          <div className="flex items-center gap-3">
            <div className="size-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-sm font-bold">
                terminal
              </span>
            </div>
            <span className="text-lg font-extrabold text-white tracking-tight">
              GABOTOXF
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-10">
            <a
              href="https://x.com/gabotox3f"
              className="text-sm font-semibold text-slate-500 hover:text-white transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://www.linkedin.com/in/gabotoxf/"
              className="text-sm font-semibold text-slate-500 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/gabotoxf"
              className="text-sm font-semibold text-slate-500 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-xs font-medium tracking-widest uppercase">
          <div>© 2026 Gabriel Meza.</div>

          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
