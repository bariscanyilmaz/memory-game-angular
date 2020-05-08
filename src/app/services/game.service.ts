import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Card } from '../card';
import { tap, map, delay } from "rxjs/operators";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  selectedCard1: Card = null;
  selectedCard2: Card = null;

  cardCount: number = 0;
  moveCount: number = 0;

  cards: Card[] = [];
  card = new BehaviorSubject<Card>(null);

  private coverCards = new BehaviorSubject<Card[]>([]);
  private remainingCardPairs = new BehaviorSubject<number>(8);
  private doneMoves = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {

  }


  getCards(count: number) {
    
    this.cardCount = count;
    this.moveCount=0;

    this.remainingCardPairs.next(this.cardCount);
    this.doneMoves.next(0);

    return this.http.get<Card[]>('assets/cards.json').pipe(tap((arr) => {
      this.shuffleCards(arr);
    }), map(d => {
      let arr = d.slice(0, count);
      return this.shuffleCards([...arr, ...this.shuffleCards(arr)]);
    }
    ));
  }

  shuffleCards(arr: Card[]) {
    for (let index = 0; index < arr.length; index++) {
      const temp = arr[index];
      const newIdx = Math.floor(Math.random() * arr.length);
      arr[index] = arr[newIdx];
      arr[newIdx] = temp;
    }
    return arr;
  }


  controlCards(choosen: Card) {
    if (this.selectedCard1 === null) {
      this.selectedCard1 = choosen
    } else {

      if (choosen.id === this.selectedCard1.id) {
        return;
      }

      this.selectedCard2 = choosen;
      if (this.selectedCard1.code != this.selectedCard2.code) {
        this.coverCards.next([this.selectedCard1, this.selectedCard2]);
      } else {
        this.cardCount--
        this.remainingCardPairs.next(this.cardCount);
      }

      this.selectedCard1 = null;
      this.selectedCard2 = null;
      this.moveCount++;
      setTimeout(() => {
        this.doneMoves.next(this.moveCount);  
      }, 1200);
      

    }

  }

  getRemainingCardPairs() {
    return this.remainingCardPairs.asObservable();
  }

  getDoneMoves() {
    return this.doneMoves.asObservable();
  }

  getCoveredCards(){
    return this.coverCards.asObservable().pipe(delay(1200));
  }






}