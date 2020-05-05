import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Card } from '../card';
import { tap, take, toArray, map, delay } from "rxjs/operators";
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  selectedCard1: Card = null;
  selectedCard2: Card = null;

  cards: Card[] = [];
  card$ = new BehaviorSubject<Card>(null);
  constructor(private http: HttpClient) {

  }


  getCards(count: number) {
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

  coverCards$ = new BehaviorSubject<Card[]>([]);

  controlCards(choosen: Card) {
    if (this.selectedCard1 === null) {
      this.selectedCard1 = choosen
    } else {

      if (choosen.id === this.selectedCard1.id) {
        return;
      }

      this.selectedCard2 = choosen;
      if (this.selectedCard1.code != this.selectedCard2.code) {
        this.coverCards$.next([this.selectedCard1, this.selectedCard2]);
      }

      this.selectedCard1 = null;
      this.selectedCard2 = null;
    }
  }

}