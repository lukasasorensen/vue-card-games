<template>
  <div class="playing-card">
      <div class="top-left-info">
          <div class="face">
              {{faceShort}}
          </div>
      </div>
      <div class="center-info">
          
      </div>
      <div class="bottom-right-info">

      </div>
  </div>
</template>

<script>

export default {
    name: 'Card',
    props: {
        suit: String,
        face: String,
        faceShort: String,
        value: Number
    },
    components: {

    }
}
</script>

<style lang="scss" scoped>

</style>