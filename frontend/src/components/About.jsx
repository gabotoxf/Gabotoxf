import fotoGabo from "../assets/img/yo/gabo2.jpeg";

export default function About() {
  return (
    <section
      id="about"
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-10"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">

          {/* IMAGEN */}
          <div className="col-span-12 lg:col-span-5 relative flex justify-center lg:justify-start">

            <div
              className="
                w-full max-w-[380px] sm:max-w-[420px]
                relative
                rounded-2xl sm:rounded-[3rem] lg:rounded-[4rem]
                overflow-hidden
                bg-slate-200 dark:bg-slate-800
                border-2 sm:border-4 border-primary/20
                transition-transform duration-700
                lg:rotate-3 lg:hover:rotate-0
              "
            >
              {/* ratio 4/5 */}
              <div className="pt-[125%]" />

              <img
                src={fotoGabo}
                alt="Retrato profesional de desarrollador"
                className="
                  absolute inset-0 w-full h-full object-cover
                  grayscale lg:hover:grayscale-0
                  transition-all duration-700
                "
              />
            </div>

            {/* BADGE (solo desktop) */}
            <div className="hidden lg:flex absolute -bottom-6 -right-6 w-28 h-28 bg-accent-lime rounded-full items-center justify-center -rotate-12 border-4 border-background-dark">
              <span className="text-background-dark font-black text-center leading-tight">
                2+ AÑOS<br />EXP.
              </span>
            </div>
          </div>

          {/* TEXTO */}
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8">

            <h3 className="text-primary font-bold uppercase tracking-widest text-sm">
              SOBRE MÍ
            </h3>

            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              De la lógica a la estética.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Soy
                <span className="text-transparent mx-1 bg-clip-text bg-gradient-to-r from-primary to-accent-lime">
                  INGENIERO DE SISTEMAS,
                </span>
                apasionado por la programación y el diseño web, con experiencia en proyectos que van desde sitios corporativos hasta aplicaciones web interactivas.
              </p>

              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Actualmente trabajo a medio tiempo en la automatización de procesos internos de una empresa, desarrollando soluciones digitales que optimizan flujos de trabajo y mejoran la eficiencia operativa.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-wrap gap-8 sm:gap-12">
              <div>
                <span className="block text-2xl font-bold text-accent-lime">10+</span>
                <span className="text-xs uppercase tracking-widest opacity-60">
                  Proyectos entregados
                </span>
              </div>

              <div>
                <span className="block text-2xl font-bold text-accent-lime">4+</span>
                <span className="text-xs uppercase tracking-widest opacity-60">
                  Clientes globales
                </span>
              </div>

              <div>
                <span className="block text-2xl font-bold text-accent-lime">70%</span>
                <span className="text-xs uppercase tracking-widest opacity-60">
                  Disponibilidad
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
