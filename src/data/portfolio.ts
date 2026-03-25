export const personalInfo = {
  name: "Johnny P. Antiojo Jr.",
  title: "Full-Stack Software Developer",
  subtitle: "Building scalable, fault-tolerant web applications",
  email: "jrantiojobhoy@gmail.com",
  phone: "+639380797638",
  github: "https://github.com/JohnnyBhoy",
  linkedin: "https://www.linkedin.com/in/johnny-antiojo",
  summary: `Results-driven Full-Stack Software Developer with 6+ years of experience building scalable, fault-tolerant, and security-compliant web applications. Proficient in React, TypeScript, Vue.js, and Node.js on the frontend and backend, with a strong command of HTML/CSS, responsive design, and TailwindCSS. Experienced in clean code principles (SOLID, DRY, KISS, YAGNI), CI/CD pipelines, automated testing, and cross-functional collaboration with engineers, designers, testers, and product owners. Proactive in surfacing UX and performance issues throughout the development lifecycle.`,
};

export const experiences = [
  {
    title: "Fullstack Software Developer",
    company: "SALT Marketing",
    type: "Freelance Contractor",
    period: "Aug 2023 – Aug 2025",
    color: "cyan",
    bullets: [
      "Designed and developed fault-tolerant, security-standards-compliant web applications for a sales lead generation team and manufacturer-sales rep platforms.",
      "Served as a 1-person dev team, leading all phases: architecture, development, testing, deployment, and maintenance.",
      "Built responsive UIs using React, TypeScript, and TailwindCSS with a focus on performance optimization and UX best practices.",
      "Applied clean coding principles (SOLID, KISS, DRY) and implemented CI/CD pipelines for automated builds and deployments.",
      "Proactively identified and resolved UX and performance bottlenecks, improving application responsiveness and user experience.",
      "Utilized PHP, JavaScript (Node.js), and C# (.NET) for full-stack development across multiple projects.",
    ],
  },
  {
    title: "Backend Web Developer",
    company: "PPD (Pharmaceutical Product Development)",
    type: "Full-time",
    period: "Aug 2020 – Aug 2023",
    color: "purple",
    bullets: [
      "Developed and maintained internal and public-facing web applications using PHP, JavaScript, and Node.js.",
      "Collaborated closely with engineers, data analysts, and product owners to build data analytics dashboards using Tableau for oncology data.",
      "Managed relational databases (MySQL, SQL Server) and contributed to data pipeline design for converting raw data into actionable insights.",
      "Participated in code reviews and enforced best practices for secure, maintainable, and well-documented code.",
      "Worked within an Agile team, communicating effectively across engineers, testers, and stakeholders throughout the SDLC.",
    ],
  },
  {
    title: "Fullstack Web Developer",
    company: "LR-Tech Software Solutions",
    type: "Part-time",
    period: "Jul 2019 – Aug 2020",
    color: "blue",
    bullets: [
      "Co-developed a Barangay Information System automating manual LGU processes (PNP Clearance, Barangay IS, Traffic Management) using JavaScript and PHP.",
      "Collaborated in a 2-person dev team covering design, development, presentation, and implementation phases.",
      "Delivered a responsive, user-friendly interface following HTML/CSS standards and accessibility considerations.",
    ],
  },
];

export const skillCategories = [
  {
    title: "Frontend",
    icon: "monitor",
    color: "cyan",
    skills: [
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Vue.js", icon: "vue" },
      { name: "React Native", icon: "mobile" },
      { name: "TailwindCSS", icon: "tailwind" },
      { name: "HTML5", icon: "html" },
      { name: "CSS3", icon: "css" },
      { name: "Redux", icon: "redux" },
      { name: "Zustand", icon: "zustand" },
      { name: "jQuery", icon: "jquery" },
      { name: "Bootstrap", icon: "bootstrap" },
      { name: "Jest", icon: "jest" },
    ],
  },
  {
    title: "Backend & APIs",
    icon: "server",
    color: "purple",
    skills: [
      { name: "Node.js", icon: "node" },
      { name: "Express.js", icon: "express" },
      { name: "PHP", icon: "php" },
      { name: "Laravel", icon: "laravel" },
      { name: "C# / .NET", icon: "dotnet" },
      { name: "REST APIs", icon: "api" },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: "tool",
    color: "blue",
    skills: [
      { name: "Git / GitHub", icon: "git" },
      { name: "Docker", icon: "docker" },
      { name: "AWS", icon: "aws" },
      { name: "Firebase", icon: "firebase" },
      { name: "Nginx", icon: "nginx" },
      { name: "CI/CD", icon: "cicd" },
      { name: "Vite", icon: "vite" },
      { name: "Webpack", icon: "webpack" },
    ],
  },
  {
    title: "Databases",
    icon: "database",
    color: "green",
    skills: [
      { name: "MySQL", icon: "mysql" },
      { name: "PostgreSQL", icon: "postgres" },
      { name: "MongoDB", icon: "mongo" },
      { name: "SQL Server", icon: "sqlserver" },
      { name: "Redis", icon: "redis" },
      { name: "Elasticsearch", icon: "elastic" },
    ],
  },
];

export const projects = [
  {
    name: "GopeakFit",
    url: "https://gopeakfit.com",
    description: "AI-powered SMS-based Expert Workout & Diet Coach. Leverages AI to provide personalized fitness and nutrition guidance through conversational SMS interface.",
    tags: ["AI", "SMS", "Full-Stack", "React", "Node.js"],
    color: "cyan",
    featured: true,
  },
  {
    name: "RepSearcher",
    url: "https://repsearcher.com",
    description: "Platform connecting Manufacturers and Sales Representatives. Streamlines B2B matchmaking between manufacturers seeking reps and reps looking for lines.",
    tags: ["React", "TypeScript", "Node.js", "MySQL"],
    color: "purple",
    featured: true,
  },
  {
    name: "Hotel & Villa Booking",
    url: "http://johnnyantiojo-001-site1.ntempurl.com",
    description: "Online Hotel & Villa Booking System with real-time availability, reservation management, and payment integration.",
    tags: ["C# .NET", "MVC", "SQL Server", "Bootstrap"],
    color: "blue",
    featured: false,
  },
];

export const education = [
  {
    degree: "BS Information Technology",
    school: "CEDAR College",
    location: "Negros Occidental, Philippines",
    year: "2020",
    icon: "graduation",
  },
  {
    degree: "AI, Machine Learning & AWS Solutions Architect",
    school: "Udemy (Currently Enrolled)",
    location: "Online",
    year: "2024–Present",
    icon: "brain",
  },
];

export const certifications = [
  {
    name: ".NET Core MVC Clean Architecture",
    issuer: "Udemy",
    url: "https://www.udemy.com/certificate/UC-27348239-90e9-4375-999e-cd15194bb4b6/",
    color: "purple",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "Dec 2021",
    url: "https://www.credly.com/badges/b02d8170-7270-4fd0-9b4b-c8a050118781",
    color: "cyan",
  },
];
