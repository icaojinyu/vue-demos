<template>
  <div id="app">
    <mobile-slide></mobile-slide>
  </div>
</template>

<script>

  import mobileSlide from './components/mobile-slide'

  export default {
    name: 'app',
    components: {
      mobileSlide
    }
  }
</script>

<style lang="scss">
  @import "./assets/scss/reset";

  body {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
