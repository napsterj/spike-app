import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NavbarService {  
  updateNavBar$ = new BehaviorSubject<boolean>(false)
  updateUserName$ = new BehaviorSubject<string>("")

  getMySubject() : Observable<boolean> {
    return this.updateNavBar$.asObservable()
  }

  getMyUsernameSubject(): Observable<string> {
    return this.updateUserName$.asObservable()
  }

  updateNavbar(isUserAuthentic: boolean) {        
    this.updateNavBar$.next(isUserAuthentic)    
    
  }  

  updateUserName(username:string){    
    this.updateUserName$.next(username);
  }
}
