import Card from "../../interfaces/card.interface"
import { shuffle } from "lodash"

// initial state
const state = () => ({
  cards: []
})

const getters = {
  getAllCards: state => state.cards
}

const mutations = {
  addCardToDeck(state, card) {
    state.cards.push(card)
  },
  removeCardFromDeck(state, index) {
    state.cards.splice(index, 1)
  },
  shuffle(state) {
    state.cards = shuffle(state.cards)
  }
}

const actions = {
  addCard({ commit }, card) {
    if (!(card instanceof Card)) {
      throw new Error("must be instance of card")
    }

    commit('addCardToDeck', card)
  },

  removeCard({ commit, state }, index) {
    if (index < 0 || typeof index != 'number') {
      throw new Error("index must be a positive integer")
    }

    if (state.cards.length == 0) {
      throw new Error("no cards in deck")
    }

    commit('removeCardFromDeck', index)
  },

  takeTopCard({ commit, state }) {
    if (!state.cards.length) {
      throw new Error("No cards in deck")
    }

    commit('removeCardFromDeck', 0)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}