import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

interface Login {
    email:"",
    password:""
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule, JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm:any
  emailRegex=/^[a-zA-Z0-9,_%+-]+@[a-zA-Z0-9,-]+\.[a-zA-Z]{2,4}$/

  loginModel:Login ={
    email:"",
    password:""
  }

  validateEmailFormat() {
    return this.emailRegex.test(this.loginModel.email)
  }

  login(formData:NgForm){
     console.log(this.loginModel)
     console.log(formData)    
  }
  
    

  
  


}
