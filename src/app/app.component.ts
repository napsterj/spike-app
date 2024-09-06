import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { HttpHeaderService } from './services/http-header.service';


@Component({
  selector: 'app-root',
  standalone: true,  
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  providers:[{
    provide: HttpHeaderService,
    useClass: HttpHeaderService,
    multi:true
  }],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spike-app';      
  isUserAuthentic: any
  
  


}

