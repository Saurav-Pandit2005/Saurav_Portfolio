import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, Briefcase, GraduationCap } from 'lucide-react';
import { aboutData, personalInfo } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !timelineRef.current) return;

    const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
    
    gsap.fromTo(
      timelineItems,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const getTimelineIcon = (title) => {
    if (title.toLowerCase().includes('graduate') || title.toLowerCase().includes('university')) {
      return GraduationCap;
    }
    return Briefcase;
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="pt-4 md:pt-6 pb-16 md:pb-24 relative"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-accent text-sm font-semibold tracking-wider uppercase">
              About Me
            </span>
            <h2
              id="about-heading"
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4"
            >
              Get to know me
            </h2>
            <p className="text-textSecondary max-w-2xl mx-auto">
              A passionate developer dedicated to creating impactful digital experiences
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            {/* Left Column - Bio and Stats */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Avatar and Location */}
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="relative">
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-accent to-secondary p-[2px]">
                    <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center overflow-hidden">
                      {personalInfo.avatar ? (
                        <img src={personalInfo.avatar} alt={personalInfo.name} className="w-full h-full rounded-2xl object-cover object-center" />
                      ) : (
                        <span className="font-heading text-3xl font-bold gradient-text">
                          {personalInfo.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-2">{personalInfo.name}</h3>
                  <p className="text-accent font-medium mb-2">{personalInfo.role}</p>
                  <p className="text-textSecondary flex items-center gap-2">
                    <MapPin size={16} className="text-accent" />
                    {personalInfo.location}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-4">
                {aboutData.description.map((paragraph, index) => (
                  <p key={index} className="text-textSecondary leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {aboutData.stats.map((stat, index) => {
                  const Wrapper = stat.link ? motion.a : motion.div;
                  return (
                    <Wrapper
                      key={stat.label}
                      href={stat.link}
                      target={stat.link ? "_blank" : undefined}
                      rel={stat.link ? "noopener noreferrer" : undefined}
                      className={`glass p-4 rounded-xl text-center hover:border-accent/30 transition-colors block ${stat.link ? 'cursor-pointer hover:bg-white/5' : ''}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="font-heading text-2xl md:text-3xl font-bold gradient-text">
                        {stat.value}
                      </div>
                      <div className="text-sm text-textSecondary mt-1">{stat.label}</div>
                    </Wrapper>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Column - Timeline */}
            <motion.div variants={itemVariants}>
              <h3 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
                <Calendar size={20} className="text-accent" />
                Journey
              </h3>
              <div ref={timelineRef} className="relative">
                {/* Timeline line */}
                <div
                  className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-secondary to-transparent"
                  aria-hidden="true"
                />

                <div className="space-y-4">
                  {aboutData.timeline.map((item, index) => {
                    const Icon = getTimelineIcon(item.title);
                    return (
                      <div
                        key={index}
                        className="timeline-item relative pl-12"
                      >
                        {/* Timeline dot */}
                        <div
                          className="absolute left-0 w-8 h-8 rounded-lg bg-background border-2 border-accent flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <Icon size={14} className="text-accent" />
                        </div>

                        <div className="glass p-4 rounded-xl hover:border-accent/30 transition-colors">
                          <span className="text-accent text-sm font-semibold">{item.year}</span>
                          <h4 className="font-semibold text-textPrimary mt-1">{item.title}</h4>
                          <p className="text-textSecondary text-sm">{item.company}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
