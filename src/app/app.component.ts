import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Srt';
  islogin: boolean = false;
  loginSubject$ = this.userService.loginSubject$.subscribe(x => {
    this.islogin = x != null;
  });
  constructor(
    private userService: UserService,
  ){
  }

  OnInit(): void {
  }
}
