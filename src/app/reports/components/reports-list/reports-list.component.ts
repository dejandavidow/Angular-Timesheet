import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { GetTimesheet } from 'src/app/timesheets/model/get-timesheet';
import { Timesheet } from 'src/app/timesheets/model/timesheet';
import { TimesheetService } from 'src/app/timesheets/service/timesheet.service';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css'],
})
export class ReportsListComponent implements OnInit {
  total = 1;
  reports: GetTimesheet[] = [];
  loading = true;
  pageSize = 5;
  pageIndex = 1;
  totalHours = 0;
  constructor(private timesheetService: TimesheetService) {}

  ngOnInit(): void {
    this.getTimesheets();
  }
  getTimesheets() {
    this.timesheetService
      .getTimesheetsAsync(this.pageIndex, this.pageSize)
      .subscribe((res) => {
        this.reports = res;
        this.loading = false;
        this.totalHours = this.totalTimeHandler(res);
      });
    this.timesheetService.getTimesheetsCountAsync().subscribe((res) => {
      this.total = res;
    });
  }
  pageChange(page: NzTableQueryParams): void {
    this.pageIndex = page.pageIndex;
    console.log(page);
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
