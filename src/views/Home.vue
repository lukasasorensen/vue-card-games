<template>
  <div class="home">
    <h1>Sup</h1>
    <button @click="shuffle">shuffle</button>
    <div class="cards">
      <div class="card-container" :key="index" v-for="(card, index) in this.deck.cards">
        <Card :card="card" />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card";
import DeckFactory from "../factories/deck.factory";
import Deck from '../interfaces/deck.interface';

const deckFactory = new DeckFactory;

export default {
  name: "Home",
  components: {
    Card
  },
  methods: {
    shuffle: function() {
      this.deck.shuffle()
    }
  },
  data() {
    return {
      deck: {
        type: Deck
      }
    }
  },
  mounted() {
    this.deck = deckFactory.generateStandardDeckNoJokers();
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
