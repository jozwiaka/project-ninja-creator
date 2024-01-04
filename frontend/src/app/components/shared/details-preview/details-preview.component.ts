import { Component, Input, OnInit } from '@angular/core';
import { Champion } from 'src/app/common/entities/champion';
import { Skill } from 'src/app/common/entities/skill';
import { Utils } from 'src/app/common/tools/utils';

@Component({
  selector: 'app-details-preview',
  templateUrl: './details-preview.component.html',
  styleUrls: ['./details-preview.component.css'],
})
export class DetailsPreviewComponent {
  @Input() skill?: Skill;
  @Input() champion?: Champion;
  Utils = Utils;

  constructor() {}

  pm(val: number): string {
    if (val < 0) {
      return `${val.toFixed(0)}`;
    }
    if (val > 0) {
      return `+${val.toFixed(0)}`;
    }
    return '';
  }

  generateDescription(): string[] {
    let description: string[] = [];
    if (this.skill && this.champion) {
      let str: string;

      if (this.skill.requiresKyuubiChakra) {
        str = `This skill requires Kyuubi chakra.`;
        description.push(str);
      }

      if (this.skill.requiresTargetInAir) {
        str = `This skill requires the target to be in the air.`;
        description.push(str);
      }

      if (this.skill.passive) {
        str = `Passive: `;
        if (this.skill.p_pMaxHealth) {
          str += `+${this.skill.pMaxHealth} (${this.pm(
            this.skill.p_pMaxHealthPerPoint
          )}) Max Health, `;
        }
        if (this.skill.p_pMaxChakra) {
          str += `+${this.skill.pMaxChakra} (${this.pm(
            this.skill.p_pMaxChakraPerPoint
          )}) Max Chakra, `;
        }
        if (this.skill.p_pTaijutsuPower) {
          str += `+${this.skill.pTaijutsuPower} (${this.pm(
            this.skill.p_pTaijutsuPowerPerPoint
          )}) TP, `;
        }
        if (this.skill.p_pNinjutsuPower) {
          str += `+${this.skill.pNinjutsuPower} (${this.pm(
            this.skill.p_pNinjutsuPowerPerPoint
          )}) NP, `;
        }
        if (this.skill.p_pAttackSpeed) {
          str += `+${this.skill.pAttackSpeed} (${this.pm(
            this.skill.p_pAttackSpeedPerPoint
          )}) AS, `;
        }
        if (this.skill.p_pMovementSpeed) {
          str += `+${this.skill.pMovementSpeed} (${this.pm(
            this.skill.p_pMovementSpeedPerPoint
          )}) MS, `;
        }
        if (this.skill.p_pResistances) {
          str += `+${this.skill.pResistances} (${this.pm(
            this.skill.p_pResistancesPerPoint
          )}) TR, +${this.skill.pResistances} (${this.pm(
            this.skill.p_pResistancesPerPoint
          )}) NR, `;
        }
        str = str.slice(0, -2);
        str += '.';
        description.push(str);
      }

      if (
        this.skill.dmgType ||
        this.skill.dmgBase ||
        this.skill.dmgTaijutsuPowerScale ||
        this.skill.dmgNinjutsuPowerScale ||
        this.skill.dmgMaxHealthScale ||
        this.skill.dmgMaxChakraScale ||
        this.skill.dmgIncreasePerDistanceCoveredPerc ||
        this.skill.dmgIncreasePerMissingHealthPerc
      ) {
        let dmgBase = this.skill.dmgBase;

        let dmgTaijutsu =
          this.skill.dmgTaijutsuPowerScale * this.champion.taijutsuPower;

        let dmgNinjutsu =
          this.skill.dmgNinjutsuPowerScale * this.champion.ninjutsuPower;

        let dmgMaxHealth =
          this.skill.dmgMaxHealthScale *
          (this.champion.maxHealth - this.champion.maxHealthBase);

        let dmgMaxChakra =
          this.skill.dmgMaxChakraScale * this.champion.maxChakra;

        let dmg =
          dmgBase + dmgTaijutsu + dmgNinjutsu + dmgMaxHealth + dmgMaxChakra;

        let dmgDetails = '';
        if (dmgBase) {
          dmgDetails += `${this.skill.p_dmgBase} (${this.pm(
            this.skill.p_dmgBasePerPoint
          )}) + `;
        }

        if (this.skill.dmgTaijutsuPowerScale) {
          dmgDetails += `${(this.skill.dmgTaijutsuPowerScale * 100).toFixed(
            0
          )}% TP + `;
        }
        if (this.skill.dmgNinjutsuPowerScale) {
          dmgDetails += `${(this.skill.dmgNinjutsuPowerScale * 100).toFixed(
            0
          )}% NP + `;
        }
        if (this.skill.dmgMaxHealthScale) {
          dmgDetails += `${(this.skill.dmgMaxHealthScale * 100).toFixed(
            0
          )}% bonus health + `;
        }
        if (this.skill.dmgMaxChakraScale) {
          dmgDetails += `${(this.skill.dmgMaxChakraScale * 100).toFixed(
            0
          )}% Max Chakra + `;
        }
        dmgDetails = dmgDetails.slice(0, -3);

        str = `Deal ${dmg.toFixed(0)} = (${dmgDetails}) ${
          this.skill.dmgType
        } damage.`;
        description.push(str);
      }

      if (this.skill.dmgIncreasePerDistanceCoveredPerc) {
        let dmgIncreasePerDistanceCoveredPerc =
          this.champion.distanceCovered *
          this.skill.dmgIncreasePerDistanceCoveredPerc;
        str = `Damage is increased by ${dmgIncreasePerDistanceCoveredPerc.toFixed(
          0
        )}% = (${this.skill.dmgIncreasePerDistanceCoveredPerc.toFixed(
          0
        )}% per distance covered during this turn)`;
        description.push(str);
      }

      if (this.skill.dmgIncreasePerMissingHealthPerc) {
        str = `Damage is increased by ${this.skill.dmgIncreasePerMissingHealthPerc.toFixed(
          0
        )}% per every 1% of target missing health.`;
        description.push(str);
      }

      if (this.skill.move) {
        if (this.skill.range) {
          str = `Move ${this.skill.range}.`;
        } else {
          str = `Move ${this.champion.movementSpeed} = (100% MS).`;
        }
        description.push(str);
      }

      if (this.skill.clone && this.skill.cNumber && this.skill.cScale) {
        let cNumber = this.skill.cNumber;

        if (cNumber > 1) {
          str = `Create ${cNumber} clones`;
        } else {
          str = `Create a clone`;
        }

        if (this.skill.c_weak) {
          str += ` with a health set to 1 and resistances set to 0. Other `;
        } else {
          str += ` with`;
        }
        str += ` statistics are equal to ${(this.skill.cScale * 100).toFixed(
          0
        )}% of yours`;

        str += `.`;
        if (this.skill.c_swap) {
          str += ` Then switch positions with the clone.`;
        }

        str += ` Clones cannot use ultimates or clone abilities.`;
        description.push(str);
      }

      if (
        this.skill.mirror &&
        this.skill.mMaxHealthBase &&
        this.skill.m_ninjutsuScale
      ) {
        let health =
          this.skill.mMaxHealthBase +
          this.skill.m_ninjutsuScale * this.champion.ninjutsuPower;
        str = `Create ice mirrors that surround the target. Mirrors have health equal to ${health} = (${
          this.skill.p_mMaxHealthBase
        } (${this.pm(this.skill.p_mMaxHealthBasePerPoint)}) + ${(
          this.skill.m_ninjutsuScale * 100
        ).toFixed(0)}% NP).`;
        description.push(str);
      }

      if (this.skill.invisibility) {
        str = `At the beginning of the next turn you become invisible (you can't be the target of any spell).`;
        description.push(str);
      }

      if (this.skill.kyuubiChakra) {
        str = `You get Kyuubi chakra until the end of the next turn.`;
        description.push(str);
      }

      if (this.skill.buff) {
        str = `You get `;
        if (this.skill.bMaxHealth) {
          str += `${this.skill.bMaxHealth} (${this.pm(
            this.skill.p_bMaxHealthPerPoint
          )}) health, `;
        }
        if (this.skill.bMaxChakra) {
          str += `${this.skill.bMaxChakra} (${this.pm(
            this.skill.p_bMaxChakraPerPoint
          )}) chakra, `;
        }
        if (this.skill.bTaijutsuPower) {
          str += `${this.skill.bTaijutsuPower} (${this.pm(
            this.skill.p_bTaijutsuPowerPerPoint
          )}) TP, `;
        }
        if (this.skill.bNinjutsuPower) {
          str += `${this.skill.bNinjutsuPower} (${this.pm(
            this.skill.p_bNinjutsuPowerPerPoint
          )})  NP, `;
        }
        if (this.skill.bAttackSpeed) {
          str += `${this.skill.bAttackSpeed} (${this.pm(
            this.skill.p_bAttackSpeedPerPoint
          )}) AS, `;
        }
        if (this.skill.bMovementSpeed) {
          str += `${this.skill.bMovementSpeed} (${this.pm(
            this.skill.p_bMovementSpeedPerPoint
          )}) MS, `;
        }
        if (this.skill.bResistances) {
          str += `${this.skill.bResistances} (${this.pm(
            this.skill.p_bResistancesPerPoint
          )}) TR, `;
          str += `${this.skill.bResistances} (${this.pm(
            this.skill.p_bResistancesPerPoint
          )}) NR, `;
        }
        str = str.slice(0, -2);
        str += ` until the end of the next turn. `;
        description.push(str);

        if (this.skill.b_sideEffect) {
          str = `At the beginning of your next turn you get `;
          if (this.skill.bSideEffectTaijutsuPower) {
            str += `${this.skill.bSideEffectTaijutsuPower} TP, `;
          }
          if (this.skill.bSideEffectNinjutsuPower) {
            str += `${this.skill.bSideEffectNinjutsuPower} NP, `;
          }
          if (this.skill.bSideEffectAttackSpeed) {
            str += `${this.skill.bSideEffectAttackSpeed} AS, `;
          }
          if (this.skill.bSideEffectMovementSpeed) {
            str += `${this.skill.bSideEffectMovementSpeed} MS, `;
          }
          if (this.skill.bSideEffectResistances) {
            str += `${this.skill.bSideEffectResistances} TR, `;
            str += `${this.skill.bSideEffectResistances} NR, `;
          }
          str = str.slice(0, -2);
          str += ' until the end of the next turn.';
          description.push(str);
        }
      }

      if (this.skill.throwInAir) {
        str = `Throw the target in the air. The target is in the air until the end of the turn.`;
        description.push(str);
      }

      if (this.skill.debuff) {
        str = '';
        if (this.skill.dResistances) {
          let dResistances = Math.abs(this.skill.dResistances);
          str = `Reduce NR and TR of the target by ${dResistances} (${this.pm(
            this.skill.p_dResistancesPerPoint
          )}).`;
        }
        description.push(str);
      }

      if (this.skill.armor && this.skill.aArmorBase) {
        let armorBase = this.skill.aArmorBase;
        let armor =
          armorBase + this.skill.a_ninjutsuScale * this.champion.ninjutsuPower;
        str = `You get an armor equals to ${armor} = (${armorBase} (${this.pm(
          this.skill.p_aArmorBasePerPoint
        )}) + ${(this.skill.a_ninjutsuScale * 100).toFixed(0)}% NP).`;
        description.push(str);
      }

      if (this.skill.hyuugaStyle) {
        let hyuugaStacksPerHit =
          this.champion.hyuugaStacksPerHit + this.skill.hStacksBonus;
        let bonusStacksStr = '';
        if (this.skill.hStacksBonus) {
          bonusStacksStr = `${this.skill.hStacksBonus} (${this.pm(
            this.skill.p_hStacksBonusPerPoint
          )}) + `;
        }
        str = `Put ${hyuugaStacksPerHit} = (${bonusStacksStr}1 per ${this.champion.hyuugaStacksScaleTaijutsuPower} TP) hyuuga stacks. If the target has ${this.champion.hyuugaStacksMax} stacks, deal ${this.champion.hyuugaStackDmg} taijutsu damage.`;
        description.push(str);
      }
    }
    return description;
  }
}
