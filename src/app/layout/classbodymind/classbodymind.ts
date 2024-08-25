import { Component, NgModule } from '@angular/core';
import { ValidationMessageModule } from '../validation-message/validation-message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-class-body-mind',
  templateUrl: './classbodymind.html',
  styleUrl: './classbodymind.scss'
})
export class ClassBodyMindComponent {

  constructor() { }

  ngOnInit(): void {
  }
  

  
}
@NgModule({
  declarations: [
    ClassBodyMindComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ValidationMessageModule,
  ],
  providers: []
})
export class ClassBodyMindModule { }
