import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'memory-card',
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.scss']
})
export class MemoryCardComponent implements OnInit {

  constructor() { }

  @Input() type='fas';
  @Input() code='rocket';
  icon=[this.type,this.code];
  isRotated;

  ngOnInit(): void {
  }
  
  
}
