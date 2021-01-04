export default class Card {
	constructor(suit, face, value) {
		this._suit = suit;
		this._face = face;
		this._isFaceUp = true;
		this._value = null;

		if (value) {
			this._value = value
		}
	}

	get suit() {
		return this._suit;
	}

	get suitShort() {
		return this._suit.slice(0, 1).toUpperCase();
	}

	get suitHtmlCode() {
		switch (this._suit.toLowerCase()) {
			case "spades":
			case "spade":
				return "&#9824;"
			case "hearts":
			case "heart":
				return "&#9829;"
			case "clubs":
			case "club":
				return "&#9827;"
			case "diamonds":
			case "diamond":
        return "&#9830;"
      default:
        return ""
		}
	}

	get face() {
		return this._face;
	}

	get faceShort() {
		if (!isNaN(parseInt(this._face))) {
			return this._face;
		}
		return this._face.slice(0, 1).toUpperCase();
	}

	get value() {
		return this._value;
	}

	get isFaceUp() {
		return this._isFaceUp
	}

	get color() {
		switch (this._suit.toLowerCase()) {
			case "spades":
			case "spade":
			case "clubs":
			case "club":
						return "#404040"
			case "hearts":
			case "heart":
			case "diamonds":
			case "diamond":
        return "#de5454"
      default:
        return "#fff"
		}
	}

	flip() {
		this._isFaceUp = !this._isFaceUp
	}
}
