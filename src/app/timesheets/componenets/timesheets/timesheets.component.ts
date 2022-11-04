import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';
import { Category } from 'src/app/categories/model/category';
import { CategoryService } from 'src/app/categories/service/category.service';
import { Client } from 'src/app/clients/model/client';
import { ClientService } from 'src/app/clients/service/client.service';
import { Project } from 'src/app/projects/model/project';
import { ProjectService } from 'src/app/projects/service/project.service';
import { TimesheetService } from '../../service/timesheet.service';
import { GetTimesheet } from '../../model/get-timesheet';
import { CalendarOptions, defineFullCalendarElement, EventContentArg } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';

defineFullCalendarElement();
@Component({
  selector: 'app-timesheets',
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.css'],
})
export class TimesheetsComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  isModalVisible = false;
  date = new Date()
  projectId = '';
  memberId = '';
  categoryId = '';
  clientId=''
  description = '';
  time = '';
  overTime = '';
  clients: Client[] = [];
  projects: Project[] = [];
  categories: Category[] = [];
  user = ''
  constructor(
    private fb: UntypedFormBuilder,
    private clientService: ClientService,
    private categoryService: CategoryService,
    private projectService: ProjectService,
    private message: NzMessageService,
    private timesheetService: TimesheetService,
    private router:Router,
    private authService:AuthService
  ) {}
  logout()
  {
    this.authService.logout()
    this.router.navigate(['login'])
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      description: [],
      time: [null, [Validators.required]],
      overtime: [],
      date: [],
      projectId: [null, [Validators.required]],
      clientId: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });
    let x = JSON.parse(localStorage.getItem('user') || "")
    this.user = x.name;
  }
  handleCancel() {
    this.isModalVisible = false;
    this.validateForm.reset();
  }
  submitForm() {
    if (this.validateForm.valid) {
      this.timesheetService
        .PostTimeSheetAsync({
          id: '',
          description: this.description,
          time: this.time,
          overTime: this.overTime,
          date: this.date.toISOString().slice(0,10),
          clientId: this.clientId,
          projectId: this.projectId,
          categoryId: this.categoryId,
        })
        .subscribe(() => {
          this.isModalVisible = false;
          this.validateForm.reset();
          this.message.success('Timesheet added successfuly');
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  onOpenClient() {
    this.clientService.getClientList().subscribe((res) => (this.clients = res));
  }
  onOpenCategory() {
    this.categoryService.getCategoriesList().subscribe((res) => {
      this.categories = res;
    });
  }
  onOpenProject() {
    this.projectService.GetProjectList().subscribe((res) => {
      this.projects = res;
    });
  }
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek'
    },
    height:600,
    initialView:'dayGridMonth',
    events:'https://localhost:44381/api/TimeSheets/',
    eventContent:function(arg){
      return {html:"<b>Hours:"+arg.event.extendedProps['time']+"</b>"}
    },
    eventDisplay:'list',
  };
}
