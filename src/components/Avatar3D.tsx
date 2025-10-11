import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import type { Variants, TargetAndTransition } from 'framer-motion';


interface Moon {
  name: string;
  nameEn: string;
  size: number;
  color: string;
  secondaryColor: string;
  glowColor: string;
  orbitRadius: number;
  orbitalPeriod: number;
  rotationSpeed: number;
  description: string;
  facts: string[];
  distance: string;
  diameter: string;
}
/**
 * 🌍 DEFINICIÓN DE TIPOS
 * Define la estructura de datos para cada planeta del sistema solar
 */
interface Planet {
  name: string;           // Nombre en español
  nameEn: string;         // Nombre en inglés (ID único)
  size: number;           // Tamaño visual del planeta
  color: string;          // Color principal
  secondaryColor: string; // Color secundario
  glowColor: string;      // Color del resplandor
  orbitRadius: number;    // Radio de la órbita
  orbitalPeriod: number;  // Tiempo de traslación
  rotationSpeed: number;  // Velocidad de rotación
  description: string;    // Descripción general
  facts: string[];        // Datos curiosos
  distance: string;       // Distancia real
  diameter: string;       // Diámetro real
  isDwarf?: boolean;      // Indica si es un planeta enano
  moons?: Moon[];         // 🌓 Satélites naturales (opcional)
}

/**
 * Interfaz para el Sol
 */
interface SunData {
  name: string;
  nameEn: string;
  description: string;
  facts: string[];
  diameter: string;
  temperature: string;
  age: string;
  composition: string;
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
 * 🌞 DATOS DEL SOL
 */
const SUN_DATA: SunData = {
  name: 'Sol',
  nameEn: 'Sun',
  description: 'La estrella central de nuestro sistema solar, fuente de luz y energía para todos los planetas',
  facts: [
    'Es una estrella de tipo espectral G2V (enana amarilla)',
    'Contiene el 99.86% de la masa total del sistema solar',
    'En su núcleo, convierte 600 millones de toneladas de hidrógeno en helio cada segundo',
    'Su luz tarda aproximadamente 8 minutos en llegar a la Tierra',
    'Tiene una edad aproximada de 4,600 millones de años'
  ],
  diameter: '1,392,700 km',
  temperature: '5,500°C (superficie) / 15,000,000°C (núcleo)',
  age: '4,600 millones de años',
  composition: '73% Hidrógeno, 25% Helio, 2% otros elementos'
};

/**
 * 🌞 DATOS DEL SISTEMA SOLAR
 * Contiene información completa y científicamente precisa de los 8 planetas + Plutón
 */
const PLANETS: readonly Planet[] = [
  {
    name: 'Mercurio',
    nameEn: 'Mercury',
    size: 12,
    color: '#b8a47e',
    secondaryColor: '#8c7a5c',
    glowColor: '#e0c89b',
    orbitRadius: 70,
    orbitalPeriod: 8.8,
    rotationSpeed: 58.6,
    description: 'El planeta más pequeño y veloz, abrasado por la cercanía del Sol.',
    facts: [
      'Un año mercuriano dura solo 88 días terrestres.',
      'Las temperaturas oscilan entre -173°C y 427°C.',
      'Su superficie rocosa está cubierta de cráteres similares a los de la Luna.'
    ],
    distance: '57.9 millones de km del Sol',
    diameter: '4,879 km'
  },
  {
    name: 'Venus',
    nameEn: 'Venus',
    size: 18,
    color: '#e3b04b',
    secondaryColor: '#d49a2a',
    glowColor: '#ffd36b',
    orbitRadius: 105,
    orbitalPeriod: 22.5,
    rotationSpeed: 243,
    description: 'El planeta más brillante del cielo, envuelto en nubes de ácido sulfúrico.',
    facts: [
      'Tiene una atmósfera densa que atrapa el calor extremo.',
      'Rota lentamente y en dirección opuesta al resto de los planetas.',
      'Su superficie puede alcanzar temperaturas de 475°C.'
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
    diameter: '12,742 km',

    // 🌕 Agregamos la Luna aquí
    moons: [
      {
        name: 'Luna',
        nameEn: 'Moon',
        size: 6,
        color: '#C0C0C0',
        secondaryColor: '#A9A9A9',
        glowColor: '#E0E0E0',
        orbitRadius: 30, // distancia respecto a la Tierra (en tu escala visual)
        orbitalPeriod: 27.3, // días terrestres
        rotationSpeed: 27.3,
        description: 'El único satélite natural de la Tierra y el quinto más grande del sistema solar',
        facts: [
          'Siempre muestra la misma cara hacia la Tierra debido a la rotación síncrona',
          'Influye en las mareas terrestres con su gravedad',
          'Se formó hace unos 4.5 mil millones de años tras un gran impacto'
        ],
        distance: '384,400 km de la Tierra',
        diameter: '3,474 km'
      }
    ]
  },
  {
    name: 'Marte',
    nameEn: 'Mars',
    size: 14,
    color: '#d14949',
    secondaryColor: '#a93b3b',
    glowColor: '#ff6b6b',
    orbitRadius: 185,
    orbitalPeriod: 68.7,
    rotationSpeed: 1.03,
    description: 'El planeta rojo, con paisajes desérticos y montañas gigantescas.',
    facts: [
      'Tiene el volcán más alto del sistema solar: el Monte Olimpo.',
      'Sus dos lunas, Fobos y Deimos, son pequeñas y rocosas.',
      'Se cree que alguna vez tuvo ríos y océanos de agua líquida.'
    ],
    distance: '227.9 millones de km del Sol',
    diameter: '6,779 km'
  },
  {
    name: 'Júpiter',
    nameEn: 'Jupiter',
    size: 42,
    color: '#e0b97d',
    secondaryColor: '#b88a3e',
    glowColor: '#ffda8a',
    orbitRadius: 270,
    orbitalPeriod: 120,
    rotationSpeed: 0.41,
    description: 'El coloso gaseoso del sistema solar, con tormentas milenarias.',
    facts: [
      'Su Gran Mancha Roja es una tormenta que dura más de 300 años.',
      'Posee al menos 95 lunas conocidas, entre ellas Ganímedes y Europa.',
      'Su campo magnético es 20.000 veces más fuerte que el de la Tierra.'
    ],
    distance: '778.5 millones de km del Sol',
    diameter: '139,820 km'
  },
  {
    name: 'Saturno',
    nameEn: 'Saturn',
    size: 36,
    color: '#f4ce74',
    secondaryColor: '#d9b657',
    glowColor: '#ffe8a3',
    orbitRadius: 350,
    orbitalPeriod: 295,
    rotationSpeed: 0.45,
    description: 'El planeta de los anillos, un gigante de gas y belleza inigualable.',
    facts: [
      'Sus anillos están formados por hielo y polvo cósmico.',
      'Tiene más de 80 lunas, siendo Titán la más grande.',
      'Es tan ligero que podría flotar en agua.'
    ],
    distance: '1,434 millones de km del Sol',
    diameter: '116,460 km'
  },
  {
    name: 'Urano',
    nameEn: 'Uranus',
    size: 28,
    color: '#6fd3e8',
    secondaryColor: '#45b6d7',
    glowColor: '#a0e7ff',
    orbitRadius: 420,
    orbitalPeriod: 840,
    rotationSpeed: 0.72,
    description: 'Un gigante helado que rota de lado, único en su orientación.',
    facts: [
      'Su eje de rotación está inclinado más de 90 grados.',
      'Presenta vientos helados de más de 800 km/h.',
      'Su color azul verdoso se debe al metano en su atmósfera.'
    ],
    distance: '2,871 millones de km del Sol',
    diameter: '50,724 km'
  },
  {
    name: 'Neptuno',
    nameEn: 'Neptune',
    size: 26,
    color: '#4169e1',
    secondaryColor: '#243b8a',
    glowColor: '#5b9bd5',
    orbitRadius: 480,
    orbitalPeriod: 1650,
    rotationSpeed: 0.67,
    description: 'El planeta más lejano, de un azul profundo y vientos supersónicos.',
    facts: [
      'Sus vientos alcanzan los 2,100 km/h, los más rápidos del sistema solar.',
      'Posee 14 lunas, siendo Tritón la más grande y activa.',
      'Fue descubierto gracias a cálculos matemáticos antes de ser observado.'
    ],
    distance: '4,495 millones de km del Sol',
    diameter: '49,244 km'
  },
  {
    name: 'Plutón',
    nameEn: 'Pluto',
    size: 10,
    color: '#d3c7b3',
    secondaryColor: '#b7a896',
    glowColor: '#f0e3d4',
    orbitRadius: 530,
    orbitalPeriod: 2480,
    rotationSpeed: 6.39,
    description: 'El misterioso planeta enano, helado y solitario en el Cinturón de Kuiper.',
    facts: [
      'Su órbita es tan elíptica que a veces está más cerca del Sol que Neptuno.',
      'Tiene cinco lunas, siendo Caronte la más grande.',
      'Su superficie helada refleja gran parte de la luz solar.'
    ],
    distance: '5,906 millones de km del Sol',
    diameter: '2,376 km',
    isDwarf: true
  }
] as const;

/**
 * ⚙️ CONFIGURACIÓN GLOBAL
 */
const SUN_SIZE = 70;
const STAR_COUNT = 150;

/**
 * 🎨 COMPONENTE PRINCIPAL: Avatar3D
 */
const Avatar3D: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [selectedSun, setSelectedSun] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [currentRotations, setCurrentRotations] = useState<Record<string, number>>({});
  const controls = useAnimation();

  const stars: Star[] = useMemo(() =>
    Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.3,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2
    }))
    , []);

  const handlePause = useCallback(() => {
    if (!isPaused) {
      const rotations: Record<string, number> = {};
      PLANETS.forEach((planet) => {
        const element = document.getElementById(`planet-orbit-${planet.nameEn}`);
        if (element) {
          const transform = window.getComputedStyle(element).transform;
          if (transform !== 'none') {
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

  useEffect(() => {
    if (isPaused) {
      controls.start('paused');
    } else {
      controls.start('rotating');
    }
  }, [isPaused, controls]);

  const handlePlanetClick = useCallback((planet: Planet) => {
    setSelectedPlanet(planet);
    setSelectedSun(false);
    setShowInfo(true);
  }, []);

  const handleSunClick = useCallback(() => {
    setSelectedSun(true);
    setSelectedPlanet(null);
    setShowInfo(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowInfo(false);
    setTimeout(() => {
      setSelectedPlanet(null);
      setSelectedSun(false);
    }, 300);
  }, []);

  const orbitVariants: Variants = useMemo(() => ({
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
  }), [currentRotations]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 font-sans overflow-hidden relative">

      {/* ⭐ Campo de estrellas */}
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

      <div className="relative w-[98vw] h-[98vh] max-w-[1100px] max-h-[1100px] rounded-3xl bg-gradient-to-br from-black/40 via-purple-900/20 to-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-purple-500/30 flex items-center justify-center overflow-hidden">

        {/* Panel superior */}
        <div className="absolute top-6 left-6 right-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-10">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Sistema Solar
            </h1>
            <p className="text-white/50 text-xs sm:text-sm">
              Exploración interactiva del cosmos
            </p>
          </div>

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

        {/* ☀️ Sol con clic */}
        <motion.div
          className="absolute rounded-full cursor-pointer group"
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
          onClick={handleSunClick}
          animate={isPaused ? {} : {
            scale: [1, 1.05, 1],
            opacity: [0.98, 1, 0.98],
            rotate: 360
          }}
          whileHover={{
            scale: 1.15,
            boxShadow: `
              0 0 60px 25px rgba(255,183,3,1),
              0 0 100px 40px rgba(255,183,3,0.8),
              0 0 140px 60px rgba(255,183,3,0.5),
              inset 0 0 30px rgba(255,255,255,0.4)
            `
          }}
          transition={{
            scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 40, repeat: Infinity, ease: 'linear' }
          }}
        >
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-yellow-100 via-orange-200 to-transparent opacity-80" />

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

          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-orange-300 text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Sol (haz clic)
          </div>
        </motion.div>

        {/* 🪐 Planetas */}
        {PLANETS.map((planet) => (
          <React.Fragment key={planet.nameEn}>
            {/* 🌌 Órbita del planeta */}
            <motion.div
              className="absolute rounded-full border border-white/10"
              style={{
                width: planet.orbitRadius * 2,
                height: planet.orbitRadius * 2,
                pointerEvents: 'none',
                background: `radial-gradient(circle, transparent 0%, rgba(255,255,255,0.01) 100%)`
              }}
              animate={isPaused ? {} : {
                borderColor: [
                  'rgba(255,255,255,0.05)',
                  'rgba(255,255,255,0.15)',
                  'rgba(255,255,255,0.05)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* 🌍 Planeta */}
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
                {/* 💡 Efecto de brillo */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.5), transparent 50%)`
                  }}
                  animate={isPaused ? {} : { opacity: [0.6, 0.9, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* 🌎 Efectos especiales Tierra */}
                {planet.nameEn === 'Earth' && (
                  <>
                    {/* 🌕 Luna orbitando la Tierra */}
                    {planet.moons?.map((moon) => (
                      <motion.div
                        key={moon.name}
                        className="absolute rounded-full"
                        style={{
                          width: moon.size,
                          height: moon.size,
                          background: `radial-gradient(circle at 30% 30%, ${moon.secondaryColor}, ${moon.color})`,
                          boxShadow: `0 0 10px 3px ${moon.glowColor}`,
                          top: '50%',
                          left: '50%',
                          marginTop: -moon.size / 2,
                          marginLeft: -moon.size / 2
                        }}
                        animate={{
                          rotate: 360,
                          transformOrigin: `${moon.orbitRadius}px center`
                        }}
                        transition={{
                          rotate: { duration: moon.orbitalPeriod, repeat: Infinity, ease: 'linear' }
                        }}
                      />
                    ))}

                    {/* 🌍 Textura ligera */}
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

                {/* 💫 Anillos de Saturno */}
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

                {/* 🏷️ Etiqueta flotante */}
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
                    <div className="text-xs sm:text-sm text-white font-medium">
                      {planet.name}
                      {planet.isDwarf && (
                        <span className="text-[10px] ml-1 text-purple-300">(Enano)</span>
                      )}
                    </div>
                    <div className="text-[10px] text-white/60">{planet.diameter}</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </React.Fragment>
        ))}


        {/* Panel inferior */}
        <div className="absolute bottom-6 left-6 right-6 bg-black/40 backdrop-blur-lg rounded-2xl border border-white/10 p-4">
          <div className="flex flex-wrap justify-center gap-2 text-[10px] sm:text-xs">
            <motion.button
              onClick={handleSunClick}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-105"
              whileHover={{ y: -2 }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background: 'radial-gradient(circle, #FFE485, #FFB703)',
                  boxShadow: '0 0 8px #FFD700'
                }}
              />
              <span className="text-white font-medium">Sol</span>
            </motion.button>

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

      {/* Modal del Sol */}
      <AnimatePresence>
        {selectedSun && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="relative w-full max-w-4xl rounded-3xl bg-gradient-to-br from-orange-900/95 via-yellow-900/95 to-orange-900/95 border border-orange-500/30 shadow-2xl p-8 sm:p-12 text-white max-h-[90vh] overflow-y-auto backdrop-blur-xl"
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: showInfo ? 1 : 0.8, y: showInfo ? 0 : 50, opacity: showInfo ? 1 : 0 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
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
                <div className="space-y-6">
                  <motion.h2
                    className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-400 bg-clip-text text-transparent"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {SUN_DATA.name}
                  </motion.h2>

                  <motion.div
                    className="w-full aspect-square rounded-2xl border border-orange-500/30 bg-black/40 backdrop-blur-sm flex items-center justify-center overflow-hidden relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      className="rounded-full relative"
                      style={{
                        width: '70%',
                        paddingBottom: '70%',
                        background: 'radial-gradient(circle at 30% 30%, #FFF9E6, #FFE485, #FFB703, #FB8500)',
                        boxShadow: `
                          0 0 80px 30px rgba(255,183,3,0.9),
                          inset -30px -30px 60px rgba(0,0,0,0.3),
                          inset 20px 20px 40px rgba(255,255,255,0.4)
                        `
                      }}
                      animate={{
                        rotate: 360,
                        scale: [1, 1.03, 1]
                      }}
                      transition={{
                        rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                        scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.7), transparent 50%)'
                        }}
                      />

                      <motion.div
                        className="absolute top-1/4 left-1/3 w-6 h-6 rounded-full bg-orange-700/40"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute bottom-1/3 right-1/4 w-4 h-4 rounded-full bg-orange-700/40"
                        animate={{ opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                    </motion.div>

                    <div className="absolute bottom-4 text-white/40 text-xs sm:text-sm font-light">
                      Vista renderizada en 3D
                    </div>
                  </motion.div>
                </div>

                <div className="space-y-6">
                  <motion.p
                    className="text-white/80 text-base leading-relaxed"
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {SUN_DATA.description}
                  </motion.p>

                  <motion.div
                    className="grid grid-cols-2 gap-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="text-white/50 text-xs mb-1">Diámetro</div>
                      <div className="text-white font-semibold text-sm">{SUN_DATA.diameter}</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="text-white/50 text-xs mb-1">Edad</div>
                      <div className="text-white font-semibold text-sm">{SUN_DATA.age}</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 col-span-2">
                      <div className="text-white/50 text-xs mb-1">Temperatura</div>
                      <div className="text-white font-semibold text-sm">{SUN_DATA.temperature}</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 col-span-2">
                      <div className="text-white/50 text-xs mb-1">Composición</div>
                      <div className="text-white font-semibold text-sm">{SUN_DATA.composition}</div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="space-y-3"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-lg font-semibold text-orange-300 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                      Datos Fascinantes
                    </h3>
                    <div className="space-y-2">
                      {SUN_DATA.facts.map((fact, index) => (
                        <motion.div
                          key={index}
                          className="flex gap-3 p-3 bg-gradient-to-r from-orange-500/10 to-transparent rounded-lg border-l-2 border-orange-500/50"
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-300 text-xs font-bold">
                            {index + 1}
                          </div>
                          <p className="text-white/80 text-sm leading-relaxed">{fact}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.button
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 hover:from-orange-700 hover:via-yellow-700 hover:to-orange-700 text-white font-semibold text-base transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/50 flex items-center justify-center gap-2"
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
                    Explorar los planetas
                  </motion.button>
                </div>
              </div>

              <div className="absolute inset-0 rounded-3xl pointer-events-none">
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,183,3,0.3), transparent)'
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

      {/* Modal de planetas */}
      <AnimatePresence>
        {selectedPlanet && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            {/* Fondo animado con nebulosa */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black backdrop-blur-2xl"
              style={{
                backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(139,92,246,0.25), transparent 60%),
            radial-gradient(circle at 80% 70%, rgba(236,72,153,0.15), transparent 70%)
          `
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />

            {/* Contenedor principal */}
            <motion.div
              className="relative w-full max-w-5xl mx-4 rounded-3xl bg-gradient-to-br from-[#0B0B1E]/90 via-[#1A0B2E]/95 to-[#0B0B1E]/90 border border-purple-500/30 shadow-[0_0_60px_rgba(168,85,247,0.25)] p-8 sm:p-12 text-white overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.85, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 22, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón de cierre */}
              <motion.button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-300 hover:rotate-90"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Cerrar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              <div className="grid md:grid-cols-2 gap-10 items-start">
                {/* 🌍 Vista del planeta */}
                <div className="flex flex-col items-center space-y-6">
                  <motion.h2
                    className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent text-center"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {selectedPlanet.name}
                    {selectedPlanet.isDwarf && (
                      <span className="block text-lg text-purple-300 mt-1 font-medium">Planeta Enano</span>
                    )}
                  </motion.h2>

                  <motion.div
                    className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full flex items-center justify-center bg-black/40 border border-purple-500/40 shadow-inner overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      className="rounded-full relative"
                      style={{
                        width: "70%",
                        paddingBottom: "70%",
                        background: `radial-gradient(circle at 30% 30%, ${selectedPlanet.secondaryColor}, ${selectedPlanet.color})`,
                        boxShadow: `
                    0 0 100px 40px ${selectedPlanet.glowColor}AA,
                    inset -30px -30px 60px rgba(0,0,0,0.6),
                    inset 20px 20px 40px rgba(255,255,255,0.15)
                  `
                      }}
                      animate={{
                        rotate: 360,
                        scale: [1, 1.03, 1]
                      }}
                      transition={{
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.6), transparent 50%)`
                        }}
                      />
                      {selectedPlanet.nameEn === "Saturn" && (
                        <div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 opacity-80"
                          style={{
                            width: "150%",
                            height: "35%",
                            borderColor: selectedPlanet.glowColor,
                            boxShadow: `0 0 20px ${selectedPlanet.glowColor}`
                          }}
                        />
                      )}
                    </motion.div>
                    <div className="absolute bottom-3 text-white/40 text-xs">Render 3D dinámico</div>
                  </motion.div>
                </div>

                {/* 🧠 Información */}
                <div className="space-y-6">
                  <motion.p
                    className="text-white/80 text-base leading-relaxed"
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  >
                    {selectedPlanet.description}
                  </motion.p>

                  {/* Datos */}
                  <motion.div
                    className="grid grid-cols-2 gap-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.35 }}
                  >
                    {[
                      ["Distancia al Sol", selectedPlanet.distance],
                      ["Diámetro", selectedPlanet.diameter],
                      ["Periodo orbital", `${selectedPlanet.orbitalPeriod.toFixed(1)} días`],
                      ["Rotación", `${selectedPlanet.rotationSpeed.toFixed(2)} días`],
                    ].map(([label, value], i) => (
                      <div
                        key={i}
                        className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-purple-400/40 transition-all duration-300"
                      >
                        <div className="text-white/50 text-xs mb-1">{label}</div>
                        <div className="text-white font-semibold text-sm">{value}</div>
                      </div>
                    ))}
                  </motion.div>

                  {/* Datos fascinantes */}
                  <motion.div
                    className="space-y-3"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.45 }}
                  >
                    <h3 className="text-lg font-semibold text-purple-300 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                      Datos Fascinantes
                    </h3>
                    <div className="space-y-2">
                      {selectedPlanet.facts.map((fact, index) => (
                        <motion.div
                          key={index}
                          className="flex gap-3 p-3 bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg border-l-2 border-purple-500/40 hover:border-purple-400/70 transition-all duration-300"
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

                  {/* Botón inferior */}
                  <motion.button
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white font-semibold text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
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

              {/* Efecto de energía móvil */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${selectedPlanet.glowColor}40, transparent)`
                  }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
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