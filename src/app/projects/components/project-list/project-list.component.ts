import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
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
  constructor(
    private projectService: ProjectService,
    private message: NzMessageService
  ) {}

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
