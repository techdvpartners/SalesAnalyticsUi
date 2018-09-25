import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService]
})

export class LoginComponent implements OnInit {
loginForm:FormGroup;
error="";
  constructor(private auth:AuthService,private router: Router ) { 
    this.loginForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
     
    });
  }

  ngOnInit() {
  }

  login() {
    
    this.error="";
    if(this.loginForm.valid){
      let username=this.loginForm.value.username;
      let password=this.loginForm.value.password;
      this.auth.login(username,password).subscribe(res=>{
        if(res){
          console.log("res",res);
          let authBase64=btoa(username + ':' + password);
          localStorage.setItem("auth",authBase64);
          window.location.href='/sales';
        }
      
      },err=>{
        this.error="Invalid user";
        console.log("err",err)
      })
    }


  }
}
