// components/About.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { FaCode } from 'react-icons/fa';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
};

const About: React.FC = () => {
  return (
    <section className="min-h-screen py-20 px-4">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          variants={fadeInUp}
        >
          Sobre Mí
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Imagen/Icono decorativo */}
          <motion.div variants={fadeInUp}>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl flex items-center justify-center">
                <span className="text-8xl">🚀</span>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <FaCode size={32} className="text-white" />
              </div>
            </div>
          </motion.div>

          {/* Texto descriptivo */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="text-3xl font-bold text-white">Desarrollador Full Stack en Formación</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Soy Andrés Perdomo, desarrollador frontend y backend, actualmente estudiante del SENA.
              Con alrededor de medio año de experiencia práctica, he trabajado en proyectos como sistemas
              de manejo de usuarios, inventarios y aplicaciones móviles.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Me apasiona el desarrollo de soluciones funcionales y modernas, explorando tanto el desarrollo
              web como móvil. Siempre estoy aprendiendo nuevas herramientas para mejorar mis habilidades
              y aportar en proyectos con impacto real.
            </p>

            {/* Tecnologías */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                <h4 className="font-semibold text-purple-400">Frontend</h4>
                <p className="text-sm text-gray-400">React, React Native, HTML, CSS, JavaScript</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                <h4 className="font-semibold text-purple-400">Backend</h4>
                <p className="text-sm text-gray-400">Node.js, PHP, Laravel, Python</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                <h4 className="font-semibold text-purple-400">Bases de Datos</h4>
                <p className="text-sm text-gray-400">MySQL, Firebase</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                <h4 className="font-semibold text-purple-400">Herramientas</h4>
                <p className="text-sm text-gray-400">Git, VS Code, Postman</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
