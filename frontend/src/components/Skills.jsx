import "../styles/Tech.css";

const skills = [
    {
        icon: "devicon-javascript-plain",
        title: "JavaScript",
        label: "Language",
    },
    {
        icon: "devicon-vuejs-plain",
        title: "Vue.js",
        label: "Frontend",
    },
    {
        icon: "devicon-react-original",
        title: "React",
        label: "Frontend",
    },
    {
        icon: "devicon-nextjs-plain",
        title: "Next.js",
        label: "Framework",
    },
    {
        icon: "devicon-nodejs-plain",
        title: "Node.js",
        label: "Backend",
    },
    {
        icon: "devicon-php-plain",
        title: "PHP",
        label: "Backend",
    },
    {
        icon: "devicon-laravel-plain",
        title: "Laravel",
        label: "Framework",
    },
    {
        icon: "devicon-postgresql-plain",
        title: "PostgreSQL",
        label: "Database",
    },
    {
        icon: "devicon-mysql-plain",
        title: "MySQL",
        label: "Database",
    },
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

            <div className="relative overflow-hidden">
                <div className="skills-slider">
                    {[...skills, ...skills].map((skill, i) => (
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
        </section>
    );
}
