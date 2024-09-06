import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  baseUrl:string = "http://localhost:5000"
  
  constructor(private http: HttpClient) { }

  registerNewUser()
}
