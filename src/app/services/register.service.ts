import { Injectable } from '@angular/core';
import { HttpHeaderService } from './http-header.service';
import { RegisterDTO, RegistrationResponse } from '../register/register.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl: string = "http://localhost:5188/api/account"

  constructor(private http: HttpClient,
    private headerProvider: HttpHeaderService) { }

  createNewUser(newUser: RegisterDTO): Observable<RegistrationResponse> {
    var partEndpoint = "/register/new-user"

    var headersObj = this.headerProvider.GetRelevantHeaders(false);

    return this.http.post<RegistrationResponse>(`${this.baseUrl}${partEndpoint}`, newUser, { headers: headersObj });
  }
}
