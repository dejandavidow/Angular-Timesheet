import { Component,OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CategoryService } from '../../service/category.service';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  isModalVisible:boolean=false
  validateForm!: UntypedFormGroup
  name:string = ''
  categoryAdded:boolean = false;
  searchTerm:string = ''
  constructor(private fb: UntypedFormBuilder,private categoryService:CategoryService,private message: NzMessageService) { }

  showModal(){
    this.isModalVisible=true
  }
  handleCancel(): void {
    this.isModalVisible = false;
    this.resetForm()
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      this.categoryService.PostCategoryAsync({id:'',name:this.name}).subscribe(() => {
        this.categoryAdded=true
         this.isModalVisible=false
         this.validateForm.reset()
         this.message.success("Category added successfuly")
      }
        )
        this.categoryAdded=false;
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
  handleSearch(e:any){
    this.searchTerm = e.target.value
  }
}
