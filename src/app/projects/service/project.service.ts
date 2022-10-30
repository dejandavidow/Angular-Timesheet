import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostProject } from '../model/post-project';
import { Project } from '../model/project';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }
  GetProjectsAsync(pageNumber:number,pageSize:number,searchTerm:string,filterLetter:string){
    if(searchTerm !== '' && filterLetter === '')
    {
      return this.http.get<Project[]>(`https://localhost:44381/api/Project/search?search=${searchTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`,{headers:{'Content-Type':'application/json'}})
    }
    else if(searchTerm ==='' && filterLetter !== ''){
      return this.http.get<Project[]>(`https://localhost:44381/api/Project/filter?pageNumber=${pageNumber}&pageSize=${pageSize}&letter=${filterLetter}`,{headers:{'Content-Type':'application/json'}})
    }
    else
    return this.http.get<Project[]>(`https://localhost:44381/api/Project?pageNumber=${pageNumber}&pageSize=${pageSize}`,{headers:{'Content-Type':'application/json'}})
  }
  GetProjectCountAsync(filterLetter:string,searchTerm:string){
    if(filterLetter !== '' && searchTerm === '')
    {
      return this.http.get<number>(`https://localhost:44381/api/Project/filter-count?letter=${filterLetter}`,{headers:{'Content-Type':'application/json'}})
    }
    else
    return this.http.get<number>(`https://localhost:44381/api/Project/search-count?search=${searchTerm}`,{headers:{'Content-Type':'application/json'}})
  }
  PostProjectAsync(project:PostProject){
    return this.http.post('https://localhost:44381/api/Project',JSON.stringify(project),{headers:{'Content-Type':'application/json'}})
  }
  DeleteProjectAsync(id:string){
    return this.http.delete(`https://localhost:44381/api/Project/${id}`,{headers:{'Content-Type':'application/json'}})
  }
  PutProjectAsync(id:string,project:PostProject){
    return this.http.put(`https://localhost:44381/api/Project/${id}`,JSON.stringify(project),{headers:{'Content-Type':'application/json'}})
  }
}
