<template>
  <div class="view-about">

    <transition name="slide">
      <div class="github" v-show="showItems">
        <a href="https://github.com/mrpiggy97/fml-project" target="blank">Github Repo</a>
      </div>
    </transition>

    <transition name="slide">
      <div class="stack" v-show="showItems">

        <div class="title-stack">
          <p>stack used</p>
        </div>

        <div class="stack-images">
          <img src="../images/vue.png" class="stack-image"/>
          <img src="../images/axios.png" class="stack-image"/>
          <img src="../images/vuex.png" class="stack-image"/>
          <img src="../images/css-grid.jpg" class="stack-image"/>
          <img src="../images/netlify.png" class="stack-image"/>
          <img src="../images/github.png" class="stack-image"/>
        </div>
      </div>
    </transition>

    <transition name="slide">
      <div class="about" v-show="showItems">

        <div class="title-about">
          <p>about the app</p>
        </div>

        <div class="description">
          <p>the app consumes an api that returns a list of songs each
            song with a 30 second preview and a list of all artists involved 
            with it and also images ot the album        
          </p>
        </div>

        <div class="screenshot">
          <img src="../images/screenshot.png" class="screenshot"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { setTimeout } from 'timers'
import { value, onCreated } from 'vue-function-api'

export default {
  name: 'About',

  setup(){
    //state
    const showItems = value(false)

    onCreated(() => {
      setTimeout(() => {
        showItems.value = true
      }, 0.500)
    })

    return{
      showItems
    }
  }
}
</script>

<style scoped>
@import './css/About.css';
</style>
