import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPreviewComponent } from './details.component';

describe('DetailsPreviewComponent', () => {
  let component: DetailsPreviewComponent;
  let fixture: ComponentFixture<DetailsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsPreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
