import Vue from "vue";
import Vuex from "vuex";
import deck from './modules/deck.store'
import blackjack from './modules/blackjack.store'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    blackjack
  }
});

store.registerModule('blackjackDeck', deck);

export default store;
