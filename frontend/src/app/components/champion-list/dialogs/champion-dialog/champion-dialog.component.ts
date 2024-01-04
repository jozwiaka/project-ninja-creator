import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-champion-dialog',
  templateUrl: './champion-dialog.component.html',
  styleUrls: ['./champion-dialog.component.css'],
})
export class ChampionDialogComponent implements OnInit {
  name: string = '';

  constructor(
    public dialogRef: MatDialogRef<ChampionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close();
  }

  save() {
    const champion = this.sharedDataService.champions.find(
      (champion) => champion.name === this.name
    );
    if (!champion) {
      this.dialogRef.close(this.name);
    }
  }
}
