// components/About.tsx
import React from "react";
import { motion } from "framer-motion";
import { FaCode } from "react-icons/fa";
import { useTheme } from '../../contexts/ThemeContext';
import { translations } from '../../translations/translations';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const About: React.FC = () => {
  const { language } = useTheme();
  const t = translations[language];

  return (
    <section
      id="about"
      className="min-h-screen py-20 px-4 flex items-center justify-center bg-transparent"
    >
      <motion.div
        className="max-w-6xl mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {/* 🔹 Título principal */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          variants={fadeInUp}
        >
          {t.about.title}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 🔹 Lado visual */}
          <motion.div variants={fadeInUp}>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-purple-600/20 dark:to-pink-600/20 rounded-2xl flex items-center justify-center shadow-xl border-2 border-gray-200 dark:border-transparent dark:shadow-purple-500/10">
                <span className="text-8xl">🚀</span>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-xl border-4 border-white dark:border-transparent dark:shadow-pink-500/20">
                <FaCode size={32} className="text-white" />
              </div>
            </div>
          </motion.div>

          {/* 🔹 Lado de texto */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="text-3xl font-bold text-black dark:text-white">
              {t.about.subtitle}
            </h3>

            <p className="text-gray-900 dark:text-gray-300 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: t.about.description1 }} />

            <p className="text-gray-900 dark:text-gray-300 text-lg leading-relaxed">
              {t.about.description2}
            </p>

            {/* 🔹 Tecnologías */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white dark:bg-white/5 p-4 rounded-lg border-2 border-gray-300 dark:border-transparent hover:border-blue-500 hover:shadow-lg dark:hover:bg-white/10 transition-all">
                <h4 className="font-semibold text-blue-600 dark:text-purple-400">{t.about.frontend}</h4>
                <p className="text-sm text-gray-800 dark:text-gray-400">
                  {t.about.frontendTech}
                </p>
              </div>

              <div className="bg-white dark:bg-white/5 p-4 rounded-lg border-2 border-gray-300 dark:border-transparent hover:border-purple-500 hover:shadow-lg dark:hover:bg-white/10 transition-all">
                <h4 className="font-semibold text-purple-600 dark:text-purple-400">{t.about.backend}</h4>
                <p className="text-sm text-gray-800 dark:text-gray-400">
                  {t.about.backendTech}
                </p>
              </div>

              <div className="bg-white dark:bg-white/5 p-4 rounded-lg border-2 border-gray-300 dark:border-transparent hover:border-pink-500 hover:shadow-lg dark:hover:bg-white/10 transition-all">
                <h4 className="font-semibold text-pink-600 dark:text-purple-400">{t.about.database}</h4>
                <p className="text-sm text-gray-800 dark:text-gray-400">{t.about.databaseTech}</p>
              </div>

              <div className="bg-white dark:bg-white/5 p-4 rounded-lg border-2 border-gray-300 dark:border-transparent hover:border-blue-500 hover:shadow-lg dark:hover:bg-white/10 transition-all">
                <h4 className="font-semibold text-blue-600 dark:text-purple-400">{t.about.tools}</h4>
                <p className="text-sm text-gray-800 dark:text-gray-400">{t.about.toolsTech}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
