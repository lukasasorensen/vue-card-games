import { Faces, Suits } from "../constants/card.constants";
import Card from "../interfaces/card.interface";
import Deck from "../interfaces/deck.interface";

export default class DeckFactory {

  generateStandardDeckNoJokers() {
    var faces = [
      Faces.ACE,
      Faces.KING,
      Faces.QUEEN,
      Faces.JACK,
      Faces.TEN,
      Faces.NINE,
      Faces.EIGHT,
      Faces.SEVEN,
      Faces.SIX,
      Faces.FIVE,
      Faces.FOUR,
      Faces.THREE,
      Faces.TWO
    ];

    var deck = new Deck();

    faces.forEach(face => {
      Object.keys(Suits).forEach(key => {
        deck.addCard(
          new Card(Suits[key], face)
        )
      })
    })

    return deck;
  }
}