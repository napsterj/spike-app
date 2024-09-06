import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarService } from '../services/navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule, RouterLink, RouterLinkActive],  
  providers:[],  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy{    
    
  isUserAuthentic:any
  username: string="Abhishek"
  navbarServiceSubscription: Subscription;
  navbarServiceUsernameSubscription: Subscription;

  constructor(private router: Router,               
              private navbarService: NavbarService){}

  ngOnDestroy(): void {
    if(this.navbarServiceSubscription){
      this.navbarServiceSubscription.unsubscribe()
    }

    if(this.navbarServiceUsernameSubscription){
      this.navbarServiceUsernameSubscription.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.navbarServiceSubscription = this.navbarService.getMySubject()
                      .subscribe((res) => {                         
                        this.isUserAuthentic = res
                    })
    
    this.navbarServiceUsernameSubscription = this.navbarService.getMyUsernameSubject()
                        .subscribe(res => this.username = res)
  }  
      
  logout() {
    sessionStorage.removeItem('token')  
    this.isUserAuthentic = false  
    return this.router.navigate(['/login'])
  }
}
