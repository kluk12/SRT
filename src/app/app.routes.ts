import { TrainingGeneratorComponent } from './layout/training-generator/training-generator.component';
import { LoginComponent } from './layout/login-dialog/login-dialog.component';
import { AdminReservationComponent } from './layout/admin-reservation/admin-reservation.component';
import { RegisterDialogComponent } from './layout/register-dialog/register-dialog.component';
import { UserReservationComponent } from './layout/user-reservation/user-reservation.component';
import { BmiCalculatorComponent } from './layout/bmi-calculator/bmi-calculator.component';
import { AboutComponent } from './layout/about/about.component';
import { HomeComponent } from './layout/home/home.component';
import { TeamComponent } from './layout/team/team.component';

import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'Register', component: RegisterDialogComponent }, 
    { path: 'Login', component: LoginComponent }, 
    { path: 'ReservationAdmin', component: AdminReservationComponent }, 
    { path: 'Reservation', component:UserReservationComponent }, 
    { path: 'Generator', component:TrainingGeneratorComponent }, 
    { path: 'About', component:AboutComponent }, 
    { path: 'BmiCalculator', component:BmiCalculatorComponent }, 
    { path: 'Home', component:HomeComponent }, 
     { path: 'Team', component:TeamComponent }, 
    // { path: 'Generator', component:TrainingGeneratorComponent }, 
    // { path: 'Generator', component:TrainingGeneratorComponent }, 
    // { path: 'Generator', component:TrainingGeneratorComponent }, 
    // { path: 'Generator', component:TrainingGeneratorComponent }, 
    // { path: 'Generator', component:TrainingGeneratorComponent }, 
    // { path: 'Generator', component:TrainingGeneratorComponent }, 
    // { path: 'Generator', component:TrainingGeneratorComponent }, 
    // { path: 'Generator', component:TrainingGeneratorComponent }, 
    // { path: 'Generator', component:TrainingGeneratorComponent }, 
    // { path: 'Generator', component:TrainingGeneratorComponent }, 
    // { path: 'Generator', component:TrainingGeneratorComponent }, 
];
