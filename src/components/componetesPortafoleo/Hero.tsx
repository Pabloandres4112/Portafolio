// components/Hero.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaDownload, FaChevronDown } from 'react-icons/fa';

interface HeroProps {
  onNavigate: (sectionId: 'about' | 'projects') => void;
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
    <section className="min-h-screen flex items-center justify-center px-4 pt-24">
      <motion.div
        className="text-center max-w-4xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Avatar */}
        <motion.div className="mb-8" variants={fadeInUp}>
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-1">
            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
              <span className="text-4xl">👨‍💻</span>
            </div>
          </div>
        </motion.div>

        {/* Título */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent"
          variants={fadeInUp}
        >
          Hola, soy Pablo Andrés
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-6"
          variants={fadeInUp}
        >
          Desarrollador Full Stack enfocado en lógica y funcionalidad
        </motion.p>

        {/* Descripción */}
        <motion.p
          className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
          variants={fadeInUp}
        >
          Combino lógica funcional con experiencia en diseño de interfaces modernas. Me especializo en React, Node.js y otras tecnologías web y movil .
        </motion.p>

        {/* Botones */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={fadeInUp}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg flex items-center gap-2 hover:shadow-xl hover:shadow-purple-500/30"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('projects')}
          >
            <FaRocket /> Ver Proyectos
          </motion.button>

          <motion.a
            href="/cv.pdf" // ⚠️ Asegúrate de que el archivo esté en /public/cv.pdf
            download
            className="px-8 py-4 border-2 border-gray-400 rounded-full font-semibold text-lg flex items-center gap-2 hover:border-white hover:bg-white/10"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload /> Descargar CV
          </motion.a>
        </motion.div>

        {/* Flecha scroll hacia abajo */}
        <motion.div className="mt-16 flex justify-center" variants={fadeInUp}>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="cursor-pointer"
            onClick={() => onNavigate('about')}
          >
            <FaChevronDown size={24} className="text-gray-400" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
