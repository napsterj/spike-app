import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { User } from '../users/users.component';
import { HttpHeaderService } from './http-header.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = "http://localhost:5188/api/Account"
  users: User[] = []
  
  constructor(private http: HttpClient,
    private httpHeaders: HttpHeaderService
  ) { }


  showCurrentUsers(): Observable<User[]> {
    
    let headersToAdd = this.httpHeaders.GetRelevantHeaders(false)
    
    return this.http.get<User[]>(this.baseUrl + '/get/users', { headers: headersToAdd })
                    .pipe(
                      retry(2)
                    );
  }
}
