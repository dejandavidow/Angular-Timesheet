import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Client } from 'src/app/clients/model/client';
import { ClientService } from 'src/app/clients/service/client.service';
import { Member } from 'src/app/members/model/member';
import { MemberService } from 'src/app/members/service/member.service';
import { Project } from '../../model/project';
import { ProjectService } from '../../service/project.service';

@Component({
  selector: 'app-one-project',
  templateUrl: './one-project.component.html',
  styleUrls: ['./one-project.component.css']
})
export class OneProjectComponent implements OnInit {
  validateForm!: UntypedFormGroup
  @Input() project = new Project("","","","","","","")
  @Output() deleleProjectEmit = new EventEmitter<string>();
  clients : Client[] = []
  members : Member[] = []
  constructor(private fb:UntypedFormBuilder,private message: NzMessageService,private clientService:ClientService,private memberService:MemberService,private projectService:ProjectService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      projectName: [null, [Validators.required]],
       description: [],
       archive: [],
       status: [],
       client:[null,[Validators.required]],
       member:[null,[Validators.required]]
    });
  }
  onUpdate(){
    if (this.validateForm.valid) {
    this.projectService.PutProjectAsync(this.project.id,this.project).subscribe(() =>
    {
      this.message.success("Project updated successfuly")
    })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }    
  }
  onDelete(id:string){
    this.deleleProjectEmit.emit(id);
  }
  onOpenClient(){
    this.clientService.getClientList().subscribe((res) => this.clients = res)
  }
  onOpenMember(){
    this.memberService.getMemberList().subscribe((res) => this.members = res)
  }

}
