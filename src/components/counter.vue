<template>
  <div>
    <button @click="$emit('add',step)">+</button>
    <span>{{num}}</span>
    <button @click="$emit('cut',step)">-</button>
  </div>
</template>

<script>
  export default {
    name: "counter",
    props:['num','step'],
    data(){
      return {

      }
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>