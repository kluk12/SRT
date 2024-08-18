import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators ,ReactiveFormsModule} from '@angular/forms';
import { Logins, User } from '../../models/models.dto';
import { UserService } from '../../service/user-service.service'; 
import { CommonModule } from '@angular/common';
import { ValidationMessageComponent, ValidationMessageModule } from '../validation-message/validation-message.component';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.scss'
})
export class RegisterDialogComponent {
  registerForm: FormGroup= new FormGroup({});
  islogin: boolean = false;
  isSubmitted: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,

  ) {
  }
  ngOnInit(): void {
    this.InitRegForm();
  }
  InitRegForm() {
    this.registerForm = this.formBuilder.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required]
    });
  }
 
    regSubmit() {
       this.isSubmitted= true;
      console.log(this.registerForm.valid);
    if (this.registerForm.valid) {
      var item = new User(this.registerForm.getRawValue());
      console.log(item);

// later
       this.userService.Add(item).subscribe(x=>{
        console.log(x);
        this.isSubmitted= false;
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


}@NgModule({
  declarations: [
    RegisterDialogComponent
  ],
  imports: [
    CommonModule,
    ValidationMessageModule,
    ReactiveFormsModule
  ],
  exports: [RegisterDialogComponent],
})
export class LoginModule { }
