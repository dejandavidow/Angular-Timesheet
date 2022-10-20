import { Component,OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  isModalVisible:boolean=false
  validateForm!: UntypedFormGroup;
  name:string = ''
  constructor(private fb: UntypedFormBuilder) { }

  showModal(){
    this.isModalVisible=true
  }
  handleCancel(): void {
    this.isModalVisible = false;
    this.resetForm()
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }    
  }
  resetForm(): void {
    this.validateForm.reset();
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      categoryname: [null, [Validators.required]]
    });
  }
}
