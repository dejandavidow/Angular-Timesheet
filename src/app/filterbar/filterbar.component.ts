import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filterbar',
  templateUrl: './filterbar.component.html',
  styleUrls: ['./filterbar.component.css'],
})
export class FilterbarComponent implements OnInit {
  letter:string=''
  @Output() filterLetterEmit = new EventEmitter<string>();
  handleClick(event: any) {
    this.letter = event.target.value
    this.filterLetterEmit.emit(this.letter)
  }
  constructor() {}

  ngOnInit(): void {}
}
