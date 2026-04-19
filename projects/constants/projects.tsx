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