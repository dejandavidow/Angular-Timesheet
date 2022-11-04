import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../model/login';
import { SuccessLogin } from '../model/SuccessLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }
  login(credentials:Login){
    return this.http.post<SuccessLogin>('https://localhost:44381/api/Members/login',JSON.stringify(credentials),{headers:{'Content-Type':'application/json'}})
  }
  logout(){
    return localStorage.removeItem('user')
  }
   authHeader() {
    let user = JSON.parse(localStorage.getItem('user') || "")
    const token = user.accessToken
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers
  };
  forgotPassword(email:string){
    return this.http.post('https://localhost:44381/api/Members/forgot-password',JSON.stringify(email),{headers:{'Content-Type':'application/json'}})
  }
  resetPassword(password:string,confirmpassword:string,token:string){
    return this.http.post(`https://localhost:44381/api/Members/reset-password?token=${token}`,JSON.stringify({password,confirmpassword}),{headers:{'Content-Type':'application/json'}})
  }
}
