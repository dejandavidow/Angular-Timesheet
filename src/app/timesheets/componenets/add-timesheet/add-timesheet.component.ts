import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Category } from 'src/app/categories/model/category';
import { CategoryService } from 'src/app/categories/service/category.service';
import { Client } from 'src/app/clients/model/client';
import { ClientService } from 'src/app/clients/service/client.service';
import { Project } from 'src/app/projects/model/project';
import { ProjectService } from 'src/app/projects/service/project.service';
import { TimesheetService } from '../../service/timesheet.service';

@Component({
  selector: 'app-add-timesheet',
  templateUrl: './add-timesheet.component.html',
  styleUrls: ['./add-timesheet.component.css']
})
export class AddTimesheetComponent implements OnInit {

  constructor(
    private fb: UntypedFormBuilder,
    private clientService: ClientService,
    private categoryService: CategoryService,
    private projectService: ProjectService,
    private message: NzMessageService,
    private timesheetService: TimesheetService,
    private router:Router
  ) { }
  validateForm!: UntypedFormGroup;
  isModalVisible = false;
  date=''
  projectId = '';
  memberId = '';
  categoryId = '';
  clientId=''
  description = '';
  time = '';
  overTime = '0';
  clients: Client[] = [];
  projects: Project[] = [];
  categories: Category[] = [];
  dateFormat = 'dd/MM/yyyy';
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      description: [],
      time: [null, [Validators.required]],
      overtime: [],
      date: [null,Validators.required],
      projectId: [null, [Validators.required]],
      clientId: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });
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
  submitForm() {
    if (this.validateForm.valid) {
      this.timesheetService
        .PostTimeSheetAsync({
          id: '',
          description: this.description,
          time: this.time,
          overTime: this.overTime,
          date: this.date,
          clientId: this.clientId,
          projectId: this.projectId,
          categoryId: this.categoryId,
        })
        .subscribe(() => {
          this.validateForm.reset();
          this.message.success('Timesheet added successfuly');
          setTimeout(() => {
            this.router.navigate(['timesheets'])
          }, 3000);
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
  handleCancel() {
    this.validateForm.reset();
  }
  onChange(e:Date){
   var x = e.toISOString().slice(0,10)
   this.date = x;
  }

}
