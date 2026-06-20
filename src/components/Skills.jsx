import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsData } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const SkillBar = ({ name, level, index, isInView }) => {
  const barRef = useRef(null);

  useEffect(() => {
    if (!isInView || !barRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    gsap.fromTo(
      barRef.current,
      { width: '0%' },
      {
        width: `${level}%`,
        duration: prefersReducedMotion ? 0 : 1,
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: 'power3.out',
      }
    );
  }, [isInView, level, index]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-textPrimary">{name}</span>
        <span className="text-sm text-accent font-semibold">{level}%</span>
      </div>
      <div className="h-2 bg-background rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-gradient-to-r from-accent to-secondary rounded-full"
          style={{ width: '0%' }}
          role="progressbar"
          aria-valuenow={level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${name} skill level: ${level}%`}
        />
      </div>
    </div>
  );
};

const SkillCard = ({ category, icon: Icon, skills, index, isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass p-6 rounded-2xl group hover:border-accent/40 transition-all duration-300"
    >
      {/* Card Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center group-hover:from-accent/30 group-hover:to-secondary/30 transition-colors">
          <Icon size={24} className="text-accent" />
        </div>
        <h3 className="font-heading text-lg font-semibold">{category}</h3>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        {skills.map((skill, skillIndex) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            index={skillIndex}
            isInView={isInView}
          />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="pt-4 md:pt-6 pb-16 md:pb-24 relative"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
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
            A comprehensive toolkit built through years of hands-on experience with modern technologies
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category, index) => (
            <SkillCard
              key={category.category}
              category={category.category}
              icon={category.icon}
              skills={category.skills}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-textSecondary">
            Always learning and exploring new technologies to stay at the forefront of web development
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
