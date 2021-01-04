import Card from "../../interfaces/card.interface"
import { shuffle } from "lodash"

// initial state
const state = () => ({
  cards: [],
  discardedCards: [],
  currentCard: null
})

const getters = {
  getAllCards: state => state.cards,
  getCurrentCard: state => state.currentCard
}

const mutations = {
  addCardToDeck(state, card) {
    state.cards.push(card)
  },
  takeCardFromDeck(state, index) {
    var card = state.cards.splice(index, 1)
    state.currentCard = card;
  },
  shuffle(state) {
    state.cards = shuffle(state.cards)
  },
  clearDeck(state) {
    state.cards = []
    state.discardedCards = []
  },
  resetDeck(state) {
    state.cards = state.cards.concat(state.discardedCards)
    state.discardedCards.length = 0
  },
  discardCard(state, card) {
    state.discardedCards.push(card)
  }
}

const actions = {
  addCard({ commit }, card) {
    if (!(card instanceof Card)) {
      throw new Error("must be instance of card")
    }

    commit('addCardToDeck', card)
  },

  takeCard({ commit, state }, index) {
    if (index < 0 || typeof index != 'number') {
      throw new Error("index must be a positive integer")
    }

    if (state.cards.length == 0) {
      throw new Error("no cards in deck")
    }

    commit('takeCardFromDeck', index)
  },

  takeTopCard({ commit, state }) {
    if (!state.cards.length) {
      throw new Error("No cards in deck")
    }

    commit('takeCardFromDeck', 0)
  },
  
  shuffle({ commit }) {
    commit('shuffle')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}