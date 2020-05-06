import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  remainingCardPairs: number;
  doneMoves: number;

  constructor() { }

  ngOnInit(): void {
  }

  

}
