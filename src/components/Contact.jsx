import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Send, Github, Linkedin, Twitter, CheckCircle, Loader2 } from 'lucide-react';
import { personalInfo, socialLinks } from '../data/portfolioData';

const Contact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'b524ee11-8748-4300-837f-e6aa598d6c32',
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'New message from Portfolio',
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setIsError(true);
        setTimeout(() => setIsError(false), 5000);
      }
    } catch {
      setIsError(true);
      setTimeout(() => setIsError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSocialIcon = (iconName) => {
    const icons = {
      github: Github,
      linkedin: Linkedin,
      twitter: Twitter,
      mail: Mail,
    };
    return icons[iconName] || Mail;
  };

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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="pt-4 md:pt-6 pb-16 md:pb-24 relative"
      aria-labelledby="contact-heading"
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
              Get In Touch
            </span>
            <h2
              id="contact-heading"
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4"
            >
              Let's Work Together
            </h2>
            <p className="text-textSecondary max-w-2xl mx-auto">
              Have a project in mind or just want to say hi? I'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="font-heading text-2xl font-semibold mb-6">
                  Contact Information
                </h3>
                <p className="text-textSecondary mb-8">
                  Feel free to reach out directly via email. I'm always open to discussing new projects, creative ideas, or opportunities.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-4 p-4 glass rounded-xl hover:border-accent/40 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Mail size={22} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-textSecondary">Email</p>
                    <p className="font-medium group-hover:text-accent transition-colors">
                      {personalInfo.email}
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 glass rounded-xl">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <MapPin size={22} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-textSecondary">Location</p>
                    <p className="font-medium">{personalInfo.location}</p>
                  </div>
                </div>
              </div>

              {/* Resume & Availability */}
              <div className="pt-2">
                <h4 className="font-medium mb-4">Resume & Status</h4>
                <div className="space-y-4">
                  <a
                    href="/Resume.pdf"
                    download="Saurav_Pandit_Resume.pdf"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-secondary text-background font-semibold rounded-xl hover:opacity-90 transition-opacity w-full sm:w-auto justify-center shadow-lg shadow-accent/20"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Resume
                  </a>
                  
                  <div className="glass p-4 rounded-xl border-l-4 border-l-green-500">
                    <div className="flex items-start gap-3">
                      <span className="relative flex h-3 w-3 mt-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                      <p className="text-sm text-textSecondary font-medium leading-relaxed">
                        Currently seeking Software Engineering internship opportunities. <br/> 
                        I typically respond within 12-24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="h-full">
              <form
                onSubmit={handleSubmit}
                className="glass p-6 md:p-8 rounded-2xl space-y-6 h-full flex flex-col"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Full Name"
                      className="w-full px-4 py-3 bg-background/50 border border-cardBorder rounded-xl text-textPrimary placeholder:text-textSecondary/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 bg-background/50 border border-cardBorder rounded-xl text-textPrimary placeholder:text-textSecondary/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Internship / Project Opportunity"
                    className="w-full px-4 py-3 bg-background/50 border border-cardBorder rounded-xl text-textPrimary placeholder:text-textSecondary/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Hi Saurav, I'd like to discuss..."
                    className="w-full px-4 py-3 bg-background/50 border border-cardBorder rounded-xl text-textPrimary placeholder:text-textSecondary/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-none flex-1"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-accent to-secondary text-background font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.01 }}
                  whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.99 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle size={20} />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>

                {isSubmitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-400 text-sm"
                  >
                    Thanks for reaching out! I'll get back to you soon.
                  </motion.p>
                )}

                {isError && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-red-400 text-sm"
                  >
                    Something went wrong. Please try again or email me directly.
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
