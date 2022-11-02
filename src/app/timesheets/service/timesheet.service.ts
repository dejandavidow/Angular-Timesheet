import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetTimesheet } from '../model/get-timesheet';
import { Timesheet } from '../model/timesheet';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor(private http:HttpClient) { }
  getTimesheetsAsync(pageNumber:number,pageSize:number,startDate:string,endDate:string,clientId:string,memberId:string,projectId:string,categoryId:string){
    return this.http.get<GetTimesheet[]>(`https://localhost:44381/api/TimeSheet/filters?pageNumber=${pageNumber}&pageSize=${pageSize}&filterStart=${startDate}&filterEnd=${endDate}&projectId=${projectId}&memberId=${memberId}&clientId=${clientId}&categoryId=${categoryId}`)
  }
  getTimesheetsCountAsync(pageNumber:number,pageSize:number,startDate:string,endDate:string,clientId:string,memberId:string,projectId:string,categoryId:string){
    return this.http.get<number>(`https://localhost:44381/api/TimeSheet/filters-count?pageNumber=${pageNumber}&pageSize=${pageSize}&filterStart=${startDate}&filterEnd=${endDate}&projectId=${projectId}&memberId=${memberId}&clientId=${clientId}&categoryId=${categoryId}`)
  }
  PostTimeSheetAsync(timesheet:Timesheet){
    return this.http.post('https://localhost:44381/api/TimeSheet/',JSON.stringify(timesheet),{headers:{'content-type':'application/json'}})
  }
  getTimesheetsAsync2(){
    return this.http.get<GetTimesheet[]>(`https://localhost:44381/api/TimeSheet/filters`)
  }
}
