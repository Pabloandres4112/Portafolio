import { motion } from "framer-motion";
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiNodedotjs,
    SiPython,
    SiLaravel,
    
    SiMongodb,
    SiMysql,
    SiFigma,
    SiTailwindcss,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { TbBrandReactNative } from "react-icons/tb";


const techs = [
    { name: "React", icon: <SiReact className="text-cyan-400" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-black" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-400" /> },
    { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
    { name: "Python & Django", icon: <SiPython className="text-yellow-300" /> }, // Solo Python, no hay icono Django en react-icons
    { name: "PHP & Laravel", icon: <SiLaravel className="text-pink-600" /> },
    { name: "Java", icon: <span className="text-red-600 text-4xl font-bold"><FaJava /></span> },
    { name: "MySQL / PostgreSQL", icon: <SiMysql className="text-blue-600" /> }, // Solo MySQL, no hay icono combinado
    { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
    { name: "Figma", icon: <SiFigma className="text-pink-500" /> },
    { name: "React Native", icon: <TbBrandReactNative className="text-cyan-500" /> }, // No hay oficial, usé ReactOS como placeholder
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400" /> },
];

export default function TechGrid() {
    return (
        <section className="max-w-6xl mx-auto py-12 px-6">
            <h2 className="text-3xl font-bold text-green-400 mb-8 text-center">Tecnologías</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {techs.map((tech, i) => (
                    <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15, duration: 0.4, ease: "easeOut" }}
                        className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col items-center justify-center space-y-3 hover:shadow-green-400/20 transition"
                    >
                        <div className="text-4xl">{tech.icon}</div>
                        <span className="text-gray-200 font-semibold">{tech.name}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
