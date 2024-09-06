import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { ILoginResponse } from '../models/login-response';
import { Router } from '@angular/router';
import { HttpHeaderService } from '../services/http-header.service';
import { NavbarService } from '../services/navbar.service';
import { LoginResolverService } from '../services/login-resolver-service';
import { Subscription } from 'rxjs';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';


export interface LoginDto {
  Email: '';
  Password: '';
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, JsonPipe, HttpClientModule, NgxSpinnerModule],
  providers: [
    {
      provide: HttpHeaderService,
      useClass: HttpHeaderService,
      multi: true,
    },
  ],  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: any;
  loginServiceSubscription: Subscription;
  emailRegex = /^[a-zA-Z0-9,_%+-]+@[a-zA-Z0-9,-]+\.[a-zA-Z]{2,4}$/;
  loginError: string = '';
  loadSpinner: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private loginResolver: LoginResolverService,
    private navbarService: NavbarService,
    private ngxSpinner: NgxSpinnerService
  ) {}

  ngOnDestroy(): void {
    if(this.loginServiceSubscription){
      this.loginServiceSubscription.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.loginResolver.checkTokenStatus();
  }

  loginModel: LoginDto = {
    Email: '',
    Password: '',
  };

  validateEmailFormat() {
    if (this.loginModel.Email == undefined || this.loginModel.Email == '')
      return true;
    return this.emailRegex.test(this.loginModel.Email);
  }

  login() {        
    this.loadSpinner= true
    this.ngxSpinner.show();   
    this.loginServiceSubscription = this.loginService
      .loginUser(this.loginModel)
      .subscribe(
        (loginResponse: ILoginResponse) => {
          if (loginResponse !== undefined && loginResponse.jwtToken != '') {
            this.loadSpinner = false
            this.ngxSpinner.hide()
            sessionStorage.setItem('username', this.loginModel.Email);
            this.navbarService.updateUserName(this.loginModel.Email);
            this.router.navigate(['/home']);
            return;
          }
          this.loginError = loginResponse.statusMessage;
        },
        (error: any) => { 
           this.ngxSpinner.hide(); 
           console.log(error)
        }
      );
  }
}
