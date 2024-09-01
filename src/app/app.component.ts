import { Component, OnInit, signal } from '@angular/core';
import { UserService } from './service/user-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Srt';
  islogin= signal<boolean>(false);
   
  loginSubject$ = this.userService.loginSubject$.subscribe(x => {
    this.islogin.update(z=> x != null) ;
    console.log("loginapp", x,this.islogin);
  });
  constructor(
    private userService: UserService,
  ){
  }
  logout(){
    this.userService.logout();
  };
  OnInit(): void {
  }
}
