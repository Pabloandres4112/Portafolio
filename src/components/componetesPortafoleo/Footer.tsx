// components/Footer.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { translations } from '../../translations/translations';

const Footer: React.FC = () => {
  const { language } = useTheme();
  const t = translations[language];

  return (
    <motion.footer
      className="border-t-2 border-gray-200 dark:border-purple-500/30 py-8 px-4 bg-white dark:bg-gradient-to-r dark:from-purple-950 dark:to-slate-900"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-700 dark:text-purple-200">
          © {new Date().getFullYear()} Pablo Andrés Perdomo. {t.footer.rights}
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
