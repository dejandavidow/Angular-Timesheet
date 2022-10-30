import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Member } from '../../model/member';
import { MemberService } from '../../service/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnChanges {
@Input() searchTerm = ""
@Output() searchTermChange = new EventEmitter<string>()
@Input() memberAdded = false;
members:Member[] = []
filterLetter = ''
memberCount: number = 0;
  pageIndex: number = 1;
  pageSize: number = 5;
  loaded=false
  constructor(private memberService:MemberService,private message: NzMessageService) { }

  ngOnChanges(): void {
    this.getMembers()
  }
  getMembers(){
    this.memberService.GetMembersAsync(this.pageIndex,this.pageSize,this.searchTerm,this.filterLetter).subscribe((res)=>{
      this.members = res
      this.loaded=true
    })
    this.memberService.GetMemberCountAsync(this.filterLetter,this.searchTerm).subscribe((res)=>{
      this.memberCount = res;
    })
  }
  filterHandler(letter: string) {
    this.filterLetter = letter;
    this.searchTermChange.emit('')
    this.getMembers()
  }
  pageChange(event: number) {
    this.pageIndex = event;
    this.getMembers()
  }
  deleteMember(id:string){
    this.memberService.DeleteMemberAsync(id).subscribe(() =>{
      this.getMembers();
      this.message.success("Member deleted successfuly")
    })
  }
}
