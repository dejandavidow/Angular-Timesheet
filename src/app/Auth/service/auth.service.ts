import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../model/login';
import { SuccessLogin } from '../model/SuccessLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }
  login(credentials:Login){
    return this.http.post<SuccessLogin>('https://localhost:44381/api/Member/login',JSON.stringify(credentials),{headers:{'Content-Type':'application/json'}})
  }
  logout(){
    return localStorage.removeItem('user')
  }
}
