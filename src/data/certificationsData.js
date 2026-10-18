// Certificates are hosted in: https://github.com/Saurav-Pandit2005/Certifications
// To add a new one: upload the file to that repo, then add an entry below with the exact file name.
export const certificationsRepo = 'https://github.com/Saurav-Pandit2005/Certifications';

const link = (fileName) =>
  `${certificationsRepo}/blob/main/${encodeURIComponent(fileName)}`;

export const certificationsData = [
  {
    id: 'intro-ml',
    title: 'Intro to Machine Learning',
    issuer: 'Kaggle',
    category: 'AI & ML',
    link: link('Intro to Machine Learning.png'),
  },
  {
    id: 'python-libs-ds',
    title: 'Python Libraries for Data Science',
    issuer: 'SkillUp',
    category: 'AI & ML',
    link: link('Python Libraries For Data Science.pdf'),
  },
  {
    id: 'python-kaggle',
    title: 'Python',
    issuer: 'Kaggle',
    category: 'Python',
    link: link('Python - Kaggle.png'),
  },
  {
    id: 'prompt-eng',
    title: 'Foundations of Prompt Engineering',
    issuer: 'AWS',
    category: 'AI & ML',
    link: link('Foundations of Prompt Engineering (AWS).pdf'),
  },
  {
    id: 'java-se8',
    title: 'Java SE 8 Features',
    issuer: 'Infosys',
    category: 'Java',
    link: link('Java SE 8 Features.pdf'),
  },
  {
    id: 'java-fundamentals',
    title: 'Java Programming Fundamentals',
    issuer: 'Infosys',
    category: 'Java',
    link: link('Java Programming Fundamental.pdf'),
  },
  {
    id: 'spring-mvc',
    title: 'Spring MVC',
    issuer: 'Infosys',
    category: 'Java',
    link: link('Spring MVC.pdf'),
  },
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    issuer: 'Apna College',
    category: 'DSA',
    link: link('Data Structure & Algorithms (Apna College).pdf'),
  },
  {
    id: 'advanced-sql',
    title: 'Advanced SQL',
    issuer: 'upGrad',
    category: 'Database',
    link: link('Advance Sql - upGard.pdf'),
  },
  {
    id: 'sql-basics',
    title: 'SQL Basic',
    issuer: 'HackerRank',
    category: 'Database',
    link: link('SQL_Basics(HackerRank).pdf'),
  },
  {
    id: 'sql-relational-101',
    title: 'SQL & Relational Databases 101',
    issuer: 'Cognitive Class',
    category: 'Database',
    link: link('SQL and Relational Databases 101.pdf'),
  },
  {
    id: 'dbms',
    title: 'Database Management System (Part 1)',
    issuer: 'Infosys',
    category: 'Database',
    link: link('Database Management System Part-1.pdf'),
  },
  {
    id: 'csharp',
    title: 'C# Fundamentals',
    issuer: 'Microsoft',
    category: 'C#',
    link: link('Microsoft C# Fundamental Certificate.pdf'),
  },
  {
    id: 'aws-cloud-foundations',
    title: 'Cloud Foundations (Graduate Badge)',
    issuer: 'AWS Academy',
    category: 'Cloud',
    link: link('AWS_Academy_Graduate_Cloud_Foundations_Training_Badge_Certificate.pdf'),
  },
  {
    id: 'gcp-security',
    title: 'Trust & Security with Google Cloud',
    issuer: 'Google Cloud',
    category: 'Cloud',
    link: link('Trust and Security With Google Cloud.pdf'),
  },
];
