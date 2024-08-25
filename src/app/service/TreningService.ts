import { Injectable } from '@angular/core';
import { GenericResponse } from '../models/GenericResponse';
import { HttpClient ,HttpClientModule} from '@angular/common/http';

import { environment } from '../../environment';
import { TrainingWeek, Trening } from '../models/models.dto';
const baseUrl = `${environment.apiUrl}/Training`;
@Injectable({
  providedIn: 'root'

})
export class TreningService {
  constructor(private http: HttpClient,
  ) { }

  Edit(trening:Trening){
    return this.http.post<GenericResponse<Trening>>(
        `${baseUrl}/Edit`,
        {
          Price: trening.price,
          DateTo: trening.dateTo,
          DateFrom: trening.dateFrom,
          NumberPeople: trening.numberPeople,
          LocationId: trening.locationId,
          Type: trening.typeId,
          AdditionalInformation: trening.textAddition,
        });
 
  }

  Add(trening:Trening){
    return this.http.post<GenericResponse<Trening>>(
        `${baseUrl}/Add`,
        {
          Price: trening.price,
          DateTo: trening.dateTo,
          DateFrom: trening.dateFrom,
          NumberPeople: trening.numberPeople,
          LocationId: trening.locationId,
          Type: trening.typeId,
          AdditionalInformation: trening.textAddition,
        });
  }

  get(id: number){
    return this.http.post<GenericResponse<Trening>>(
        `${baseUrl}/Get`,
        {
          Id: id
        });
  }
  delete(id: number){
    return this.http.post<GenericResponse<Trening>>(
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