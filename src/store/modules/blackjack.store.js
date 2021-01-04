import { Faces, Suits } from "../../constants/card.constants"
import Card from "../../interfaces/card.interface"

const state = () => ({
  game: {
    minBet: 1,
    maxBet: 1000,
    maxPlayers: 7
  },

  dealer: {
    hand: [],
    count: 0 
  },

  players: [
    {
      id: 1,
      name: 'Player 1',
      hand: [],
      count: 0,
      bet: 0,
      money: 0,
      order: 0
    }
  ],
})

const getters = {
  getPlayers: state => state.players,
  getDealer: state => state.dealer,
  getGame: state => state.game
}

const mutations = {
  addPlayer(state, player) {
    state.players.push(player)
  },
  removePlayer(state, id) {
    var playerIndex = state.players.findIndex(player => player.id == id)
    state.players.splice(playerIndex, 1)
  },
  giveCardToPlayer(state, { id, card }) {
    var player = state.players.find(player => player.id == id)
    if (player) {
      player.hand.push(card)
    }
  }
}

const actions = {
  addPlayer({ commit, state}, player) {
    player.id = state.players.length + 1;
    player.order = player.id;

    if (!player.name) {
      player.name = `Player ${player.id}`
    }

    commit("addPlayer", player)
  },

  giveCardToPlayer({ commit, state}, { id, card }) {
    if (!id || !card) {
      throw new Error("missing arguments")
    }

    if (!(card instanceof Card)) {
      throw new Error("card must be instance of Card")
    }

    if (state.players.findIndex(p => p.id == id) < 0) {
      throw new Error("no player found with that id")
    }

    commit('giveCardToPlayer', { id, card })
  },

  buildBlackJackDeck({ commit }) {
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

    commit("blackjack/deck/clearDeck")

    faces.forEach(face => {
      Object.keys(Suits).forEach(key => {
        commit("blackjack/deck/addCard", new Card(Suits[key], face), { root: true })
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}