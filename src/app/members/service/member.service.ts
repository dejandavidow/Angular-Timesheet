import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Member } from '../model/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  constructor(private http:HttpClient,private authService:AuthService) { }
  getMemberList(){
    return this.http.get<Member[]>('https://localhost:44381/api/Members',{headers:this.authService.authHeader()})
  }
  GetMembersAsync(pageNumber:number,pageSize:number,searchTerm:string,filterLetter:string){
    if(searchTerm !== '' && filterLetter === '')
    {
      return this.http.get<Member[]>(`https://localhost:44381/api/Members/search?search=${searchTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`,{headers:this.authService.authHeader()})
    }
    else if(searchTerm ==='' && filterLetter !== ''){
      return this.http.get<Member[]>(`https://localhost:44381/api/Members/filters?pageNumber=${pageNumber}&pageSize=${pageSize}&letter=${filterLetter}`,{headers:this.authService.authHeader()})
    }
    else{
    return this.http.get<Member[]>(`https://localhost:44381/api/Members?pageNumber=${pageNumber}&pageSize=${pageSize}`,{headers:this.authService.authHeader()}
    )
  }
  }
  GetMemberCountAsync(filterLetter:string,searchTerm:string){
    if(filterLetter !== '' && searchTerm === '')
    {
      return this.http.get<number>(`https://localhost:44381/api/Members/filter-count?letter=${filterLetter}`,{headers:this.authService.authHeader()})
    }
    else
    return this.http.get<number>(`https://localhost:44381/api/Members/search-count?search=${searchTerm}`,{headers:this.authService.authHeader()})
  }
  PostMemberAsync(member:Member){
    return this.http.post('https://localhost:44381/api/Members',JSON.stringify(member),{headers:this.authService.authHeader()})
  }
  DeleteMemberAsync(id:string){
    return this.http.delete(`https://localhost:44381/api/Members/${id}`,{headers:this.authService.authHeader()})
  }
  PutMemberAsync(id:string,member:Member){
    return this.http.put(`https://localhost:44381/api/Members/${id}`,JSON.stringify(member),{headers:this.authService.authHeader()})
  }
}
