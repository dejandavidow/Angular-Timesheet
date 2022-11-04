import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { GetTimesheet } from '../model/get-timesheet';
import { Timesheet } from '../model/timesheet';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor(private http:HttpClient,private authService:AuthService) { }
  getTimesheetsAsync(pageNumber:number,pageSize:number,startDate:string,endDate:string,clientId:string,memberId:string,projectId:string,categoryId:string){
    return this.http.get<GetTimesheet[]>(`https://localhost:44381/api/TimeSheet/filters?pageNumber=${pageNumber}&pageSize=${pageSize}&filterStart=${startDate}&filterEnd=${endDate}&projectId=${projectId}&memberId=${memberId}&clientId=${clientId}&categoryId=${categoryId}`,{headers:this.authService.authHeader()})
  }
  getTimesheetsCountAsync(pageNumber:number,pageSize:number,startDate:string,endDate:string,clientId:string,memberId:string,projectId:string,categoryId:string){
    return this.http.get<number>(`https://localhost:44381/api/TimeSheet/filters-count?pageNumber=${pageNumber}&pageSize=${pageSize}&filterStart=${startDate}&filterEnd=${endDate}&projectId=${projectId}&memberId=${memberId}&clientId=${clientId}&categoryId=${categoryId}`,{headers:this.authService.authHeader()})
  }
  PostTimeSheetAsync(timesheet:Timesheet){
    return this.http.post('https://localhost:44381/api/TimeSheet/',JSON.stringify(timesheet),{headers:this.authService.authHeader()})
  }
  getTimesheetsAsync2(){
    return this.http.get<GetTimesheet[]>(`https://localhost:44381/api/TimeSheet/filters`,{headers:this.authService.authHeader()})
  }
}
