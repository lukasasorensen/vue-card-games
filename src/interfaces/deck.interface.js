import Card from "./card.interface";
import { shuffle } from "lodash";

export default class Deck {
  constructor() {
    this._cards = [];
  }

  get cards() {
    return this._cards;
  }

  addCard(card) {
    if (!card instanceof Card) {
      throw new Error("must be instance of Card");
    }

    this._cards.push(card);
  }

  takeTopCard() {
    if (!this._cards.length) {
      throw new Error("No cards in deck")
    }

    return this._cards.splice(-1, 1);
  }

  shuffle() {
    this._cards = shuffle(this._cards);
  }
}