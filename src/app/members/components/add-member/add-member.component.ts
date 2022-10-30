import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MemberService } from '../../service/member.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {
  isModalVisible: boolean = false;
  validateForm!: UntypedFormGroup;
  memberAdded = false;
  searchTerm = '';

  name=""
  username=""
  email=""
  hours="0"
  status=""
  role=""
  password=""

  constructor( private fb: UntypedFormBuilder,
    private memberService: MemberService,
    private message: NzMessageService,) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required,Validators.email]],
      hours: [],
      status: [null, [Validators.required]],
      role: [null, [Validators.required]],
      password:[null,[Validators.required]]
    });
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
      this.memberService.PostMemberAsync(this.validateForm.value).subscribe(()=>
      {
        this.memberAdded = true;
        this.message.success("Member added successfuly")
        this.isModalVisible=false;
        this.resetForm()
      })
      this.memberAdded=false
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
