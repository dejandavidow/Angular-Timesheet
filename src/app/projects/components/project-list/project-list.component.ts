import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Client } from 'src/app/clients/model/client';
import { ClientService } from 'src/app/clients/service/client.service';
import { Member } from 'src/app/members/model/member';
import { MemberService } from 'src/app/members/service/member.service';
import { Project } from '../../model/project';
import { ProjectService } from '../../service/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnChanges {
  loaded: boolean = false;
  projects: Project[] = [];
  projectCount: number = 0;
  pageIndex: number = 1;
  pageSize: number = 5;
  filterLetter = '';
  @Input() projectAdded = false;
  @Input() searchTerm = '';
  @Output() searchTermChange = new EventEmitter<string>();
  clients : Client[] = []
  members : Member[] = []
  constructor(
    private projectService: ProjectService,
    private message: NzMessageService,
    private clientService:ClientService,
    private memberService:MemberService,
  ) {}
  onOpenPanel(){
      this.clientService.getClientList().subscribe((res) => this.clients = res)
      this.memberService.getMemberList().subscribe((res) => this.members = res)
  }
  ngOnChanges(): void {
    this.getProjects();
  }
  filterHandler(letter: string) {
    this.filterLetter = letter;
    this.searchTermChange.emit('');
    this.getProjects();
  }
  pageChange(event: number) {
    this.pageIndex = event;
    this.getProjects();
  }
  getProjects() {
    this.projectService
      .GetProjectsAsync(
        this.pageIndex,
        this.pageSize,
        this.searchTerm,
        this.filterLetter
      )
      .subscribe((res) => {
        this.projects = res;
        this.loaded = true;
      });
    this.projectService
      .GetProjectCountAsync(this.filterLetter, this.searchTerm)
      .subscribe((res) => (this.projectCount = res));
  }
  deleteProject(id: string) {
    this.projectService.DeleteProjectAsync(id).subscribe(() => {
      this.getProjects();
      this.message.success('Project deleted successfuly');
    });
  }
}
