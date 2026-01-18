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
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/50 hover:bg-green-600 transition-all"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1, duration: 0.6, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.15, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaWhatsapp size={28} className="text-white" />
    </motion.a>
  );
};

export default WhatsappButton;
