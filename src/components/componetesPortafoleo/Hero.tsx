// components/Hero.tsx
import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaDownload, FaEnvelope, FaChevronDown } from "react-icons/fa";

interface HeroProps {
  onNavigate: (sectionId: "about" | "projects") => void;
}

// Animaciones
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-24 bg-transparent">
      <motion.div
        className="text-center max-w-4xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Avatar */}
        <motion.div className="mb-8" variants={fadeInUp}>
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1 shadow-lg shadow-purple-500/20">
            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
              <span className="text-4xl">👨‍💻</span>
            </div>
          </div>
        </motion.div>

        {/* Título principal */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent leading-tight"
          variants={fadeInUp}
        >
          Pablo Andrés Perdomo
        </motion.h1>

        {/* Subtítulo claro y enfocado */}
        <motion.h2
          className="text-2xl md:text-3xl font-semibold text-gray-300 mb-6"
          variants={fadeInUp}
        >
          Desarrollador Frontend & Mobile — React / React Native
        </motion.h2>

        {/* Descripción profesional */}
        <motion.p
          className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          variants={fadeInUp}
        >
          Me especializo en crear aplicaciones web y móviles rápidas, funcionales y centradas en la experiencia del usuario. 
          Combino lógica y diseño para transformar ideas en productos escalables usando React, Firebase y Node.js.
        </motion.p>

        {/* Botones de acción */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={fadeInUp}
        >
          {/* Ver proyectos */}
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg flex items-center gap-2 hover:shadow-xl hover:shadow-purple-500/30 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate("projects")}
          >
            <FaRocket /> Ver Proyectos
          </motion.button>

          {/* Descargar CV */}
          <motion.a
            href="/cv/PabloAndres_CV.pdf" // ⚠️ Asegúrate de tener tu CV en public/cv/PabloAndres_CV.pdf
            download
            className="px-8 py-4 border-2 border-gray-400 rounded-full font-semibold text-lg flex items-center gap-2 hover:border-white hover:bg-white/10 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload /> Descargar CV
          </motion.a>

          {/* Contactar */}
          <motion.a
            href="mailto:pablo.tucorreo@gmail.com?subject=Interesado%20en%20tu%20perfil"
            className="px-8 py-4 border-2 border-gray-400 rounded-full font-semibold text-lg flex items-center gap-2 hover:border-white hover:bg-white/10 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope /> Contactar
          </motion.a>
        </motion.div>

        {/* Flecha scroll hacia abajo */}
        <motion.div className="mt-16 flex justify-center" variants={fadeInUp}>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="cursor-pointer"
            onClick={() => onNavigate("about")}
          >
            <FaChevronDown size={28} className="text-gray-400" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
