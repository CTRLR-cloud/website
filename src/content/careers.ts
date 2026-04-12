export type CareerPost = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  level: string;
  salary?: string;
  excerpt: string;
  posted: string;
};

export const careerDepartments = [
  "All",
  "Engineering",
  "Robotics",
  "Design",
  "Marketing",
  "Operations",
] as const;

export const careerPosts: CareerPost[] = [

  {
    slug: "embedded-systems-engineer",
    title: "Embedded Systems Engineer",
    department: "Robotics",
    location: "Remote",
    type: "Full-time",
    level: "Senior",
    salary: "$140k – $180k",
    excerpt:
      "Develop low-latency firmware for robotic controllers and edge devices. Experience with ARM, FPGA, and real-time operating systems required.",
    posted: "April 3, 2026",
  },
  {
    slug: "robotics-systems-engineer",
    title: "Robotics Systems Engineer",
    department: "Robotics",
    location: "Remote",
    type: "Full-time",
    level: "Mid-Senior",
    salary: "$110k – $150k",
    excerpt:
      "Design and integrate robotic hardware and software systems. Work with ROS2, embedded systems, and real-time control architectures.",
    posted: "April 10, 2026",
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    level: "Senior",
    salary: "$80k – $120k",
    excerpt:
      "Shape the future of human-robot interaction. Design intuitive interfaces for complex robotic control systems and blockchain-native applications.",
    posted: "April 8, 2026",
  },
  {
    slug: "frontend-engineer",
    title: "Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    level: "Mid",
    salary: "$60k – $80k",
    excerpt:
      "Create beautiful, high-performance user interfaces for our teleoperation dashboard and network explorer using React and Next.js.",
    posted: "April 12, 2026",
  },
  
  
  /* Hidden
  {
    slug: "devrel-engineer",
    title: "Developer Relations Engineer",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    level: "Mid-Senior",
    excerpt:
      "Build community and help developers succeed on CTRL+R. Create tutorials, documentation, and engage with the robotics and blockchain communities.",
    posted: "Jan 5, 2026",
  },
  
  {
    slug: "operations-manager",
    title: "Operations Manager",
    department: "Operations",
    location: "Remote (US)",
    type: "Full-time",
    level: "Mid-Senior",
    excerpt:
      "Scale our operations as we grow. Manage vendor relationships, coordinate cross-functional projects, and optimize internal processes.",
    posted: "Dec 20, 2025",
  },
  */
];



