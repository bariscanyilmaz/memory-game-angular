import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  remainingCardPairs: number;
  doneMoves: number;

  constructor(private gameService:GameService) { }

  ngOnInit(): void {
    this.gameService.getRemainingCardPairs().subscribe(r=>this.remainingCardPairs=r);
    this.gameService.getDoneMoves().subscribe( r=>this.doneMoves=r);
  }



}
