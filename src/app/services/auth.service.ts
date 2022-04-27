import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // isLoggedIn: boolean = false;
  // role: string = "";

  private subject = new Subject<boolean>();
  private isLoggedIn: boolean = false;

  credentials = [{
    // for librarian
    username: "JohnDoe01",
    password: "pass123",
    role: "librarian"
  }, {
    // for book reader
    username: "JaneDoe123",
    password: "pass123",
    role: "reader"
  }];

  constructor() { }

  onLoginStatusChange(): Observable<any> {
    return this.subject.asObservable();
  }

  login(username: string, password: string, role: string): void {
    let error = "";
    // let isLoggedIn = false;
    if(role === "librarian") {
      if(username === this.credentials[0].username) {
        if(password === this.credentials[0].password) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
          error = "Password incorrect!";
        }
      } else {
        this.isLoggedIn = false;
        error = "Username incorrect!";
      }
    } else {
      if(username === this.credentials[1].username) {
        if(password === this.credentials[1].password) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
          error = "Password incorrect!";
        }
      } else {
        this.isLoggedIn = false;
        error = "Username incorrect!";
      }
    }

    localStorage.setItem("isLoggedIn", this.isLoggedIn ? "true" : "false");
    localStorage.setItem("role", role);

    
    this.subject.next(this.isLoggedIn)
  }

  logout(): void {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");

    this.isLoggedIn = false;
    this.subject.next(this.isLoggedIn);
  }

}
