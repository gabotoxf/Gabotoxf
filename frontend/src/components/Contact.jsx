export default function ContactSection() {
  return (
    <section className="py-32" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-[48px] overflow-hidden bg-slate-900 border border-white/5 px-8 py-20 lg:py-32 text-center group">
          {/* Background effects */}
          <div className="absolute inset-0 mesh-gradient opacity-30 group-hover:opacity-50 transition-opacity" />
          <div className="absolute -top-24 -right-24 size-96 bg-primary/20 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 size-96 bg-secondary/20 blur-[100px] rounded-full" />

          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-12">
            <h2 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] font-display">
  ¿Tienes alguna{" "}
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-lime">
    idea de proyecto
  </span>
  ?
</h2>


            <p className="text-xl text-slate-400">
              Estoy abierto a nuevas oportunidades y colaboraciones. ¡Hablemos sobre cómo
              puedo ayudarte a llevar tu proyecto al siguiente nivel!
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="https://wa.link/r1zxye"
                className="bg-white text-black px-12 py-5 rounded-2xl text-lg font-bold hover:bg-slate-200 transition-all flex items-center gap-2"
              >
                Iniciar una Conversación
                <i className="fa-brands fa-whatsapp text-black-500 text-2xl"></i>
              </a>

              <a
                href="#"
                className="glass-morphism text-white px-12 py-5 rounded-2xl text-lg font-bold hover:bg-white/10 border-white/10 transition-all flex items-center gap-2"
              >
                juanmeza242001@gmail.com 
                <span className="material-symbols-outlined">
                  mail
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}









