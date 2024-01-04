import { range } from 'rxjs';
import { Status } from '../control/status';
import { Position } from '../geometry/position';
export class Skill {
  points: number = 0;
  bonusPoints: number = 0;
  status: Status = new Status();
  cooldownTimer = 0;
  usages: number = 0;
  maxPoints: number = 0;
  chakraCost: number = 0;
  cooldown: number = 0;
  castTime: number = 0;
  dmgBase: number = 0;
  cScale: number = 0;
  cNumber: number = 0;
  mMaxHealthBase: number = 0;
  bMaxHealth: number = 0;
  bMaxChakra: number = 0;
  bTaijutsuPower: number = 0;
  bNinjutsuPower: number = 0;
  bAttackSpeed: number = 0;
  bMovementSpeed: number = 0;
  bResistances: number = 0;
  bSideEffectTaijutsuPower: number = 0;
  bSideEffectNinjutsuPower: number = 0;
  bSideEffectAttackSpeed: number = 0;
  bSideEffectMovementSpeed: number = 0;
  bSideEffectResistances: number = 0;
  dResistances: number = 0;
  aArmorBase = 0;
  pMaxHealth: number = 0;
  pMaxChakra: number = 0;
  pTaijutsuPower: number = 0;
  pNinjutsuPower: number = 0;
  pAttackSpeed: number = 0;
  pMovementSpeed: number = 0;
  pResistances: number = 0;
  hStacksBonus: number = 0;
  constructor(
    public id: number = -1,
    public name: string = '',
    public imageUrl: string = '',
    public tier: number = -1,
    public target: string = 'none', //'enemy, self, tile, none'
    public p_chakraCost: number = 0,
    public p_chakraCostPerPoint: number = 0,
    public p_cooldown: number = 0,
    public p_cooldownPerPoint: number = 0,
    public p_castTime: number = 0,
    public p_castTimePerPoint: number = 0,
    public range: number = 0,
    public dmgType: string = '',
    public p_dmgBase: number = 0,
    public p_dmgBasePerPoint: number = 0,
    public dmgTaijutsuPowerScale: number = 0,
    public dmgNinjutsuPowerScale: number = 0,
    public dmgMaxHealthScale: number = 0,
    public dmgMaxChakraScale: number = 0,
    public dmgIncreasePerDistanceCoveredPerc = 0,
    public dmgIncreasePerMissingHealthPerc = 0,
    public move: boolean = false,
    public clone: boolean = false,
    public c_weak: boolean = false,
    public c_swap: boolean = false,
    public p_cScale: number = 0,
    public p_cScalePerPoint: number = 0,
    public p_cNumber: number = 0,
    public p_cNumberPerPoint: number = 0,
    public mirror: boolean = false,
    public p_mMaxHealthBase: number = 0,
    public p_mMaxHealthBasePerPoint: number = 0,
    public m_ninjutsuScale: number = 0,
    public invisibility: boolean = false,
    public buff: boolean = false,
    public p_bMaxHealth: number = 0,
    public p_bMaxChakra: number = 0,
    public p_bTaijutsuPower: number = 0,
    public p_bNinjutsuPower: number = 0,
    public p_bAttackSpeed: number = 0,
    public p_bMovementSpeed: number = 0,
    public p_bResistances: number = 0,
    public b_sideEffect: boolean = false,
    public p_bSideEffectTaijutsuPower: number = 0,
    public p_bSideEffectNinjutsuPower: number = 0,
    public p_bSideEffectAttackSpeed: number = 0,
    public p_bSideEffectMovementSpeed: number = 0,
    public p_bSideEffectResistances: number = 0,
    public p_bMaxHealthPerPoint: number = 0,
    public p_bMaxChakraPerPoint: number = 0,
    public p_bTaijutsuPowerPerPoint: number = 0,
    public p_bNinjutsuPowerPerPoint: number = 0,
    public p_bAttackSpeedPerPoint: number = 0,
    public p_bMovementSpeedPerPoint: number = 0,
    public p_bResistancesPerPoint: number = 0,
    public p_bSideEffectTaijutsuPowerPerPoint: number = 0,
    public p_bSideEffectNinjutsuPowerPerPoint: number = 0,
    public p_bSideEffectAttackSpeedPerPoint: number = 0,
    public p_bSideEffectMovementSpeedPerPoint: number = 0,
    public p_bSideEffectResistancesPerPoint: number = 0,
    public kyuubiChakra: boolean = false,
    public requiresKyuubiChakra: boolean = false,
    public throwInAir: boolean = false,
    public requiresTargetInAir: boolean = false,
    public debuff = false,
    public p_dResistances: number = 0,
    public p_dResistancesPerPoint: number = 0,
    public armor = false,
    public p_aArmorBase = 0,
    public p_aArmorBasePerPoint = 0,
    public a_ninjutsuScale = 0,
    public passive: boolean = false,
    public p_pMaxHealth: number = 0,
    public p_pMaxChakra: number = 0,
    public p_pTaijutsuPower: number = 0,
    public p_pNinjutsuPower: number = 0,
    public p_pAttackSpeed: number = 0,
    public p_pMovementSpeed: number = 0,
    public p_pResistances: number = 0,
    public p_pMaxHealthPerPoint: number = 0,
    public p_pMaxChakraPerPoint: number = 0,
    public p_pTaijutsuPowerPerPoint: number = 0,
    public p_pNinjutsuPowerPerPoint: number = 0,
    public p_pAttackSpeedPerPoint: number = 0,
    public p_pMovementSpeedPerPoint: number = 0,
    public p_pResistancesPerPoint: number = 0,
    public hyuugaStyle: boolean = false,
    public p_hStacksBonus: number = 0,
    public p_hStacksBonusPerPoint: number = 0
  ) {}
  update() {
    if (this.tier === 1) {
      this.maxPoints = 5;
    }
    if (this.tier === 2) {
      this.maxPoints = 5;
    }
    if (this.tier === 3) {
      this.maxPoints = 3;
    }
    if (this.points > 1) {
      this.bonusPoints = this.points - 1;
    } else {
      this.bonusPoints = 0;
    }
    this.chakraCost =
      this.bonusPoints * this.p_chakraCostPerPoint + this.p_chakraCost;
    this.cooldown =
      this.bonusPoints * this.p_cooldownPerPoint + this.p_cooldown;
    this.castTime =
      this.bonusPoints * this.p_castTimePerPoint + this.p_castTime;
    this.dmgBase = this.bonusPoints * this.p_dmgBasePerPoint + this.p_dmgBase;
    this.cScale = this.bonusPoints * this.p_cScalePerPoint + this.p_cScale;
    this.cNumber = this.bonusPoints * this.p_cNumberPerPoint + this.p_cNumber;
    this.mMaxHealthBase =
      this.bonusPoints * this.p_mMaxHealthBasePerPoint + this.p_mMaxHealthBase;
    this.bMaxHealth =
      this.bonusPoints * this.p_bMaxHealthPerPoint + this.p_bMaxHealth;
    this.bMaxChakra =
      this.bonusPoints * this.p_bMaxChakraPerPoint + this.p_bMaxChakra;
    this.bTaijutsuPower =
      this.bonusPoints * this.p_bTaijutsuPowerPerPoint + this.p_bTaijutsuPower;
    this.bNinjutsuPower =
      this.bonusPoints * this.p_bNinjutsuPowerPerPoint + this.p_bNinjutsuPower;
    this.bAttackSpeed =
      this.bonusPoints * this.p_bAttackSpeedPerPoint + this.p_bAttackSpeed;
    this.bMovementSpeed =
      this.bonusPoints * this.p_bMovementSpeedPerPoint + this.p_bMovementSpeed;
    this.bResistances =
      this.bonusPoints * this.p_bResistancesPerPoint + this.p_bResistances;
    this.bSideEffectTaijutsuPower =
      this.bonusPoints * this.p_bSideEffectTaijutsuPowerPerPoint +
      this.p_bSideEffectTaijutsuPower;
    this.bSideEffectNinjutsuPower =
      this.bonusPoints * this.p_bSideEffectNinjutsuPowerPerPoint +
      this.p_bSideEffectNinjutsuPower;
    this.bSideEffectAttackSpeed =
      this.bonusPoints * this.p_bSideEffectAttackSpeedPerPoint +
      this.p_bSideEffectAttackSpeed;
    this.bSideEffectMovementSpeed =
      this.bonusPoints * this.p_bSideEffectMovementSpeedPerPoint +
      this.p_bSideEffectMovementSpeed;
    this.bSideEffectResistances =
      this.bonusPoints * this.p_bSideEffectResistancesPerPoint +
      this.p_bSideEffectResistances;
    this.dResistances =
      this.bonusPoints * this.p_dResistancesPerPoint + this.p_dResistances;
    this.aArmorBase =
      this.bonusPoints * this.p_aArmorBasePerPoint + this.p_aArmorBase;
    this.pMaxHealth =
      this.bonusPoints * this.p_pMaxHealthPerPoint + this.p_pMaxHealth;
    this.pMaxChakra =
      this.bonusPoints * this.p_pMaxChakraPerPoint + this.p_pMaxChakra;
    this.pTaijutsuPower =
      this.bonusPoints * this.p_pTaijutsuPowerPerPoint + this.p_pTaijutsuPower;
    this.pNinjutsuPower =
      this.bonusPoints * this.p_pNinjutsuPowerPerPoint + this.p_pNinjutsuPower;
    this.pAttackSpeed =
      this.bonusPoints * this.p_pAttackSpeedPerPoint + this.p_pAttackSpeed;
    this.pMovementSpeed =
      this.bonusPoints * this.p_pMovementSpeedPerPoint + this.p_pMovementSpeed;
    this.pResistances =
      this.bonusPoints * this.p_pResistancesPerPoint + this.p_pResistances;
    this.hStacksBonus =
      this.bonusPoints * this.p_hStacksBonusPerPoint + this.p_hStacksBonus;
  }
  startCooldownTimer() {
    this.cooldownTimer = this.cooldown;
  }
  cooldownTimerDecrement() {
    if (this.cooldownTimer > 0) {
      this.cooldownTimer--;
    }
  }
}
