import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../model/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http:HttpClient) { }
  getMemberList(){
    return this.http.get<Member[]>('https://localhost:44381/api/Member')
  }
  GetMembersAsync(pageNumber:number,pageSize:number,searchTerm:string,filterLetter:string){
    if(searchTerm !== '' && filterLetter === '')
    {
      return this.http.get<Member[]>(`https://localhost:44381/api/Member/search?search=${searchTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`,{headers:{'Content-Type':'application/json'}})
    }
    else if(searchTerm ==='' && filterLetter !== ''){
      return this.http.get<Member[]>(`https://localhost:44381/api/Member/filter?pageNumber=${pageNumber}&pageSize=${pageSize}&letter=${filterLetter}`,{headers:{'Content-Type':'application/json'}})
    }
    else
    return this.http.get<Member[]>(`https://localhost:44381/api/Member?pageNumber=${pageNumber}&pageSize=${pageSize}`,{headers:{'Content-Type':'application/json'}})
  }
  GetMemberCountAsync(filterLetter:string,searchTerm:string){
    if(filterLetter !== '' && searchTerm === '')
    {
      return this.http.get<number>(`https://localhost:44381/api/Member/filter-count?letter=${filterLetter}`,{headers:{'Content-Type':'application/json'}})
    }
    else
    return this.http.get<number>(`https://localhost:44381/api/Member/search-count?search=${searchTerm}`,{headers:{'Content-Type':'application/json'}})
  }
  PostMemberAsync(member:Member){
    return this.http.post('https://localhost:44381/api/Member',JSON.stringify(member),{headers:{'Content-Type':'application/json'}})
  }
  DeleteMemberAsync(id:string){
    return this.http.delete(`https://localhost:44381/api/Member/${id}`,{headers:{'Content-Type':'application/json'}})
  }
  PutMemberAsync(id:string,member:Member){
    return this.http.put(`https://localhost:44381/api/Member/${id}`,JSON.stringify(member),{headers:{'Content-Type':'application/json'}})
  }
}
