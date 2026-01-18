import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSkillTranslations } from '../../hooks/useSkillTranslations';
import { getSkillIcon, experienceConfig } from '../../utils/skillHelpers';

const INITIAL_VISIBLE = 6;

const SkillsSection: React.FC = () => {
  const { skills, t } = useSkillTranslations();
  const [expandedSkills, setExpandedSkills] = useState<Record<string, boolean>>({});
  const [showAll, setShowAll] = useState(false);

  const visibleSkills = useMemo(
    () => showAll ? skills : skills.slice(0, INITIAL_VISIBLE),
    [showAll, skills]
  );

  const toggleExpand = useCallback((key: string) => {
    setExpandedSkills(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <section className="min-h-screen py-20 px-4 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          {t.skills.title}
        </motion.h2>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            {visibleSkills.map((skill, idx) => {
              const Icon = getSkillIcon(skill.key);
              const isExpanded = expandedSkills[skill.key];
              const experienceColor = experienceConfig.colors[skill.experience as keyof typeof experienceConfig.colors];
              const experienceStars = experienceConfig.stars[skill.experience as keyof typeof experienceConfig.stars];

              return (
                <motion.div
                  key={skill.key}
                  className="group relative bg-white dark:bg-gray-800/50 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700/50 hover:border-blue-500 dark:hover:border-purple-500 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-white shadow-lg`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-black dark:text-white">{skill.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{skill.category}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`text-xs font-semibold ${experienceColor}`}>
                        {experienceStars}
                      </span>
                      <span className="text-[10px] text-gray-600 dark:text-gray-400 mt-1">
                        {t.skills[skill.experience.toLowerCase() as 'advanced' | 'intermediate' | 'basic' | 'beginner']}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                    {skill.short}
                  </p>

                  {/* Expanded Description */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="text-xs text-gray-600 dark:text-gray-400 mb-3 leading-relaxed overflow-hidden"
                      >
                        {skill.long}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Toggle Button */}
                  <button
                    onClick={() => toggleExpand(skill.key)}
                    className="flex items-center gap-2 text-xs text-blue-600 dark:text-purple-400 hover:text-blue-700 dark:hover:text-purple-300 font-medium"
                  >
                    {isExpanded ? <><FaEyeSlash size={12} /> Ver menos</> : <><FaEye size={12} /> Ver más</>}
                  </button>

                  {/* Progress Bar */}
                  <div className="mt-4 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${skill.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.05 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Show More Button */}
        {skills.length > INITIAL_VISIBLE && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <span>{showAll ? t.skills.showLess : `${t.skills.showAll} (${skills.length})`}</span>
              <motion.div
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaChevronDown />
              </motion.div>
            </button>
          </motion.div>
        )}

        {/* Experience Legend */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {[
            { level: t.skills.advanced, stars: '⭐⭐⭐⭐⭐', color: 'text-green-500' },
            { level: t.skills.intermediate, stars: '⭐⭐⭐⭐', color: 'text-blue-500' },
            { level: t.skills.basic, stars: '⭐⭐⭐', color: 'text-yellow-500' },
            { level: t.skills.beginner, stars: '⭐⭐', color: 'text-orange-500' }
          ].map((item) => (
            <div
              key={item.level}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700"
            >
              <span className={item.color}>{item.stars}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.level}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
