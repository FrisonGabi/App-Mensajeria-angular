import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = "http://localhost:3000/login"
  constructor(
    private http: HttpClient,
    private jwtHelper:JwtHelperService
    ) { }

  loginService(loginForm:any){
    return this.http.post(this.url,loginForm);
  }

  loggedIn():boolean{
    const token:any = localStorage.getItem("token");
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem("token")){
      return false;
    }
    return true;
  }

}
