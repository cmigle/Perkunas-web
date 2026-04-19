// Partner master data — rich info per partner, not just a logo.
// TODO: verify `supplies`, `since`, and `story` with each partner before publishing.
// Shape intentionally flat so it's easy to edit by non-developers.

export const PARTNERS_DATA = [
  {
    name: 'Ansys',
    logo: '/images/ansys.CGZJmO8M.jpg',
    url: 'https://www.ansys.com',
    tier: 'gold',
    category: 'software',
    tags: ['CFD', 'FEA', 'Simulation'],
    supplies: {
      lt: 'Skaitmeninio srautų modeliavimo (CFD) ir konstrukcinio analizės licencijos.',
      en: 'CFD and structural FEA simulation licenses.'
    },
    since: 2024,
    story: {
      lt: 'Ansys Fluent leidžia mums išbandyti aerodinamiką skaitmeniškai prieš gaminant fizinę dalį.',
      en: 'Ansys Fluent lets us validate aerodynamic designs digitally before we cut a single carbon part.'
    }
  },
  {
    name: 'SKF',
    logo: '/images/skf.BPpPFOq4.png',
    url: 'https://www.skf.com',
    tier: 'gold',
    category: 'mechanical',
    tags: ['Bearings', 'Differential', 'Drivetrain'],
    supplies: {
      lt: 'Guoliai, diferencialo komponentai, pavaros sistemos detalės.',
      en: 'Bearings, differential parts, drivetrain components.'
    },
    since: 2023,
    story: {
      lt: 'SKF pagalba sumažinome pavaros trintį 18% palyginus su praeitų metų bolidu.',
      en: 'With SKF support, drivetrain friction dropped 18% year-over-year on our test rig.'
    }
  },
  {
    name: 'Hostinger',
    logo: '/images/hostinger.DsncjkBY.png',
    url: 'https://www.hostinger.com',
    tier: 'gold',
    category: 'digital',
    tags: ['Hosting', 'Domains', 'Infrastructure'],
    supplies: {
      lt: 'Svetainės hostingas ir domeno paslaugos.',
      en: 'Website hosting and domain services.'
    },
    since: 2024,
    story: {
      lt: 'Ši svetainė veikia Hostinger infrastruktūroje — 99.9% uptime per 12 mėn.',
      en: 'This site you are reading runs on Hostinger — 99.9% uptime over 12 months.'
    }
  },
  {
    name: 'Iremas',
    logo: '/images/iremas.2M2nfcBa.png',
    url: 'https://iremas.lt',
    tier: 'silver',
    category: 'manufacturing',
    tags: ['CNC', 'Welding', 'Steel fabrication'],
    supplies: {
      lt: 'Karkaso suvirinimas ir CNC apdirbimas.',
      en: 'Chassis welding and CNC machining.'
    },
    since: 2023,
    story: {
      lt: 'Visas P-05 plieninis karkasas suvirintas Iremas dirbtuvėse.',
      en: 'The entire P-05 steel spaceframe was welded at Iremas.'
    }
  },
  {
    name: 'GPM',
    logo: '/images/gpm.BFzSzPWq.jpg',
    url: '#',
    tier: 'silver',
    category: 'logistics',
    tags: ['Crowdfunding', 'Financial'],
    supplies: {
      lt: 'Parama studentiškoms iniciatyvoms.',
      en: 'Support for student initiatives.'
    },
    since: 2024,
    story: null
  },
  {
    name: 'Injector Dynamics',
    logo: '/images/injector-dynamics.IO_Jt2TQ.png',
    url: 'https://injectordynamics.com',
    tier: 'silver',
    category: 'powertrain',
    tags: ['Fuel injectors', 'Tuning'],
    supplies: {
      lt: 'Aukšto debito degalų purkštukai ir kalibravimo duomenys.',
      en: 'High-flow fuel injectors and calibration data.'
    },
    since: 2024,
    story: {
      lt: 'ID1050x purkštukai leido pereiti prie E85 degalų be rizikos.',
      en: 'ID1050x injectors let us run E85 with full confidence in fuel delivery.'
    }
  },
  {
    name: 'Race-Spec',
    logo: '/images/race-spec.BSJBJa_J.png',
    url: '#',
    tier: 'silver',
    category: 'electrical',
    tags: ['Harnesses', 'Connectors'],
    supplies: {
      lt: 'Motorsporto kokybės jungtys ir laidai.',
      en: 'Motorsport-grade connectors and wiring.'
    },
    since: 2024,
    story: null
  },
  {
    name: 'Nuke Performance',
    logo: '/images/nuke_performance.CyX2fCvX.png',
    url: 'https://nukeperformance.com',
    tier: 'silver',
    category: 'powertrain',
    tags: ['Fuel systems', 'Cooling'],
    supplies: {
      lt: 'Degalų siurbliai, alyvos aušintuvai.',
      en: 'Fuel pumps, oil coolers.'
    },
    since: 2024,
    story: null
  },
  {
    name: 'Easy Composites',
    logo: '/images/easy-composites.DhpO-eN-.jpg',
    url: 'https://easycomposites.co.uk',
    tier: 'bronze',
    category: 'materials',
    tags: ['Carbon fibre', 'Resin'],
    supplies: {
      lt: 'Anglies pluošto audiniai ir epoksidinės dervos.',
      en: 'Carbon fibre cloth and epoxy resins.'
    },
    since: 2024,
    story: null
  },
  {
    name: 'Pro-Wire',
    logo: '/images/pro-wire.BptcbhSz.png',
    url: '#',
    tier: 'bronze',
    category: 'electrical',
    tags: ['Wiring', 'Harnesses'],
    supplies: { lt: 'Laidai, apvijos, terminalai.', en: 'Wire, braid, terminals.' },
    since: 2024,
    story: null
  },
  {
    name: 'Radium Engineering',
    logo: '/images/radium-engineering.BXjKsCKP.png',
    url: 'https://radiumauto.com',
    tier: 'bronze',
    category: 'powertrain',
    tags: ['Fuel systems'],
    supplies: { lt: 'Degalų sistemos komponentai.', en: 'Fuel system components.' },
    since: 2024,
    story: null
  },
  {
    name: 'RapidHarness',
    logo: '/images/rapidharness.CEKG1Zqb.png',
    url: '#',
    tier: 'bronze',
    category: 'software',
    tags: ['Harness CAD'],
    supplies: { lt: 'Laidų projektavimo programa.', en: 'Wire-harness CAD software.' },
    since: 2024,
    story: null
  },
  {
    name: 'Xtra Motorsport',
    logo: '/images/xtra-motorsport.CGNPFBur.png',
    url: '#',
    tier: 'bronze',
    category: 'mechanical',
    tags: ['Fasteners', 'Hardware'],
    supplies: { lt: 'Lenktyninės kokybės tvirtinimo detalės.', en: 'Motorsport-grade fasteners.' },
    since: 2024,
    story: null
  },
  {
    name: 'SolidWorks',
    logo: '/images/SolifWorks.Do3iGUPZ.png',
    url: 'https://solidworks.com',
    tier: 'bronze',
    category: 'software',
    tags: ['CAD'],
    supplies: { lt: 'CAD licencijos visai komandai.', en: 'CAD licences for the whole team.' },
    since: 2023,
    story: null
  },
  {
    name: 'Vi-Grade',
    logo: '/images/Vi-Grade.nerbgz3M.png',
    url: 'https://vi-grade.com',
    tier: 'bronze',
    category: 'software',
    tags: ['Vehicle dynamics'],
    supplies: { lt: 'Bolido dinamikos simuliavimas.', en: 'Vehicle dynamics simulation.' },
    since: 2024,
    story: null
  }
];

export const CATEGORY_LABELS = {
  all:            { lt: 'Viskas', en: 'All', icon: 'apps' },
  software:       { lt: 'Programinė įranga', en: 'Software', icon: 'developer_mode' },
  mechanical:     { lt: 'Mechanika', en: 'Mechanical', icon: 'settings' },
  manufacturing:  { lt: 'Gamyba', en: 'Manufacturing', icon: 'precision_manufacturing' },
  powertrain:     { lt: 'Variklis', en: 'Powertrain', icon: 'bolt' },
  electrical:     { lt: 'Elektrika', en: 'Electrical', icon: 'electrical_services' },
  materials:      { lt: 'Medžiagos', en: 'Materials', icon: 'layers' },
  digital:        { lt: 'Skaitmeniniai', en: 'Digital', icon: 'language' },
  logistics:      { lt: 'Logistika', en: 'Logistics', icon: 'local_shipping' }
};
