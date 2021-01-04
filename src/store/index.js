import Vue from "vue";
import Vuex from "vuex";
import deck from './modules/deck.store'
import blackjack from './modules/blackjack.store'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {}
});

store.registerModule('blackjack', 'deck', deck);

store.registerModule('blackjack', 'game', blackjack)
