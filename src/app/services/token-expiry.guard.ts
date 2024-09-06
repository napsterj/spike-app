import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResolverService } from './login-resolver-service';
import { NavbarService } from './navbar.service';

export const tokenExpiryGuard = () => {

  const tokenService = inject(LoginResolverService);
  const router = inject(Router)
  const navbarService = inject(NavbarService);
  let username:string;
  let isTokenExpired = tokenService.verifyTokenExpiry()
  

  let isUserAuthentic = isTokenExpired ? false : true
  
  if(!isUserAuthentic) {    
    navbarService.updateNavbar(!isUserAuthentic);      
    router.navigate(['/login'])    
    return false
  }        
  
  username = sessionStorage.getItem('username')!
  navbarService.updateUserName(username);
  navbarService.updateNavbar(isUserAuthentic)
  return true;
  
};
