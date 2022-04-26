import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;
  role: string="";
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router, private alertService: AlertService) {
    this.authService.onLoginStatusChange().subscribe(value => this.isLoggedIn = value);
  }
  
  ngOnInit(): void {
    if(this.isLoggedIn) {
      this.router.navigate([""]);
    }
  }

  onSubmit() {
    // console.log(this.username, this.password, this.role)
    let value = this.authService.login(this.username, this.password, this.role);
    // if(value.isLoggedIn) {
    //   this.router.navigate([""]);
    // } else {
    //   this.alertService.error(value.error);
    // }
    if(this.isLoggedIn) {
      this.router.navigate([""]);
    } else {
      this.alertService.error("Invalid credentials");
    }

  }

}
