import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/* ======================================================
   AUTO-IMPORT DE IMÁGENES (VITE)
====================================================== */
const images = import.meta.glob(
  "../assets/img/proyectos/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

const projectImages = Object.fromEntries(
  Object.entries(images).map(([path, module]) => [
    path.split("/").pop().split(".")[0],
    module.default,
  ])
);

/* ======================================================
   DATA DE PROYECTOS
====================================================== */
const projects = [
  {
    tag: "FULL STACK",
    title: "Xinergia",
    description:
      "Plataforma con IA para la gestión de diagnósticos eléctricos y generación automática de memorias de cálculo.",
    image:
      "xinergia",
    tech: ["TypeScript", "React", "Vite", "Tailwind CSS", "NestJS", "PostgreSQL", "Python", "Machine Learning",  "Prisma ORM", "JWT", "Swagger"],
    link: "#",
    github: "#"
  },
  {
    tag: "FRONTEND",
    title: "Brevio AI",
    description:
      "App para obtener resúmenes con IA de documentos PDF, rápida e intuitiva.",
    image:
      "brevio",
    tech: ["TypeScript", "React", "Vite", "Tailwind CSS", "LLaMA 3.1", "Groq Inference API", "PDF.js", "React Router"],
    link: "https://brevio-self.vercel.app/",
    github: "#"
  },
  {
    tag: "Full Stack",
    title: "Andrix",
    image:
      "andrix",
    description: "Plataforma de streaming full-stack con scraping de fuentes, metadatos de TMDB y recomendaciones por IA.",
    tech: ["Next.js 14", "NestJS", "PostgreSQL", "Prisma", "Socket.io", "Redis", "Puppeteer", "Playwright", "Supabase", "Vercel"],
    link: "https://andrix.vercel.app/",
    github: "#"
  },
  {
    tag: "Full Stack",
    title: "System HelpDesk",
    description: "Aplicación full-stack para la gestión de tickets de soporte técnico con autenticación JWT, dashboard administrativo y API REST.",
    image: "helpdesk",
    tech: ["Laravel", "React", "Tailwind CSS", "MySQL", "JWT", "REST API"],
    link: "#",
    github: "#"
  },
  {
    tag: "Full Stack",
    title: "Sistema de Diagnóstico Eléctrico",
    description: "Sistema web para diagnóstico eléctrico que permite analizar datos con IA, generar reportes automáticos en Word y visualizar datos desde una interfaz web.",
    image: "diagnosticos",
    tech: ["PHP", "JavaScript", "Python", "PHPWord", "Machine Learning"],
    link: "#",
    github: "#"
  },
  {
    tag: "Freelance",
    title: "Ecommerce App",
    description: "Aplicación web de comercio electrónico con carrito de compras, gestión de productos y sistema de pedidos.",
    image: "eccomerce",
    tech: ["PHP", "JavaScript", "MySQL"],
    link: "#",
    github: "#"
  },
  {
    tag: "Freelance",
    title: "Tienda Online",
    description: "Tienda Online, HTML, CSS (Actualmente en proceso).",
    image: "tienda",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://gabotoxf.github.io/Tienda/",
    github: "#"
  },
  {
    tag: "Freelance",
    title: "Tub Exports",
    description:
      "Sitio web para empresa exportadora.",
    image:
      "tub",
    tech: ["JavaScript", "HTML", "CSS"],
    link: "https://tub-exports.com/",
    github: "#"
  }
];

/* ======================================================
   COMPONENTE
====================================================== */
export default function ProjectsSection() {
  const [showToast, setShowToast] = useState(false);

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <section className="py-32 relative" id="projects">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 font-display">
          Proyectos
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Proyectos destacados que demuestran mi experiencia en desarrollo web y
          soluciones innovadoras.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={48}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          // autoplay={{
          //   delay: 6000,
          //   disableOnInteraction: false,
          // }}
          breakpoints={{
            1024: {
              slidesPerView: 2,
            },
          }}
          className="projects-slider"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <ProjectCard
                {...project}
                onCodeClick={triggerToast}
                image={
                  project.image.startsWith("http")
                    ? project.image
                    : projectImages[project.image]
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Toast Notification */}
      <div
        className={`fixed bottom-8 right-8 z-50 transition-all duration-500 transform ${
          showToast ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >
        <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">info</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm">Código no disponible</p>
            <p className="text-slate-400 text-xs">Aún no está disponible públicamente.</p>
          </div>
          <button 
            onClick={() => setShowToast(false)}
            className="ml-4 text-slate-500 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ======================================================
   PROJECT CARD
====================================================== */
function ProjectCard({ tag, title, description, image, tech, link, onCodeClick }) {
  return (
    <div className="group relative h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative glass-morphism rounded-[32px] overflow-hidden border-white/5 p-4 h-full flex flex-col">
        {/* Image */}
        <div className="aspect-[16/10] rounded-[24px] overflow-hidden relative">
          <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />

          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${image})` }}
          />

          <div className="absolute top-6 left-6 z-20">
            <span className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest border border-white/10">
              {tag}
            </span>
          </div>
        </div>

        <div className="p-8 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-3xl font-black text-white font-display">
              {title}
            </h3>
            <div className="flex gap-4">
              <button 
                onClick={onCodeClick}
                className="material-symbols-outlined text-slate-400 hover:text-white cursor-pointer transition-colors"
                title="Ver Código"
              >
                code
              </button>
              {link && link !== "#" ? (
                <a 
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="material-symbols-outlined text-slate-400 hover:text-white cursor-pointer transition-colors"
                  title="Ver Sitio Web"
                >
                  open_in_new
                </a>
              ) : (
                <span 
                  className="material-symbols-outlined text-slate-600 cursor-not-allowed"
                  title="Sitio no disponible"
                >
                  link_off
                </span>
              )}
            </div>
          </div>

          <p className="text-slate-400 mb-8 text-lg leading-relaxed flex-grow">
            {description}
          </p>

          <div className="flex flex-wrap gap-3 mt-auto">
            {tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
