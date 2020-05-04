import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'memory-card',
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.scss']
})
export class MemoryCardComponent implements OnInit {

  constructor() { }

  @Input() type='fas';
  @Input() code='rocket';
  @Output() rotated=new EventEmitter<MemoryCardComponent>();
  icon=[this.type,this.code];
  isRotated:boolean;

  ngOnInit(): void {
    
  }
  
  undo(){
    this.isRotated=false;
  }

  onClick(){
    this.isRotated=true;
    this.rotated.emit(this);
  }
  
}
