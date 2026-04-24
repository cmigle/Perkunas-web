// Central manifest of available images — maps legacy filenames to real /public/images paths.

export const LOGO = '/images/logo.DW5XiSKA.png';
export const FAVICON = '/images/favicon.C7VaowoF.jpg';

export const GALLERY = [
  { src: '/images/CarInSun.Cl8Zd13v.jpg', category: 'car', caption: { lt: 'Bolidas saulėje', en: 'Car in the sun' }, year: 2024, aspect: 'wide' },
  { src: '/images/CarInGarage.BukR3Qsy.jpg', category: 'build', caption: { lt: 'Garaže', en: 'In the garage' }, year: 2024, aspect: 'wide' },
  { src: '/images/Competition.BN4d3-bd.jpg', category: 'competition', caption: { lt: 'Varžybose', en: 'At competition' }, year: 2024, aspect: 'wide' },
  { src: '/images/Team.CC8i-R1_.png', category: 'team', caption: { lt: 'Komanda', en: 'The team' }, year: 2024, aspect: 'wide' },
  { src: '/images/TeamFromDrone.7kRmZBe6.png', category: 'team', caption: { lt: 'Komanda iš dronų', en: 'Team from above' }, year: 2024, aspect: 'wide' },
  { src: '/images/CarDriving.D2d2KQRs.gif', category: 'car', caption: { lt: 'Bolidas važiuoja', en: 'Car in motion' }, year: 2024, aspect: 'wide' }
];

// Roster pulled from the previous perkunasrt.com team page. Roles, emails and
// department responsibilities are confirmed against that source.
export const TEAM_MEMBERS = [
  {
    name: 'Benas Lukoševičius',
    photo: '/images/Benas.CSO4RDZF.jpg',
    email: 'benas.lukosevicius@ktu.edu',
    role: { lt: 'Vyriausiasis inžinierius', en: 'Chief Engineer' },
    specialties: {
      lt: ['Techninė vizija', 'Integracija', 'Plėtra'],
      en: ['Technical vision', 'Integration', 'Development']
    },
    dept: 'engineering',
    lead: true
  },
  {
    name: 'Deivid Mico',
    photo: '/images/Deivid.CvnwjvLX.jpg',
    email: 'deivid.mico@ktu.edu',
    role: { lt: 'Vyr. inžinieriaus pavaduotojas', en: 'Deputy Chief Engineer' },
    specialties: {
      lt: ['Koordinavimas', 'Integracija', 'Procesas'],
      en: ['Coordination', 'Integration', 'Process']
    },
    dept: 'engineering',
    lead: true
  },
  {
    name: 'Benas Mangevičius',
    photo: '/images/BenasM.jpg',
    email: 'benas.mangevicius@ktu.edu',
    role: { lt: 'Šasi vadovas', en: 'Lead Engineer, Chassis' },
    specialties: {
      lt: ['Rėmas', 'Kėbulas', 'FEA'],
      en: ['Spaceframe', 'Bodywork', 'FEA']
    },
    dept: 'engineering',
    lead: true
  },
  {
    name: 'Ervinas Rimkevičius',
    photo: '/images/Ervinas.4QKraqXQ.jpg',
    email: 'ervinas.rimkevicius@ktu.edu',
    role: { lt: 'Varomosios sistemos vadovas', en: 'Lead Engineer, Powertrain' },
    specialties: {
      lt: ['Variklis', 'Pavara', 'Aušinimas'],
      en: ['Engine', 'Drivetrain', 'Cooling']
    },
    dept: 'engineering',
    lead: true
  },
  {
    name: 'Ugnius Trainys',
    photo: '/images/Ugnius.BV_jdF0Y.png',
    email: 'ugnius.trainys@ktu.edu',
    role: { lt: 'Pakabos vadovas', en: 'Lead Engineer, Suspension' },
    specialties: {
      lt: ['Geometrija', 'Amortizatoriai', 'Vairavimas'],
      en: ['Geometry', 'Dampers', 'Steering']
    },
    dept: 'engineering',
    lead: true
  },
  {
    name: 'Mantas Babonas',
    photo: '/images/Mantas.DVqcg64O.png',
    email: 'mantas.babonas@ktu.edu',
    role: { lt: 'Elektronikos ir PĮ vadovas', en: 'Lead Engineer, Electronics & Software' },
    specialties: {
      lt: ['ECU', 'Jutikliai', 'Duomenys'],
      en: ['ECU', 'Sensors', 'Data']
    },
    dept: 'engineering',
    lead: true
  },
  {
    name: 'Vytautė Pratkevičiūtė',
    photo: '/images/Vytaute.y2Qz4yAV.png',
    email: 'vytaute.pratkeviciute@ktu.edu',
    role: { lt: 'Verslo skyriaus vadovė', en: 'Team Leader, Business' },
    specialties: {
      lt: ['Rėmėjai', 'PR', 'Renginiai'],
      en: ['Sponsors', 'PR', 'Events']
    },
    dept: 'business',
    lead: true
  }
];

export const PARTNERS = {
  gold: [
    { name: 'Ansys', logo: '/images/ansys.CGZJmO8M.jpg', url: 'https://www.ansys.com' },
    { name: 'SKF', logo: '/images/skf.BPpPFOq4.png', url: 'https://www.skf.com' },
    { name: 'Hostinger', logo: '/images/hostinger.DsncjkBY.png', url: 'https://www.hostinger.com' }
  ],
  silver: [
    { name: 'Iremas', logo: '/images/iremas.2M2nfcBa.png', url: '#' },
    { name: 'GPM', logo: '/images/gpm.BFzSzPWq.jpg', url: '#' },
    { name: 'Injector Dynamics', logo: '/images/injector-dynamics.IO_Jt2TQ.png', url: '#' },
    { name: 'Race-Spec', logo: '/images/race-spec.BSJBJa_J.png', url: '#' },
    { name: 'Nuke Performance', logo: '/images/nuke_performance.CyX2fCvX.png', url: '#' }
  ],
  bronze: [
    { name: 'Easy Composites', logo: '/images/easy-composites.DhpO-eN-.jpg', url: '#' },
    { name: 'Pro-Wire', logo: '/images/pro-wire.BptcbhSz.png', url: '#' },
    { name: 'Radium Engineering', logo: '/images/radium-engineering.BXjKsCKP.png', url: '#' },
    { name: 'RapidHarness', logo: '/images/rapidharness.CEKG1Zqb.png', url: '#' },
    { name: 'Xtra Motorsport', logo: '/images/xtra-motorsport.CGNPFBur.png', url: '#' },
    { name: 'SolidWorks', logo: '/images/SolifWorks.Do3iGUPZ.png', url: '#' },
    { name: 'Vi-Grade', logo: '/images/Vi-Grade.nerbgz3M.png', url: '#' }
  ]
};
