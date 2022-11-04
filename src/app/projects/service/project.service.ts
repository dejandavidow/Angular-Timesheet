import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { PostProject } from '../model/post-project';
import { Project } from '../model/project';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient,private authService:AuthService) { }
  GetProjectsAsync(pageNumber:number,pageSize:number,searchTerm:string,filterLetter:string){
    if(searchTerm !== '' && filterLetter === '')
    {
      return this.http.get<Project[]>(`https://localhost:44381/api/Projects/search?search=${searchTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`,{headers:this.authService.authHeader()})
    }
    else if(searchTerm ==='' && filterLetter !== ''){
      return this.http.get<Project[]>(`https://localhost:44381/api/Projects/filters?pageNumber=${pageNumber}&pageSize=${pageSize}&letter=${filterLetter}`,{headers:this.authService.authHeader()})
    }
    else
    return this.http.get<Project[]>(`https://localhost:44381/api/Projects?pageNumber=${pageNumber}&pageSize=${pageSize}`,{headers:this.authService.authHeader()})
  }
  GetProjectCountAsync(filterLetter:string,searchTerm:string){
    if(filterLetter !== '' && searchTerm === '')
    {
      return this.http.get<number>(`https://localhost:44381/api/Projects/filter-count?letter=${filterLetter}`,{headers:this.authService.authHeader()})
    }
    else
    return this.http.get<number>(`https://localhost:44381/api/Projects/search-count?search=${searchTerm}`,{headers:this.authService.authHeader()})
  }
  PostProjectAsync(project:PostProject){
    return this.http.post('https://localhost:44381/api/Projects',JSON.stringify(project),{headers:this.authService.authHeader()})
  }
  DeleteProjectAsync(id:string){
    return this.http.delete(`https://localhost:44381/api/Projects/${id}`,{headers:this.authService.authHeader()})
  }
  PutProjectAsync(id:string,project:PostProject){
    return this.http.put(`https://localhost:44381/api/Projects/${id}`,JSON.stringify(project),{headers:this.authService.authHeader()})
  }
  GetProjectList(){
    return this.http.get<Project[]>('https://localhost:44381/api/Projects',{headers:this.authService.authHeader()})
  }
}
