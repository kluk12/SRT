import { TreningService } from './../../service/TreningService';
import { CommonModule } from '@angular/common';
import { Component, NgModule, signal, ViewChild, viewChild } from '@angular/core';
import { Data } from '@angular/router';
import { TrainingWeek } from '../../models/models.dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  training: TrainingWeek;
  hours = [
    { time: '6 AM - 7 AM', activities: ['Cardio', '', 'Yoga', 'Cardio', '', '', 'Yoga'] },
    { time: '7 AM - 8 AM', activities: ['', 'Weight Lifting', 'Yoga', '', 'Cardio', 'Yoga', ''] },
    // Add more hours as needed
  ];
loading=signal<boolean>(true);


constructor(private treningService: TreningService) { }

  ngOnInit() {
    this.treningService.find().subscribe((x) => {
      this.training = new TrainingWeek( x.data);
      console.log(x,this.training);
    });
console.log('HomeComponent');
  }

  ngAfterViewInit() {
    this.loading.set(false);
  }
  routeType(type: number) {
    switch (type) {
      case 1: return 'Cardio';
      case 2: return 'Yoga';
      case 3: return 'Weight Lifting';
      default: return 'Unknown';
    }
  }
}
@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  imports: [CommonModule],
})
export class HomeModule {}
export class tableItem {
  name: string;
  date: Data;
  maxCount: string;
  userCount: string;
  constructor(init: Partial<tableItem>) {
   Object.assign(this,init);
  }
  
}