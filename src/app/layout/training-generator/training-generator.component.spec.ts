import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingGeneratorComponent } from './training-generator.component';

describe('TrainingGeneratorComponent', () => {
  let component: TrainingGeneratorComponent;
  let fixture: ComponentFixture<TrainingGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingGeneratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
