import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Client } from 'src/app/clients/model/client';
import { Member } from 'src/app/members/model/member';
import { Project } from '../../model/project';
import { ProjectService } from '../../service/project.service';
@Component({
  selector: 'app-one-project',
  templateUrl: './one-project.component.html',
  styleUrls: ['./one-project.component.css']
})
export class OneProjectComponent implements OnInit {
  validateForm!: UntypedFormGroup
  @Input() project = new Project("","","","","",new Client("","","","","",""),new Member("","","","","","",""))
  @Output() deleleProjectEmit = new EventEmitter<string>();
  @Input() clients : Client[] = []
  @Input() members : Member[] = []
  constructor(private fb:UntypedFormBuilder,private message: NzMessageService,private projectService:ProjectService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      projectName: [null, [Validators.required]],
       description: [],
       archive: [],
       status: [],
       clientid:[null,[Validators.required]],
       memberid:[null,[Validators.required]]
    });
  }
  onUpdate(){
    if (this.validateForm.valid) {
    this.projectService.PutProjectAsync(this.project.id,{id:'',projectName:this.project.projectName,
    description:this.project.description,status:this.project.status,archive:this.project.archive,clientId:this.project.clientDTO.id,memberId:this.project.memberDTO.id}).subscribe(() =>
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

}
