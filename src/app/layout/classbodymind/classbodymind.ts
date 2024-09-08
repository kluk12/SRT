import { TrainingGeneratorDialogComponent } from './../training-generator/training-generator.component';
import { Component, computed, NgModule, signal } from '@angular/core';
import { ValidationMessageModule } from '../validation-message/validation-message.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation, Training, User } from '../../models/models.dto';
import { ReservationService } from '../../service/reservation-service';
import { TreningService } from '../../service/TreningService';

@Component({
  selector: 'app-class-body-mind',
  templateUrl: './classbodymind.html',
  styleUrl: './classbodymind.scss'
})
export class ClassBodyMindComponent {
  type:number = 2;
  reservationForm: FormGroup;
  id= signal<number|null>(null);
  training: Training | null = null;
  islogin= signal<boolean>(false);
  isSubmitted: boolean = false;
  user: User | null = null;
  loginSubject$ = this.userService.loginSubject$.subscribe(x => {
    this.islogin.update(z=> x != null) ;
    console.log("ClassBodyMindloginSubject$", x,this.islogin());
  });
  isReservede= computed( () => { console.log("isReservede",this.id(),this.id()!=null);
    return this.id()!=null  });
  constructor(
    private treningService: TreningService,
    private userService: UserService,
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    const id = this.route.snapshot.queryParams['id'];
    if (id) {
      this.id.set(Number(id));
    }
    console.log("isReservede",this.route.snapshot.queryParams['id'],this.id(),this.isReservede());
    if (this.userService.isLogged()) {
      this.user = this.userService.getToken();
     
    }
  }

  ngOnInit(): void {
    this.InitForm();
    this.getTrening();
  }

  InitForm() {

    this.reservationForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],

    });
    console.log("user", this.userService.isLogged());
    if (this.userService.isLogged()) {
      const user = this.userService.getToken()
      console.log("user", user);
      if (user)
        this.reservationForm.patchValue({
          name: user.name,
          email: user.email,
        });
    }
  }

  Submit(event: SubmitEvent) {
    this.isSubmitted = true;
    console.log(this.reservationForm.valid, this.reservationForm.getRawValue());
    if (this.reservationForm.valid && this.id()) {
      this.reservationService.Add( 
        this.reservationForm.get('name').value,
        this.reservationForm.get('email').value,
        this.userService.getToken()?.id,
        this.type,
        this.id().valueOf(),
        this.training.locationId
      ).subscribe(x => {
        if (x.data) {
          const token = this.userService.getToken()
        }
      });
    }
  }
  getTrening() {
    if (this.id())
      this.treningService.get(this.id()).subscribe(x => {
        if (x.data) {
          this.training = x.data;
          console.log("get", x.data);
        }
      });
  }
  IsReserved() {
    var item = new Reservation(this.reservationForm.getRawValue());
    this.reservationService.IsReserved(this.user?.id, this.type, this.id().valueOf(), this.training?.locationId ).subscribe(x => {
      if (x.data) {
        console.log("IsReserved", x.data);
      }
    });
  }
  IsPaid() {
    this.reservationService.IsPaid(this.id(), true).subscribe(x => {
      if (x.data) {
        console.log("IsPaid", x.data);
      }
    });
  }

}
@NgModule({
  declarations: [
    ClassBodyMindComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ValidationMessageModule,
  ],
  providers: []
})
export class ClassBodyMindModule { }
