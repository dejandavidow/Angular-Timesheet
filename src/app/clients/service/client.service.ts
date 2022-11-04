import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient,private authService:AuthService) { }
  GetClientsAsync(pageNumber:number,pageSize:number,searchTerm:string,filterLetter:string){
    if(searchTerm !== '' && filterLetter === '')
    {
      return this.http.get<Client[]>(`https://localhost:44381/api/Client/search/${searchTerm}?pageNumber=${pageNumber}&pageSize=${pageSize}`,{headers:this.authService.authHeader()})
    }
    else if(searchTerm ==='' && filterLetter !== ''){
      return this.http.get<Client[]>(`https://localhost:44381/api/Client/filter?pageNumber=${pageNumber}&pageSize=${pageSize}&letter=${filterLetter}`,{headers:this.authService.authHeader()})
    }
    else
    return this.http.get<Client[]>(`https://localhost:44381/api/Client?pageNumber=${pageNumber}&pageSize=${pageSize}`,{headers:this.authService.authHeader()})
  }
  GetClientCountAsync(filterLetter:string,searchTerm:string){
    if(filterLetter !== '' && searchTerm === '')
    {
      return this.http.get<number>(`https://localhost:44381/api/Client/filter/count?letter=${filterLetter}`,{headers:this.authService.authHeader()})
    }
    else
    return this.http.get<number>(`https://localhost:44381/api/Client/count?search=${searchTerm}`,{headers:this.authService.authHeader()})
  }
  PostClientAsync(client:Client){
    return this.http.post('https://localhost:44381/api/Client',JSON.stringify(client),{headers:this.authService.authHeader()})
  }
  DeleteClientAsync(id:string){
    return this.http.delete(`https://localhost:44381/api/Client/${id}`,{headers:this.authService.authHeader()})
  }
  PutClientAsync(id:string,client:Client){
    return this.http.put(`https://localhost:44381/api/Client/${id}`,JSON.stringify(client),{headers:this.authService.authHeader()})
  }
  getClientList(){
    return this.http.get<Client[]>('https://localhost:44381/api/Client',{headers:this.authService.authHeader()})
  }
}
