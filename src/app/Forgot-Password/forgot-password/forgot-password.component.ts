import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  error = null
  constructor(private fb: UntypedFormBuilder,private authService:AuthService,private message: NzMessageService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required,Validators.email]]
    });
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      this.authService.forgotPassword(this.validateForm.value).subscribe(() =>{
        this.message.success("Link sent to "+this.validateForm.value.email)
      },(e) =>{
        this.error = e.error.ErrorMessage
        this.validateForm.reset()
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


}
