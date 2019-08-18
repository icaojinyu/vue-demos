<template>
  <div id="app">
    <!--<mobile-slide></mobile-slide>-->
    <!--<bg-img></bg-img>-->
    <!--<counter :num="pn" :step="5" @add="add" @cut="cut"></counter>-->
    <!--<p>{{pn}}</p>-->
    <!--<p>{{pn > 60 ? '及格':'不及格'}}</p>-->
    <!--<div v-html="'<ul><li>1</li></ul>'"></div>-->
    <!--<div v-text="str"></div>-->
    <!--<div>{{str}}</div>-->
    <!--<filterTest></filterTest>-->
    <!--<div class="father" @click.self="print('哈哈')">
      <div class="son"></div>
    </div>-->
    <div class="father" @click.once="print('哈哈')">
      <div class="son"></div>
    </div>
  </div>
</template>

<script>

  // import mobileSlide from './components/mobile-slide'
  // import bgImg from './components/bg-img'
  // import counter from './components/counter'
  // import filterTest from './components/filter-test'

  export default {
    name: 'app',
    components: {
      // mobileSlide,
      // bgImg
      // counter
      // filterTest
    },
    data() {
      return {
        pn: 100,
        str: '<h1>hello vue.js</h1>'
      }
    },
    methods: {
      add(a) {
        this.pn += a
      },
      cut(b) {
        this.pn -= b
      },
      print(arg){
        alert(arg)
      }
    }
  }
</script>

<style lang="scss">
  /*@import "./assets/scss/reset";*/

  /*body {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }*/
  .father {
    width: 200px;
    height: 200px;
    background: red;

    .son {
      width: 100px;
      height: 100px;
      background: yellow;
    }
  }
</style>
