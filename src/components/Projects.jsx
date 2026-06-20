import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import { projectsData, personalInfo } from '../data/portfolioData'

const ProjectCard = ({ project, index, isInView }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group relative glass rounded-2xl overflow-hidden hover:border-accent/40 transition-all duration-300"
    >
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />

        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-accent/20 rounded-xl text-accent hover:bg-accent hover:text-background transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`View ${project.title} source code on GitHub`}
          >
            <Github size={22} />
          </motion.a>

          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-secondary/20 rounded-xl text-secondary hover:bg-secondary hover:text-background transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`View ${project.title} live demo`}
          >
            <ExternalLink size={22} />
          </motion.a>
        </div>

        {project.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-accent to-secondary text-background text-xs font-semibold rounded-full">
            Featured
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-heading text-xl font-semibold mb-2 group-hover:text-accent transition-colors flex items-center gap-2">
          {project.title}

          <ArrowUpRight
            size={18}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            aria-hidden="true"
          />
        </h3>

        <p className="text-textSecondary text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-lg"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'radial-gradient(600px circle at center, rgba(56, 189, 248, 0.06), transparent 40%)'
        }}
        aria-hidden="true"
      />
    </motion.article>
  )
}

const Projects = () => {
  const sectionRef = useRef(null)

  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px'
  })

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="pt-4 md:pt-6 pb-16 md:pb-24 relative"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">
            My Work
          </span>

          <h2
            id="projects-heading"
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4"
          >
            Featured Projects
          </h2>

          <p className="text-textSecondary max-w-2xl mx-auto">
            A selection of projects that showcase my skills and passion for
            building premium digital experiences.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <motion.a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-xl text-textPrimary font-medium hover:border-accent/40 hover:text-accent transition-all group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github size={20} />

            View All Projects on GitHub

            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects