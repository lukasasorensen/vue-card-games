import { Faces } from "../constants/card.constants"
import { partition } from "lodash"

class BlackjackUtil {
	countHand(hand) {
    var buffer = {
      count: 0,
      secondaryCount: 0
    }

		hand = hand.filter((card) => card.isFaceUp);

		if (!hand.length) return buffer;

		var splitHand = partition(hand, (card) => card.face == Faces.ACE);
		var aces = splitHand[0];
		var nonAces = splitHand[1];

	  buffer.count = nonAces.reduce((acc, curr) => acc + curr.value, 0);

		if (aces.length) {
			if (aces.length == 1) {
			  buffer.count += 1;
				buffer.secondaryCount = buffer.count + 10;
			}
			if (aces.length > 1) {
			  buffer.count += aces.length;
				buffer.secondaryCount = buffer.count + 10;
			}
		}

		return buffer;
	}
}

export const blackjackUtil = new BlackjackUtil();
