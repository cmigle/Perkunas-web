import { StaticImageData } from "next/image";

export interface Partner {
  name: string;
  link?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
  active: boolean;
  tags: string[];
  teamMembers: string[];
  startDate?: string;
  status: "Active" | "Completed" | "On Hold";
  categories: (
    | "Mechanical"
    | "Electronics"
    | "Software"
    | "Aerodynamics"
    | "Powertrain"
    | "Business"
  )[];
  image?: StaticImageData;
  featured?: boolean;
  galleryImages?: { src: StaticImageData; alt: string }[];
  partners?: Partner[];
}

export const projects: Project[] = [
  {
    id: "formula-2026",
    name: "Formula Student 2026 Race Car",
    description: "Kuriam naują formulės bolidą 2026 metų sezonui. Šis projektas apima visus aspektus nuo dizaino iki gamybos, įskaitant aerodinamiką, važiuoklę, variklio valdymą ir elektronikos sistemas.",
    active: true,
    tags: ["Formula Student", "CAD Design", "Manufacturing", "Testing"],
    teamMembers: ["Benas Lukošiūnas", "Deividas Mičius", "Ervas Pakalniškelis", "Mantas Normantas"],
    startDate: "2024-09",
    status: "Active",
    categories: ["Mechanical", "Aerodynamics", "Electronics", "Software"],
    featured: true,
  },
  {
    id: "aerodynamics-package",
    name: "Aerodinamikos paketas",
    description: "Plėtojame pažangų aerodinamikos paketą, kuris apima priekinius ir galinius sparnus, difuzorių ir šoninių pontonų sistemą optimizuotam oro srauto valdymui.",
    active: true,
    tags: ["CFD Analysis", "Wind Tunnel", "Carbon Fiber", "Performance"],
    teamMembers: ["Ugnius Karvelis", "Vytautė Pratulienė"],
    startDate: "2024-10",
    status: "Active",
    categories: ["Aerodynamics", "Mechanical"],
    featured: true,
  },
  {
    id: "ecm-system",
    name: "Variklio valdymo sistema (ECM)",
    description: "Kuriame išmanią variklio valdymo sistemą, kuri optimizuoja degalų suvartojimą, galios išvestį ir emisijas realiu laiku.",
    active: true,
    tags: ["Engine Management", "Real-time Control", "Data Logging", "Performance Tuning"],
    teamMembers: ["Deividas Mičius", "Ervas Pakalniškelis"],
    startDate: "2024-08",
    status: "Active",
    categories: ["Electronics", "Software", "Powertrain"],
  },
  {
    id: "telemetry-system",
    name: "Telemetrijos sistema",
    description: "Plėtojame realaus laiko telemetrijos sistemą, kuri stebi automobilio veikimą, surinkti duomenis apie greitį, temperatūrą, slėgį ir kitus svarbius parametrus.",
    active: true,
    tags: ["Real-time Monitoring", "Data Analysis", "Wireless Communication", "Performance Analytics"],
    teamMembers: ["Mantas Normantas", "Benas Lukošiūnas"],
    startDate: "2024-11",
    status: "Active",
    categories: ["Electronics", "Software"],
  },
  {
    id: "chassis-design",
    name: "Šasi konstrukcija",
    description: "Projektavome ir gaminame lengvą, bet tvirta šasi naudojant plieno vamzdelius, optimizuojant saugumą ir našumą.",
    active: false,
    tags: ["Structural Design", "FEA Analysis", "Safety", "Weight Optimization"],
    teamMembers: ["Benas Lukošiūnas", "Ugnius Karvelis"],
    startDate: "2024-06",
    status: "Completed",
    categories: ["Mechanical"],
  },
  {
    id: "sponsorship-program",
    name: "Rėmėjų programa",
    description: "Vystyomas verslo planas ir rėmėjų pritraukimo strategija, siekiant finansuoti komandos veiklą ir projektų plėtrą.",
    active: true,
    tags: ["Business Development", "Partnership", "Marketing", "Funding"],
    teamMembers: ["Vytautė Pratulienė", "Mantas Normantas"],
    startDate: "2024-05",
    status: "Active",
    categories: ["Business"],
  },
];
   
  {
    id: "thundereye",
    name: "Thunder Eye - Real time drone tracking",
  description:
  `Thunder Eye is a next-generation, low-cost optical drone detection system. Using high-speed cameras and AI, it provides real-time 3D tracking of drones for military and civilian airspace protection. Scalable, stealthy, and fully autonomous, Thunder EYE outperforms radar and acoustic sensors in challenging environments.<br/><br/>
  <em>• Optical voxel projection for accurate 3D tracking</em><br/
    <em>• ≥300 FPS global shutter, IR + visible light</em><br/>
    <em>• Modular, scalable camera network</em><br/>
    <em>• Outputs to GIS/military maps in real time</em>`,
    link: "",
    active: true,
    tags: [
      "Miltech",
      "Drone Detection",
      "Optical Tracking",
      "AI",
      "Aerospace",
      "Defense Systems",
    ],
    teamMembers: [
      "Simonas Aukštuolis",
      "Ignas Mikolaitis",
      "Miglė Cirtautaitė",
      "Julius Barauskas",
      "Dominykas Remeika"
    ],
    startDate: "2025-01",
    status: "Active",
    image: dronewireframe,
  categories: ["Aerospace", "Hardware", "Software", "AI"],
    featured: true,
    galleryImages: [
      { src: drone1, alt: "Thunder EYE Node" },
      { src: drone2, alt: "Thunder EYE Camera" },
      { src: drone3, alt: "Thunder EYE System" }
    ],
    partners: ["Lithuanian Armed Forces", "MAKERSPACE.LT"],
  },
  
  {
    id: "rocketfuelautomation",
    name: "Rocket Fuel Automation",
    description:
      "This project focuses on the <strong>complete automation of rocket fuel production</strong>. We are engineering a sophisticated system that integrates:<br/><br/>• <em>Industrial IoT sensors</em> for real-time monitoring<br/>• <em>Automated quality control checkpoints</em> to ensure fuel consistency<br/>• <em>Redundant safety systems</em> to manage hazardous materials<br/><br/>The goal is to create a scalable, efficient, and safe manufacturing process for next-generation propellants.",
    link: "",
    active: true,
    tags: [
      "Automation",
      "Industrial IoT",
      "Safety Systems",
      "Quality Control",
      "Electronics",
    ],
    teamMembers: [
      "Simonas Aukštuolis",
      "Ignas Mikolaitis",
      "Miglė Cirtautaitė",
      "Julius Barauskas",
      "Dominykas Remeika",
      "Dominykas Leknickas",
      "Dovydas Jusevičius",
    ],
    startDate: "2024-12",
    status: "Active",
    categories: ["Hardware", "Software", "Research"],
    image: dryer1,
    galleryImages: [{ src: dryer2, alt: "Rocket Fuel Dryer" }, { src: conveyorwireframe, alt: "Conveyor" }, { src: dryer3, alt: "Rocket Fuel Dryer" }],
    partners: ["JLCPCB", "Kaunas Makerspace"],
  },
  {
    id: "rocket",
    name: "Propulsion & Rocket Fuel Development",
    description:
      "Our <strong>flagship rocket development program</strong> involves the end-to-end design, simulation, and manufacturing of advanced, reusable rocket systems. We are pushing the boundaries of aerospace engineering with:<br/><br/>• <em>Innovative propulsion technologies</em><br/>• <em>Lightweight and durable structural components</em><br/>• <em>Sophisticated avionics</em> for precise control and telemetry<br/><br/>This project aims to make space access more <strong>affordable and sustainable</strong>.",
    link: "",
    active: true,
    tags: [
      "Aerospace Engineering",
      "Rocket Tech",
      "Propulsion Systems",
      "Avionics",
      "Structural Design",
    ],
    teamMembers: [
      "Simonas Aukštuolis",
      "Ignas Mikolaitis",
      "Miglė Cirtautaitė",
      "Julius Barauskas",
      "Dominykas Remeika",
      "Dovydas Jusevičius"
    ],
    startDate: "2024-12",
    status: "Active",
    categories: ["Aerospace", "Research"],
    image: fwd,
    featured: true, // <-- Mark as featured
    galleryImages: [
      { src: rocket1, alt: "Rocket" },
      { src: rocket3, alt: "Rocket" },
      { src: rocket2, alt: "Rocket" },
    ],
  },
  {
    id: "thunderbee",
    name: "Thunderbee Drone Interceptor",
    description:
      "<strong>Winner of the EUDIS hackathon</strong>, the Thunderbee is a state-of-the-art drone interceptor designed for defense and security applications. It combines:<br/><br/>• <em>Rapid prototyping</em> with advanced AI-driven target recognition<br/>• <em>Autonomous flight capabilities</em><br/>• <em>Hardware, software, and AI integration</em><br/><br/>The system is engineered to neutralize aerial threats <strong>swiftly and effectively</strong>.",
    link: "https://www.facebook.com/StartupSpace/posts/pfbid02mLauF3Y4Hw9NvUvJfX7XYknY64QBvZZXeirur3b2MbcnL2nDdnpww7FwD7yrvq5Vl?rdid=39SG0WNmrs4JbR1J#",
    active: true,
    tags: [
      "Drone Technology",
      "3D Modeling",
      "Defense Systems",
      "AI",
      "Electronics",
      "Rapid Prototyping",
    ],
    teamMembers: [
      "Ignas Mikolaitis",
      "Simonas Aukštuolis",
      "Miglė Cirtautaitė",
    ],
    startDate: "2025-05",
    status: "Active",
    image: drone2,
    categories: ["Aerospace", "Hardware", "Software"],
    featured: true, // <-- Mark as featured
    galleryImages: [{ src: drone3, alt: "Thunderbee Drone" }, { src: dronewireframe, alt: "Thunderbee" }, { src: drone1, alt: "Thunderbee Drone" }],
    partners: ["Lithuanian Armed Forces"],
  },
  {
    id: "cansat1",
    name: "Thunderclap Cansat v1 (Satellite Project)",
    description:
      "Our <strong>first foray into satellite technology</strong>, the Cansat v1 was a miniature satellite built to fit inside a standard soda can. This project featured:<br/><br/>• <em>Electronic systems and telemetry</em><br/>• <em>3D-modeled structural design</em><br/>• <em>Successful data transmission</em> during mission<br/><br/>Providing invaluable experience for our <strong>future satellite endeavors</strong>.",
    link: "https://www.youtube.com/watch?v=AwtJzvZ51m0",
    active: false,
    tags: [
      "Aerospace Engineering",
      "Satellite Technology",
      "Telemetry",
      "Electronics",
      "3D Modeling",
    ],
    teamMembers: [
      "Ignas Mikolaitis",
      "Simonas Aukštuolis",
      "Dominykas Mačiulaitis",
      "Dominykas Leknickas",
    ],
    startDate: "2023-03",
    image: cansat,
    status: "Completed",
    categories: ["Aerospace", "Hardware", "Software"],
    galleryImages: [{ src: cansatweb, alt: "Cansat Web" }, { src: cansatwireframe, alt: "Cansat Wireframe" }, { src: cansatinz, alt: "Cansat v1", }],
  },
  {
    id: "dronedetection",
    name: "Drone Detection",
    description:
      "To counter the growing challenge of <strong>unauthorized drone activity</strong>, we are creating a multi-layered detection system. This project integrates:<br/><br/>• <em>Advanced radar and acoustic sensors</em><br/>• <em>High-resolution optical cameras</em><br/>• <em>AI-powered recognition engine</em><br/><br/>The system identifies, classifies, and tracks multiple drones in <strong>real-time</strong>, providing comprehensive aerial security.",
    link: "",
    active: true,
    tags: [
      "AI",
      "Computer Vision",
      "Radar Technology",
      "Defense Systems",
      "Electronics",
    ],
    teamMembers: [
      "Ignas Mikolaitis",
      "Simonas Aukštuolis",
      "Miglė Cirtautaitė",
    ],
    startDate: "2025-05",
    status: "Active",
    image: dronedetection,
    categories: ["AI", "Software"],
    partners: ["Lithuanian Armed Forces"],
  },
];
