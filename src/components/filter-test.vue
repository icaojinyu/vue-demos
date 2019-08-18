<template>
  <div>
    <h3>{{time|formatTime|afterFormatTime('我是参数1','我是参数2')}}</h3>
  </div>
</template>

<script>
  export default {
    name: "filter-test",
    data() {
      return {
        time: new Date()
      }
    }
  }
</script>

<style>

</style>