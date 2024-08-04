import { CommonModule } from '@angular/common';
import { Component, Host, Input, NgModule, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements OnInit {

  @Input('controlName') controlName: string;
  @Input('error') error: string
  @Input('isSubmitted') isSubmitted: boolean;
  @Input('control') control:any;
  @Input('formGroup') formGroup: FormGroup;

  visible: boolean = false;

  constructor(@Optional() @Host() public form: FormGroupDirective) { }

  ngOnInit() {
    if (this.form) {
        if(this.controlName){
            if(this.formGroup)
                this.control = this.formGroup.get(this.controlName) as FormControl;
            else
                this.control = this.form.form.get(this.controlName) as FormControl;
        }
    }
  }
}
@NgModule({
  declarations: [
    ValidationMessageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ValidationMessageComponent]
})
export class ValidationMessageModule { }