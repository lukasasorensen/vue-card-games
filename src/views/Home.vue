<template>
  <div class="home">
    <Card/>
  </div>
</template>

<script>
import Card from "../components/Card";
import CardInterface from "../interfaces/card.interface";

export default {
  name: "Home",
  components: {
    Card
  },
  data() {
    return {
      exampleCard: new CardInterface()
    }
  }
};
</script>
