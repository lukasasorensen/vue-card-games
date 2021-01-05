import { Faces, Suits } from "../../constants/card.constants"
import Card from "../../interfaces/card.interface"
import { blackjackUtil } from "../../utils/blackjack.util"

const state = () => ({
  dealer: {
    hand: []
  },

  players: [
    {
      id: 1,
      name: 'Player 1',
      hand: [],
      bet: 0,
      money: 0,
      order: 0,
      bust: false
    }
  ]
})

const getters = {
  getAllPlayers: state => {
    return state.players.map(player => {
      player.count = 0;
      player.secondaryCount = 0;
      if (player.hand.length) {
        var { count, secondaryCount } = blackjackUtil.countHand(player.hand)
        player.count = count
        player.secondaryCount = secondaryCount
      }
      return player
    })
  },
  getDealer: state => {
    if (state.dealer.hand.length) {
      var { count, secondaryCount } = blackjackUtil.countHand(state.dealer.hand)
      state.dealer.count = count
      state.dealer.secondaryCount = secondaryCount
    }

    return state.dealer
  }
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
  },
  addToPlayerCount(state, { id, amount }) {
    var player = state.players.find(player => player.id == id)
    if (player) {
      player.count += amount
    }
  },
  addToPlayerSecondaryCount(state, { id, amount }) {
    var player = state.players.find(player => player.id == id)
    if (player) {
      player.count += amount
    }
  },
  giveCardToDealer(state, card) {
    state.dealer.hand.push(card)
  },
  addToDealerCount(state, amount) {
    state.dealer.count += amount
  },
  addToDealerSecondaryCount(state, amount) {
    state.dealer.count += amount
  },
  reset(state) {
    state.players.forEach(player => {
      player.hand.length = 0
    })
    state.dealer.hand.length = 0
  },

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

  giveCardToDealer({ commit }, card) {
    if (!(card instanceof Card)) {
      throw new Error("card must be instance of Card")
    }

    commit('giveCardToDealer', card)
  },

  newGame({ commit }) {
    commit('reset')
  },

  buildBlackJackDeck({ commit, dispatch }) {
    var faces = [
      { face: Faces.ACE, value: [1, 11] },
      { face: Faces.KING, value: 10 },
      { face: Faces.QUEEN, value: 10 },
      { face: Faces.JACK, value: 10 },
      { face: Faces.TEN, value: 10 },
      { face: Faces.NINE, value: 9 },
      { face: Faces.EIGHT, value: 8 },
      { face: Faces.SEVEN, value: 7 },
      { face: Faces.SIX, value: 6 },
      { face: Faces.FIVE, value: 5 },
      { face: Faces.FOUR, value: 4 },
      { face: Faces.THREE, value: 3 },
      { face: Faces.TWO, value: 2 },
    ];

    commit("blackjackDeck/clearDeck", {}, { root: true })

    faces.forEach(face => {
      Object.keys(Suits).forEach(key => {
        dispatch("blackjackDeck/addCard", new Card(Suits[key], face.face, face.value), { root: true })
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