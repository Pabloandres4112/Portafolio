// components/Navbar.tsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';
import { translations } from '../../translations/translations';

export type SectionId = 'home' | 'about' | 'skills' | 'projects' | 'contact';

interface NavItem {
  id: SectionId;
  label: string;
}

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (sectionId: SectionId) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, language, toggleTheme, toggleLanguage } = useTheme();
  const t = translations[language];

  const navItems: NavItem[] = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'skills', label: t.nav.skills },
    { id: 'projects', label: t.nav.projects },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleClick = (id: SectionId) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 bg-white/95 dark:bg-black/20 backdrop-blur-lg border-b-2 border-gray-300 dark:border-white/10 transition-colors duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleClick('home')}
          >
            {t.nav.portfolio}
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`px-3 py-2 rounded-lg transition-all ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-2 border-blue-500'
                    : 'text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-white/10 border-2 border-transparent'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}

            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className="px-3 py-2 rounded-lg bg-white dark:bg-white/10 text-blue-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-white/20 transition-all font-semibold border-2 border-gray-300 dark:border-transparent hover:border-blue-500 dark:hover:border-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {language === 'es' ? 'EN' : 'ES'}
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white dark:bg-white/10 text-blue-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-white/20 transition-all border-2 border-gray-300 dark:border-transparent hover:border-blue-500 dark:hover:border-transparent"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-black dark:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </motion.button>
        </div>
      </div>


      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white/95 dark:bg-black/90 backdrop-blur-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-2 space-y-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-all ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-white/10'
                  }`}
                  whileHover={{ x: 10 }}
                >
                  {item.label}
                </motion.button>
              ))}
              
              {/* Mobile Controls */}
              <div className="flex gap-2 pt-2">
                <motion.button
                  onClick={toggleLanguage}
                  className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-white/10 text-blue-600 dark:text-gray-300 font-semibold border-2 border-gray-300 dark:border-transparent"
                  whileTap={{ scale: 0.95 }}
                >
                  {language === 'es' ? 'EN' : 'ES'}
                </motion.button>
                <motion.button
                  onClick={toggleTheme}
                  className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-white/10 text-blue-600 dark:text-gray-300 flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-transparent"
                  whileTap={{ scale: 0.95 }}
                >
                  {theme === 'dark' ? <><FaSun /> {t.nav.light || 'Claro'}</> : <><FaMoon /> {t.nav.dark || 'Oscuro'}</>}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
