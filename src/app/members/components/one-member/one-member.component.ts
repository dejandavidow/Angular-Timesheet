import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Member } from '../../model/member';
import { MemberService } from '../../service/member.service';

@Component({
  selector: 'app-one-member',
  templateUrl: './one-member.component.html',
  styleUrls: ['./one-member.component.css']
})
export class OneMemberComponent implements OnInit {
@Input() member = new Member("","","","","","","")
@Output() deleteMemberEmit = new EventEmitter<string>()
validateForm!: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder,private memberService:MemberService, private message: NzMessageService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required,Validators.email]],
      hours: [],
      status: [null, [Validators.required]],
      role: [null, [Validators.required]]
    });
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      this.memberService.PutMemberAsync(this.member.id,this.validateForm.value).subscribe(() =>{
        this.message.success("Member updated successfuly")
      })
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  onDelete(id:string){
    this.deleteMemberEmit.emit(id)
  }
}
