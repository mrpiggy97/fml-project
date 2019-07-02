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

body{
  margin: 0;
  background-color: white;
  font-family: helvetica;
}

div.container{
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2fr 50fr 2fr;
  grid-template-areas: "header"
                       "views-section"
                       "footer";
  grid-gap: 100px;
  min-height: 2200px;
  max-height: 2200px;
}

div.header{
  display: grid;
  z-index: 1000;
  width: 100%;
  position: fixed;
  grid-area: header;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  min-height: 20%;
  max-height: 20%;
}
/*end of player related layout*/

/*each view will manipulate the views-section at its will*/
div.views-section{
  display: grid;
  grid-area: views-section;
  border: teal solid;
  border-radius: 5px;
  background-color: snow;
}

div.footer{
  display: grid;
  grid-area: footer;
  justify-items: center;
  align-items: center;
  border: teal solid;
  border-radius: 5px;
}

.slide-enter-active {
transition: all .8s ease;
}

.slide-leave-active {
transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-enter, .slide-leave-to{
transform: translateX(10px);
opacity: 0;
}

@media screen and (max-width: 769px){

  div.container{
    grid-template-rows: 2fr 49fr 2fr;
    min-height: 2000px;
    max-height: 2000px;
  }
}
</style>
