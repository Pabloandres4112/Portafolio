// components/Footer.tsx

import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer
      className="border-t border-white/10 py-8 px-4 bg-black/20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} Mi Portafolio. Diseñado y desarrollado con ❤️ usando React y Tailwind CSS.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
