import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffirmationComponent } from './affirmation.component';

describe('AffirmationComponent', () => {
  let component: AffirmationComponent;
  let fixture: ComponentFixture<AffirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
