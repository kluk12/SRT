import { Injectable } from '@angular/core';
import { GenericResponse } from '../models/GenericResponse';
import { HttpClient ,HttpClientModule} from '@angular/common/http';

import { environment } from '../../environment';
import { TrainingWeek, Training, HourlyActivities } from '../models/models.dto';
const baseUrl = `${environment.apiUrl}/Training`;
@Injectable({
  providedIn: 'root'

})
export class TreningService {
  constructor(private http: HttpClient,
  ) { }

  Edit(trening:Training){
    return this.http.post<GenericResponse<Training>>(
        `${baseUrl}/Edit`,
        {
          Price: trening.price,
          DateTo: trening.dateTo,
          DateFrom: trening.dateFrom,
          NumberPeople: trening.numberPeople,
          LocationId: trening.locationId,
          Type: trening.type,
          AdditionalInformation: trening.textAddition,
        });
 
  }

  Add(trening:Training){
    return this.http.post<GenericResponse<Training>>(
        `${baseUrl}/Add`,
        {
          Price: trening.price,
          DateTo: trening.dateTo,
          DateFrom: trening.dateFrom,
          NumberPeople: trening.numberPeople,
          LocationId: trening.locationId,
          Type: trening.type,
          AdditionalInformation: trening.textAddition,
        });
  }

  get(id: string){
    return this.http.post<GenericResponse<Training>>(
        `${baseUrl}/Get`,
        {
          Id: id
        });
  }
  delete(id: string){
    return this.http.post<GenericResponse<Training>>(
        `${baseUrl}/delete`,
        {
          Id: id
        });
  }
  find(){
    return this.http.post<GenericResponse<TrainingWeek>>(
        `${baseUrl}/Find`,
        {
        });
  }
}