import { 
  FaGithub, 
  FaMobile, 
  FaReact, 
  FaNodeJs, 
  FaLaravel, 
  FaPhp, 
  FaPython, 
  FaDatabase, 
  FaHtml5, 
  FaJs, 
  FaFire
} from 'react-icons/fa';

type ExperienceLevel = 'Avanzado' | 'Intermedio' | 'Básico' | 'Principiante';

export const getSkillIcon = (key: string) => {
  const iconMap: Record<string, any> = {
    react: FaReact,
    nodejs: FaNodeJs,
    laravel: FaLaravel,
    php: FaPhp,
    reactNative: FaMobile,
    mysql: FaDatabase,
    python: FaPython,
    firebase: FaFire,
    htmlCss: FaHtml5,
    javascript: FaJs,
    github: FaGithub
  };
  
  return iconMap[key] || FaReact;
};

export const experienceConfig: {
  colors: Record<ExperienceLevel, string>;
  stars: Record<ExperienceLevel, string>;
} = {
  colors: {
    Avanzado: 'text-green-500',
    Intermedio: 'text-blue-500',
    Básico: 'text-yellow-500',
    Principiante: 'text-orange-500'
  },
  stars: {
    Avanzado: '⭐⭐⭐⭐⭐',
    Intermedio: '⭐⭐⭐⭐',
    Básico: '⭐⭐⭐',
    Principiante: '⭐⭐'
  }
};
