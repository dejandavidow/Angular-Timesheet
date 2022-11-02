import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { GetTimesheet } from 'src/app/timesheets/model/get-timesheet';
import { TimesheetService } from 'src/app/timesheets/service/timesheet.service';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css'],
})
export class ReportsListComponent implements OnInit,OnChanges {
  total = 1;
  reports: GetTimesheet[] = [];
  loading = true;
  pageSize = 5;
  pageIndex = 1;
  totalHours = 0;

  @Input()clientId=''
  @Input()projectId=''
  @Input()memberId=''
  @Input()categoryId=''
  @Input()startDate=''
  @Input()endDate=''
  @Input() searchCall=false
  constructor(private timesheetService: TimesheetService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['searchCall'])
    this.getTimesheets()
  }

  ngOnInit(): void {
    //this.getTimesheets();
  }
  getTimesheets() {
    this.timesheetService
      .getTimesheetsAsync(this.pageIndex, this.pageSize,this.startDate,this.endDate,this.clientId,this.memberId,this.projectId,this.categoryId)
      .subscribe((res) => {
        this.reports = res;
        this.loading = false;
        this.totalHours = this.totalTimeHandler(res);
      });
    this.timesheetService.getTimesheetsCountAsync(this.pageIndex, this.pageSize,this.startDate,this.endDate,this.clientId,this.memberId,this.projectId,this.categoryId).subscribe((res) => {
      this.total = res;
    });
  }
  pageChange(page: NzTableQueryParams): void {
    this.pageIndex = page.pageIndex;
    this.getTimesheets();
  }
  totalTimeHandler = (tsar: GetTimesheet[]) => {
    const timearray: number[] = [];
    {
      tsar.map((ts) => {
        return timearray.push(Number(ts.time));
      });
    }
    var sum = timearray.reduce(function (a, b) {
      return a + b;
    }, 0);
    return sum;
  };
}
