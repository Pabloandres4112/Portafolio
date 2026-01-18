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
      className="border-t-2 border-gray-300 dark:border-white/10 py-8 px-4 bg-white/50 dark:bg-black/20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-black dark:text-gray-400">
          © {new Date().getFullYear()} Pablo Andrés Perdomo. {t.footer.rights}
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
