import { Component, NgModule } from '@angular/core';
import { CommonModuleModule } from '../../models/common-module/common-module.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../service/user-service';
import { CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CalendarApi } from '@fullcalendar/core';

@Component({
  selector: 'app-training-generator',
  templateUrl: './training-generator.component.html',
  styleUrl: './training-generator.component.scss'
})
export class TrainingGeneratorDialogComponent {
  value: string = 'off';
    dayOptions: any[] =
     [
        { name: 'Pon', value: 1 },
        { name: 'Wt', value: 2 },
        { name: 'Śr', value: 3 },
        { name: 'Czw', value: 4 },
        { name: 'Pt', value: 5 },
        { name: 'Sob', value: 6 },
        { name: 'Niedz', value: 7 }
    ];
    typeOptions: any[] = 
    [
      { name: 'Fitness', value: 1 },
      { name: 'Zd.Kręgosłup', value: 2 },
      { name: 'Pilates', value: 3 },
  ];
  calendarApi:CalendarApi
    gen: FormGroup= new FormGroup({});
    islogin: boolean = false;
    constructor(private formBuilder: FormBuilder,
      private userService: UserService,
       public config: DynamicDialogConfig,
     public ref: DynamicDialogRef,
  
    ) {
    }
    ngOnInit(): void {
      this.calendarApi = this.config?.data?.calendarApi;
      this.InitRegForm();
    }
    InitRegForm() {
      this.gen = this.formBuilder.group({
        day: [1],
        dateFrom: [""],
        dateTo: [""],
        title: [''],
        type: [1],
      });
    }
   
      regSubmit() {
       console.log(this.gen.valid,this.gen.getRawValue());
  //     if (this.registerForm.valid) {
         //var item = new User(this.gen.getRawValue());
  //       console.log(item);
  
  // // later
  //        this.userService.Add(item).subscribe(x=>{
  //         console.log(x);
          
  //        }
  //         );
  //     }
    } 
}
@NgModule({
  declarations: [TrainingGeneratorDialogComponent],
  imports: [ FormsModule,ReactiveFormsModule,SelectButtonModule,CalendarModule,InputTextModule,CommonModule],
  exports: [TrainingGeneratorDialogComponent ]

})
export class TrainingGeneratorDialogModule {}