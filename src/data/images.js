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

// TODO: replace roles and specialties with each member's real responsibilities.
export const TEAM_MEMBERS = [
  {
    name: 'Benas',
    photo: '/images/Benas.CSO4RDZF.jpg',
    role: { lt: 'Pakabos inžinierius', en: 'Suspension Engineer' },
    specialties: ['Geometrija', 'Amortizatoriai', 'CAD'],
    dept: 'engineering'
  },
  {
    name: 'Deividas',
    photo: '/images/Deivid.CvnwjvLX.jpg',
    role: { lt: 'Varomosios sistemos inžinierius', en: 'Powertrain Engineer' },
    specialties: ['ECU', 'Dyno', 'Kalibravimas'],
    dept: 'engineering'
  },
  {
    name: 'Ervinas',
    photo: '/images/Ervinas.4QKraqXQ.jpg',
    role: { lt: 'Rėmo inžinierius', en: 'Chassis Engineer' },
    specialties: ['Virinimas', 'FEA', 'Karkasas'],
    dept: 'engineering'
  },
  {
    name: 'Mantas',
    photo: '/images/Mantas.DVqcg64O.png',
    role: { lt: 'Aerodinamikas', en: 'Aerodynamics Engineer' },
    specialties: ['CFD', 'Sparnai', 'Ansys'],
    dept: 'engineering'
  },
  {
    name: 'Ugnius',
    photo: '/images/Ugnius.BV_jdF0Y.png',
    role: { lt: 'Elektronikos inžinierius', en: 'Electronics Engineer' },
    specialties: ['Laidai', 'Telemetrija', 'Jutikliai'],
    dept: 'engineering'
  },
  {
    name: 'Vytautė',
    photo: '/images/Vytaute.y2Qz4yAV.png',
    role: { lt: 'Komunikacijos vadovė', en: 'Communications Lead' },
    specialties: ['PR', 'Soc. tinklai', 'Renginiai'],
    dept: 'business'
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
