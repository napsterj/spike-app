import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpHeaderService } from '../services/http-header.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';


export interface User {
  fullName: string,
  email: string
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,HttpClientModule,NgxSpinnerModule],
  providers: [UserService, HttpHeaderService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export class UsersComponent implements OnInit, OnDestroy {
  loadSpinner: boolean = false
  registeredUsers: User[] = []
  userServiceSubscription: Subscription;

  constructor(private router: Router,
              private spinner: NgxSpinnerService,
              private userService: UserService) { }

  ngOnDestroy(): void {
    if(this.userServiceSubscription) {
      this.userServiceSubscription.unsubscribe()
    }
  }

  ngOnInit(): void {    
    this.showUsers()
  }

  showUsers() {
    this.loadSpinner = true
    this.spinner.show()
    this.userServiceSubscription = this.userService.showCurrentUsers()
                .subscribe(
                          (result: User[]) => {
                            this.registeredUsers = result
                          },
                (error) => {
                    console.log(error)
                    this.loadSpinner = false
                    this.spinner.hide()
                });
                this.loadSpinner = false
  }

  RedirectToRegistration() {
    return this.router.navigate(['/register'])
  }
}
