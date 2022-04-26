import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let url = state.url;

      return this.checkLogin(url);
    
    }
    
    checkLogin(url: string) {
      
      let val = localStorage.getItem("isLoggedIn");
      console.log("Url is ", url);
      if(val && val == "true") {
        if(url == "/login") {
          return this.router.parseUrl("");
        } else {
          return true;
        }
      } else {
        return this.router.parseUrl("/login");
      }
  }
  
}
