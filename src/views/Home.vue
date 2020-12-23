<template>
  <div class="home">
    <h1>Sup</h1>
    <Card :card="exampleCard" />
  </div>
</template>

<script>
import Card from "../components/Card";
import CardInterface from "../interfaces/card.interface";
import { Faces, Suits } from "../constants/card.constants";

export default {
  name: "Home",
  components: {
    Card
  },
  data() {
    return {
      exampleCard: new CardInterface(Suits.HEARTS, Faces.KING, 10)
    }
  }
};
</script>
