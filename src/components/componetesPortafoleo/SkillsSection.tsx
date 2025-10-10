import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, easeOut, easeInOut } from 'framer-motion';
import { FaGithub, FaMobile, FaChevronDown, FaReact, FaNodeJs, FaLaravel, FaPhp, FaPython, FaDatabase, FaHtml5, FaJs, FaFire, FaEye, FaEyeSlash } from 'react-icons/fa';

// Interfaces primero (fuera del componente)
interface ExpandedSkills {
  [key: string]: boolean;
}

const SkillsSection = () => {
  const [expandedSkills, setExpandedSkills] = useState<ExpandedSkills>({});
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Usar HTMLElement ya que usas <section> tags en tu JSX
  type SectionId = "home" | "about" | "skills" | "projects" | "contact";

  const sectionRefs: Record<SectionId, React.MutableRefObject<HTMLElement | null>> = {
    home: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  // Skills array moved here, before being used
  const skills = [
    {
      name: 'React',
      icon: FaReact,
      category: 'Frontend',
      experience: 'Avanzado',
      description: 'Desarrollo de aplicaciones web modernas y componentes reutilizables',
      expandedDescription: 'Experiencia desarrollando SPAs complejas con React, incluyendo hooks personalizados, context API, y optimización de rendimiento. He trabajado con librerías como React Router, Redux, y testing con Jest.',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      name: 'Node.js',
      icon: FaNodeJs,
      category: 'Backend',
      experience: 'Intermedio',
      description: 'Creación de APIs RESTful y servicios del lado del servidor',
      expandedDescription: 'Desarrollo de APIs robustas con Express.js, manejo de autenticación JWT, integración con bases de datos, middleware personalizado y despliegue en servicios cloud.',
      color: 'from-green-400 to-emerald-400'
    },
    {
      name: 'Laravel',
      icon: FaLaravel,
      category: 'Backend',
      experience: 'Intermedio',
      description: 'Framework PHP para desarrollo web robusto y escalable',
      expandedDescription: 'Implementación de arquitectura MVC, Eloquent ORM, autenticación con Sanctum, creación de APIs, migraciones de base de datos y testing con PHPUnit.',
      color: 'from-red-400 to-orange-400'
    },
    {
      name: 'PHP',
      icon: FaPhp,
      category: 'Backend',
      experience: 'Básico',
      description: 'Programación del lado del servidor y desarrollo web dinámico',
      expandedDescription: 'Conocimientos en programación orientada a objetos, manejo de sesiones, conexiones a bases de datos MySQL, creación de formularios dinámicos y validación de datos.',
      color: 'from-purple-400 to-indigo-400'
    },
    {
      name: 'React Native',
      icon: FaMobile,
      category: 'Mobile',
      experience: 'Básico',
      description: 'Desarrollo de aplicaciones móviles multiplataforma',
      expandedDescription: 'Desarrollo de apps móviles con navegación nativa, integración de APIs, manejo de estado con Redux, implementación de notificaciones push y testing en dispositivos reales.',
      color: 'from-pink-400 to-purple-400'
    },
    {
      name: 'MySQL',
      icon: FaDatabase,
      category: 'Database',
      experience: 'Básico',
      description: 'Gestión de bases de datos relacionales y consultas SQL',
      expandedDescription: 'Diseño de esquemas de base de datos, optimización de consultas, creación de índices, procedimientos almacenados, triggers y respaldos automatizados.',
      color: 'from-orange-400 to-yellow-400'
    },
    {
      name: 'Python',
      icon: FaPython,
      category: 'Backend',
      experience: 'Principiante',
      description: 'Programación general y desarrollo de scripts',
      expandedDescription: 'Experiencia con Django para desarrollo web, automatización de tareas, análisis de datos con pandas, creación de APIs con FastAPI y scripting para automatización.',
      color: 'from-yellow-400 to-green-400'
    },
    {
      name: 'Firebase',
      icon: FaFire,
      category: 'Database',
      experience: 'Principiante',
      description: 'Plataforma de desarrollo de aplicaciones y base de datos en tiempo real',
      expandedDescription: 'Implementación de autenticación, Firestore para bases de datos NoSQL, Firebase Storage, Cloud Functions, hosting y analytics para aplicaciones web y móviles.',
      color: 'from-orange-400 to-red-400'
    },
    {
      name: 'HTML & CSS',
      icon: FaHtml5,
      category: 'Frontend',
      experience: 'Avanzado',
      description: 'Estructura y estilizado de páginas web modernas y responsivas',
      expandedDescription: 'Dominio de HTML5 semántico, CSS3 avanzado con Flexbox y Grid, animaciones, preprocesadores como Sass, metodologías BEM y diseño responsive.',
      color: 'from-blue-400 to-purple-400'
    },
    {
      name: 'JavaScript',
      icon: FaJs,
      category: 'Frontend',
      experience: 'Avanzado',
      description: 'Programación del lado del cliente y lógica de aplicaciones web',
      expandedDescription: 'ES6+, programación asíncrona con async/await, manipulación del DOM, APIs modernas del navegador, módulos, webpack y herramientas de desarrollo.',
      color: 'from-yellow-400 to-orange-400'
    },
    {
      name: 'Git Hub',
      icon: FaGithub,
      category: 'Tools',
      experience: 'Intermedio',
      description: 'Control de versiones y colaboración en proyectos de software',
      expandedDescription: 'Flujo de trabajo con Git, branching strategies, pull requests, code reviews, GitHub Actions para CI/CD, y gestión de repositorios colaborativos.',
      color: 'from-purple-400 to-blue-600'
    }
  ];

  // Now visibleSkills can be computed after skills is defined
  const visibleSkills = showAllSkills ? skills : skills.slice(0, 6);

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case 'Avanzado': return 'text-green-400';
      case 'Intermedio': return 'text-blue-400';
      case 'Básico': return 'text-yellow-400';
      case 'Principiante': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getExperienceIcon = (experience: string) => {
    switch (experience) {
      case 'Avanzado': return '⭐⭐⭐⭐⭐';
      case 'Intermedio': return '⭐⭐⭐⭐';
      case 'Básico': return '⭐⭐⭐';
      case 'Principiante': return '⭐⭐';
      default: return '⭐';
    }
  };

  const toggleSkillExpansion = (skillName: string) => {
    setExpandedSkills(prev => ({
      ...prev,
      [skillName]: !prev[skillName]
    }));
  };

  const toggleShowAllSkills = () => {
    setShowAllSkills(!showAllSkills);
  };

  // Enhanced animation variants
  const fadeInUp = {
    initial: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const skillCardVariants = {
    initial: { 
      opacity: 0, 
      y: 40,
      rotateX: -15,
      scale: 0.9
    },
    animate: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easeOut
      }
    },
    hover: {
      y: -12,
      scale: 1.03,
      rotateX: 5,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: easeOut
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.2, 
      rotate: 10,
      transition: {
        duration: 0.3,
        ease: easeInOut
      }
    },
    tap: { 
      scale: 0.9,
      rotate: -5
    }
  };

  const progressBarVariants = {
    initial: { scaleX: 0, opacity: 0 },
    animate: { 
      scaleX: 1, 
      opacity: 0.3,
      transition: {
        duration: 1.2,
        ease: easeOut,
        delay: 0.3
      }
    },
    hover: {
      opacity: 0.8,
      scaleY: 1.5,
      transition: {
        duration: 0.2
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-2, 2, -2],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: easeInOut
      }
    }
  };

  return (
    <div id="skills" className="relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/5 to-cyan-400/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <section ref={sectionRefs.skills} className="min-h-screen py-20 px-4 relative">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent relative"
            variants={fadeInUp}
          >
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Habilidades Técnicas
            </motion.span>
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </motion.h2>

          {/* Skills Grid Container */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                layout
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {visibleSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="group relative"
                    variants={skillCardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    whileTap="tap"
                    onHoverStart={() => setHoveredSkill(skill.name)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    layout
                    transition={{ 
                      delay: index * 0.1,
                      layout: { duration: 0.5 }
                    }}
                    style={{ perspective: 1000 }}
                  >
                    {/* Card container with glass effect */}
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-500">
                      
                      {/* Animated background gradient with improved effect */}
                      <motion.div 
                        className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-20`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ 
                          opacity: 0.15, 
                          scale: 1.1,
                          transition: { duration: 0.4 }
                        }}
                      />
                      
                      {/* Animated border glow */}
                      <motion.div
                        className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100`}
                        style={{
                          background: `linear-gradient(45deg, transparent, ${skill.color.includes('blue') ? '#3b82f6' : skill.color.includes('green') ? '#10b981' : skill.color.includes('red') ? '#ef4444' : skill.color.includes('purple') ? '#8b5cf6' : skill.color.includes('yellow') ? '#f59e0b' : skill.color.includes('pink') ? '#ec4899' : '#6b7280'}20, transparent)`,
                          backgroundSize: '200% 200%'
                        }}
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />

                      <div className="relative z-10 p-8">
                        {/* Top section with enhanced icon animation */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center">
                            <motion.div 
                              className={`w-16 h-16 bg-gradient-to-br ${skill.color} rounded-2xl flex items-center justify-center mr-6 shadow-xl relative overflow-hidden`}
                              variants={iconVariants}
                              whileHover="hover"
                              whileTap="tap"
                            >
                              {/* Icon background animation */}
                              <motion.div
                                className="absolute inset-0 bg-white/10 rounded-2xl"
                                animate={{
                                  scale: hoveredSkill === skill.name ? [1, 1.2, 1] : 1,
                                  opacity: hoveredSkill === skill.name ? [0.1, 0.3, 0.1] : 0.1
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: hoveredSkill === skill.name ? Infinity : 0
                                }}
                              />
                              <motion.div
                                animate={hoveredSkill === skill.name ? floatingVariants.animate : {}}
                              >
                                <skill.icon size={28} className="relative z-10 drop-shadow-lg" />
                              </motion.div>
                            </motion.div>
                            
                            <div>
                              <motion.h3 
                                className="text-xl font-bold text-white mb-1"
                                initial={{ opacity: 0.8 }}
                                whileHover={{ opacity: 1 }}
                              >
                                {skill.name}
                              </motion.h3>
                              <motion.span 
                                className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full"
                                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                              >
                                {skill.category}
                              </motion.span>
                            </div>
                          </div>

                          <div className="text-right">
                            <motion.div 
                              className="text-sm mb-2"
                              animate={{
                                scale: hoveredSkill === skill.name ? [1, 1.1, 1] : 1
                              }}
                              transition={{
                                duration: 1,
                                repeat: hoveredSkill === skill.name ? Infinity : 0
                              }}
                            >
                              {getExperienceIcon(skill.experience)}
                            </motion.div>
                            <div className={`text-sm font-bold ${getExperienceColor(skill.experience)} bg-white/5 px-2 py-1 rounded-lg`}>
                              {skill.experience}
                            </div>
                          </div>
                        </div>

                        {/* Enhanced description section */}
                        <div className="relative mb-4">
                          <motion.p
                            className="text-gray-300 text-sm leading-relaxed transition-all duration-300"
                            animate={{
                              height: expandedSkills[skill.name] ? 'auto' : 'auto'
                            }}
                          >
                            {expandedSkills[skill.name] ? skill.expandedDescription : skill.description}
                          </motion.p>
                        </div>

                        {/* Enhanced see more/less button */}
                        <motion.button
                          onClick={() => toggleSkillExpansion(skill.name)}
                          className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors mb-6 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg group/btn"
                          whileHover={{ scale: 1.05, x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div
                            animate={{ rotate: expandedSkills[skill.name] ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {expandedSkills[skill.name] ? (
                              <FaEyeSlash size={12} />
                            ) : (
                              <FaEye size={12} />
                            )}
                          </motion.div>
                          <span className="group-hover/btn:translate-x-1 transition-transform">
                            {expandedSkills[skill.name] ? 'Ver menos' : 'Ver más'}
                          </span>
                        </motion.button>

                        {/* Enhanced decorative progress bar */}
                        <div className="flex items-center gap-3">
                          <motion.div 
                            className={`h-2 bg-gradient-to-r ${skill.color} rounded-full flex-1 origin-left`}
                            variants={progressBarVariants}
                            initial="initial"
                            animate="animate"
                            whileHover="hover"
                          />
                          <motion.div 
                            className={`w-3 h-3 bg-gradient-to-r ${skill.color} rounded-full shadow-lg`}
                            animate={{
                              scale: hoveredSkill === skill.name ? [1, 1.3, 1] : 1,
                              boxShadow: hoveredSkill === skill.name ? 
                                ['0 0 0 rgba(139, 92, 246, 0)', '0 0 20px rgba(139, 92, 246, 0.5)', '0 0 0 rgba(139, 92, 246, 0)'] : 
                                '0 0 0 rgba(139, 92, 246, 0)'
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: hoveredSkill === skill.name ? Infinity : 0
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enhanced Ver más/menos button */}
          {skills.length > 6 && (
            <motion.div
              className="flex justify-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                onClick={toggleShowAllSkills}
                className="group relative flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-2xl text-white font-bold shadow-xl hover:shadow-2xl overflow-hidden"
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                layout
              >
                {/* Button background animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20"
                  initial={{ x: '-100%' }}
                  whileHover={{ 
                    x: '100%',
                    transition: { duration: 0.6 }
                  }}
                />
                
                <motion.span 
                  className="text-lg relative z-10"
                  animate={{ 
                    backgroundPosition: showAllSkills ? ['0%', '100%'] : ['100%', '0%']
                  }}
                >
                  {showAllSkills ? 'Ver menos habilidades' : `Ver todas las habilidades (${skills.length})`}
                </motion.span>
                
                <motion.div
                  animate={{ 
                    rotate: showAllSkills ? 180 : 0,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 0.4 },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                  className="relative z-10"
                >
                  <FaChevronDown size={18} />
                </motion.div>
              </motion.button>
            </motion.div>
          )}

          {/* Enhanced Experience Legend */}
          <motion.div
            className="mt-16 flex flex-wrap justify-center gap-8"
            variants={fadeInUp}
          >
            {[
              { level: 'Avanzado', stars: '⭐⭐⭐⭐⭐', color: 'text-green-400' },
              { level: 'Intermedio', stars: '⭐⭐⭐⭐', color: 'text-blue-400' },
              { level: 'Básico', stars: '⭐⭐⭐', color: 'text-yellow-400' },
              { level: 'Principiante', stars: '⭐⭐', color: 'text-orange-400' }
            ].map((item, index) => (
              <motion.div
                key={item.level}
                className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(255,255,255,0.1)",
                  transition: { duration: 0.2 }
                }}
              >
                <motion.span 
                  className={item.color}
                  animate={{
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                >
                  {item.stars}
                </motion.span>
                <span className="text-sm text-gray-300 font-medium">{item.level}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default SkillsSection;