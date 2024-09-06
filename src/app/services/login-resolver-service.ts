import { Injectable } from "@angular/core";
import { NavbarService } from "./navbar.service";

@Injectable({
    providedIn:'root'
})    
export class LoginResolverService  {
        
    constructor(private navbarService: NavbarService){}

    verifyTokenExpiry() {
        let token = sessionStorage.getItem('token');            
        if(token != null && token != undefined && token != ""){
            const exp = (JSON.parse(atob(token.split(".")[1]))).exp;
            return Math.floor(new Date().getTime() / 1000) >= exp                                    
        }
        return true;        
    }

    checkTokenStatus() {
        let isTokenExpired = this.verifyTokenExpiry();
        if(isTokenExpired){
            this.navbarService.updateUserName$.next("")
            this.navbarService.updateNavBar$.next(!isTokenExpired)            
        }
      }
}