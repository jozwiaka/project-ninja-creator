import { Injectable } from '@angular/core';
import { Champion } from '../common/entities/champion';
import { TreeService } from './tree.service';
import { SkillService } from './skill.service';
import { Tree } from '../common/entities/tree';
import { forkJoin } from 'rxjs';
import { Skill } from '../common/entities/skill';
import { Utils } from '../common/tools/utils';
import { ChampionService } from './champion.service';
import { ChampionTree } from '../common/entities/champion-tree';
import { ChampionSkill } from '../common/entities/champion-skill';
import { ChampionBackup } from '../common/backups/champion-backup';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  Utils = Utils;
  initialized: boolean = false;

  champions: Champion[] = [];
  trees: Tree[] = [];
  skills: Skill[] = [];
  championBackup: ChampionBackup = new ChampionBackup();

  champion: Champion = new Champion();
  championsInGame: Champion[] = [];
  basicSkills: Skill[] = [];

  championSkills: ChampionSkill[] = [];
  championTrees: ChampionTree[] = [];

  constructor(
    private championService: ChampionService,
    private treeService: TreeService,
    private skillService: SkillService
  ) {
    this.init();
  }

  private async init(): Promise<void> {
    await Promise.all([
      this.initTrees(),
      this.initSkills(),
      this.initChampions(),
      this.initChampionTrees(),
      this.initChampionSkills(),
    ]);
    await Promise.all([
      this.assignAttributesToChampions(),
      this.assignSkillsToTrees(),
      this.assignTreesSkillsToChampions(),
      this.setBasicSkills(),
    ]);
    this.initialized = true;
  }

  // private async setBasicSkills() {
  //   const basicSkillNames = ['Move', 'Attack', 'Chakra', 'Shuriken', 'Kunai'];
  //   this.basicSkills = this.skills.filter((skill) =>
  //     basicSkillNames.includes(skill.name)
  //   );
  // }

  private async setBasicSkills(): Promise<void> {
    return new Promise<void>((resolve) => {
      const basicSkillNames = [
        // 'Wait',
        'Move',
        'Attack',
        // 'Shuriken',
        // 'Chakra',
        // 'Kunai',
      ];

      for (const basicSkillName of basicSkillNames) {
        const skill = this.skills.find(
          (skill) => skill.name === basicSkillName
        );
        if (skill) {
          this.basicSkills.push(skill);
        }
      }
      resolve();
    });
  }

  private async assignTreesSkillsToChampions(): Promise<void> {
    return new Promise<void>((resolve) => {
      for (const champion of this.champions) {
        this.assignTreesToChampion(champion);
        this.assignSkillsToChampion(champion);
      }
      resolve();
    });
  }

  private assignTreesToChampion(champion: Champion) {
    for (const championTree of this.championTrees) {
      if (championTree.championId === champion.id) {
        const tree = this.trees.find((s) => s.id === championTree.treeId);
        if (tree) {
          const treeCopy = new Tree();
          Object.assign(treeCopy, tree);
          treeCopy.points = championTree.points;
          champion.trees.push(treeCopy);
        }
      }
    }
  }

  private assignSkillsToChampion(champion: Champion) {
    for (const championSkill of this.championSkills) {
      if (championSkill.championId === champion.id) {
        const skill = this.skills.find((s) => s.id === championSkill.skillId);
        if (skill) {
          const skillCopy = new Skill();
          Object.assign(skillCopy, skill);
          skillCopy.points = championSkill.points;
          skillCopy.update();
          champion.skills.push(skillCopy);
        }
      }
    }
  }

  private async initChampionTrees(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.championService.getChampionTrees().subscribe((data) => {
        if (data.length === 0) {
          resolve();
        }
        this.championTrees = data;
        resolve();
      });
    });
  }

  private async initChampionSkills(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.championService.getChampionSkills().subscribe((data) => {
        if (data.length === 0) {
          resolve();
        }
        this.championSkills = data;
        resolve();
      });
    });
  }

  private async initChampions(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.championService.getChampions().subscribe((data) => {
        if (data.length === 0) {
          resolve();
        }
        this.champions = data;
        this.champions.forEach((champion) => {});
        resolve();
      });
    });
  }

  private async initTrees(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.treeService.getTrees().subscribe((data) => {
        if (data.length === 0) {
          resolve();
        }
        this.trees = data;
        resolve();
      });
    });
  }

  private async initSkills(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.skillService.getSkills().subscribe((data) => {
        if (data.length === 0) {
          resolve();
        }
        this.skills = data;
        resolve();
      });
    });
  }

  private async assignAttributesToChampions(): Promise<void> {
    return new Promise<void>((resolve) => {
      const observables = this.champions.map((champion) =>
        this.championService.getAttributesByChampionId(champion.id)
      );
      if (observables.length === 0) {
        resolve();
      }
      forkJoin(observables).subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          this.champions[i].attributes = data[i];
        }
        resolve();
      });
    });
  }

  private async assignSkillsToTrees(): Promise<void> {
    return new Promise<void>((resolve) => {
      const observables = this.trees.map((tree) =>
        this.skillService.getSkillsByTreeId(tree.id)
      );
      forkJoin(observables).subscribe((data) => {
        if (data.length === 0) {
          resolve();
        }
        for (let i = 0; i < data.length; i++) {
          this.trees[i].skills = data[i];
        }
        resolve();
      });
    });
  }

  editChampion(championId: number) {
    const champion = this.champions.find(
      (champion) => champion.id === championId
    );
    if (champion) {
      this.champion = champion;
    }
  }

  newChampion(championName: string) {
    this.champion = new Champion();
    this.champion.name = championName;
    this.champion.skills = this.basicSkills.map((element) => {
      const skill = new Skill();
      Object.assign(skill, element);
      return skill;
    });
  }
}
