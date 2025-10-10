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
  const mensaje = encodeURIComponent("Hola Pablo, Vengo de tu Portafolio");
  const whatsappUrl = `https://wa.me/573027938712?text=${mensaje}`;
  const [state, handleSubmit] = useForm("xrbkqrrn");

  return (
    <section className="min-h-screen py-20 px-4 bg-black/10 backdrop-blur-sm">
      <motion.div
        className="max-w-5xl mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          variants={fadeInUp}
        >
          Contacto
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-2xl font-bold mb-6">¡Hablemos!</h3>
            <p className="text-gray-400 mb-8 text-lg">
              ¿Tienes un proyecto en mente? Me encantaría escuchar tus ideas y ver cómo podemos colaborar.
            </p>

            <div className="space-y-4">
              {/* Email */}
              <ContactCard
                href="mailto:perdomo4112@gmail.com"
                icon={<FaEnvelope size={20} />}
                title="Email"
                subtitle="perdomo4112@gmail.com"
              />

              {/* LinkedIn */}
              <ContactCard
                href="https://linkedin.com/in/alex"
                icon={<FaLinkedin size={20} />}
                title="LinkedIn"
                subtitle="linkedin.com/in/alex"
              />

              {/* WhatsApp */}
              <ContactCard
                href={whatsappUrl}
                icon={<FaWhatsappSquare size={20} />}
                title="WhatsApp"
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
                  className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
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
                <p className="text-green-400 font-semibold">
                  ¡Mensaje enviado correctamente! Te contactaré pronto.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField name="name" placeholder="Tu nombre" type="text" state={state} />
              <InputField name="email" placeholder="Tu email" type="email" state={state} />
              <TextareaField name="message" placeholder="Tu mensaje" rows={6} state={state} />

              <motion.button
                type="submit"
                disabled={state.submitting}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: state.submitting ? 1 : 1.02, y: state.submitting ? 0 : -2 }}
                whileTap={{ scale: state.submitting ? 1 : 0.98 }}
              >
                {state.submitting ? 'Enviando...' : 'Enviar Mensaje'}
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
    className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
    whileHover={{ x: 10 }}
  >
    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-gray-400 text-sm">{subtitle}</p>
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
      className="w-full p-4 bg-white/5 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 transition-all"
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
      className="w-full p-4 bg-white/5 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 transition-all resize-none"
    />
    <ValidationError prefix={name} field={name} errors={state.errors} className="text-red-400 text-sm mt-1" />
  </div>
);
