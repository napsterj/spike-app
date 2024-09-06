import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpHeaderService } from '../services/http-header.service';
import { HttpClientModule, HttpStatusCode } from '@angular/common/http';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

export interface RegisterDTO {
  FirstName: "",
  MiddleName: "",
  LastName: "",
  Email: ""
}

export interface RegistrationResponse {
  statusCode: HttpStatusCode,
  statusMessage: string,
  userId: string,
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, JsonPipe, NgxSpinnerModule],
  providers: [FormBuilder, HttpClientModule, {
    provide: HttpHeaderService,
    useClass: HttpHeaderService,
    multi: true
  }],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {
  user: any
  Error: string = "";
  loadSpinner: boolean = false
  signUpForm: any
  emailRegex = /^[a-zA-Z0-9,_%+-]+@[a-zA-Z0-9,-]+\.[a-zA-Z]{2,4}$/
  resgisterServiceSubscription: Subscription;

  constructor(private fb: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
    private spinnerService: NgxSpinnerService) { }

  ngOnDestroy(): void {
    if(this.resgisterServiceSubscription){
        this.resgisterServiceSubscription.unsubscribe()
    }
  }

  ngOnInit(): void {
    
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      middleName: [''],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
    })

  }

  getFormControls() {
    return this.signUpForm.controls;
  }

  createNewUser() {
    var controls = this.getFormControls();

    this.user = {
      firstName: controls.firstName.value,
      middleName: controls.middleName.value,
      lastName: controls.lastName.value,
      email: controls.email.value
    };
    
    this.spinnerService.show()
    
    this.resgisterServiceSubscription = this.registerService.createNewUser(this.user)
      .subscribe(response => {        
        if (response.statusCode === HttpStatusCode.Ok &&
          response.userId !== "") {
          this.router.navigate(['show/users'])
        } else if (response.statusCode === HttpStatusCode.BadRequest) {
          this.Error = response.statusMessage
        }        
    })
    
    this.spinnerService.hide()
  }

  validateEmailFormat() {
    return this.emailRegex.test(this.signUpForm.get('email')?.value)
  }

}
