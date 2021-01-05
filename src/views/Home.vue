<template>
<div class="blackjack">
  <!-- <h1>Sup</h1>
    <button @click="shuffle">shuffle</button> -->
  <!-- <div class="cards">
      <div class="card-container" :key="index" v-for="(card, index) in this.cards">
        <Card :card="card" />
      </div>
    </div> -->
  <button @click="startGame">deal</button>
  <div class="current-card" v-if="this.currentCard && this.showCurrentCard">
    <Card :card="currentCard" :zoom="0.5" />
  </div>
  <div class="dealer">
    <div class="dealer-count">
      Count: {{dealer.count}}
      <span v-if="dealer.secondaryCount > 0 && dealer.secondaryCount <= 21"> or {{ dealer.secondaryCount }}</span>
    </div>
    <div class="dealer-hand">
      <div class="dealer-card-container" :key="index" v-for="(card, index) in this.dealer.hand">
        <Card :card="card" />
      </div>
    </div>
  </div>
  <div class="players">
    <div class="player" :key="player.id" v-for="player in this.players">
      <div class="player-controls">
        <button>hit</button>
        <button>stay</button>
        <button>double down</button>
        <button>split</button>
      </div>
      <div class="player-name">{{ player.name }}</div>
      <div class="player-bet">Bet: {{ player.bet }}</div>
      <div class="player-money">Money: {{ player.money }}</div>
      <div class="player-count">Count: {{ player.count }}
        <span v-if="player.secondaryCount > 0 && player.secondaryCount < 21"> or {{ player.secondaryCount }}</span>
      </div>
      <div class="player-hand">
        <div class="player-card-container" :key="index" v-for="(card, index) in player.hand">
          <Card :card="card" :zoom="0.75" />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Card from "../components/Card"
import { mapGetters, mapActions, mapState } from "vuex"

const sleep = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const waitTime = 1;

export default {
  name: "Home",
  components: {
    Card
  },
  methods: {
    ...mapActions('blackjack', [
      'addPlayer',
      'giveCardToPlayer',
      'giveCardToDealer',
      'buildBlackJackDeck',
      'newGame'
    ]),
    ...mapActions('blackjackDeck', [
      'addCard',
      'takeTopCard',
      'shuffle',
      'resetDeck',
      'discardCard'
    ]),
    startGame: async function () {
      var dealEachPlayer = async () => {
        for (var i = 0; i < this.players.length; i++) {
          this.takeTopCard()
          this.giveCardToPlayer({ id: this.players[i].id, card: this.currentCard })
          await sleep(waitTime)
        }
      }
      this.newGame()
      this.buildBlackJackDeck()
      this.shuffle()
      await dealEachPlayer()
      this.takeTopCard()
      this.giveCardToDealer(this.currentCard)
      await sleep(waitTime)
      await dealEachPlayer()
      this.takeTopCard()
      this.currentCard.flip()
      this.giveCardToDealer(this.currentCard)

      this.cardsDealt = true

      console.log(this.players)
    }
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
      showCurrentCard: false,
      minBet: 1,
      maxBet: 100,
      isDealerTurn: false,
      cardsDealt: false
    }
  },
  mounted() {
    console.log(this)
  }
};
</script>

<style lang="scss">
.blackjack {
  width: 100vw;
  text-align: center;

  .current-card {
    margin-top: 15px;
  }

  .dealer {
    margin-top: 15px;
    .dealer-hand {
      margin-top: 15px;
      display: flex;
      justify-content: center;

      .dealer-card-container {
        width: auto;
        display: inline-block;
      }
    }
  }

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

  .players {
    padding-bottom: 15px;
    position: fixed;
    bottom: 0;
    width: 100vw;
    display: flex;
    justify-content: space-evenly;

    .player {
      .player-hand {
        display: flex;

        .player-card-container {
          display: inline-block;
        }
      }
    }
  }
}
</style>
