// components/Projects.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.15 } }
};

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Plataforma completa de comercio electrónico con React y Node.js.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&h=500&fit=crop',
    tech: ['React', 'Node.js', 'MongoDB'],
    github: '#',
    demo: '#'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Aplicación de gestión de tareas con funcionalidades avanzadas y Firebase.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=900&h=500&fit=crop',
    tech: ['React', 'Firebase', 'Tailwind'],
    github: '#',
    demo: '#'
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Dashboard del clima con visualización de datos en tiempo real y API abierta.',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=900&h=500&fit=crop',
    tech: ['React', 'API Integration', 'Charts.js'],
    github: '#',
    demo: '#'
  },
  {
    id: 4,
    title: 'Weather Dashboard',
    description: 'Dashboard del clima con visualización de datos en tiempo real y API abierta.',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=900&h=500&fit=crop',
    tech: ['React', 'API Integration', 'Charts.js'],
    github: '#',
    demo: '#'
  }
];

const Projects: React.FC = () => {
  return (
    <section className="min-h-screen py-20 px-6">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {/* Título principal */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          variants={fadeInUp}
        >
          Proyectos Destacados
        </motion.h2>

        {/* Contenedor flexible: tarjetas grandes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="relative bg-gradient-to-b from-gray-900/80 to-gray-800/60 rounded-3xl overflow-hidden shadow-lg border border-white/10 hover:border-purple-500/30 transition-all duration-500 group"
              variants={fadeInUp}
              whileHover={{ scale: 1.03, y: -8 }}
            >
              {/* Imagen */}
              <div className="relative h-56 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              {/* Contenido principal */}
              <div className="p-8 flex flex-col justify-between h-[calc(100%-14rem)]">
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-base leading-relaxed mb-5">
                    {project.description}
                  </p>
                </div>

                {/* Tecnologías */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-600/20 text-purple-300 text-sm rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Botones */}
                <div className="flex gap-5">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-purple-400 font-semibold transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FaGithub /> Código
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-pink-400 font-semibold transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FaExternalLinkAlt /> Demo
                  </motion.a>
                </div>
              </div>

              {/* Efecto luminoso del borde (suave y limpio) */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(130deg, rgba(168,85,247,0.15), rgba(236,72,153,0.15))',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
