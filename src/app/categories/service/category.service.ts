import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  GetCategoriesAsync(pageNumber:number,pageSize:number,searchTerm:string,filterLetter:string){
    if(searchTerm !== '' && filterLetter === '')
    {
      return this.http.get<Category[]>(`https://localhost:44381/api/Category/search?search=${searchTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`,{headers:{'Content-Type':'application/json'}})
    }
    else if(searchTerm ==='' && filterLetter !== ''){
      return this.http.get<Category[]>(`https://localhost:44381/api/Category/filter?pageNumber=${pageNumber}&pageSize=${pageSize}&letter=${filterLetter}`,{headers:{'Content-Type':'application/json'}})
    }
    else
    return this.http.get<Category[]>(`https://localhost:44381/api/Category?pageNumber=${pageNumber}&pageSize=${pageSize}`,{headers:{'Content-Type':'application/json'}})
  }
  GetCategoryCountAsync(filterLetter:string){
    if(filterLetter !== '')
    {
      return this.http.get<number>(`https://localhost:44381/api/Category/count?letter=${filterLetter}`,{headers:{'Content-Type':'application/json'}})
    }
    else
    return this.http.get<number>('https://localhost:44381/api/Category/search-count',{headers:{'Content-Type':'application/json'}})
  }
  PostCategoryAsync(category:Category){
    return this.http.post('https://localhost:44381/api/Category',JSON.stringify(category),{headers:{'Content-Type':'application/json'}})
  }
  DeleteCategoryAsync(id:string){
    return this.http.delete(`https://localhost:44381/api/Category/${id}`,{headers:{'Content-Type':'application/json'}})
  }
  PutCategoryAsync(id:string,category:Category){
    return this.http.put(`https://localhost:44381/api/Category/${id}`,JSON.stringify(category),{headers:{'Content-Type':'application/json'}})
  }
  getCategoriesList(){
    return this.http.get<Category[]>('https://localhost:44381/api/Category')
  }
}
