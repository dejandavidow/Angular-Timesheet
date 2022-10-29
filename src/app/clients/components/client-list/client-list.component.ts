import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Client } from '../../model/client';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnChanges {
  loaded:boolean=false
  clients:Client[] = []
  clientCount: number = 0;
  pageIndex: number = 1;
  pageSize: number = 5;
  filterLetter = ''
  @Input() clientAdded = false
  @Input() searchTerm = ''
  @Output() searchTermChange = new EventEmitter<string>()
  constructor(private clientService:ClientService,private message: NzMessageService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getClients()
  }
  pageChange(event:number){
    this.pageIndex = event
    this.getClients()
  }
  getClients(){
    this.clientService.GetClientsAsync(this.pageIndex,this.pageSize,this.searchTerm,this.filterLetter).subscribe((response) =>{
      this.clients = response
      this.loaded=true;
    })
    this.clientService.GetClientCountAsync(this.filterLetter,this.searchTerm).subscribe((res) =>{
      this.clientCount = res;
    })
  }
  filterHandler(letter:string){
    this.filterLetter = letter
    this.searchTermChange.emit('')
    this.getClients()
  }
  deleteClient(id:string){
    this.clientService.DeleteClientAsync(id).subscribe(() =>
    {
      this.getClients()
      this.message.success("Client deleted successfuly")
    })
  }
}
