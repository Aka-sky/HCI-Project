import { Component, OnInit } from '@angular/core';
import { UiService } from "../../services/ui.service";
import { AuthService } from "../../services/auth.service";
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // showAddBook!: boolean;
  // subcription!: Subscription;
  isLoggedIn!: boolean;
  role!: string;
  navClass: string = "";
  currentURL: string = "";

  constructor(private uiService: UiService, private authService: AuthService, private router: Router) { 
    // this.subcription =
    let val = localStorage.getItem("isLoggedIn");
    if(val) {
      this.isLoggedIn = localStorage.getItem("isLoggedIn") == "true" ? true : false;
      if(this.isLoggedIn) {
        this.role = localStorage.getItem("role") + "";
      }
    }

    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
          // Show progress spinner or progress bar
          // console.log('Route change detected');
          this.currentURL = event.url;
      }
    });

    this.authService.onLoginStatusChange().subscribe(value => {
      if(value) {
        // Means user is logged IN
        this.isLoggedIn = true;
        this.role = localStorage.getItem("role") + "";
      } else {
        this.isLoggedIn = false;
        this.role = "";
      }
    })
  }

  ngOnInit(): void {
    // this.isLoggedIn = localStorage.getItem("isLoggedIn") == "true" ? true : false;
    // if(this.isLoggedIn) {
    //   let str: string = "";
    //   this.role = (localStorage.getItem("role") ? (str + localStorage.getItem("role")) : "");
    // }
  }

  showAddBook(): void {
    this.uiService.setShowAddBook(true);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["login"]);
    // this.role = "";
    // this.isLoggedIn = false;
  }

  closeClick() {
    this.navClass = "";
  }

  menuClick() {
    this.navClass = "open-nav";
  }
}
