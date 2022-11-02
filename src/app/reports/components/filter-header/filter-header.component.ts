import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/categories/model/category';
import { CategoryService } from 'src/app/categories/service/category.service';
import { Client } from 'src/app/clients/model/client';
import { ClientService } from 'src/app/clients/service/client.service';
import { Member } from 'src/app/members/model/member';
import { MemberService } from 'src/app/members/service/member.service';
import { Project } from 'src/app/projects/model/project';
import { ProjectService } from 'src/app/projects/service/project.service';
import { GetTimesheet } from 'src/app/timesheets/model/get-timesheet';
import { TimesheetService } from 'src/app/timesheets/service/timesheet.service';

@Component({
  selector: 'app-filter-header',
  templateUrl: './filter-header.component.html',
  styleUrls: ['./filter-header.component.css']
})
export class FilterHeaderComponent implements OnInit {
  clientId=''
  projectId=''
  memberId=''
  categoryId=''
  startDate=''
  endDate=''
  searchCall = false
  members:Member[]=[]
  projects:Project[]=[]
  clients:Client[]=[]
  categories:Category[]=[]
  timesheetsFiltered:GetTimesheet[] = []
  constructor(
    private clientService:ClientService,
    private memberService:MemberService,
    private categoryService:CategoryService,
    private projectService:ProjectService,
    private timesheetService:TimesheetService
  ) { }

  ngOnInit(): void {
  }

  onOpenClient() {
    this.clientService.getClientList().subscribe((res) => (this.clients = res));
  }
  onOpenMember() {
    this.memberService.getMemberList().subscribe((res) => (this.members = res));
  }
  onOpenCategory(){
    this.categoryService.getCategoriesList().subscribe((res) =>{
      this.categories = res;
    })
  }
  onOpenProject(){
    this.projectService.GetProjectList().subscribe((res) =>{this.projects = res})
  }
  onFilter(){
   this.searchCall = !this.searchCall;
  }
  onReset(){
    this.clientId=''
    this.memberId=''
    this.categoryId=''
    this.projectId=''
    this.startDate=''
    this.endDate=''
    this.searchCall=!this.searchCall;
  }
}
