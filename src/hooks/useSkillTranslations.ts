import { useTheme } from '../contexts/ThemeContext';
import { translations } from '../translations/translations';

type ExperienceLevel = 'Avanzado' | 'Intermedio' | 'Básico' | 'Principiante';
type SkillCategory = 'Frontend' | 'Backend' | 'Mobile' | 'Database' | 'Tools';

export const useSkillTranslations = () => {
  const { language } = useTheme();
  const t = translations[language];

  const getSkillData = () => [
    {
      key: 'react',
      name: 'React',
      category: 'Frontend' as const,
      experience: 'Avanzado' as const,
      ...t.skills.react,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      key: 'nodejs',
      name: 'Node.js',
      category: 'Backend' as const,
      experience: 'Intermedio' as const,
      ...t.skills.nodejs,
      color: 'from-green-500 to-emerald-500'
    },
    {
      key: 'laravel',
      name: 'Laravel',
      category: 'Backend' as const,
      experience: 'Intermedio' as const,
      ...t.skills.laravel,
      color: 'from-red-500 to-orange-500'
    },
    {
      key: 'php',
      name: 'PHP',
      category: 'Backend' as const,
      experience: 'Básico' as const,
      ...t.skills.php,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      key: 'reactNative',
      name: 'React Native',
      category: 'Mobile' as const,
      experience: 'Básico' as const,
      ...t.skills.reactNative,
      color: 'from-pink-500 to-purple-500'
    },
    {
      key: 'mysql',
      name: 'MySQL',
      category: 'Database' as const,
      experience: 'Básico' as const,
      ...t.skills.mysql,
      color: 'from-orange-500 to-yellow-500'
    },
    {
      key: 'python',
      name: 'Python',
      category: 'Backend' as const,
      experience: 'Principiante' as const,
      ...t.skills.python,
      color: 'from-yellow-500 to-green-500'
    },
    {
      key: 'firebase',
      name: 'Firebase',
      category: 'Database' as const,
      experience: 'Principiante' as const,
      ...t.skills.firebase,
      color: 'from-orange-500 to-red-500'
    },
    {
      key: 'htmlCss',
      name: 'HTML & CSS',
      category: 'Frontend' as const,
      experience: 'Avanzado' as const,
      ...t.skills.htmlCss,
      color: 'from-blue-500 to-purple-500'
    },
    {
      key: 'javascript',
      name: 'JavaScript',
      category: 'Frontend' as const,
      experience: 'Avanzado' as const,
      ...t.skills.javascript,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      key: 'github',
      name: 'Git Hub',
      category: 'Tools' as const,
      experience: 'Intermedio' as const,
      ...t.skills.github,
      color: 'from-purple-500 to-blue-600'
    }
  ];

  return { skills: getSkillData(), t };
};
