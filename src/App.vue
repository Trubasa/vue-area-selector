<template>
  <div id="app">
    <div style="height: 300px;position: relative;background-color: tan">
      <vue-area-selector color="red" @change="areaChange"></vue-area-selector>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods:{
      areaChange(data){
        console.log(data);
      }
    }
  }
</script>

<style lang="scss">

</style>
