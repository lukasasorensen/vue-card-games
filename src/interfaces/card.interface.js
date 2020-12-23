export default class Card {
	constructor(suit, face, value) {
		this._suit = suit;
		this._face = face;
		this._value = value;
	}

	get suit() {
		return this._suit;
	}

	get suitShort() {
		return this._suit.slice(0, 1).toUppercase();
	}

	get suitHtmlCode() {
		switch (this._suit.toLowerCase()) {
			case 'spades':
			case 'spade':
				return '&#9824;'
			case 'hearts':
			case 'heart':
				return '&#9829;'
			case 'clubs':
			case 'club':
				return '&#9827;'
			case 'diamonds':
			case 'diamond':
        return '&#9830;'
      default:
        return '-'
		}
	}

	get face() {
		return this._face;
	}

	get faceShort() {
		return this._face.slice(0, 1).toUppercase();
	}

	get value() {
		return this._value;
	}
}
