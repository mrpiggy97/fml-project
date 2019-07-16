<template>
  <div id="app" class="container">

    <div class="header">
      <main-header></main-header>
    </div>

    <div class="views-section">
        <router-view></router-view>
    </div>

    <div class="footer">
      <span class="home">FML</span>
      <span class="home">all rights reserved</span>
    </div>

  </div>
</template>

<script>
import MainHeader from './components/layout/MainHeader.vue'

export default {
  name: 'App',

  components:{
    MainHeader
  },

  methods:{
    redirectHome(){
      this.$router.history.push({name:"tracks"})
    },
  },
}
</script>


<style>
@import './App.css';
</style>
