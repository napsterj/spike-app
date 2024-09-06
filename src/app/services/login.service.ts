import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../login/login.component';
import { map, retry } from 'rxjs';
import { ILoginResponse } from '../models/login-response';
import { HttpHeaderService } from './http-header.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl: string = "http://localhost:5188/api"

  constructor(private http: HttpClient, private headerProvider: HttpHeaderService) { }

  loginUser(login: LoginDto): any {
    var headersObj = this.headerProvider.GetRelevantHeaders(true);

    return this.http.post<ILoginResponse>(this.baseUrl + '/account/login', login,
      { headers: headersObj })
      .pipe(
        retry(2), //Retrying 2 attempts, in case if API is down or some delay in hitting the endpoint
        map((data) => {
          if (data != undefined && data.jwtToken != "") {
            sessionStorage.setItem('token', data.jwtToken)
            return data
          }
          return data
        })
      );
  }




}
