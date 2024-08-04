import { CommonModule } from '@angular/common';
import { Component, NgModule, signal, ViewChild, viewChild } from '@angular/core';
import { Data } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  hours = [
    { time: '6 AM - 7 AM', activities: ['Cardio', '', 'Yoga', 'Cardio', '', '', 'Yoga'] },
    { time: '7 AM - 8 AM', activities: ['', 'Weight Lifting', 'Yoga', '', 'Cardio', 'Yoga', ''] },
    // Add more hours as needed
  ];
loading=signal<boolean>(true);
  constructor( ) { }

  ngOnInit() {
console.log('HomeComponent');
  }

  ngAfterViewInit() {
    this.loading.set(false);
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