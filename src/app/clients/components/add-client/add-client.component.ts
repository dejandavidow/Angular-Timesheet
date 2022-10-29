import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  isModalVisible:boolean=false
  validateForm!: UntypedFormGroup
  clientName = ''
  adress = ''
  city = ''
  postalCode = ''
  country = ''
  countries = [{value:'serbia',name:'Serbia'},{value:'macedonia',name:'Macedonia'},{value:'montenegro',name:'Montenegro'}]
  clientAdded = false
  searchTerm = ''
  constructor(private fb: UntypedFormBuilder,private clientService:ClientService,private message: NzMessageService) { }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      clientName: [null, [Validators.required]],
       adress: [],
       city: [],
       postalCode: [],
       country:[null,[Validators.required]]
    });
  }
  showModal(){
    this.isModalVisible=true
  }
  handleCancel(): void {
    this.isModalVisible = false;
    this.resetForm()
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      this.clientService.PostClientAsync({id:'',clientName:this.clientName,adress:this.adress,city:this.city,postalCode:this.postalCode,country:this.country}).subscribe(() =>{
        this.clientAdded=true
        this.isModalVisible = false;
        this.resetForm()
        this.message.success("Client added successfuly")
      })
      this.clientAdded = false;
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
}
