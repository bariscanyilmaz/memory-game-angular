import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { GameService } from '../services/game.service';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'memory-card',
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.scss']
})
export class MemoryCardComponent implements OnInit, DoCheck {

  constructor(private gameService: GameService) { }


  @Input() type: string;
  @Input() code: string;
  @Input() id: number;

  icon = [this.type, this.code];
  isRotated: boolean;

  ngOnInit(): void {
    this.gameService.getCoveredCards().subscribe(r=>r.map(v=>this.isRotated=(v.id==this.id)?false:this.isRotated));
  }

  ngDoCheck(): void {
    this.icon = [this.type, this.code];
  }

  undo() {
    this.isRotated = false;
  }

  onClick() {
    this.isRotated = true;
    this.gameService.controlCards({ id: this.id, code: this.code, type: this.type });
  }

}
