import { Component, OnInit, Input, Output,EventEmitter, DoCheck } from '@angular/core';

@Component({
  selector: 'memory-card',
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.scss']
})
export class MemoryCardComponent implements OnInit,DoCheck {

  constructor() { }
  

  @Input() type:string;
  @Input() code:string;

  @Output() rotated=new EventEmitter<MemoryCardComponent>();

  icon=[this.type,this.code];
  isRotated:boolean;

  ngOnInit(): void {
    
  }
  
  ngDoCheck(): void {
   this.icon=[this.type,this.code];
  }
  
  undo(){
    this.isRotated=false;
  }

  onClick(){
    this.isRotated=true;
    this.rotated.emit(this);
  }
  
}
