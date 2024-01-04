import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionDialogComponent } from './champion-dialog.component';

describe('ChampionDialogComponent', () => {
  let component: ChampionDialogComponent;
  let fixture: ComponentFixture<ChampionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
