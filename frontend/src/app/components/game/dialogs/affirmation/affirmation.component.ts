import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-affirmation',
  templateUrl: './affirmation.component.html',
  styleUrls: ['./affirmation.component.css'],
})
export class AffirmationComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AffirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
