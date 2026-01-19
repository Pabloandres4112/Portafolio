// components/Hero.tsx
import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaDownload, FaEnvelope, FaChevronDown } from "react-icons/fa";
import { useTheme } from '../../contexts/ThemeContext';
import { translations } from '../../translations/translations';

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
  const { language } = useTheme();
  const t = translations[language];

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
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-purple-500 dark:to-pink-500 p-1 shadow-lg shadow-blue-500/30 dark:shadow-purple-500/20">
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center border-4 border-white dark:border-gray-800">
              <span className="text-4xl">👨‍💻</span>
            </div>
          </div>
        </motion.div>

        {/* Título principal */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight"
          variants={fadeInUp}
        >
          {t.hero.title}
        </motion.h1>

        {/* Subtítulo claro y enfocado */}
        <motion.h2
          className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-purple-100 mb-6"
          variants={fadeInUp}
        >
          {t.hero.subtitle}
        </motion.h2>

        {/* Descripción profesional */}
        <motion.p
          className="text-lg text-gray-800 dark:text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed"
          variants={fadeInUp}
        >
          {t.hero.description}
        </motion.p>

        {/* Botones de acción */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={fadeInUp}
        >
          {/* Ver proyectos */}
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 rounded-full font-semibold text-lg text-white flex items-center gap-2 shadow-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate("projects")}
          >
            <FaRocket /> {t.hero.viewProjects}
          </motion.button>

          {/* Descargar CV */}
          <motion.a
            href="/cv/PabloAndres_CV.pdf"
            download
            className="px-8 py-4 border-2 border-gray-400 dark:border-purple-400 text-gray-900 dark:text-purple-200 rounded-full font-semibold text-lg flex items-center gap-2 hover:border-blue-600 hover:bg-blue-50 dark:hover:border-purple-300 dark:hover:bg-purple-900/40 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload /> {t.hero.downloadCV}
          </motion.a>

          {/* Contactar */}
          <motion.a
            href="mailto:perdomo4112@gmail.com?subject=Interesado%20en%20tu%20perfil"
            className="px-8 py-4 border-2 border-gray-400 dark:border-purple-400 text-gray-900 dark:text-purple-200 rounded-full font-semibold text-lg flex items-center gap-2 hover:border-purple-600 hover:bg-purple-50 dark:hover:border-purple-300 dark:hover:bg-purple-900/40 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope /> {t.hero.contact}
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
            <FaChevronDown size={28} className="text-gray-700 dark:text-gray-400" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
