import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Client } from 'src/app/clients/model/client';
import { ClientService } from 'src/app/clients/service/client.service';
import { Member } from 'src/app/members/model/member';
import { MemberService } from 'src/app/members/service/member.service';
import { ProjectService } from '../../service/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {
  isModalVisible: boolean = false;
  validateForm!: UntypedFormGroup;
  projectAdded = false;
  searchTerm = '';

  projectName = '';
  description = '';
  archive = '';
  status = '';
  clientId = '';
  memberId = '';

  clients: Client[] = [];
  members: Member[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private projectService: ProjectService,
    private message: NzMessageService,
    private clientService: ClientService,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      projectName: [null, [Validators.required]],
      description: [],
      archive: [],
      status: [],
      client: [null, [Validators.required]],
      member: [null, [Validators.required]],
    });
  }
  onOpenClient() {
    this.clientService.getClientList().subscribe((res) => (this.clients = res));
  }
  onOpenMember() {
    this.memberService.getMemberList().subscribe((res) => (this.members = res));
  }
  showModal() {
    this.isModalVisible = true;
  }
  handleCancel(): void {
    this.isModalVisible = false;
    this.resetForm();
  }
  resetForm(): void {
    this.validateForm.reset();
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      this.projectService
        .PostProjectAsync({
          id: '',
          projectName: this.projectName,
          description: this.description,
          archive: this.archive,
          status: this.status,
          clientId: this.clientId,
          memberId: this.memberId,
        })
        .subscribe(() => {
          this.projectAdded = true;
          this.resetForm();
          this.isModalVisible = false;
          this.message.success('Project added successfuly');
        });
      this.projectAdded = false;
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
