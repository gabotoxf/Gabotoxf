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
    tag: "Freelance",
    title: "Tienda Online",
    description: "Tienda Online, HTML, CSS (Actualmente en proceso).",
    image: "tienda",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    tag: "Freelance",
    title: "Eccomerce App",
    description:
      "Ecommerce App con funcionalidades completas de carrito de compras.",
    image: "eccomerce",
    tech: ["PHP", "JavaScript", "MySQL"],
  },
  {
    tag: "Freelance",
    title: "Tub Exports",
    description:
      "Sitio web para empresa exportadora.",
    image:
      "tub",
    tech: ["JavaScript", "HTML", "CSS"],
  },
  {
    tag: "FRONTEND MENTOR",
    title: "Landing Page",
    description:
      "Reto realizado de frontend mentor para practicar habilidades de maquetación y diseño responsive",
    image:
      "pagehack",
    tech: ["JavaScript", "HTML", "CSS"],
  },
];

/* ======================================================
   COMPONENTE
====================================================== */
export default function ProjectsSection() {
  return (
    <section className="py-32" id="projects">
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
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
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
    </section>
  );
}

/* ======================================================
   PROJECT CARD
====================================================== */
function ProjectCard({ tag, title, description, image, tech }) {
  return (
    <div className="group relative h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative glass-morphism rounded-[32px] overflow-hidden border-white/5 p-4 h-full">
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

        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-3xl font-black text-white font-display">
              {title}
            </h3>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-slate-400 hover:text-white cursor-pointer transition-colors">
                code
              </span>
              <span className="material-symbols-outlined text-slate-400 hover:text-white cursor-pointer transition-colors">
                open_in_new
              </span>
            </div>
          </div>

          <p className="text-slate-400 mb-8 text-lg leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-3">
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
