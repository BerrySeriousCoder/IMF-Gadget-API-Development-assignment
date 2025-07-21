const codenames = [
  'The Nightingale',
  'The Kraken',
  'The Phantom',
  'The Chimera',
  'The Viper',
  'The Oracle',
  'The Falcon',
  'The Specter',
  'The Lynx',
  'The Hydra',
  'The Wraith',
  'The Tempest',
  'The Eclipse',
  'The Cyclone',
  'The Mirage',
];

export function generateCodename() {
  const idx = Math.floor(Math.random() * codenames.length);
  return codenames[idx];
} 