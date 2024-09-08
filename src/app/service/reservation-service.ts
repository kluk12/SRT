import { Injectable } from '@angular/core';
import { GenericResponse } from '../models/GenericResponse';
import { HttpClient ,HttpClientModule} from '@angular/common/http';
import { Reservation, User } from '../models/models.dto';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../environment';
import { co } from '@fullcalendar/core/internal-common';
const baseUrl = `${environment.apiUrl}/Reservation`;
@Injectable({
  providedIn: 'root'

})
export class ReservationService {

  constructor(private http: HttpClient) { }

  Find(trainingId: number) {
    return this.http.post<GenericResponse<Reservation[]>>(
        `${baseUrl}/Edit`,
        {
          TrainingId:trainingId,
         
        });
  }
  Edit(id: number, Remove: boolean) {
    return this.http.post<GenericResponse<Reservation>>(
        `${baseUrl}/Edit`,
        {
          Id: id,
          Remove: Remove,
         
        });
  }

  Add( name: string, email: string, userId: number, type: number, trainingId: number, locationId: number) {
    console.log("Add", name, email, userId, type, trainingId, locationId);
    return this.http.post<GenericResponse<boolean>>(
        `${baseUrl}/Add`,
        {
          Name: name,
          Email: email,
          UserId: userId,
          Type: type,
          TrainingId: trainingId,
          LocationId:locationId,
        });
  }
  IsReserved( userId: number, type: number, trainingId: number, locationId: number ) {
    return this.http.post<GenericResponse<number>>(
        `${baseUrl}/IsReserved`,
        {
          UserId: userId,
          Type: type,
          TrainingId: trainingId,
          LocationId: locationId,
        });
  }
  
  IsPaid(trainingId: number, paid: boolean) {
    return this.http.post<GenericResponse<Reservation[]>>(
        `${baseUrl}/IsPaid`,
        {
          Paid: paid,
          TrainingId: trainingId,
        });
  }
  
  unReservation(id: number) {
    return this.http.post<GenericResponse<boolean>>(
        `${baseUrl}/UnReservation`,
        {
          Id: id,
        });
  }
  
}