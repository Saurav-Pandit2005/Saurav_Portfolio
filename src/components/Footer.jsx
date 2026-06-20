import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Twitter, Mail, Instagram, MapPin, Clock, Download, ArrowRight } from 'lucide-react';
import { personalInfo, socialLinks, navLinks } from '../data/portfolioData';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const getSocialIcon = (iconName) => {
    const icons = {
      github: Github,
      linkedin: Linkedin,
      twitter: Twitter,
      mail: Mail,
      instagram: Instagram,
    };
    return icons[iconName] || Mail;
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative pt-20 pb-8 border-t border-cardBorder bg-background overflow-hidden" role="contentinfo">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-4 lg:pr-8">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="inline-block font-heading font-bold text-4xl gradient-text mb-2"
            >
              {personalInfo.name.split(' ').map(n => n[0]).join('')}.
            </a>
            <p className="text-textSecondary text-base leading-relaxed">
              {personalInfo.role} passionate about creating impactful digital experiences. Building scalable solutions for tomorrow.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6 tracking-wide">Quick Links</h3>
            <ul className="space-y-4">
              {navLinks.filter(link => link.id !== 'home').map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className="group flex items-center text-textSecondary hover:text-accent transition-colors text-base h-9 w-fit"
                  >
                    <span className="w-0 group-hover:w-3 transition-all duration-300 overflow-hidden text-accent mr-0 group-hover:mr-2">
                      ›
                    </span>
                    <span className="relative overflow-hidden">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold mb-6 tracking-wide">Connect</h3>
            <div className="flex flex-col gap-4">
              {socialLinks.map((link) => {
                const Icon = getSocialIcon(link.icon);
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target={link.url.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="group flex items-center gap-3 text-textSecondary hover:text-accent transition-colors w-fit text-base"
                    whileHover={{ x: 5 }}
                    aria-label={link.name}
                  >
                    <span className="w-9 h-9 glass rounded-xl flex items-center justify-center group-hover:bg-accent/10 transition-colors shadow-sm">
                      <Icon size={16} />
                    </span>
                    <span className="font-medium">{link.name}</span>
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Status */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold mb-6 tracking-wide">Status</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-textSecondary text-sm">
                <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-textPrimary">Location</p>
                  <p>Gujarat, India</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-textSecondary text-sm">
                <Clock size={18} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-textPrimary">Local Time</p>
                  <p>{formattedTime} (IST)</p>
                </div>
              </div>
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-green-500/20 bg-green-500/5 text-xs font-medium text-green-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Open to Opportunities
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cardBorder to-transparent mb-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-textSecondary/80">
          <p className="flex items-center gap-1.5 font-medium">
            © {currentYear} {personalInfo.name}. Built with
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Heart size={14} className="text-red-500 fill-red-500" aria-hidden="true" />
            </motion.div>
          </p>
          <p className="text-xs md:text-sm text-center md:text-right">
            Crafted with React, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
