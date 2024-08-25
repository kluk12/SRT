import { Component, NgModule } from '@angular/core';
import { Logins, User } from '../../models/models.dto';
import { UserService } from '../../service/user-service.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationMessageModule } from '../validation-message/validation-message.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'

})
export class LoginComponent {
  loginForm: FormGroup;
  islogin: boolean = false;
  isSubmitted: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
  ) {

  }
  ngOnInit(): void {
    this.InitLogForm();
  }

  InitLogForm() {

    this.loginForm = this.formBuilder.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
  transformToJson(data: any): string {
    return JSON.stringify(data, null, 2);
  }
  logSubmit(event: SubmitEvent) {
    this.isSubmitted = true;
    console.log(this.loginForm.valid, this.loginForm.getRawValue(),this.userService.isLogged() , this.userService.getToken());
    if (this.loginForm.valid) {
      var item = new Logins(this.loginForm.getRawValue());
      console.log(item);
      this.userService.login(item.login, item.password).subscribe(x => {

        //localStorage.setItem('token',this.transformToJson(x.data));
        sessionStorage.setItem('token', this.transformToJson(x.data));
        console.log(x)
        this.isSubmitted = false;
      }
      );
    } else {
      sessionStorage.setItem('token', null);
    }
  }
}
  @NgModule({
    declarations: [
      LoginComponent
    ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      ValidationMessageModule,
    ],
    providers: []
  })
  export class LoginModule { }