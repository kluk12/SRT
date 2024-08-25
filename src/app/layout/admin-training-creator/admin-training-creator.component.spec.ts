import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrainingCreatorComponent } from './admin-training-creator.component';

describe('AdminReservationComponent', () => {
  let component: AdminTrainingCreatorComponent;
  let fixture: ComponentFixture<AdminTrainingCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTrainingCreatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminTrainingCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
