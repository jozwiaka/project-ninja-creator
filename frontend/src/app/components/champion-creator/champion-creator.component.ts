import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ChampionBackup } from 'src/app/common/backups/champion-backup';
import { Champion } from 'src/app/common/entities/champion';
import { Skill } from 'src/app/common/entities/skill';
import { Tree } from 'src/app/common/entities/tree';
import { Utils } from 'src/app/common/tools/utils';
import { ChampionService } from 'src/app/services/champion.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { SkillService } from 'src/app/services/skill.service';
import { TreeService } from 'src/app/services/tree.service';

@Component({
  selector: 'app-champion-creator',
  templateUrl: './champion-creator.component.html',
  styleUrls: ['./champion-creator.component.css'],
})
export class ChampionCreatorComponent implements OnInit {
  @ViewChild('skillTreeTemplate') skillTreeTemplate?: TemplateRef<any>;
  @ViewChild('attributesTemplate') attributesTemplate?: TemplateRef<any>;
  currentComponent?: TemplateRef<any>;
  update = false;
  champion: Champion;
  backup: ChampionBackup;

  constructor(
    public skillService: SkillService,
    public treeService: TreeService,
    public championService: ChampionService,
    public activatedRoute: ActivatedRoute, // @Inject(MAT_DIALOG_DATA) public data: any, // public dialogRef: MatDialogRef<SkillCreatorComponent>
    public router: Router,
    public sharedDataService: SharedDataService
  ) {
    const championId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    if (championId !== -1) {
      this.update = true;
    }
    this.champion = this.sharedDataService.champion;
    // if (!this.champion.name) {
    //   router.navigateByUrl('champion-list');
    // }
    this.champion.calculateStatistics();

    this.backup = this.sharedDataService.championBackup;
    this.backup.attributePoints = this.champion.attributePoints;
    this.backup.attributes = Object.assign({}, this.champion.attributes);
    this.backup.skillPoints = this.champion.skillPoints;
    this.backup.skills = this.champion.skills.map((element) => {
      let skill = new Skill();
      skill = Object.assign({}, element);
      return skill;
    });
    this.backup.trees = this.champion.trees.map((element) => {
      let tree = new Tree();
      tree = Object.assign({}, element);
      return tree;
    });
  }

  ngOnInit(): void {}

  showSkills() {
    this.currentComponent = this.skillTreeTemplate;
  }

  showAttributes() {
    this.currentComponent = this.attributesTemplate;
  }

  return() {
    this.router.navigateByUrl('champion-list');
  }

  save() {
    if (!this.update) {
      if (this.champion.name === '') {
        this.champion.name =
          'Champion_' + (this.sharedDataService.champions.length + 1);
      }
      this.sharedDataService.champions.push(this.champion);
    }
    this.championService.alterChampion(this.champion);
    this.router.navigateByUrl('champion-list');
  }
}
