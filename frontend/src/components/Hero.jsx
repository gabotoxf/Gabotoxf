export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-10 pt-32 lg:pt-20">
      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-12 gap-4 items-center">

        <div className="col-span-1 hidden lg:flex items-center justify-center">
          <h1 className="vertical-text text-8xl font-black opacity-10 select-none">
            ALEX RIVERA
          </h1>
        </div>

        <div className="col-span-12 lg:col-span-5 z-10">
          <span className="text-primary font-bold tracking-[0.3em] text-sm uppercase">
            Full-Stack Architect
          </span>

          <h2 className="text-6xl md:text-8xl font-black leading-none tracking-tighter mt-4">
            CRAFTING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-lime">
              DIGITAL
            </span>
            <br />
            ECOSYSTEMS
          </h2>

          <p className="max-w-md text-lg text-slate-500 dark:text-slate-400 mt-6">
            Specializing in high-performance React applications and scalable Node.js architectures.
          </p>

          <button className="mt-8 bg-primary text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2">
            Explore Projects
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>

        <div className="col-span-12 lg:col-span-6 relative aspect-square">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full max-w-[500px] max-h-[500px] bg-gradient-to-br from-primary/20 to-accent-lime/10 rounded-full blur-3xl opacity-50" />
          </div>

          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-[80%] h-[80%] rounded-2xl glass glow-shadow overflow-hidden flex items-center justify-center border border-white/10">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800)",
                }}
              />

              <div className="z-10 p-8 font-mono text-sm text-accent-lime/80 space-y-2">
                <p className="animate-pulse">&gt; Initializing architecture...</p>
                <p>&gt; React.Suspense active</p>
                <p>&gt; Redis caching optimized</p>
                <p>&gt; Node scaling online</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
