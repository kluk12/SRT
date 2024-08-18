import { environment } from '../../../environment';
import { GenericResponse } from '../../models/GenericResponse';
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Logins, User } from '../../models/models.dto';
import { UserService } from '../../service/user-service.service';
import { first, timeout } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { } from "@angular/forms";

import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CommonModuleModule } from '../../models/common-module/common-module.module';
import { ex } from '@fullcalendar/core/internal-common';
@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrl: './reservation-dialog.component.scss',
})
export class RreservationDialogComponent {
  form: FormGroup = new FormGroup({});
  islogin: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private config: DynamicDialogConfig
  ) {
  }
  ngOnInit(): void {
    this.config.data;
    console.log(this.config.data);
    this.InitRegForm();
  }
  InitRegForm() {

    this.form = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cost: ['323'],
      aditionalData: ['dasdada']
    });
  }

  submit() {
    console.log(this.form.valid);
    if (this.form.valid) {
      var item = new User(this.form.getRawValue());
      console.log(item);
      //this.Add(item);
      // this.userService.Add(item).subscribe(x=>{console.log(x)}
      //  );
      //  this.userService.getValue(item.login,item.password).subscribe(x=>{console.log(x)}
      // );

    }
  }
  // regSubmit() {
  //   if (this.registerForm.valid) {
  //     var item = new User(this.registerForm.getRawValue());
  //     console.log(item);

  //     this.Add(item).then(response => {
  //       console.log(response);
  //     }).catch(error => {
  //       console.error(error);
  //     });
  //   }
  // }


  // Add(user:User){
  //   return this.http.post<GenericResponse<User>>(
  //       `${baseUrl}/Add`,
  //       {
  //         Phone: user.phone,
  //         FirstName: user.firstName,
  //         LastName: user.lastName,
  //         Login: user.login,
  //         Email: user.email,
  //         Password: user.password,

  //       });
  // }


}
@NgModule({
  declarations: [
    RreservationDialogComponent
  ],
  imports: [
    ReactiveFormsModule
  ],
  exports: [RreservationDialogComponent]
})
export class RreservationDialogModule { }