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
    let clickedButton = event.target;
    let isAlreadyActive = clickedButton.parentElement.querySelector(".active")
    if(isAlreadyActive){
      isAlreadyActive.classList.remove("active")
    }
    clickedButton.className += ' active'
    this.letter = event.target.value
    this.filterLetterEmit.emit(this.letter)

  }
  reset(){
    this.filterLetterEmit.emit('')
  }
  constructor() {}

  ngOnInit(): void {}
}
