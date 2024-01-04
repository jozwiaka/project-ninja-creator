import { Champion } from './champion';

export class Attributes {
  healthPerPoint = 250;
  chakraPerPoint = 250;
  chakraRegenPerPoint = 25;
  taijutsuPowerPerPoint = 20;
  ninjutsuPowerPerPoint = 60;
  attackSpeedPerPoint = 1;
  movementSpeedPerPoint = 1;
  taijutsuResistancePerPoint = 15;
  ninjutsuResistancePerPoint = 15;

  constructor(
    public id: number = -1,
    public vitality: number = 0,
    public concentration: number = 0,
    public taijutsu: number = 0,
    public ninjutsu: number = 0,
    public speed: number = 0,
    public movement: number = 0,
    public defense: number = 0
  ) {}
}
