import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { skillsData } from '../data/portfolioData';

const Skills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const tabsRef = useRef(null);

  // Auto-scroll through tabs every 3 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % skillsData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Scroll active tab button into view when auto-cycling
  useEffect(() => {
    if (!tabsRef.current) return;
    const activeBtn = tabsRef.current.querySelector('[aria-selected="true"]');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeTab]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const activeCategory = skillsData[activeTab];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="pt-4 md:pt-6 pb-16 md:pb-24 relative"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">
            My Skills
          </span>
          <h2
            id="skills-heading"
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4"
          >
            Technical Expertise
          </h2>
          <p className="text-textSecondary max-w-2xl mx-auto">
            A comprehensive toolkit built through hands-on experience with modern technologies
          </p>
        </motion.div>

        {/* Scrollable Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mb-10"
        >
          {/* Fade gradients for scroll hint */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none rounded-l-full" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none rounded-r-full" />

          <div
            ref={tabsRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            role="tablist"
            aria-label="Skill categories"
          >
            {skillsData.map((category, index) => {
              const Icon = category.icon;
              const isActive = activeTab === index;
              return (
                <button
                  key={category.category}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`skills-panel-${index}`}
                  id={`skills-tab-${index}`}
                  onClick={() => {
                    setActiveTab(index);
                    setIsPaused(true);
                  }}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-300 flex-shrink-0 border overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-accent to-secondary text-background border-transparent shadow-lg shadow-accent/25'
                      : 'glass border-cardBorder text-textSecondary hover:text-textPrimary hover:border-accent/40'
                  }`}
                >
                  {/* Auto-scroll progress bar on active tab (only when not paused) */}
                  {isActive && !isPaused && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-background/40"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 3, ease: 'linear' }}
                      key={activeTab}
                    />
                  )}
                  <Icon size={15} className={isActive ? 'text-background' : 'text-accent'} />
                  {category.category}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Skills Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={`skills-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`skills-tab-${activeTab}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative rounded-2xl min-h-[240px] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(56,189,248,0.04) 0%, rgba(139,92,246,0.04) 100%)',
              border: '1px solid rgba(56,189,248,0.15)',
              boxShadow: '0 0 40px rgba(56,189,248,0.06), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Decorative top-right glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 p-8">
              {/* Panel Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-secondary/20 border border-accent/20 flex items-center justify-center shadow-lg shadow-accent/10">
                  {activeCategory.icon && (
                    <activeCategory.icon size={22} className="text-accent" />
                  )}
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-textPrimary">
                    {activeCategory.category}
                  </h3>
                </div>
              </div>

              {/* Skills Badges */}
              <div className="flex flex-wrap gap-3">
              {activeCategory.skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  className="group relative"
                >
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/8 hover:border-accent/40 transition-all duration-300 cursor-default"
                    style={{ background: 'rgba(255,255,255,0.04)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60 group-hover:bg-accent transition-colors duration-300 flex-shrink-0" />
                    <span className="text-sm font-medium text-textSecondary group-hover:text-textPrimary transition-colors duration-300">
                      {skill.name}
                    </span>
                  </div>
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 rounded-xl bg-accent/5 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-textSecondary text-sm">
            Always learning and exploring new technologies to stay at the forefront of development
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
