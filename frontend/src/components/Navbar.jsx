export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
      <div className="glass bg-white/70 dark:bg-glass-bg rounded-full px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-lime animate-pulse lime-glow" />
          <span className="text-xs font-bold uppercase tracking-widest text-accent-lime">
            Status: Open for work
          </span>
        </div>

        <div className="flex items-center gap-8">
          <a href="#work" className="text-sm font-medium hover:text-primary">Work</a>
          <a href="#about" className="text-sm font-medium hover:text-primary">Story</a>
          <a href="#skills" className="text-sm font-medium hover:text-primary">Stack</a>
          <a
            href="#contact"
            className="bg-primary text-white px-5 py-2 rounded-full text-sm font-bold hover:opacity-90"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </nav>
  );
}
