import * as migration_20261120_105341_vehicle_taxonomy from './20261120_105341_vehicle_taxonomy';

export const migrations = [
  {
    up: migration_20261120_105341_vehicle_taxonomy.up,
    down: migration_20261120_105341_vehicle_taxonomy.down,
    name: '20261120_105341_vehicle_taxonomy'
  },
];
