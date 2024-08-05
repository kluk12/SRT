import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { UserService } from './service/user-service.service';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './layout/login-dialog/login-dialog.component';
import { UserReservationModule } from './layout/user-reservation/user-reservation.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    UserReservationModule,
    FormsModule,
    DynamicDialogModule
  ],
  providers: [UserService,
    DialogService,
    
    provideHttpClient(withFetch())

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
