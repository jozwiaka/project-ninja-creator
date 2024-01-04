import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Champion } from 'src/app/common/entities/champion';
import { Skill } from 'src/app/common/entities/skill';
import { Tree } from 'src/app/common/entities/tree';
import { Utils } from 'src/app/common/tools/utils';
import { ChampionService } from 'src/app/services/champion.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { SkillService } from 'src/app/services/skill.service';
import { TreeService } from 'src/app/services/tree.service';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { ChampionBackup } from 'src/app/common/backups/champion-backup';

@Component({
  selector: 'app-skill-tree',
  templateUrl: './skill-tree.component.html',
  styleUrls: ['./skill-tree.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class SkillTreeComponent implements OnInit {
  name = '';
  update = false;
  maxTier = 3;
  trees: Tree[] = [];
  champion: Champion;
  Utils = Utils;
  backup: ChampionBackup;
  showDescription: boolean = false;
  selected: Skill | undefined = undefined;

  constructor(
    public skillService: SkillService,
    public treeService: TreeService,
    public championService: ChampionService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public sharedDataService: SharedDataService
  ) {
    this.champion = this.sharedDataService.champion;
    this.trees = this.sharedDataService.trees;
    this.trees = this.trees.filter((tree) => tree.name !== 'Basic skills');
    this.backup = this.sharedDataService.championBackup;
  }

  ngOnInit(): void {}

  select(skill: Skill) {
    const championSkill = this.champion.skills.find((s) => s.id === skill.id);
    if (championSkill) {
      this.selected = championSkill;
    } else {
      this.selected = skill;
    }
  }

  unselect() {
    this.selected = undefined;
  }

  tierArray() {
    return Utils.inRange(this.maxTier).reverse();
  }

  tierRequirementFulfilled(tree: Tree, skill: Skill) {
    const championTree = this.champion.trees.find((t) => t.id === tree.id);

    if (!championTree) return true;

    const championTreePoints = championTree!.points;
    switch (skill.tier) {
      case 1:
        return championTreePoints < tree.tier1;
      case 2:
        return championTreePoints < tree.tier2;
      case 3:
        return championTreePoints < tree.tier3;
      default:
        return true;
    }
  }

  getPointsOfChampionSkill(skill: Skill) {
    const championSkill = this.champion.skills.find((s) => s.id === skill.id);

    if (championSkill) {
      return championSkill.points;
    }
    return 0;
  }
  getPointsOfChampionTree(tree: Tree) {
    const championTree = this.champion.trees.find((t) => t.id === tree.id);
    if (championTree) {
      return championTree.points;
    }
    return 0;
  }

  addTreePoint(tree: Tree) {
    if (this.champion.skillPoints > 0) {
      let championTree = this.champion.trees.find((t) => t.id === tree.id);
      if (!championTree) {
        championTree = new Tree();
        Object.assign(championTree, tree);
        championTree.points = 0;
        this.champion.trees.push(championTree);
      }

      championTree.points += 1;
      this.champion.skillPoints -= 1;
    }
  }

  removeTreePoint(tree: Tree) {
    let championTree = this.champion.trees.find((t) => t.id === tree.id);
    if (!championTree) {
      return;
    }

    championTree.points -= 1;
    this.champion.skillPoints += 1;

    if (championTree.points === 0) {
      const index = this.champion.trees.findIndex(
        (tree) => tree.id === championTree?.id
      );
      if (index !== -1) {
        this.champion.trees.splice(index, 1);
      }
    }
  }

  checkIfCanRemoveTreePoint(tree: Tree) {
    const championTree = this.champion.trees.find((t) => t.id === tree.id);
    const TreeSkills = tree.skills;
    const championTreeSkills = tree.skills.filter((treeSkill) => {
      return this.champion.skills.find((s) => treeSkill.id === s.id);
    });

    for (const skill of championTreeSkills) {
      if (
        championTree &&
        ((skill.tier === 1 && tree.tier1 + 1 > championTree?.points) ||
          (skill.tier === 2 && tree.tier2 + 1 > championTree?.points) ||
          (skill.tier === 3 && tree.tier3 + 1 > championTree?.points))
      ) {
        return false;
      }
    }

    const backupTree = this.backup.trees.find((t) => t.id === tree.id);

    if (
      backupTree &&
      championTree &&
      backupTree.points >= championTree.points
    ) {
      return false;
    }

    return true;
  }

  addSkillPoint(skill: Skill) {
    if (this.champion.skillPoints > 0) {
      let championSkill = this.champion.skills.find((t) => t.id === skill.id);
      if (!championSkill) {
        championSkill = new Skill();
        Object.assign(championSkill, skill);
        // championSkill.points = 0;
        this.champion.skills.push(championSkill);
      }
      if (championSkill.points === championSkill.maxPoints) {
        return;
      }
      championSkill.points++;
      championSkill.update();
      this.champion.calculateStatistics();
      this.selected = championSkill;
      this.champion.skillPoints -= 1;
    }
  }

  removeSkillPoint(event: MouseEvent, skill: Skill) {
    event.preventDefault();

    let championSkill = this.champion.skills.find((t) => t.id === skill.id);
    if (!championSkill) {
      return;
    }
    const backupSkill = this.backup.skills.find((s) => s.id === skill.id);

    if (backupSkill && backupSkill?.points >= championSkill.points) {
      return;
    }

    championSkill.points--;
    championSkill.update();
    this.champion.calculateStatistics();
    this.selected = championSkill;

    if (championSkill.points === 0) {
      const index = this.champion.skills.findIndex(
        (skill) => skill.id === championSkill?.id
      );
      if (index !== -1) {
        this.champion.skills.splice(index, 1);
      }
    }
    this.champion.skillPoints += 1;
  }

  getSkillsByTier(tree: Tree, tier: number) {
    return tree.skills?.filter((skill) => skill.tier === tier);
  }

  reset() {
    this.champion.skillPoints = this.backup.skillPoints;
    this.champion.skills.forEach((skill) => {
      const skillBackup = this.backup.skills.find(
        (skillBackup) => skillBackup.id === skill.id
      );
      if (skillBackup) {
        skill.points = skillBackup.points;
      } else {
        skill.points = 0;
      }
    });

    this.champion.trees.forEach((tree) => {
      const treeBackup = this.backup.trees.find(
        (treeBackup) => treeBackup.id === tree.id
      );
      if (treeBackup) {
        tree.points = treeBackup.points;
      } else {
        tree.points = 0;
      }
    });
  }
}
