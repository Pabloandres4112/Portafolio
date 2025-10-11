import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import type { Variants, TargetAndTransition } from 'framer-motion';


/**
 *  DEFINICIÓN DE TIPOS
 * Define la estructura de datos para cada planeta del sistema solar
 */
interface Planet {
  name: string;           // Nombre en español
  nameEn: string;        // Nombre en inglés (usado como ID único)
  size: number;          // Tamaño visual del planeta en píxeles
  color: string;         // Color primario del planeta
  secondaryColor: string; // Color secundario para gradientes
  glowColor: string;     // Color del resplandor/aura
  orbitRadius: number;   // Radio de la órbita desde el centro
  orbitalPeriod: number; // Período orbital en unidades de tiempo
  rotationSpeed: number; // Velocidad de rotación sobre su eje
  description: string;   // Descripción general del planeta
  facts: string[];       // Datos curiosos e interesantes
  distance: string;      // Distancia real al Sol
  diameter: string;      // Diámetro real del planeta
}

/**
 * Interfaz para las estrellas de fondo
 */
interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
}

/**
 * 🌞 DATOS DEL SISTEMA SOLAR
 * Contiene información completa y científicamente precisa de los 8 planetas
 */
const PLANETS: readonly Planet[] = [

  { 
    name: 'Mercurio', 
    nameEn: 'Mercury',
    size: 12, 
    color: '#8B7355', 
    secondaryColor: '#A0826D',
    glowColor: '#C9A581', 
    orbitRadius: 70, 
    orbitalPeriod: 8.8,
    rotationSpeed: 58.6,
    description: 'El planeta más cercano al Sol y el más pequeño del sistema solar',
    facts: [
      'Un año mercuriano dura solo 88 días terrestres',
      'Sus temperaturas varían entre -173°C y 427°C',
      'No tiene atmósfera significativa ni lunas'
    ],
    distance: '57.9 millones de km del Sol',
    diameter: '4,879 km'
  },
  { 
    name: 'Venus', 
    nameEn: 'Venus',
    size: 18, 
    color: '#FDB813', 
    secondaryColor: '#E8B004',
    glowColor: '#FFD700', 
    orbitRadius: 105, 
    orbitalPeriod: 22.5,
    rotationSpeed: 243,
    description: 'El planeta más caliente y brillante en el cielo nocturno',
    facts: [
      'Su atmósfera densa causa un efecto invernadero extremo',
      'Rota en dirección opuesta a la mayoría de planetas',
      'Un día venusiano dura más que un año venusiano'
    ],
    distance: '108.2 millones de km del Sol',
    diameter: '12,104 km'
  },
  { 
    name: 'Tierra', 
    nameEn: 'Earth',
    size: 20, 
    color: '#4169E1', 
    secondaryColor: '#1E90FF',
    glowColor: '#00BFFF', 
    orbitRadius: 145, 
    orbitalPeriod: 36.5,
    rotationSpeed: 1,
    description: 'Nuestro hogar, el único planeta conocido con vida',
    facts: [
      '71% de su superficie está cubierta por agua',
      'Tiene un campo magnético que nos protege de la radiación solar',
      'Su atmósfera única permite la vida tal como la conocemos'
    ],
    distance: '149.6 millones de km del Sol',
    diameter: '12,742 km'
  },
  { 
    name: 'Marte', 
    nameEn: 'Mars',
    size: 14, 
    color: '#CD5C5C', 
    secondaryColor: '#DC143C',
    glowColor: '#FF6347', 
    orbitRadius: 185, 
    orbitalPeriod: 68.7,
    rotationSpeed: 1.03,
    description: 'El planeta rojo, objetivo principal de exploración espacial',
    facts: [
      'Alberga el volcán más grande del sistema solar: Monte Olimpo',
      'Tiene dos pequeñas lunas: Fobos y Deimos',
      'Evidencia sugiere que alguna vez tuvo agua líquida'
    ],
    distance: '227.9 millones de km del Sol',
    diameter: '6,779 km'
  },
  { 
    name: 'Júpiter', 
    nameEn: 'Jupiter',
    size: 40, 
    color: '#DAA520', 
    secondaryColor: '#B8860B',
    glowColor: '#FFD700', 
    orbitRadius: 270, 
    orbitalPeriod: 120,
    rotationSpeed: 0.41,
    description: 'El gigante gaseoso, el planeta más grande del sistema solar',
    facts: [
      'Su Gran Mancha Roja es una tormenta del tamaño de la Tierra',
      'Tiene al menos 79 lunas conocidas',
      'Su campo magnético es 20,000 veces más fuerte que el de la Tierra'
    ],
    distance: '778.5 millones de km del Sol',
    diameter: '139,820 km'
  },
  { 
    name: 'Saturno', 
    nameEn: 'Saturn',
    size: 36, 
    color: '#F4C542', 
    secondaryColor: '#E6B840',
    glowColor: '#FFE680', 
    orbitRadius: 350, 
    orbitalPeriod: 295,
    rotationSpeed: 0.45,
    description: 'El señor de los anillos, famoso por su espectacular sistema de anillos',
    facts: [
      'Sus anillos están compuestos principalmente de hielo y roca',
      'Tiene 82 lunas confirmadas, siendo Titán la más grande',
      'Es el planeta menos denso, podría flotar en agua'
    ],
    distance: '1,434 millones de km del Sol',
    diameter: '116,460 km'
  },
  { 
    name: 'Urano', 
    nameEn: 'Uranus',
    size: 28, 
    color: '#4FD0E0', 
    secondaryColor: '#40B8C8',
    glowColor: '#7FDBFF', 
    orbitRadius: 420, 
    orbitalPeriod: 840,
    rotationSpeed: 0.72,
    description: 'El gigante helado que gira de lado',
    facts: [
      'Su eje de rotación está inclinado 98 grados',
      'Tiene 27 lunas conocidas, nombradas por personajes de Shakespeare',
      'Su atmósfera contiene metano, dándole su color azul verdoso'
    ],
    distance: '2,871 millones de km del Sol',
    diameter: '50,724 km'
  },
  { 
    name: 'Neptuno', 
    nameEn: 'Neptune',
    size: 26, 
    color: '#4169E1', 
    secondaryColor: '#1E3A8A',
    glowColor: '#5B9BD5', 
    orbitRadius: 480, 
    orbitalPeriod: 1650,
    rotationSpeed: 0.67,
    description: 'El planeta más lejano, con los vientos más rápidos del sistema solar',
    facts: [
      'Los vientos pueden alcanzar velocidades de 2,100 km/h',
      'Tiene 14 lunas conocidas, siendo Tritón la más grande',
      'Fue el primer planeta descubierto mediante cálculos matemáticos'
    ],
    distance: '4,495 millones de km del Sol',
    diameter: '49,244 km'
  },
] as const;

/**
 * ⚙️ CONFIGURACIÓN GLOBAL
 */

const SUN_SIZE = 70;              // Tamaño del Sol en píxeles
const STAR_COUNT = 150;           // Número de estrellas en el fondo
const PAUSED_PLANET_SPACING = 60; // Espaciado entre planetas cuando están pausados (no usado actualmente)
void PAUSED_PLANET_SPACING;

/**
 * 🎨 COMPONENTE PRINCIPAL: Avatar3D
 * Visualización interactiva del sistema solar con animaciones y datos educativos
 */
const Avatar3D: React.FC = () => {
  // 📊 Estados del componente
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null); // Planeta actualmente seleccionado
  const [isPaused, setIsPaused] = useState<boolean>(false);                  // Estado de pausa de la animación
  const [showInfo, setShowInfo] = useState<boolean>(false);                  // Controla la visibilidad del modal
  const [currentRotations, setCurrentRotations] = useState<Record<string, number>>({}); // Rotaciones actuales de cada planeta
  const controls = useAnimation(); // Controles de animación de Framer Motion

  /**
   * 🌟 Generación de estrellas de fondo
   * Crea un array de estrellas con propiedades aleatorias para el fondo animado
   */
  const stars: Star[] = useMemo(() => 
    Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,              // Posición X en porcentaje
      y: Math.random() * 100,              // Posición Y en porcentaje
      size: Math.random() * 2.5 + 0.5,     // Tamaño entre 0.5 y 3px
      opacity: Math.random() * 0.6 + 0.3,  // Opacidad entre 0.3 y 0.9
      delay: Math.random() * 3,            // Retraso de animación
      duration: Math.random() * 2 + 2      // Duración de animación entre 2 y 4s
    }))
  , []);

  /**
   * ⏸️ Manejo de pausa/reanudación
   * Guarda las rotaciones actuales de los planetas antes de pausar
   * para reanudar desde la misma posición
   */
  const handlePause = useCallback(() => {
    if (!isPaused) {
      const rotations: Record<string, number> = {};
      PLANETS.forEach((planet) => {
        const element = document.getElementById(`planet-orbit-${planet.nameEn}`);
        if (element) {
          const transform = window.getComputedStyle(element).transform;
          if (transform !== 'none') {
            // Extrae el ángulo de rotación de la matriz de transformación
            const matrix = new DOMMatrix(transform);
            const angle = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);
            rotations[planet.nameEn] = angle;
          }
        }
      });
      setCurrentRotations(rotations);
    }
    setIsPaused(!isPaused);
  }, [isPaused]);

  /**
   * 🎬 Efecto para controlar animaciones según el estado de pausa
   */
  useEffect(() => {
    if (isPaused) {
      controls.start('paused');
    } else {
      controls.start('rotating');
    }
  }, [isPaused, controls]);

  /**
   * 🖱️ Manejo de clic en planeta
   * Abre el modal de información del planeta seleccionado
   */
  const handlePlanetClick = useCallback((planet: Planet) => {
    setSelectedPlanet(planet);
    setShowInfo(true);
  }, []);

  /**
   * ❌ Cierre del modal
   * Cierra el modal con animación de salida
   */
  const handleCloseModal = useCallback(() => {
    setShowInfo(false);
    setTimeout(() => setSelectedPlanet(null), 300); // Espera a que termine la animación
  }, []);

  /**
   * 🔄 Variantes de animación para las órbitas
   * Define los estados de rotación (activo) y pausa
   */
const orbitVariants: Variants = {
  rotating: (planet: Planet): TargetAndTransition => ({
    rotate: 360,
    transition: {
      duration: planet.orbitalPeriod / 10,
      repeat: Infinity,
      ease: "linear",
    },
  }),
  paused: (planet: Planet): TargetAndTransition => ({
    rotate: currentRotations[planet.nameEn] || 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  }),
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 font-sans overflow-hidden relative">
      
      {/* ⭐ Campo de estrellas animadas */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            filter: 'blur(0.5px)',
            boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,${star.opacity})`
          }}
          animate={{
            opacity: [star.opacity, star.opacity + 0.4, star.opacity],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* 🎯 Contenedor principal del sistema solar */}
      <div className="relative w-[98vw] h-[98vh] max-w-[1100px] max-h-[1100px] rounded-3xl bg-gradient-to-br from-black/40 via-purple-900/20 to-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-purple-500/30 flex items-center justify-center overflow-hidden">

        {/* 📋 Panel superior de información y controles */}
        <div className="absolute top-6 left-6 right-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-10">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Sistema Solar
            </h1>
            <p className="text-white/50 text-xs sm:text-sm">
              Exploración interactiva del cosmos
            </p>
          </div>
          
          {/* ⏯️ Botón de pausa/reanudación */}
          <div className="flex gap-2">
            <button
              onClick={handlePause}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-600 hover:to-pink-600 text-white text-sm font-medium backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 flex items-center gap-2"
            >
              {isPaused ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Reanudar
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM13 3a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2z" />
                  </svg>
                  Pausar
                </>
              )}
            </button>
          </div>
        </div>

        {/* ☀️ Sol central con efectos de resplandor */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: SUN_SIZE,
            height: SUN_SIZE,
            background: 'radial-gradient(circle at 35% 35%, #FFF9E6 0%, #FFE485 25%, #FFB703 50%, #FB8500 75%, #D66A00 100%)',
            boxShadow: `
              0 0 40px 15px rgba(255,183,3,0.9),
              0 0 80px 30px rgba(255,183,3,0.6),
              0 0 120px 50px rgba(255,183,3,0.3),
              inset 0 0 30px rgba(255,255,255,0.3)
            `
          }}
          animate={isPaused ? {} : { 
            scale: [1, 1.05, 1], 
            opacity: [0.98, 1, 0.98],
            rotate: 360
          }}
          transition={{ 
            scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 40, repeat: Infinity, ease: 'linear' }
          }}
        >
          {/* Núcleo brillante del Sol */}
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-yellow-100 via-orange-200 to-transparent opacity-80" />
          
          {/* Manchas solares animadas */}
          <motion.div 
            className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-orange-700/40"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-orange-700/40"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Etiqueta del Sol */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-orange-300 text-sm font-semibold whitespace-nowrap">
            Sol
          </div>
        </motion.div>

        {/* 🪐 Renderizado de planetas y órbitas */}
        {PLANETS.map((planet) => (
          <React.Fragment key={planet.nameEn}>
            {/* Órbita visible */}
            <motion.div
              className="absolute rounded-full border border-white/10"
              style={{ 
                width: planet.orbitRadius * 2, 
                height: planet.orbitRadius * 2,
                pointerEvents: 'none',
                background: `radial-gradient(circle, transparent 0%, rgba(255,255,255,0.01) 100%)`
              }}
              animate={isPaused ? {} : {
                borderColor: ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Contenedor de órbita del planeta */}
            <motion.div
              id={`planet-orbit-${planet.nameEn}`}
              className="absolute rounded-full"
              style={{ 
                width: planet.orbitRadius * 2, 
                height: planet.orbitRadius * 2,
                pointerEvents: 'none'
              }}
              variants={orbitVariants}
              initial="rotating"
              animate={controls}
              custom={planet}
            >
              {/* Planeta con efectos visuales */}
              <motion.div
                className="absolute top-1/2 left-1/2 rounded-full cursor-pointer pointer-events-auto group"
                style={{
                  width: planet.size,
                  height: planet.size,
                  marginTop: -planet.size / 2,
                  marginLeft: planet.orbitRadius - planet.size / 2,
                  background: `radial-gradient(circle at 30% 30%, ${planet.secondaryColor}, ${planet.color})`,
                  boxShadow: `
                    0 0 ${planet.size}px ${planet.size / 4}px ${planet.glowColor}DD,
                    inset -${planet.size / 4}px -${planet.size / 4}px ${planet.size / 2}px rgba(0,0,0,0.4),
                    inset ${planet.size / 6}px ${planet.size / 6}px ${planet.size / 3}px rgba(255,255,255,0.2)
                  `
                }}
                onClick={() => handlePlanetClick(planet)}
                whileHover={{ 
                  scale: 1.4,
                  zIndex: 50,
                  boxShadow: `
                    0 0 ${planet.size * 2}px ${planet.size / 2}px ${planet.glowColor}FF,
                    inset -${planet.size / 4}px -${planet.size / 4}px ${planet.size / 2}px rgba(0,0,0,0.4),
                    inset ${planet.size / 6}px ${planet.size / 6}px ${planet.size / 3}px rgba(255,255,255,0.2)
                  `
                }}
                whileTap={{ scale: 1.2 }}
                animate={isPaused ? {} : { rotate: -360 }}
                transition={{ 
                  rotate: { 
                    duration: planet.rotationSpeed * 2, 
                    repeat: Infinity, 
                    ease: 'linear' 
                  }
                }}
              >
                {/* Brillo interno dinámico */}
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  style={{ 
                    background: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.5), transparent 50%)` 
                  }}
                  animate={isPaused ? {} : {
                    opacity: [0.6, 0.9, 0.6]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* 🌍 Características especiales de la Tierra */}
                {planet.nameEn === 'Earth' && (
                  <>
                    <motion.div 
                      className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-green-700/60"
                      animate={{ x: [-10, 0, -10] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div 
                      className="absolute bottom-1/3 left-1/4 w-3 h-2 rounded-full bg-green-600/50"
                      animate={{ x: [-10, 0, -10] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                    />
                  </>
                )}

                {/* 💍 Anillos de Saturno */}
                {planet.nameEn === 'Saturn' && (
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 opacity-70"
                    style={{
                      width: planet.size * 1.8,
                      height: planet.size * 0.4,
                      borderColor: planet.glowColor,
                      boxShadow: `0 0 10px ${planet.glowColor}`
                    }}
                  />
                )}

                {/* 🏷️ Etiqueta del planeta (visible al hover) */}
                <motion.div 
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  animate={isPaused ? {} : { rotate: 360 }}
                  transition={{ 
                    duration: planet.rotationSpeed * 2, 
                    repeat: Infinity, 
                    ease: 'linear' 
                  }}
                >
                  <div className="bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20">
                    <div className="text-xs sm:text-sm text-white font-medium">{planet.name}</div>
                    <div className="text-[10px] text-white/60">{planet.diameter}</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </React.Fragment>
        ))}

        {/* 📊 Panel inferior con botones de acceso rápido */}
        <div className="absolute bottom-6 left-6 right-6 bg-black/40 backdrop-blur-lg rounded-2xl border border-white/10 p-4">
          <div className="flex flex-wrap justify-center gap-2 text-[10px] sm:text-xs">
            {PLANETS.map((planet) => (
              <motion.button
                key={planet.nameEn}
                onClick={() => handlePlanetClick(planet)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-105"
                whileHover={{ y: -2 }}
              >
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ 
                    background: `radial-gradient(circle, ${planet.secondaryColor}, ${planet.color})`,
                    boxShadow: `0 0 8px ${planet.glowColor}` 
                  }}
                />
                <span className="text-white font-medium">{planet.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* 📱 Modal de información del planeta */}
      <AnimatePresence>
        {selectedPlanet && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="relative w-full max-w-4xl rounded-3xl bg-gradient-to-br from-slate-900/95 via-purple-900/95 to-slate-900/95 border border-purple-500/30 shadow-2xl p-8 sm:p-12 text-white max-h-[90vh] overflow-y-auto backdrop-blur-xl"
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: showInfo ? 1 : 0.8, y: showInfo ? 0 : 50, opacity: showInfo ? 1 : 0 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ❌ Botón de cerrar */}
              <button
                onClick={handleCloseModal}
                className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-300 hover:rotate-90 z-10"
                aria-label="Cerrar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid md:grid-cols-2 gap-8">
                {/* 🎨 Columna izquierda: Visualización */}
                <div className="space-y-6">
                  <motion.h2 
                    className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {selectedPlanet.name}
                  </motion.h2>

                  {/* 🌐 Visualización 3D del planeta */}
                  <motion.div 
                    className="w-full aspect-square rounded-2xl border border-purple-500/30 bg-black/40 backdrop-blur-sm flex items-center justify-center overflow-hidden relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      className="rounded-full relative"
                      style={{
                        width: '60%',
                        paddingBottom: '60%',
                        background: `radial-gradient(circle at 30% 30%, ${selectedPlanet.secondaryColor}, ${selectedPlanet.color})`,
                        boxShadow: `
                          0 0 80px 30px ${selectedPlanet.glowColor}DD,
                          inset -30px -30px 60px rgba(0,0,0,0.5),
                          inset 20px 20px 40px rgba(255,255,255,0.2)
                        `
                      }}
                      animate={{
                        rotate: 360,
                        scale: [1, 1.02, 1]
                      }}
                      transition={{
                        rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
                        scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                      }}
                    >
                      {/* Brillo superior del planeta */}
                      <div 
                        className="absolute inset-0 rounded-full"
                        style={{ 
                          background: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.6), transparent 50%)` 
                        }}
                      />
                      
                      {/* 💍 Anillos de Saturno en el modal */}
                      {selectedPlanet.nameEn === 'Saturn' && (
                        <div 
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 opacity-80"
                          style={{
                            width: '140%',
                            height: '35%',
                            borderColor: selectedPlanet.glowColor,
                            boxShadow: `0 0 20px ${selectedPlanet.glowColor}`
                          }}
                        />
                      )}
                    </motion.div>

                    {/* Texto descriptivo */}
                    <div className="absolute bottom-4 text-white/40 text-xs sm:text-sm font-light">
                      Vista renderizada en 3D
                    </div>
                  </motion.div>
                </div>

                {/* 📖 Columna derecha: Información */}
                <div className="space-y-6">
                  <motion.p 
                    className="text-white/80 text-base leading-relaxed"
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedPlanet.description}
                  </motion.p>

                  {/* 📊 Datos técnicos del planeta */}
                  <motion.div 
                    className="grid grid-cols-2 gap-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="text-white/50 text-xs mb-1">Distancia al Sol</div>
                      <div className="text-white font-semibold text-sm">{selectedPlanet.distance}</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="text-white/50 text-xs mb-1">Diámetro</div>
                      <div className="text-white font-semibold text-sm">{selectedPlanet.diameter}</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="text-white/50 text-xs mb-1">Periodo orbital</div>
                      <div className="text-white font-semibold text-sm">{selectedPlanet.orbitalPeriod.toFixed(1)} días</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="text-white/50 text-xs mb-1">Rotación</div>
                      <div className="text-white font-semibold text-sm">{selectedPlanet.rotationSpeed.toFixed(2)} días</div>
                    </div>
                  </motion.div>

                  {/* 💡 Datos curiosos */}
                  <motion.div
                    className="space-y-3"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-lg font-semibold text-purple-300 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                      </svg>
                      Datos Fascinantes
                    </h3>
                    <div className="space-y-2">
                      {selectedPlanet.facts.map((fact, index) => (
                        <motion.div
                          key={index}
                          className="flex gap-3 p-3 bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg border-l-2 border-purple-500/50"
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 text-xs font-bold">
                            {index + 1}
                          </div>
                          <p className="text-white/80 text-sm leading-relaxed">{fact}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* 🔍 Botón de exploración */}
                  <motion.button
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white font-semibold text-base transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCloseModal}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Explorar otro planeta
                  </motion.button>
                </div>
              </div>

              {/* ✨ Efecto de brillo en el borde del modal */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none">
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${selectedPlanet.glowColor}40, transparent)`
                  }}
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Avatar3D;