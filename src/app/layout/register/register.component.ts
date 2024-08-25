import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Logins, User } from '../../models/models.dto';
import { UserService } from '../../service/user-service.service';
import { CommonModule } from '@angular/common';
import { ValidationMessageComponent, ValidationMessageModule } from '../validation-message/validation-message.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({});
  islogin: boolean = false;
  isSubmitted: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,

  ) {
  }
  ngOnInit(): void {
    this.InitForm();
  }
  InitForm() {
    this.registerForm = this.formBuilder.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required]
    });
  }

  Submit() {
    this.isSubmitted = true;
    console.log(this.registerForm.valid);
    if (this.registerForm.valid) {
      var item = new User(this.registerForm.value);
      console.log(item);

      this.userService.Add(item).subscribe(x => {
        console.log(x);
        this.isSubmitted = false;
      }
      );
    }
  }

  // async Add(user: User) {
  //   try {
  //     const response = await fetch(`https://localhost:7089/User/Add`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-Credentials': 'true',
  //         'Access-Control-Allow-Origin': '*',
  //         'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
  //         'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Access-Control-Allow-Origin',
  //       },
  //       body: JSON.stringify({
  //         Phone: user.phone,
  //         FirstName: user.firstName,
  //         LastName: user.lastName,
  //         Login: user.login,
  //         Email: user.email,
  //         Password: user.password
  //       })
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to add user');
  //     }

  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     throw new Error('Failed to add user',error);
  //   }
  // }


} @NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ValidationMessageModule,
    ReactiveFormsModule
  ],
  exports: [RegisterComponent],
})
export class RegisterModule { }
