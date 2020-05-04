import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Card } from '../card';
import { tap, take, toArray, map } from "rxjs/operators";
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  cards: Card[] = [];
  card$ = new BehaviorSubject<Card>(null);
  constructor(private http: HttpClient) {

  }


  getCards(count: number) {
    return this.http.get<Card[]>('assets/cards.json').pipe(tap((arr) => {
      this.shuffleCards(arr);
    }), map(d => {
      let arr = d.slice(0, count);
      return this.shuffleCards([ ...arr,...this.shuffleCards(arr)]);
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


}