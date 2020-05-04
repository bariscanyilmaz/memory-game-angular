import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Card } from '../card';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {

  constructor(private http: HttpClient) {

  }

  cards(){
    return this.http.get<Card[]>('assets/cards.json');
  }
}
