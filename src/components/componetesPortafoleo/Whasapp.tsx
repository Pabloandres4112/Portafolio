// components/WhatsappButton.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsappButton: React.FC = () => {
  const mensaje = encodeURIComponent("Hola Pablo, Vengo de tu Portafolio");
  const url = `https://wa.me/573027938712?text=${mensaje}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-20 right-4 z-40 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <FaWhatsapp size={24} className="text-white" />
    </motion.a>
  );
};

export default WhatsappButton;
