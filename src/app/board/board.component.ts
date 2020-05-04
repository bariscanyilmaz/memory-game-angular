import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(private gameService:GameService) { }

  ngOnInit(): void {
    this.gameService.getCards(12).subscribe(r=>this.cards=r);
  }

  cards:Card[]=[];


  
}
