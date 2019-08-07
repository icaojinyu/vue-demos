<template>
  <h1>lewis</h1>
</template>

<script>
  export default {
    name: "bg-img"
  }
</script>

<style>
  body {
    background: #6295FF;
  }

  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url("../assets/imgs/bg.jpg") 50% 50% no-repeat;
    background-size: cover;
    font-size: 120px;
    letter-spacing: 20px;
    font-weight: bold;
    text-transform: uppercase;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
  }
</style>