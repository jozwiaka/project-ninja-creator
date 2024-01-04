import { Component, OnInit } from '@angular/core';
import { Attributes } from 'src/app/common/entities/attributes';
import { Champion } from 'src/app/common/entities/champion';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ChampionBackup } from 'src/app/common/backups/champion-backup';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css'],
})
export class AttributesComponent implements OnInit {
  champion: Champion;
  backup: ChampionBackup;

  constructor(public sharedDataService: SharedDataService) {
    this.champion = this.sharedDataService.champion;
    this.champion.calculateStatistics();
    this.backup = sharedDataService.championBackup;
  }

  ngOnInit(): void {}

  reset() {
    this.champion.attributePoints = this.backup.attributePoints;
    this.champion.attributes = Object.assign({}, this.backup.attributes);
  }

  getCost(attribute: number): number {
    if (attribute < 2) {
      return 1;
    } else if (attribute < 5) {
      return 2;
    } else {
      return 3;
    }
  }

  getCostReturn(attribute: number): number {
    attribute--;
    if (attribute < 2) {
      return 1;
    } else if (attribute < 5) {
      return 2;
    } else {
      return 3;
    }
  }

  checkIfVitalityCanBeDecremented() {
    if (this.champion.attributes.vitality === this.backup.attributes.vitality) {
      return true;
    }
    return false;
  }

  checkIfVitalityCanBeIncremented() {
    const cost = this.getCost(this.champion.attributes.vitality);
    if (cost > this.champion.attributePoints) {
      return true;
    }
    return false;
  }

  addVitalityPoint() {
    const cost = this.getCost(this.champion.attributes.vitality);
    this.champion.attributes.vitality++;
    this.champion.attributePoints -= cost;
  }

  removeVitalityPoint() {
    if (this.champion.attributes.vitality) {
      this.champion.attributes.vitality--;
      const cost = this.getCost(this.champion.attributes.vitality);
      this.champion.attributePoints += cost;
    }
  }

  checkIfConcentrationCanBeDecremented() {
    if (
      this.champion.attributes.concentration ===
      this.backup.attributes.concentration
    ) {
      return true;
    }
    return false;
  }

  checkIfConcentrationCanBeIncremented() {
    const cost = this.getCost(this.champion.attributes.concentration);
    if (cost > this.champion.attributePoints) {
      return true;
    }
    return false;
  }

  addConcentrationPoint() {
    const cost = this.getCost(this.champion.attributes.concentration);
    this.champion.attributes.concentration++;
    this.champion.attributePoints -= cost;
  }

  removeConcentrationPoint() {
    if (this.champion.attributes.concentration) {
      this.champion.attributes.concentration--;
      const cost = this.getCost(this.champion.attributes.concentration);
      this.champion.attributePoints += cost;
    }
  }

  checkIfTaijutsuCanBeDecremented() {
    if (this.champion.attributes.taijutsu === this.backup.attributes.taijutsu) {
      return true;
    }
    return false;
  }

  checkIfTaijutsuCanBeIncremented() {
    const cost = this.getCost(this.champion.attributes.taijutsu);
    if (cost > this.champion.attributePoints) {
      return true;
    }
    return false;
  }

  addTaijutsuPoint() {
    const cost = this.getCost(this.champion.attributes.taijutsu);
    this.champion.attributes.taijutsu++;
    this.champion.attributePoints -= cost;
  }

  removeTaijutsuPoint() {
    if (this.champion.attributes.taijutsu) {
      this.champion.attributes.taijutsu--;
      const cost = this.getCost(this.champion.attributes.taijutsu);
      this.champion.attributePoints += cost;
    }
  }

  checkIfNinjutsuCanBeDecremented() {
    if (this.champion.attributes.ninjutsu === this.backup.attributes.ninjutsu) {
      return true;
    }
    return false;
  }

  checkIfNinjutsuCanBeIncremented() {
    const cost = this.getCost(this.champion.attributes.ninjutsu);
    if (cost > this.champion.attributePoints) {
      return true;
    }
    return false;
  }

  addNinjutsuPoint() {
    const cost = this.getCost(this.champion.attributes.ninjutsu);
    this.champion.attributes.ninjutsu++;
    this.champion.attributePoints -= cost;
  }

  removeNinjutsuPoint() {
    if (this.champion.attributes.ninjutsu) {
      this.champion.attributes.ninjutsu--;
      const cost = this.getCost(this.champion.attributes.ninjutsu);
      this.champion.attributePoints += cost;
    }
  }

  checkIfSpeedCanBeDecremented() {
    if (this.champion.attributes.speed === this.backup.attributes.speed) {
      return true;
    }
    return false;
  }

  checkIfSpeedCanBeIncremented() {
    const cost = this.getCost(this.champion.attributes.speed);
    if (cost > this.champion.attributePoints) {
      return true;
    }
    return false;
  }

  addSpeedPoint() {
    const cost = this.getCost(this.champion.attributes.speed);
    this.champion.attributes.speed++;
    this.champion.attributePoints -= cost;
  }

  removeSpeedPoint() {
    if (this.champion.attributes.speed) {
      this.champion.attributes.speed--;
      const cost = this.getCost(this.champion.attributes.speed);
      this.champion.attributePoints += cost;
    }
  }

  checkIfMovementCanBeDecremented() {
    if (this.champion.attributes.movement === this.backup.attributes.movement) {
      return true;
    }
    return false;
  }

  checkIfMovementCanBeIncremented() {
    const cost = this.getCost(this.champion.attributes.movement);
    if (cost > this.champion.attributePoints) {
      return true;
    }
    return false;
  }

  addMovementPoint() {
    const cost = this.getCost(this.champion.attributes.movement);
    this.champion.attributes.movement++;
    this.champion.attributePoints -= cost;
  }

  removeMovementPoint() {
    if (this.champion.attributes.movement) {
      this.champion.attributes.movement--;
      const cost = this.getCost(this.champion.attributes.movement);
      this.champion.attributePoints += cost;
    }
  }

  checkIfDefenseCanBeDecremented() {
    if (this.champion.attributes.defense === this.backup.attributes.defense) {
      return true;
    }
    return false;
  }

  checkIfDefenseCanBeIncremented() {
    const cost = this.getCost(this.champion.attributes.defense);
    if (cost > this.champion.attributePoints) {
      return true;
    }
    return false;
  }

  addDefensePoint() {
    const cost = this.getCost(this.champion.attributes.defense);
    this.champion.attributes.defense++;
    this.champion.attributePoints -= cost;
  }

  removeDefensePoint() {
    if (this.champion.attributes.defense) {
      this.champion.attributes.defense--;
      const cost = this.getCost(this.champion.attributes.defense);
      this.champion.attributePoints += cost;
    }
  }
}
