import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginResolverService } from '../services/login-resolver-service';
import { NavbarService } from '../services/navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  useremail: string = ""

  navbarServiceSubscription: Subscription;

  constructor(private navbarService: NavbarService) { }

  ngOnDestroy(): void {
    if(this.navbarServiceSubscription) {
      this.navbarServiceSubscription.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.navbarServiceSubscription = this.navbarService
      .getMyUsernameSubject()
      .subscribe(res => this.useremail = res)
  }

}
