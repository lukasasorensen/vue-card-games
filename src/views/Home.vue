<template>
  <div class="home">
    <h1>Sup</h1>
    <button @click="shuffle">shuffle</button>
    <div class="cards">
      <div class="card-container" :key="index" v-for="(card, index) in this.cards">
        <Card :card="card" />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card"
import { mapGetters, mapActions } from "vuex"

export default {
  name: "Home",
  components: {
    Card
  },
  methods: {
    ...mapActions('blackjack', [
      'addPlayer',
      'giveCardToPlayer',
      'buildBlackJackDeck'
    ]),
    ...mapActions('blackjackDeck', [
      'addCardToDeck',
      'takeCardFromDeck',
      'shuffle',
      'resetDeck',
      'discardCard'
    ])
  },
  computed: {
    ...mapGetters('blackjackDeck', {
      cards: "getAllCards",
      currentCard: "getCurrentCard"
    }),
    ...mapGetters('blackjack', {
      players: "getAllPlayers",
      dealer: "getDealer",
      game: "getGame"
    })
  },
  data() {
    return {
    }
  },
  mounted() {
    console.log(this)
    this.buildBlackJackDeck()
  }
};
</script>

<style lang="scss">
.home {
  width: 100vw;
  text-align: center;

  .cards {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .card-container {
      position: relative;
      display: inline-block;
      float: left;
      margin: 0;
      padding: 10px;
    }
  }
}
</style>
