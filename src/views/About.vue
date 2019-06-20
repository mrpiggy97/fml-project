<template>
  <div class="view-about">

    <transition name="slide">
      <div class="general" v-show="showItems">

        <div class="title">
          <p>about the app</p>
        </div>

        <div class="sec-1">
          <img src="../vue.png"/>
        </div>

        <div class="sec-2">
          <p>the app consumes an api that returns a list of songs each
            song with a 30 second preview and a list of all artists involved 
            with it and also images ot the album        
          </p>
        </div>

      </div>
    </transition>

    <transition name="slide">
      <div class="general" v-show="showItems">
        <div class="title">
          <p>check the github page</p>
        </div>
        <div class="sec-1">
          <img src="../vue.png"/>
        </div>

        <div class="sec-2">
          <p>shit</p>
        </div>
      </div>
    </transition>

    <transition name="slide">
      <div class="general" v-show="showItems">
        <div class="sec-1">
          <img src="../vue.png"/>
        </div>

        <div class="sec-2">
          <p>shit</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {setTimeout} from 'timers'

export default {
  name: 'About',

  data(){
    return{
      showItems: false,
    }
  },

  created(){
    setTimeout(() => {
      this.showItems = true
    }, 1500)
  }
}
</script>

<style>

div.view-about{
  display: grid;
  grid-template-columns: 750px;
  grid-template-rows: repeat(3, 500px);
  justify-content: center;
  align-content: flex-start;
  grid-gap: 350px;
  border: red solid;
}

div.general{
  border: green solid;
  font-size: large;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1fr 3fr;
  grid-template-areas: "title title"
                        "sec-1 sec-2";
  justify-content: stretch;
  align-content: stretch;
  margin-top: 20px;
}

div.title{
  display: grid;
  grid-area: title;
  justify-items: center;
  align-items: center;
  font-size: x-large;
  color: teal;
  font-size: xx-large;
}

div.sec-1{
  display: grid;
  justify-items: center;
  align-items: center;
  grid-area: sec-1;
  border: red solid;
}

div.sec-2{
  display: grid;
  grid-area: sec-2;
  justify-items: center;
  align-items: center;
  grid-gap: 1%;
  font-size: medium;
  color: teal;
  border: navy solid
}

img{
  width: 90%;
  height: 50%;
}

@media screen and (max-width: 769px){

  div.view-about{
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 300px);
  }
}
</style>
