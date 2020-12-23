<template>
  <div class="playing-card">
      <div class="top-left-info">
          <div class="face">
              {{card.faceShort}}
          </div>
          <div class="suit">
              {{card.suitHtmlCode}}
          </div>
      </div>
      <div class="center-info">
          <div class="suit">
              {{card.suitHtmlCode}}
          </div>
      </div>
      <div class="bottom-right-info">
          <div class="face">
              {{card.faceShort}}
          </div>
          <div class="suit">
              {{card.suitHtmlCode}}
          </div>
      </div>
  </div>
</template>

<script>
import CardInterface from "../interfaces/card.interface"
export default {
    name: 'Card',
    props: {
        card: CardInterface
    },
    components: {

    }
}
</script>

<style lang="scss" scoped>

</style>