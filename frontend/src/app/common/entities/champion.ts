import { Grid } from '../board/grid';
import { Tile } from '../board/tile';
import { Status } from '../control/status';
import { Position } from '../geometry/position';
import { Size } from '../geometry/size';
import { Attributes } from './attributes';
import { Buff } from './buff';
import { Skill } from './skill';
import { Tree } from './tree';

export class Champion {
  lvl = 1;

  dmgOnSelf = 0;
  dmgOnSelfArmor = 0;

  health = 0;
  chakra = 0;

  maxHealth = 0;
  maxChakra = 0;
  chakraRegen = 0;
  taijutsuPower = 0;
  ninjutsuPower = 0;
  attackSpeed = 0;
  movementSpeed = 0;
  taijutsuResistance = 0;
  ninjutsuResistance = 0;

  taijutsuDmgReductionPerc = 0;
  ninjutsuDmgReductionPerc = 0;

  maxHealthBase = 5000;
  maxChakraBase = 0;
  chakraRegenBase = 0;
  taijutsuPowerBase = 20;
  ninjutsuPowerBase = 0;
  attackSpeedBase = 2;
  movementSpeedBase = 1;
  taijutsuResistanceBase = 30;
  ninjutsuResistanceBase = 0;

  kyuubiChakra = false;
  invisible = true;
  inAir = false;
  distanceCovered = 0;
  armor = 0;
  maxArmor = 0;

  hyuugaStacks = 0;
  hyuugaStacksMax = 10;
  hyuugaStackDmg = 600;
  hyuugaStacksScaleTaijutsuPower = 50;
  hyuugaStacksPerHit = 0;
  // hyuugaCountersPer50Taijutsu: number = 1

  trees: Tree[] = [];
  skills: Skill[] = [];
  skillsPassives: Skill[] = [];
  skillsUsable: Skill[] = [];
  attributes: Attributes = new Attributes();
  status: Status = new Status();
  grid!: Grid;
  owner: Champion | undefined = undefined;
  clones: Champion[] = [];
  clonesPreview: Champion[] = [];
  buffs: Buff[] = [];
  skillHistory: Skill[] = [];
  mirrors: Champion[] = [];

  rankingPoints = 0;

  constructor(
    public id: number = -1,
    public name: string = '',
    public attributePoints: number = 40,
    public skillPoints: number = 20
  ) {}

  init() {
    this.skillsPassives = this.skills.filter(
      (skill) => skill.target === 'none'
    );
    this.skillsUsable = this.skills.filter((skill) => skill.target !== 'none');
    // this.skills[0].move = true;
    // this.skills[0].target = 'tile';
    // this.skills[0].range = 10;

    // this.skills[1].clone = true;
    // this.skills[1].target = 'tile';
    // this.skills[1].range = 2;
    // this.skills[1].cNumber = 2;
    // this.skills[1].c_weak = true;
    // this.skills[1].cScale = 0.3;

    // this.skills[2].target = 'enemy';
    // this.skills[2].range = 10;
    // this.skills[2].dmgBase = 10;
    // this.skills[2].dmgType = 'taijutsu';
    // this.skills[2].dmgTaijutsuPowerScale = 0.8;
    // this.skills[2].castTime = 1;

    // this.skills[3].buff = true;
    // this.skills[3].bMaxHealth = 500;
    // this.skills[3].bTaijutsuPower = 50;
    // this.skills[3].bAttackSpeed = 3;
    // this.skills[3].target = 'self';
    // this.skills[3].b_sideEffect = true;
    // this.skills[3].bSideEffectTaijutsuPower = -400;
    // this.skills[3].range = 0;

    // this.skills[4].target = 'none';
    // this.skills[4].range = 0;
    // this.skills[4].passive = true;
    // this.skills[4].pMaxHealth = 100;
    // this.skills[4].pNinjutsuPower = 100;

    // this.skills[5].target = 'enemy';
    // this.skills[5].hyuugaStyle = true;
    // this.skills[5].range = 10;
    // this.skills[5].hStacksBonus = 1;
    this.clones = [];
    this.skillHistory = [];
    this.skills.forEach((skill) => {
      skill.cooldownTimer = 0;
    });
    this.calculateStatistics();

    this.health = this.maxHealth;
    this.chakra = this.maxChakra;

    this.rankingPoints = 0;
  }

  calculateStatistics() {
    //Base
    this.maxHealth = this.maxHealthBase;
    this.maxChakra = this.maxChakraBase;
    this.chakraRegen = this.chakraRegenBase;
    this.taijutsuPower = this.taijutsuPowerBase;
    this.ninjutsuPower = this.ninjutsuPowerBase;
    this.attackSpeed = this.attackSpeedBase;
    this.movementSpeed = this.movementSpeedBase;
    this.taijutsuResistance = this.taijutsuResistanceBase;
    this.ninjutsuResistance = this.ninjutsuResistanceBase;

    //Attributes
    this.maxHealth += this.attributes.vitality * this.attributes.healthPerPoint;
    this.maxChakra +=
      this.attributes.concentration * this.attributes.chakraPerPoint;
    this.chakraRegen +=
      this.attributes.concentration * this.attributes.chakraRegenPerPoint;
    this.taijutsuPower +=
      this.attributes.taijutsu * this.attributes.taijutsuPowerPerPoint;
    this.ninjutsuPower +=
      this.attributes.ninjutsu * this.attributes.ninjutsuPowerPerPoint;
    this.attackSpeed +=
      this.attributes.speed * this.attributes.attackSpeedPerPoint;
    this.movementSpeed +=
      this.attributes.movement * this.attributes.movementSpeedPerPoint;
    this.taijutsuResistance +=
      this.attributes.defense * this.attributes.taijutsuResistancePerPoint;
    this.ninjutsuResistance +=
      this.attributes.defense * this.attributes.ninjutsuResistancePerPoint;

    // Passives
    this.skills.forEach((skill) => {
      if (skill.passive) {
        this.maxHealth += skill.pMaxHealth;
        this.maxChakra += skill.pMaxChakra;
        this.taijutsuPower += skill.pTaijutsuPower;
        this.ninjutsuPower += skill.pNinjutsuPower;
        this.attackSpeed += skill.pAttackSpeed;
        this.movementSpeed += skill.pMovementSpeed;
        this.taijutsuResistance += skill.pResistances;
        this.ninjutsuResistance += skill.pResistances;
      }
    });

    // Buffs
    this.buffs.forEach((buff) => {
      this.maxHealth += buff.maxHealth;
      this.maxChakra += buff.maxChakra;
      this.taijutsuPower += buff.taijutsuPower;
      this.ninjutsuPower += buff.ninjutsuPower;
      this.attackSpeed += buff.attackSpeed;
      this.movementSpeed += buff.movementSpeed;
      this.taijutsuResistance += buff.resistances;
      this.ninjutsuResistance += buff.resistances;
    });
    // this.kyuubiChakra = buff.kyuubiChakra;
    this.calculateDmgReduction();

    if (this.attackSpeed < 0) {
      this.attackSpeed = 0;
    }
    if (this.movementSpeed < 0) {
      this.movementSpeed = 0;
    }
    if (this.taijutsuPower < 0) {
      this.taijutsuPower = 0;
    }
    if (this.ninjutsuPower < 0) {
      this.ninjutsuPower = 0;
    }
    this.hyuugaStacksPerHit = Math.floor(
      this.taijutsuPower / this.hyuugaStacksScaleTaijutsuPower
    );
  }

  calculateDmgReduction() {
    this.taijutsuDmgReductionPerc = Math.floor(
      (this.taijutsuResistance / (this.taijutsuResistance + 100)) * 100
    );

    this.ninjutsuDmgReductionPerc = Math.floor(
      (this.ninjutsuResistance / (this.ninjutsuResistance + 100)) * 100
    );
  }

  lvlUp() {
    this.lvl += 1;
    this.skillPoints += 3;
    this.attributePoints += 2;
  }

  atTheBeginningOfTheTurn() {
    this.kyuubiChakra = false;
    this.invisible = false;
    this.status.invisible = false;
    this.inAir = false;

    let sideEffects: Buff[] = [];
    this.buffs.forEach((buff) => {
      if (buff.sideEffect) {
        sideEffects.push(buff.sideEffect);
        this.health += buff.sideEffect.maxHealth;
      }
    });
    this.buffs = [];
    sideEffects.forEach((sideEffect) => {
      this.buffs.push(sideEffect);
    });

    this.calculateStatistics();

    if (this.health > this.maxHealth) {
      this.health = this.maxHealth;
    }
    if (this.chakra > this.maxChakra) {
      this.chakra = this.maxChakra;
    }

    this.chakra =
      this.chakra + this.chakraRegen > this.maxChakra
        ? this.maxChakra
        : this.chakra + this.chakraRegen;

    this.skills.forEach((skill) => {
      skill.cooldownTimerDecrement();
      if (skill.clone) {
        skill.usages = skill.cNumber;
      }
    });

    this.clones.forEach((clone) => {
      clone.status.spawned = true;
      clone.skills.forEach((skill) => {
        skill.cooldownTimerDecrement();
      });
    });
  }
  atTheEndOfTheTurn() {
    if (this.invisible) {
      this.status.invisible = true;
    }
    this.skillHistory = [];
    this.clones.forEach((clone) => {
      clone.status.spawned = false;
      clone.skillHistory = [];
    });
    this.distanceCovered = 0;
  }

  canPayForSkill(skill: Skill): boolean {
    if (skill.chakraCost > this.chakra) {
      return false;
    }
    return true;
  }

  paySkillCost(skill: Skill): boolean {
    this.chakra -= skill.chakraCost;
    return true;
  }

  resetSkill(skill: Skill) {
    if (skill.clone) {
      skill.target = 'tile';
      skill.usages = skill.cNumber;
    }

    this.grid.tiles.forEach((row) => {
      row.forEach((tile) => {
        if (tile.champion?.status.preview) {
          tile.champion = undefined;
        }
      });
    });
    this.clonesPreview = [];
  }

  getSkillRange(skill: Skill) {
    if (skill.move && skill.range !== 0) {
      return skill.range;
    }
    if (skill.move) {
      return this.movementSpeed;
    }
    if (skill.target === 'self') {
      return 0;
    }
    return skill.range;
  }

  useSkillOnTile(skill: Skill, tile: Tile) {
    if (skill.move) {
      const prevPosition = this.grid.getChampionPosition(this) as Position;

      let distance = 0;
      if (prevPosition.x - tile.position.x) {
        distance = Math.abs(prevPosition.x - tile.position.x);
      } else if (prevPosition.y - tile.position.y) {
        distance = Math.abs(prevPosition.y - tile.position.y);
      }
      this.distanceCovered += distance;

      this.grid.assignChampionToGrid(this, tile.position);
    }

    if (skill.clone) {
      if (skill.usages !== 0) {
        let clone = new Champion();
        Object.assign(clone, this);
        clone.status = new Status();
        const cScale = skill.cScale;
        clone.maxChakra = Math.floor(this.maxChakra * cScale);
        clone.chakra = clone.maxChakra;
        clone.chakraRegen = Math.floor(this.chakraRegen * cScale);
        if (skill.c_weak) {
          clone.maxHealthBase = 1;
          clone.maxHealth = 1;
          clone.health = 1;
          clone.taijutsuResistance = 0;
          clone.ninjutsuResistance = 0;
        } else {
          clone.maxHealthBase = Math.floor(this.maxHealthBase * cScale);
          clone.maxHealth = Math.floor(this.maxHealth * cScale);
          clone.health = clone.maxHealth;
          clone.taijutsuResistance = Math.floor(
            this.taijutsuResistance * cScale
          );
          clone.ninjutsuResistance = Math.floor(
            this.ninjutsuResistance * cScale
          );
        }
        clone.calculateDmgReduction();

        clone.attackSpeed = Math.floor(this.attackSpeed * cScale);
        if (clone.attackSpeed === 0) {
          clone.attackSpeed = 1;
        }
        clone.movementSpeed = Math.floor(this.movementSpeed * cScale);
        if (clone.movementSpeed === 0) {
          clone.movementSpeed = 1;
        }
        clone.ninjutsuPower = Math.floor(this.ninjutsuPower * cScale);
        clone.taijutsuPower = Math.floor(this.taijutsuPower * cScale);

        clone.skills = this.skills.map((element) => {
          const skill = new Skill();
          Object.assign(skill, element);
          skill.cooldownTimer = 0;
          skill.status = new Status();
          return skill;
        });
        clone.skills = clone.skills.filter(
          (skill) =>
            skill.clone === false &&
            skill.target !== 'self' &&
            skill.target !== 'none' &&
            skill.tier !== 3
        );
        clone.skillsPassives = [];
        clone.skillsUsable = clone.skills.filter(
          (skill) => skill.target !== 'none'
        );

        clone.skillHistory = [];
        clone.name = `${this.name} - Clone ${
          this.clones.length + this.clonesPreview.length + 1
        }`;
        clone.status.preview = true;

        clone.owner = this;
        this.grid.assignChampionToGrid(clone, tile.position);
        this.clonesPreview.push(clone);
      }
      skill.usages--;
      if (skill.usages === 0) {
        skill.target = 'self';
        this.grid.unselectSelectedTile();
      }
    }
  }

  useSkillOnSelf(skill: Skill) {
    if (skill.armor) {
      const bonusArmor =
        skill.aArmorBase + skill.a_ninjutsuScale * this.ninjutsuPower;
      this.maxArmor += bonusArmor;
      this.armor += bonusArmor;
    }
    if (skill.clone && skill.usages === 0) {
      this.clonesPreview.forEach((clone) => {
        clone.status.preview = false;
        clone.status.spawned = true;
      });
      this.clonesPreview.forEach((clonePreview) => {
        this.clones.push(clonePreview);
      });
      if (skill.c_swap) {
        this.grid.swapChampionPositions(this, this.clonesPreview[0]);
      }
      this.clonesPreview = [];

      skill.usages--;
    }
    if (skill.buff) {
      let buff = new Buff(
        skill.bMaxHealth,
        skill.bMaxChakra,
        skill.bTaijutsuPower,
        skill.bNinjutsuPower,
        skill.bAttackSpeed,
        skill.bMovementSpeed,
        skill.bResistances,
        skill.kyuubiChakra
      );
      if (skill.b_sideEffect) {
        buff.sideEffect = new Buff();
        buff.sideEffect.taijutsuPower = skill.bSideEffectTaijutsuPower;
        buff.sideEffect.ninjutsuPower = skill.bSideEffectNinjutsuPower;
        buff.sideEffect.attackSpeed = skill.bSideEffectAttackSpeed;
        buff.sideEffect.movementSpeed = skill.bSideEffectMovementSpeed;
        buff.sideEffect.resistances = skill.bSideEffectResistances;
      }
      this.buffs.push(buff);

      this.calculateStatistics();

      this.health += buff.maxHealth;
      this.chakra += buff.maxChakra;
    }
    if (skill.invisibility) {
      this.invisible = true;
    }

    this.kyuubiChakra = skill.kyuubiChakra;
  }

  useSkillOnEnemy(skill: Skill, champion: Champion) {
    let dmg = 0;

    if (skill.mirror) {
      this.grid = new Grid(new Size(6, 6));
      champion.grid = this.grid;
      this.grid.assignChampionToGrid(this, new Position(0, 5));
      this.grid.assignChampionToGrid(champion, new Position(2, 3));
      for (let y = 1; y <= 4; y++) {
        for (let x = 1; x <= 4; x++) {
          if (y === 1 || y === 4 || x === 1 || x === 4) {
            let mirror = new Champion();
            mirror.name = 'Ice Mirrors';
            mirror.owner = this;
            mirror.maxHealth =
              skill.mMaxHealthBase + skill.m_ninjutsuScale * this.ninjutsuPower;
            mirror.health = mirror.maxHealth;
            mirror.ninjutsuResistance = -30;
            mirror.calculateDmgReduction();
            mirror.status.mirror = true;
            this.mirrors.push(mirror);
            this.grid.assignChampionToGrid(mirror, new Position(x, y));
            // this.grid = new Grid(new Size(7, 7));
            // champion.grid = this.grid;
            // this.grid.assignChampionToGrid(this, new Position(0, 6));
            // this.grid.assignChampionToGrid(champion, new Position(2, 4));
            // for (let y = 1; y <= 5; y++) {
            //   for (let x = 1; x <= 5; x++) {
            //     if (y === 1 || y === 5 || x === 1 || x === 5) {
            //       let mirror = new Champion();
            //       mirror.name = 'Ice Mirrors';
            //       mirror.owner = this;
            //       mirror.maxHealth =
            //         skill.mMaxHealthBase + skill.m_ninjutsuScale * this.ninjutsuPower;
            //       mirror.health = mirror.maxHealth;
            //       mirror.status.mirror = true;
            //       this.mirrors.push(mirror);
            //       this.grid.assignChampionToGrid(mirror, new Position(x, y));
          }
        }
      }
    }
    if (skill.hyuugaStyle) {
      let stacks = this.hyuugaStacksPerHit + skill.hStacksBonus;
      champion.hyuugaStacks += stacks;

      let stacksImploded = Math.floor(
        champion.hyuugaStacks / champion.hyuugaStacksMax
      );

      if (stacksImploded) {
        champion.hyuugaStacks -= stacksImploded * champion.hyuugaStacksMax;
        dmg = stacksImploded * this.hyuugaStackDmg;
        dmg = (dmg * (100 - champion.taijutsuDmgReductionPerc)) / 100;
        dmg = Math.floor(dmg);
        if (champion.armor > 0) {
          if (dmg >= champion.armor) {
            dmg -= champion.armor;
            champion.armor = 0;
            champion.maxArmor = 0;
            champion.dmgOnSelfArmor = 0;
          } else {
            champion.armor -= dmg;
            dmg = 0;
            champion.dmgOnSelfArmor = dmg;
          }
        }
        champion.health -= dmg;
        champion.dmgOnSelf = dmg;
        if (champion.health < 0) {
          champion.health = 0;
        }
      }
      return;
    }

    dmg = skill.dmgBase;
    dmg += skill.dmgTaijutsuPowerScale * this.taijutsuPower;
    dmg += skill.dmgNinjutsuPowerScale * this.ninjutsuPower;
    dmg += skill.dmgMaxHealthScale * (this.maxHealth - this.maxHealthBase);
    dmg += skill.dmgMaxChakraScale * this.maxChakra;

    if (skill.dmgIncreasePerDistanceCoveredPerc) {
      dmg *=
        (100 + this.distanceCovered * skill.dmgIncreasePerDistanceCoveredPerc) /
        100;
    }

    if (skill.dmgIncreasePerMissingHealthPerc) {
      const enemyMissingHealth = Math.floor(
        ((champion.maxHealth - champion.health) / champion.maxHealth) * 100
      );
      dmg *=
        1 + (enemyMissingHealth / 100) * skill.dmgIncreasePerMissingHealthPerc;
    }

    // if (this.owner) {
    //   this.owner.rankingPoints += dmg;
    // } else {
    //   this.rankingPoints += dmg;
    // }
    // if (!champion.owner) {
    //   champion.rankingPoints += dmg / 2;
    // }

    switch (skill.dmgType) {
      case 'taijutsu':
        dmg = (dmg * (100 - champion.taijutsuDmgReductionPerc)) / 100;
        break;
      case 'ninjutsu':
        dmg = (dmg * (100 - champion.ninjutsuDmgReductionPerc)) / 100;
        break;
      default:
        break;
    }

    dmg = Math.floor(dmg);

    if (champion.armor > 0) {
      if (dmg >= champion.armor) {
        dmg -= champion.armor;
        champion.dmgOnSelfArmor = 0;
        champion.armor = 0;
        champion.maxArmor = 0;
      } else {
        champion.armor -= dmg;
        champion.armor = Math.floor(champion.armor);
        champion.dmgOnSelfArmor = dmg;
        dmg = 0;
      }
    }

    champion.health -= dmg;
    champion.dmgOnSelf = dmg;

    if (champion.health < 0) {
      champion.health = 0;
    }

    if (skill.throwInAir) {
      champion.inAir = true;
    }
    if (skill.debuff) {
      let debuff = new Buff();
      debuff.resistances = skill.dResistances;
      champion.buffs.push(debuff);
      champion.calculateStatistics();
    }
  }
}
