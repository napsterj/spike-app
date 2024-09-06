import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpHeaderService {

  constructor() { }

  GetRelevantHeaders(isLoginRequest:boolean) {
    var token =  sessionStorage.getItem('token') ?? ""
    return new HttpHeaders()
              .set("content-type", "application/json")
              .set("Authorization", isLoginRequest ? "" : `Bearer ${token}`); 
                  
  }
}
