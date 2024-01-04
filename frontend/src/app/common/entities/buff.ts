export class Buff {
  sideEffect?: Buff;
  constructor(
    public maxHealth: number = 0,
    public maxChakra: number = 0,
    public taijutsuPower: number = 0,
    public ninjutsuPower: number = 0,
    public attackSpeed: number = 0,
    public movementSpeed: number = 0,
    public resistances: number = 0,
    public kyuubiChakra: boolean = false
  ) {}
}
