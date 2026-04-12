import { Skill } from '../types';

export const skills: Skill[] = [
  {
    id: 'attack-boost',
    name: 'Attack Boost',
    category: 'offense',
    description: 'Raises raw attack and gives a small affinity bump at higher levels.',
    levels: [
      { level: 1, description: 'Small attack increase.' },
      { level: 2, description: 'Moderate attack increase.' },
      { level: 3, description: 'Solid attack increase for general damage builds.' },
    ],
  },
  {
    id: 'critical-eye',
    name: 'Critical Eye',
    category: 'offense',
    description: 'Raises affinity to improve critical hit consistency.',
    levels: [
      { level: 1, description: 'Small affinity increase.' },
      { level: 2, description: 'Useful affinity bump for mixed builds.' },
      { level: 3, description: 'High affinity increase for aggressive setups.' },
    ],
  },
  {
    id: 'weakness-exploit',
    name: 'Weakness Exploit',
    category: 'offense',
    description: 'Increases affinity when striking weak monster hitzones.',
    levels: [
      { level: 1, description: 'Bonus affinity on weak points.' },
      { level: 2, description: 'Higher bonus affinity on weak points.' },
      { level: 3, description: 'Strong affinity payoff for precise play.' },
    ],
  },
  {
    id: 'guard',
    name: 'Guard',
    category: 'defense',
    description: 'Reduces knockback and stamina loss while guarding.',
    levels: [
      { level: 1, description: 'Light guard improvement.' },
      { level: 2, description: 'Noticeably steadier guarding.' },
      { level: 3, description: 'Reliable guard support for defensive play.' },
    ],
  },
  {
    id: 'divine-blessing',
    name: 'Divine Blessing',
    category: 'defense',
    description: 'Has a chance to reduce incoming damage.',
    levels: [
      { level: 1, description: 'Occasional damage reduction.' },
      { level: 2, description: 'Better activation rate.' },
      { level: 3, description: 'Comfort-heavy defensive coverage.' },
    ],
  },
  {
    id: 'health-boost',
    name: 'Health Boost',
    category: 'defense',
    description: 'Raises maximum health for better survivability.',
    levels: [
      { level: 1, description: 'Small max health increase.' },
      { level: 2, description: 'Moderate max health increase.' },
      { level: 3, description: 'Large max health increase for safer hunts.' },
    ],
  },
  {
    id: 'evade-window',
    name: 'Evade Window',
    category: 'utility',
    description: 'Extends invulnerability during dodges.',
    levels: [
      { level: 1, description: 'Slightly easier dodges.' },
      { level: 2, description: 'Comfortable evade timing.' },
      { level: 3, description: 'Very forgiving dodge window.' },
    ],
  },
  {
    id: 'speed-sharpening',
    name: 'Speed Sharpening',
    category: 'utility',
    description: 'Cuts down sharpening time to maintain damage uptime.',
    levels: [
      { level: 1, description: 'Minor sharpening speed up.' },
      { level: 2, description: 'Fast sharpening in most openings.' },
      { level: 3, description: 'Very quick edge recovery.' },
    ],
  },
];
