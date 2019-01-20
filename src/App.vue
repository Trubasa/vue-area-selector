<template>
  <div id="app">
    <div style="height: 300px;position: relative;background-color: tan">
      <vue-area-selector color="#efefef"
                         :show-icon="true"
                         @change="areaChange"></vue-area-selector>
    </div>
    <pre>{{areaData}}</pre>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        areaData:null
      }
    },
    methods:{
      areaChange(data){
        console.log(data);
        this.areaData=data;
      }
    }
  }
</script>

<style lang="scss">

</style>
