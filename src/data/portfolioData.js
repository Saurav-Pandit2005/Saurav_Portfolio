import {
  Globe,
  Server,
  Cloud,
  Terminal,
  Layers,
} from 'lucide-react';

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export const personalInfo = {
  name: 'Saurav Pandit',
  role: 'Full Stack Web Developer | AI & ML Enthusiast',
  tagline: 'Building scalable web applications and practical AI/ML solutions',
  bio: "I'm a Computer Engineering student passionate about Full Stack Web Development, Artificial Intelligence, and Machine Learning. I enjoy building scalable web applications, solving Data Structures & Algorithms problems, and exploring technologies that create real-world impact.",
  email: 'sauravpandit9691@gmail.com',
  github: 'https://github.com/Saurav-Pandit2005',
  linkedin: 'https://www.linkedin.com/in/saurav2005',
  twitter: '',
  location: 'Gujarat, India',
  availability: 'Open to Internships & Opportunities',
  avatar: '/Profile.jpg',
};

export const aboutData = {
  description: [
    "I'm a Computer Engineering student passionate about Full Stack Web Development, Artificial Intelligence, and Machine Learning.",
    "Currently focused on improving my MERN Stack Development, strengthening my Problem Solving with Java, and building practical AI & ML Projects."
  ],

  stats: [
    { label: 'DSA Problems', value: '60+', link: 'https://leetcode.com/u/spandit2005/' },
    { label: 'Projects Built', value: '3+', link: 'https://github.com/Saurav-Pandit2005' },
    { label: 'Certifications', value: '10+', link: 'https://github.com/Saurav-Pandit2005/Certifications' },
    { label: 'CGPA', value: '8.57' },
  ],

  timeline: [
    {
      year: '2024 - Present',
      title: 'Computer Engineering Student',
      company: 'RK University — 8.57 (CGPA)',
    },
    {
      year: '2023 - 2024',
      title: 'Electrical Engineering Student',
      company: 'Gujarat Technological University (GTU) — 8.26 (CGPA)',
    },
    {
      year: '2022 - 2023',
      title: 'Class XII (HSC)',
      company: 'GSEB — 61.2%',
    },
    {
      year: '2020 - 2021',
      title: 'Class X (SSC)',
      company: 'GSEB — 84.8%',
    },
  ],
};

export const skillsData = [
  {
    category: 'Programming Languages',
    icon: Terminal,
    skills: [
      { name: 'Java', level: 85 },
      { name: 'JavaScript', level: 80 },
      { name: 'Python', level: 80 },
      { name: 'PHP', level: 75 },
      { name: 'SQL', level: 75 },
    ],
  },

  {
    category: 'Frontend Development',
    icon: Globe,
    skills: [
      { name: 'React', level: 80 },
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 85 },
      { name: 'Bootstrap', level: 85 },
      { name: 'TailwindCSS', level: 80 },
    ],
  },

  {
    category: 'Backend & Databases',
    icon: Server,
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'MySQL', level: 75 },
      { name: 'PostgreSQL', level: 70 },
    ],
  },

  {
    category: 'AI & Machine Learning',
    icon: Layers,
    skills: [
      { name: 'Python', level: 80 },
      { name: 'NumPy', level: 85 },
      { name: 'Pandas', level: 85 },
      { name: 'Matplotlib & Seaborn', level: 80 },
      { name: 'Scikit-Learn', level: 80 },
    ],
  },

  {
    category: 'Tools & Platforms',
    icon: Cloud,
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'VS Code', level: 90 },
      { name: 'Postman', level: 85 },
      { name: 'Juypter Notebook', level: 85 },
      { name: 'Google Colab', level: 85 },
    ],
  },

  {
    category: 'CS Fundamentals',
    icon: Cloud,
    skills: [
      { name: 'DSA', level: 85 },
      { name: 'OOP', level: 90 },
      { name: 'DBMS', level: 85 },
      { name: 'OS', level: 80 },
      { name: 'CN', level: 75 },
    ],
  },
];

export const projectsData = [
  {
    id: 1,
    title: 'The Blog Hub',
    description:
      'A modern blogging platform built using the MERN Stack. Features secure user authentication & authorization, dynamic blog post management, categorisation, global search, a responsive user interface, and an admin dashboard.',
    image:
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
    techStack: [
      'MongoDB',
      'Express.js',
      'React.js',
      'Node.js',
    ],
    github: 'https://github.com/Saurav-Pandit2005/The-Blog-Hub',
    live: '#',
    featured: true,
  },

  {
    id: 2,
    title: 'House Price Predictor',
    description:
      'Machine Learning application that predicts house prices using trained regression models. Includes data preprocessing, feature engineering, model evaluation, and an interactive frontend built using Streamlit.',
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    techStack: [
      'Python',
      'Pandas',
      'NumPy',
      'Scikit-Learn',
      'Streamlit',
    ],
    github: 'https://github.com/Saurav-Pandit2005/House-Price-Predictor',
    live: 'https://house-price-predictor-saurav.streamlit.app/',
    featured: true,
  },
];

export const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/Saurav-Pandit2005',
    icon: 'github',
  },

  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/saurav2005',
    icon: 'linkedin',
  },

  {
    name: 'Email',
    url: 'mailto:sauravpandit9691@gmail.com',
    icon: 'mail',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/srv__2.0',
    icon: 'instagram',
  },
];