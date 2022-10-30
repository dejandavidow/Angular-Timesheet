import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetTimesheet } from '../model/get-timesheet';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor(private http:HttpClient) { }
  getTimesheetsAsync(pageNumber:number,pageSize:number){
    return this.http.get<GetTimesheet[]>(`https://localhost:44381/api/TimeSheet/filters?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }
  getTimesheetsCountAsync(){
    return this.http.get<number>(`https://localhost:44381/api/TimeSheet/filters-count`)
  }
}
