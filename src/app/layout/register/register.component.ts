import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Logins, User } from '../../models/models.dto';
import { UserService } from '../../service/user-service';
import { CommonModule } from '@angular/common';
import { ValidationMessageComponent, ValidationMessageModule } from '../validation-message/validation-message.component';
import { Router } from '@angular/router';

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
    private routes: Router,

  ) {
  }
  get f() { return this.registerForm.controls; }
  ngOnInit(): void {
    this.InitForm();
  }
  InitForm() {
    this.registerForm = this.formBuilder.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null,[Validators.required, Validators.email]],
    });
  }

  Submit() {
    this.isSubmitted = true;
    console.log(this.registerForm.valid,this.registerForm.validator);
    if (this.registerForm.valid) {
      var item = new User(this.registerForm.getRawValue());
      console.log(item);

      this.userService.Add(item).subscribe(x => {
        console.log(x);
        this.isSubmitted = false;
        this.routes.navigate(['/Login']);
      }
      );
    }
  }

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
