import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }
  GetClientsAsync(pageNumber:number,pageSize:number,searchTerm:string,filterLetter:string){
    if(searchTerm !== '' && filterLetter === '')
    {
      return this.http.get<Client[]>(`https://localhost:44381/api/Client/search/${searchTerm}?pageNumber=${pageNumber}&pageSize=${pageSize}`,{headers:{'Content-Type':'application/json'}})
    }
    else if(searchTerm ==='' && filterLetter !== ''){
      return this.http.get<Client[]>(`https://localhost:44381/api/Client/filter?pageNumber=${pageNumber}&pageSize=${pageSize}&letter=${filterLetter}`,{headers:{'Content-Type':'application/json'}})
    }
    else
    return this.http.get<Client[]>(`https://localhost:44381/api/Client?pageNumber=${pageNumber}&pageSize=${pageSize}`,{headers:{'Content-Type':'application/json'}})
  }
  GetClientCountAsync(filterLetter:string,searchTerm:string){
    if(filterLetter !== '' && searchTerm === '')
    {
      return this.http.get<number>(`https://localhost:44381/api/Client/filter/count?letter=${filterLetter}`,{headers:{'Content-Type':'application/json'}})
    }
    else
    return this.http.get<number>(`https://localhost:44381/api/Client/count?search=${searchTerm}`,{headers:{'Content-Type':'application/json'}})
  }
  PostClientAsync(client:Client){
    return this.http.post('https://localhost:44381/api/Client',JSON.stringify(client),{headers:{'Content-Type':'application/json'}})
  }
  DeleteClientAsync(id:string){
    return this.http.delete(`https://localhost:44381/api/Client/${id}`,{headers:{'Content-Type':'application/json'}})
  }
  PutClientAsync(id:string,client:Client){
    return this.http.put(`https://localhost:44381/api/Client/${id}`,JSON.stringify(client),{headers:{'Content-Type':'application/json'}})
  }
  getClientList(){
    return this.http.get<Client[]>('https://localhost:44381/api/Client')
  }
}
