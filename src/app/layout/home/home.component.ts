import { Component, signal, ViewChild, viewChild } from '@angular/core';
import { Data } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


loading=signal<boolean>(true);
  constructor( ) { }

  ngOnInit() {
console.log('HomeComponent');
  }

  ngAfterViewInit() {
    this.loading.set(false);
  }
}
export class tableItem {
  name: string;
  date: Data;
  maxCount: string;
  userCount: string;
  constructor(init: Partial<tableItem>) {
   Object.assign(this,init);
  }
  
}