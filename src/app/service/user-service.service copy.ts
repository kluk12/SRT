import { Injectable } from '@angular/core';
import { GenericResponse } from '../models/GenericResponse';
import { HttpClient ,HttpClientModule} from '@angular/common/http';

import { User } from '../models/user.dto';
import { environment } from '../../environment';
const baseUrl = `${environment.apiUrl}/User`;
@Injectable({
  providedIn: 'root'

})
export class UserService2 {
  constructor(private http: HttpClient,
  ) { }

  Edit(user:User){
    return this.http.post<GenericResponse<User>>(
        `${baseUrl}/Edit`,
        {
          Phone: user.phone,
          FirstName: user.firstName,
          LastName: user.lastName,
          Login: user.login,
          Password: user.password,
         
        });
  }

  Add(user:User){
    return this.http.post<GenericResponse<User>>(
        `${baseUrl}/Add`,
        {
          FirstName: user.firstName,
          LastName: user.lastName,
          Login: user.login,
          Password: user.password,
         
        },{withCredentials:false});
  }

  getValue(key: string){
    return this.http.post<GenericResponse<User>>(
        `${baseUrl}/GetValue`,
        {
          Key: key
        });
  }
}