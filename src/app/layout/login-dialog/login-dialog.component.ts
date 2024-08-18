import { Component, NgModule } from '@angular/core';
import { Logins, User } from '../../models/models.dto';
import { UserService } from '../../service/user-service.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  islogin: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
   
  }
  ngOnInit(): void {
    this.InitLogForm();
  }

  InitLogForm() {

    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

   logSubmit(event:SubmitEvent) {
    if (this.loginForm.valid) {
      var item = new Logins(this.loginForm.getRawValue());
      console.log(item);
      this.userService.login(item.login,item.password).subscribe(x=>{console.log(x)}
    );
    }
  }

}

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
})
export class LoginModule { }