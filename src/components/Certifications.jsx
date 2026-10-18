import { useEffect, useLayoutEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ExternalLink, ChevronLeft, ChevronRight, Github, ArrowUpRight } from 'lucide-react';
import { certificationsData, certificationsRepo } from '../data/certificationsData';

const SPEED = 28; // auto-scroll speed in px/second (slow on purpose)
const COPIES = 3; // list is repeated so the strip can loop endlessly

const CertCard = ({ cert, hidden }) => (
  <a
    href={cert.link}
    target="_blank"
    rel="noopener noreferrer"
    draggable={false}
    tabIndex={hidden ? -1 : 0}
    aria-hidden={hidden || undefined}
    aria-label={`View ${cert.title} certificate`}
    className="group relative flex-shrink-0 w-64 sm:w-72 mr-5 glass rounded-2xl p-5 flex flex-col hover:border-accent/40 hover:-translate-y-1 transition-all duration-300"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-secondary/20 border border-accent/20 flex items-center justify-center">
        <Award size={20} className="text-accent" />
      </div>
      <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-lg">
        {cert.category}
      </span>
    </div>

    <h3 className="font-heading text-base font-semibold text-textPrimary group-hover:text-accent transition-colors line-clamp-2 min-h-[3rem]">
      {cert.title}
    </h3>

    <p className="text-sm text-textSecondary mt-1 min-h-[1.25rem]">{cert.issuer || ''}</p>

    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-textSecondary group-hover:text-accent transition-colors">
      View Certificate
      <ExternalLink size={14} />
    </span>
  </a>
);

const Certifications = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const hoverRef = useRef(false);
  const holdRef = useRef(false);
  const holdTimer = useRef(null);

  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  // Live visibility: the strip only moves while this section is on screen
  const isVisible = useInView(sectionRef, { amount: 0.2 });

  // Start in the middle copy so the user can scroll both ways
  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth / COPIES;
    posRef.current = el.scrollLeft;
  }, []);

  // Slow auto-scroll (paused on hover / touch / focus, off for reduced-motion)
  useEffect(() => {
    const el = trackRef.current;
    if (!el || !isVisible) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf;
    let last = performance.now();
    posRef.current = el.scrollLeft;

    const tick = (now) => {
      const dt = Math.min(now - last, 64);
      last = now;

      if (hoverRef.current || holdRef.current) {
        posRef.current = el.scrollLeft; // follow the user's manual scrolling
      } else {
        const oneSet = el.scrollWidth / COPIES;
        let next = posRef.current + (SPEED * dt) / 1000;
        if (next >= oneSet * 2) next -= oneSet;
        posRef.current = next;
        el.scrollLeft = next;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isVisible]);

  useEffect(() => () => clearTimeout(holdTimer.current), []);

  const holdFor = (ms) => {
    holdRef.current = true;
    clearTimeout(holdTimer.current);
    holdTimer.current = setTimeout(() => {
      holdRef.current = false;
    }, ms);
  };

  // Keep the loop seamless when the user scrolls manually
  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const oneSet = el.scrollWidth / COPIES;
    if (el.scrollLeft >= oneSet * 2) el.scrollLeft -= oneSet;
    else if (el.scrollLeft <= 0) el.scrollLeft += oneSet;
  };

  const scrollByCards = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    holdFor(3500);
    el.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="pt-4 md:pt-6 pb-16 md:pb-24 relative"
      aria-labelledby="certifications-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">
            Credentials
          </span>
          <h2
            id="certifications-heading"
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4"
          >
            Certifications
          </h2>
          <p className="text-textSecondary max-w-2xl mx-auto">
            Courses and certificates across Java, Python, AI/ML, databases and cloud.
            Hover or touch to pause, swipe to browse.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
          onMouseEnter={() => { hoverRef.current = true; }}
          onMouseLeave={() => { hoverRef.current = false; }}
          onFocus={() => { hoverRef.current = true; }}
          onBlur={() => { hoverRef.current = false; }}
          onTouchStart={() => holdFor(60000)}
          onTouchEnd={() => holdFor(1800)}
          onTouchCancel={() => holdFor(1800)}
        >
          {/* edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            aria-label="Previous certificates"
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full glass text-textSecondary hover:text-accent hover:border-accent/40 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            aria-label="Next certificates"
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full glass text-textSecondary hover:text-accent hover:border-accent/40 transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto scrollbar-hide py-3"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {Array.from({ length: COPIES }).flatMap((_, copy) =>
              certificationsData.map((cert) => (
                <CertCard key={`${copy}-${cert.id}`} cert={cert} hidden={copy !== 1} />
              ))
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <a
            href={certificationsRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-xl text-textPrimary font-medium hover:border-accent/40 hover:text-accent transition-all group"
          >
            <Github size={20} />
            View All Certificates on GitHub
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
