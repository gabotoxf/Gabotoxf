import "../styles/Tech.css";

const frontendSkills = [
    { icon: "devicon-javascript-plain", title: "JavaScript", label: "Lenguaje" },
    { icon: "devicon-typescript-plain", title: "TypeScript", label: "Lenguaje" },
    { icon: "devicon-react-original", title: "React", label: "Frontend" },
    { icon: "devicon-vuejs-plain", title: "Vue.js", label: "Frontend" },
    { icon: "devicon-nextjs-plain", title: "Next.js", label: "Framework" },
    { icon: "devicon-tailwindcss-plain", title: "Tailwind CSS", label: "Estilos" },
    { icon: "devicon-html5-plain", title: "HTML5", label: "Frontend" },
    { icon: "devicon-css3-plain", title: "CSS3", label: "Frontend" },
    { icon: "devicon-vitejs-plain", title: "Vite", label: "Herramienta" },
];

const backendSkills = [
    { icon: "devicon-nodejs-plain", title: "Node.js", label: "Backend" },
    { icon: "devicon-nestjs-plain", title: "NestJS", label: "Backend" },
    { icon: "devicon-php-plain", title: "PHP", label: "Backend" },
    { icon: "devicon-laravel-plain", title: "Laravel", label: "Framework" },
    { icon: "devicon-postgresql-plain", title: "PostgreSQL", label: "Base de Datos" },
    { icon: "devicon-mysql-plain", title: "MySQL", label: "Base de Datos" },
    { icon: "devicon-prisma-plain", title: "Prisma", label: "ORM" },
    { icon: "devicon-redis-plain", title: "Redis", label: "Cache" },
    { icon: "devicon-python-plain", title: "Python", label: "Lenguaje" },
    { icon: "devicon-supabase-plain", title: "Supabase", label: "BaaS" },
];

export default function Skills() {
    return (
        <section
            id="skills"
            className="py-32 bg-background-light dark:bg-background-dark relative overflow-hidden"
        >
            <div className="absolute inset-0 mesh-glow pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white mb-6 font-display">
                    Tecnologías
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-center">
                    Stack tecnológico enfocado en rendimiento, escalabilidad y buenas prácticas.
                </p>
            </div>

            <div className="relative flex flex-col gap-12">
                {/* Fade edges masking */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background-light dark:from-background-dark to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background-light dark:from-background-dark to-transparent z-10 pointer-events-none"></div>

                {/* Frontend Slider - Moves Left */}
                <div className="relative">
                    <div className="flex justify-center mb-4">
                        <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
                            Frontend & Core
                        </span>
                    </div>
                    <div className="skills-slider">
                        {[...frontendSkills, ...frontendSkills].map((skill, i) => (
                            <div key={i} className="skill-card">
                                <div className="skill-icon">
                                    <i className={`${skill.icon} text-4xl`} />
                                </div>
                                <h3 className="skill-title">{skill.title}</h3>
                                <span className="skill-label">{skill.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Backend Slider - Moves Right */}
                <div className="relative">
                    <div className="flex justify-center mb-4">
                        <span className="px-4 py-1 rounded-full bg-accent-lime/10 text-accent-lime text-xs font-bold uppercase tracking-widest border border-accent-lime/20">
                            Backend & BD
                        </span>
                    </div>
                    <div className="skills-slider reverse">
                        {[...backendSkills, ...backendSkills].map((skill, i) => (
                            <div key={i} className="skill-card">
                                <div className="skill-icon">
                                    <i className={`${skill.icon} text-4xl`} />
                                </div>
                                <h3 className="skill-title">{skill.title}</h3>
                                <span className="skill-label">{skill.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
