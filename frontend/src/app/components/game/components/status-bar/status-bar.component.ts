import { Component, OnInit, Input } from '@angular/core';
import { Champion } from 'src/app/common/entities/champion';
@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css'],
})
export class StatusBarComponent implements OnInit {
  @Input() champion!: Champion;
  @Input() dmg?: number;
  @Input() dmgArmor?: number;

  constructor() {}

  ngOnInit(): void {}

  calculatePercentage(current: number, max: number) {
    if (max === 0) {
      return 0;
    }
    return (current / max) * 100;
  }
}
