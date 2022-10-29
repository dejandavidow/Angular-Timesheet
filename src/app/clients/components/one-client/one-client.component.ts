import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Client } from '../../model/client';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-one-client',
  templateUrl: './one-client.component.html',
  styleUrls: ['./one-client.component.css']
})
export class OneClientComponent implements OnInit {
  validateForm!: UntypedFormGroup
  countries = [{value:'serbia',name:'Serbia'},{value:'macedonia',name:'Macedonia'},{value:'montenegro',name:'Montenegro'}]
  @Input() client = new Client("","","","","","")
  @Output() deleteClientEmit = new EventEmitter<string>();
  constructor(private fb:UntypedFormBuilder,private clientService:ClientService,private message: NzMessageService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      clientName: [null, [Validators.required]],
       adress: [],
       city: [],
       postalCode: [],
       country:[null,[Validators.required]]
    });
  }
  onUpdate(){
    if (this.validateForm.valid) {
    this.clientService.PutClientAsync(this.client.id,this.client).subscribe(() =>
    {
      this.message.success("Client updated successfuly")
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
    this.deleteClientEmit.emit(id);
  }

}
