import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Champion } from 'src/app/common/entities/champion';
import { SkillService } from 'src/app/services/skill.service';
import { ChampionService } from 'src/app/services/champion.service';
import { NONE_TYPE } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { AUTO } from 'phaser';
import { SharedDataService } from 'src/app/services/shared-data.service';

interface Select {
  champion: Champion | undefined;
  champions: Champion[];
  showChampions: boolean;
}

@Component({
  selector: 'app-game-creator',
  templateUrl: './game-creator.component.html',
  styleUrls: ['./game-creator.component.css'],
})
export class GameCreatorComponent implements OnInit {
  rows: Select[] = [
    {
      champion: undefined,
      champions: [],
      showChampions: false,
    },
    {
      champion: undefined,
      champions: [],
      showChampions: false,
    },
  ];

  champions: Champion[];

  constructor(
    private sharedDataService: SharedDataService,
    private championService: ChampionService,
    private skillService: SkillService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog
  ) {
    this.champions = this.sharedDataService.champions.map((champion) => {
      let c = new Champion();
      c = Object.assign({}, champion);
      return champion;
    });
  }

  addRow() {
    this.rows.push({
      champion: undefined,
      champions: [],
      showChampions: false,
    });
  }

  removeRow(index: number) {
    if (this.rows[index].champion) {
      this.champions.push(this.rows[index].champion as Champion);
    }
    this.rows.splice(index, 1);
  }

  ngOnInit(): void {}

  disableStartButton(): boolean {
    if (this.rows.length < 2) {
      return true;
    }
    for (const row of this.rows) {
      if (!row.champion) return true;
    }
    return false;
  }

  start(): void {
    const championsInGame = this.rows.map((row) => {
      return row.champion;
    });
    this.sharedDataService.championsInGame = championsInGame.filter(
      (champion) => champion !== undefined
    ) as Champion[];
    this.router.navigate(['/game']);
  }

  shrinkAll() {
    this.rows.forEach((row) => {
      row.showChampions = false;
    });
  }

  toggleChampions(i: number) {
    const status = this.rows[i].showChampions;
    this.shrinkAll();
    this.rows[i].showChampions = !status;
    this.rows[i].champions = this.champions;
  }

  selectChampion(i: number, champion: Champion) {
    if (this.rows[i].champion) {
      this.champions.push(this.rows[i].champion as Champion);
    }
    this.rows[i].champion = champion;
    this.shrinkAll();
    this.champions = this.champions.filter((c) => c.id !== champion.id!);
  }

  return() {
    this.router.navigateByUrl(`/menu`);
  }
}
