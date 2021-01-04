<template>
  <div class="playing-card" :class="{ 'face-down': !card.isFaceUp }" :style="{ color: card.color, zoom: zoom }" @click="flip">
      <div v-if="card.isFaceUp">
        <div class="top-left-info">
            <div class="face">
                {{card.faceShort}}
            </div>
            <div class="suit" v-html="card.suitHtmlCode">
            </div>
        </div>
        <div class="center-info">
            <div class="suit" v-html="card.suitHtmlCode">
            </div>
        </div>
        <div class="bottom-right-info">
            <div class="face">
                {{card.faceShort}}
            </div>
            <div class="suit" v-html="card.suitHtmlCode">
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import CardInterface from "../interfaces/card.interface"
export default {
    name: 'Card',
    props: {
        card: CardInterface,
        zoom: {
            type: Number,
            default: 1
        }
    },
    methods: {
        flip: function() {
            this.card.flip()
        }
    }
}
</script>

<style lang="scss" scoped>
.playing-card {
    position: relative;
    display: inline-block;
    padding: 7px;
    box-sizing: border-box;
    width: 150px;
    height: 230px;
    border: 1px solid #3c3c3c;
    border-radius: 10px;

    .face, .suit {
        font-size: 1.3em;
        font-weight: bold;
    }

    .top-left-info {
        float: left;
        position: absolute;
        top: 7px;
        left: 7px;
    }

    .center-info {
        margin-top: 55%;
        .suit {
            font-size: 3em;
        }
    }

    .bottom-right-info {
        position: absolute;
        bottom: 7px;
        right: 7px;
    }

    .top-left-info, .bottom-right-info {
        .suit {
            margin-top: -8px;
        }
    }

    &.face-down {
        background: red;
    }
}
</style>