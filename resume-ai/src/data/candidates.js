export const initialCandidates = [
  {
    id: 1,
    name: "Alex Johnson", initials: "AJ", title: "Senior Python Developer",
    email: "alex.j@email.com", phone: "+1 (555) 123-4567", location: "San Francisco, CA",
    skills: ["Python", "Django", "Machine Learning", "AWS", "Docker", "PostgreSQL"],
    experience: "7 years", education: "M.S. Computer Science",
    score: 92, scoreClass: "score-high", status: "none",
    summary: "Strong candidate with extensive experience in Python development, machine learning, and cloud infrastructure. Demonstrates leadership qualities and a track record of delivering scalable solutions.",
    questions: [
      "Can you walk us through a recent ML pipeline you've built from scratch?",
      "How do you approach optimizing Python applications for large-scale data processing?",
      "Describe your experience with cloud-native architectures and microservices."
    ],
    resume: `<strong>PROFESSIONAL SUMMARY</strong>\nResults-driven Senior Python Developer with 7+ years of experience designing and implementing scalable software solutions. Expertise in <mark>machine learning</mark>, data engineering, and <mark>cloud infrastructure</mark>.\n\n<strong>EXPERIENCE</strong>\n<strong>Senior Python Developer — TechCorp Inc.</strong> (2021–Present)\n• Led development of an ML-powered recommendation engine serving 2M+ users\n• Architected microservices platform using <mark>Python</mark>, FastAPI, and <mark>Docker</mark>\n• Reduced data processing time by 60% through pipeline optimization\n\n<strong>Python Developer — DataFlow Solutions</strong> (2019–2021)\n• Built ETL pipelines processing 10TB+ data daily using Apache Spark\n• Implemented CI/CD workflows with Jenkins and <mark>AWS</mark> CodePipeline\n\n<strong>EDUCATION</strong>\nM.S. Computer Science — Stanford University (2018)\nB.S. Computer Science — UC Berkeley (2016)\n\n<strong>SKILLS</strong>\n<mark>Python</mark>, <mark>Django</mark>, FastAPI, <mark>Machine Learning</mark>, TensorFlow, PyTorch, <mark>AWS</mark>, <mark>Docker</mark>, Kubernetes, <mark>PostgreSQL</mark>, Redis, Apache Spark`
  },
  {
    id: 2,
    name: "Sarah Williams", initials: "SW", title: "Full Stack JavaScript Developer",
    email: "sarah.w@email.com", phone: "+1 (555) 234-5678", location: "New York, NY",
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "MongoDB", "GraphQL"],
    experience: "5 years", education: "B.S. Software Engineering",
    score: 87, scoreClass: "score-high", status: "none",
    summary: "Versatile full-stack developer with strong React and Node.js expertise. Excellent at building responsive, user-friendly applications with clean architecture.",
    questions: [
      "How do you manage state in large-scale React applications?",
      "Describe your approach to API design and performance optimization.",
      "Tell us about a challenging debugging experience with Node.js."
    ],
    resume: `<strong>PROFESSIONAL SUMMARY</strong>\nCreative Full Stack Developer with 5 years of experience building modern web applications. Passionate about clean code, responsive design, and exceptional user experiences.\n\n<strong>EXPERIENCE</strong>\n<strong>Senior Frontend Developer — WebStudio</strong> (2022–Present)\n• Built React-based SaaS dashboard serving 500K+ monthly users\n• Implemented <mark>GraphQL</mark> API layer reducing data fetching by 40%\n\n<strong>Full Stack Developer — AppWorks</strong> (2020–2022)\n• Developed full-stack applications using <mark>React</mark>, <mark>Node.js</mark>, and <mark>MongoDB</mark>\n• Led migration from JavaScript to <mark>TypeScript</mark> across 200K+ lines of code\n\n<strong>EDUCATION</strong>\nB.S. Software Engineering — NYU (2020)`
  },
  {
    id: 3,
    name: "Michael Chen", initials: "MC", title: "Data Scientist",
    email: "m.chen@email.com", phone: "+1 (555) 345-6789", location: "Seattle, WA",
    skills: ["Python", "R", "TensorFlow", "SQL", "Tableau", "Statistics"],
    experience: "6 years", education: "Ph.D. Statistics",
    score: 85, scoreClass: "score-high", status: "none",
    summary: "Data-driven scientist with deep expertise in statistical modeling and machine learning. Published researcher with strong analytical skills.",
    questions: [
      "Explain a time you used A/B testing to drive a product decision.",
      "How do you validate your machine learning models in production?",
      "What's your approach to communicating complex data insights to stakeholders?"
    ],
    resume: `<strong>PROFESSIONAL SUMMARY</strong>\nData Scientist with 6 years of experience in statistical modeling, <mark>machine learning</mark>, and data visualization. Ph.D. in Statistics with published research.\n\n<strong>EXPERIENCE</strong>\n<strong>Senior Data Scientist — AnalyticsPro</strong> (2021–Present)\n• Developed predictive models improving customer retention by 25%\n• Built real-time dashboards using <mark>Python</mark> and <mark>Tableau</mark>\n\n<strong>EDUCATION</strong>\nPh.D. Statistics — University of Washington (2020)`
  },
  {
    id: 4,
    name: "Priya Patel", initials: "PP", title: "DevOps Engineer",
    email: "priya.p@email.com", phone: "+1 (555) 456-7890", location: "Austin, TX",
    skills: ["AWS", "Kubernetes", "Docker", "Terraform", "Python", "CI/CD"],
    experience: "4 years", education: "B.S. Computer Science",
    score: 78, scoreClass: "score-medium", status: "none",
    summary: "Experienced DevOps engineer with strong cloud infrastructure skills. Expert at building automated deployment pipelines and managing container orchestration.",
    questions: [
      "How do you approach infrastructure as code in a multi-cloud environment?",
      "Describe your experience managing Kubernetes clusters at scale.",
      "What monitoring and alerting strategies have you implemented?"
    ],
    resume: `<strong>PROFESSIONAL SUMMARY</strong>\nDevOps Engineer with 4 years of experience in cloud infrastructure and automation. Skilled in <mark>AWS</mark>, <mark>Kubernetes</mark>, and <mark>Terraform</mark>.\n\n<strong>EXPERIENCE</strong>\n<strong>DevOps Engineer — CloudFirst</strong> (2022–Present)\n• Managed <mark>Kubernetes</mark> clusters serving 100+ microservices\n• Implemented <mark>Terraform</mark> IaC reducing provisioning time by 80%\n\n<strong>EDUCATION</strong>\nB.S. Computer Science — UT Austin (2021)`
  },
  {
    id: 5,
    name: "David Kim", initials: "DK", title: "Backend Java Developer",
    email: "david.k@email.com", phone: "+1 (555) 567-8901", location: "Chicago, IL",
    skills: ["Java", "Spring Boot", "Microservices", "SQL", "Kafka", "Redis"],
    experience: "8 years", education: "M.S. Software Engineering",
    score: 74, scoreClass: "score-medium", status: "none",
    summary: "Seasoned Java developer with expertise in enterprise applications and microservices architecture. Strong background in high-throughput distributed systems.",
    questions: [
      "How do you design microservices for scalability and fault tolerance?",
      "Describe your experience with event-driven architecture using Kafka.",
      "How do you ensure data consistency in distributed systems?"
    ],
    resume: `<strong>PROFESSIONAL SUMMARY</strong>\n8+ years experienced Java developer specializing in enterprise applications and <mark>microservices</mark> architecture.\n\n<strong>EXPERIENCE</strong>\n<strong>Lead Java Developer — EnterpriseSoft</strong> (2020–Present)\n• Designed <mark>microservices</mark> platform handling 1M+ transactions/day\n• Implemented event-driven architecture using <mark>Kafka</mark>\n\n<strong>EDUCATION</strong>\nM.S. Software Engineering — Illinois Tech (2017)`
  },
  {
    id: 6,
    name: "Emily Rodriguez", initials: "ER", title: "UI/UX Designer & Frontend Dev",
    email: "emily.r@email.com", phone: "+1 (555) 678-9012", location: "Los Angeles, CA",
    skills: ["React", "Figma", "CSS", "JavaScript", "Accessibility", "Design Systems"],
    experience: "4 years", education: "B.A. Design",
    score: 71, scoreClass: "score-medium", status: "none",
    summary: "Creative designer-developer hybrid with a passion for accessible and beautiful interfaces. Strong portfolio of design system implementations.",
    questions: [
      "How do you balance aesthetic design with accessibility requirements?",
      "Walk us through your design system creation process.",
      "How do you collaborate with backend engineers on API contracts?"
    ],
    resume: `<strong>PROFESSIONAL SUMMARY</strong>\nUI/UX Designer & Frontend Developer with 4 years creating beautiful, accessible web experiences.\n\n<strong>EXPERIENCE</strong>\n<strong>Senior UI Developer — DesignLab</strong> (2023–Present)\n• Built component library used across 10+ products\n• Achieved WCAG 2.1 AA compliance across all products\n\n<strong>EDUCATION</strong>\nB.A. Design — UCLA (2021)`
  },
  {
    id: 7,
    name: "James Wilson", initials: "JW", title: "Machine Learning Engineer",
    email: "james.w@email.com", phone: "+1 (555) 111-2222", location: "Boston, MA",
    skills: ["Python", "PyTorch", "LLMs", "NLP", "Computer Vision", "AWS"],
    experience: "5 years", education: "M.S. AI/ML",
    score: 95, scoreClass: "score-high", status: "none",
    summary: "Exceptional ML engineer with cutting-edge LLM and NLP expertise. Published multiple papers on transformer architectures.",
    questions: [
      "What's your experience fine-tuning large language models for domain-specific tasks?",
      "How do you evaluate model performance beyond standard metrics?",
      "Describe a production ML system you've designed end-to-end."
    ],
    resume: `<strong>PROFESSIONAL SUMMARY</strong>\nMachine Learning Engineer with 5 years of experience in NLP, computer vision, and LLM development.\n\n<strong>EXPERIENCE</strong>\n<strong>ML Engineer — AI Research Co.</strong> (2022–Present)\n• Fine-tuned <mark>LLMs</mark> for enterprise document understanding\n• Built <mark>NLP</mark> pipeline processing 50K+ documents daily\n\n<strong>EDUCATION</strong>\nM.S. AI/ML — MIT (2021)`
  },
  {
    id: 8,
    name: "Lisa Thompson", initials: "LT", title: "Cloud Architect",
    email: "lisa.t@email.com", phone: "+1 (555) 333-4444", location: "Denver, CO",
    skills: ["AWS", "Azure", "GCP", "Terraform", "Security", "Networking"],
    experience: "10 years", education: "B.S. IT",
    score: 68, scoreClass: "score-medium", status: "none",
    summary: "Senior cloud architect with multi-cloud expertise and strong security focus. Led cloud migrations for Fortune 500 companies.",
    questions: [
      "How do you approach multi-cloud strategy and vendor lock-in concerns?",
      "Describe your approach to cloud security and compliance.",
      "What's your experience with cost optimization in cloud environments?"
    ],
    resume: `<strong>PROFESSIONAL SUMMARY</strong>\nCloud Architect with 10 years designing and managing enterprise cloud infrastructure across <mark>AWS</mark>, <mark>Azure</mark>, and <mark>GCP</mark>.\n\n<strong>EXPERIENCE</strong>\n<strong>Principal Cloud Architect — CloudScale</strong> (2020–Present)\n• Led cloud migration for 3 Fortune 500 clients\n\n<strong>EDUCATION</strong>\nB.S. Information Technology — Colorado State (2015)`
  },
  {
    id: 9,
    name: "Robert Martinez", initials: "RM", title: "Junior Python Developer",
    email: "r.martinez@email.com", phone: "+1 (555) 555-6666", location: "Miami, FL",
    skills: ["Python", "Flask", "SQL", "Git", "HTML/CSS", "REST APIs"],
    experience: "1 year", education: "B.S. Computer Science",
    score: 55, scoreClass: "score-low", status: "none",
    summary: "Motivated junior developer with foundational Python skills. Shows strong learning aptitude and enthusiasm for backend development.",
    questions: [
      "What projects have you built independently to strengthen your skills?",
      "How do you approach learning new technologies or frameworks?",
      "Describe a bug you encountered and how you solved it."
    ],
    resume: `<strong>PROFESSIONAL SUMMARY</strong>\nJunior Python Developer with 1 year of professional experience building web applications with <mark>Flask</mark> and REST APIs.\n\n<strong>EXPERIENCE</strong>\n<strong>Junior Developer — StartupXYZ</strong> (2025–Present)\n• Built REST APIs using <mark>Python</mark> and <mark>Flask</mark>\n\n<strong>EDUCATION</strong>\nB.S. Computer Science — FIU (2024)`
  },
  {
    id: 10,
    name: "Anna Kowalski", initials: "AK", title: "QA Automation Engineer",
    email: "anna.k@email.com", phone: "+1 (555) 777-8888", location: "Portland, OR",
    skills: ["Selenium", "Python", "Cypress", "CI/CD", "Jest", "Performance Testing"],
    experience: "3 years", education: "B.S. Computer Science",
    score: 62, scoreClass: "score-medium", status: "none",
    summary: "Detail-oriented QA automation engineer with expertise in building robust test suites across multiple frameworks.",
    questions: [
      "How do you decide what to automate vs. test manually?",
      "Describe your approach to performance testing at scale.",
      "How do you integrate automated tests into CI/CD pipelines?"
    ],
    resume: `<strong>PROFESSIONAL SUMMARY</strong>\nQA Automation Engineer with 3 years of experience building comprehensive test suites.\n\n<strong>EXPERIENCE</strong>\n<strong>QA Engineer — QualitySoft</strong> (2023–Present)\n• Built <mark>Selenium</mark> and <mark>Cypress</mark> test frameworks covering 95% of critical paths\n\n<strong>EDUCATION</strong>\nB.S. Computer Science — Oregon State (2022)`
  }
];
