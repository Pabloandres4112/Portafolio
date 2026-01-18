import React from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaLinkedin,
  FaWhatsappSquare,
  FaGithub,
  FaTwitter,
} from 'react-icons/fa';
import { useForm, ValidationError } from '@formspree/react';
import { useTheme } from '../../contexts/ThemeContext';
import { translations } from '../../translations/translations';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Contact: React.FC = () => {
  const { language } = useTheme();
  const t = translations[language];
  const mensaje = encodeURIComponent("Hola Pablo, Vengo de tu Portafolio");
  const whatsappUrl = `https://wa.me/573027938712?text=${mensaje}`;
  const [state, handleSubmit] = useForm("xrbkqrrn");

  return (
    <section className="min-h-screen py-20 px-4 bg-purple-50/30 dark:bg-black/10 backdrop-blur-sm">
      <motion.div
        className="max-w-5xl mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          variants={fadeInUp}
        >
          {t.contact.title}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-2xl font-bold mb-6 text-black dark:text-white">{t.contact.subtitle}</h3>
            <p className="text-gray-900 dark:text-gray-400 mb-8 text-lg">
              {t.contact.description}
            </p>

            <div className="space-y-4">
              {/* Email */}
              <ContactCard
                href="mailto:perdomo4112@gmail.com"
                icon={<FaEnvelope size={20} />}
                title={t.contact.email}
                subtitle="perdomo4112@gmail.com"
              />

              {/* LinkedIn */}
              <ContactCard
                href="https://linkedin.com/in/alex"
                icon={<FaLinkedin size={20} />}
                title={t.contact.linkedin}
                subtitle="linkedin.com/in/alex"
              />

              {/* WhatsApp */}
              <ContactCard
                href={whatsappUrl}
                icon={<FaWhatsappSquare size={20} />}
                title={t.contact.whatsapp}
                subtitle="3027938712"
              />
            </div>

            {/* Social Media */}
            <div className="flex gap-4 mt-8">
              {[
                { icon: FaGithub, href: 'https://github.com' },
                { icon: FaTwitter, href: 'https://twitter.com' },
                { icon: FaLinkedin, href: 'https://linkedin.com' },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white dark:bg-white/5 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 dark:hover:from-purple-600 dark:hover:to-pink-600 hover:text-white text-blue-600 dark:text-gray-300 transition-all border-2 border-gray-300 dark:border-transparent hover:border-blue-500 dark:hover:border-transparent"
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={fadeInUp}>
            {state.succeeded && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-400/30 rounded-lg text-center">
                <p className="text-green-600 dark:text-green-400 font-semibold">
                  {t.contact.successMessage}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField name="name" placeholder={t.contact.namePlaceholder} type="text" state={state} />
              <InputField name="email" placeholder={t.contact.emailPlaceholder} type="email" state={state} />
              <TextareaField name="message" placeholder={t.contact.messagePlaceholder} rows={6} state={state} />

              <motion.button
                type="submit"
                disabled={state.submitting}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-purple-600 dark:to-pink-600 rounded-lg font-semibold text-lg text-white hover:shadow-2xl hover:shadow-blue-500/30 dark:hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-transparent hover:border-blue-400 dark:hover:border-transparent"
                whileHover={{ scale: state.submitting ? 1 : 1.01, y: state.submitting ? 0 : -2 }}
                whileTap={{ scale: state.submitting ? 1 : 0.98 }}
              >
                {state.submitting ? t.contact.sending : t.contact.send}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;


interface ContactCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const ContactCard = ({ href, icon, title, subtitle }: ContactCardProps) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-4 p-4 bg-white dark:bg-white/5 rounded-lg hover:bg-blue-50 dark:hover:bg-white/10 transition-all border-2 border-gray-300 dark:border-transparent hover:border-blue-500 dark:hover:border-transparent"
    whileHover={{ x: 8 }}
  >
    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-purple-600 dark:to-pink-600 rounded-lg flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-black dark:text-white">{title}</h4>
      <p className="text-gray-700 dark:text-gray-400 text-sm">{subtitle}</p>
    </div>
  </motion.a>
);

interface FieldProps {
  name: string;
  placeholder: string;
  type?: string;
  rows?: number;
  state: any;
}

const InputField = ({ name, placeholder, type = "text", state }: FieldProps) => (
  <div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required
      className="w-full p-4 bg-white dark:bg-white/5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-purple-500 transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
    />
    <ValidationError prefix={name} field={name} errors={state.errors} className="text-red-400 text-sm mt-1" />
  </div>
);

const TextareaField = ({ name, placeholder, rows = 6, state }: FieldProps) => (
  <div>
    <textarea
      name={name}
      placeholder={placeholder}
      rows={rows}
      required
      className="w-full p-4 bg-white dark:bg-white/5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-purple-500 transition-all resize-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
    />
    <ValidationError prefix={name} field={name} errors={state.errors} className="text-red-400 text-sm mt-1" />
  </div>
);
