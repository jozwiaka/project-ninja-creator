import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionCreatorComponent } from './champion-creator.component';

describe('ChampionCreatorComponent', () => {
  let component: ChampionCreatorComponent;
  let fixture: ComponentFixture<ChampionCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampionCreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampionCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
