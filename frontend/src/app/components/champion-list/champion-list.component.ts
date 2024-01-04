import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Champion } from 'src/app/common/entities/champion';
import { ChampionService } from 'src/app/services/champion.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ChampionDialogComponent } from './dialogs/champion-dialog/champion-dialog.component';

@Component({
  selector: 'app-champion-list',
  templateUrl: './champion-list.component.html',
  styleUrls: ['./champion-list.component.css'],
})
export class ChampionListComponent implements OnInit {
  champions: Champion[];
  constructor(
    public championService: ChampionService,
    public activatedRoute: ActivatedRoute,
    public sharedDataService: SharedDataService,
    public router: Router,
    public dialog: MatDialog
  ) {
    this.champions = this.sharedDataService.champions;
  }

  ngOnInit(): void {}

  newChampion() {
    const dialogRef = this.dialog.open(ChampionDialogComponent, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.sharedDataService.newChampion(result);
        const newChampionId = this.sharedDataService.champion.id;
        this.router.navigateByUrl(`/champion-creator/${newChampionId}`);
      }
    });
  }

  editChampion(championId: number) {
    this.sharedDataService.editChampion(championId);
    this.router.navigateByUrl(`/champion-creator/${championId}`);
  }

  deleteChampion(championId: number) {
    this.champions = this.champions.filter(
      (champion) => champion.id !== championId
    );
    this.sharedDataService.champions = this.champions;

    this.championService.deleteChampion(championId);
  }

  return() {
    this.router.navigateByUrl(`/menu`);
  }
}
