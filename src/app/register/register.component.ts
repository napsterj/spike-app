import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,  
  imports: [CommonModule, ReactiveFormsModule, JsonPipe],
  providers:[FormBuilder],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
 
  signUpForm:any
  
  constructor(private fb:FormBuilder){ }

  ngOnInit(): void {
      this.signUpForm = this.fb.group({
        firstName:['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],        
        middleName:[''],
        lastName : ['',Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
        email: ['', Validators.compose([Validators.required,Validators.email])]
      })
  }

  createNewUser() {
    console.log(this.signUpForm)    
  }


}
