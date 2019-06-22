<template>
  <div class="view-about">

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

      </div>
    </transition>

    <transition name="slide">
      <div class="stack" v-show="showItems">

        <div class="title-stack">
          <p>stack used</p>
        </div>

        <div class="stack-images">
          <img src="../vue.png" class="stack-image"/>
          <img src="../axios.png" class="stack-image"/>
          <img src="../vuex.png" class="stack-image"/>
          <img src="../css-grid.jpg" class="stack-image"/>
          <img src="../netlify.png" class="stack-image"/>
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
    }, 0.500)
  }
}
</script>

<style scoped>

div.view-about{
  display: grid;
  grid-template-columns: 800px;
  grid-template-rows: repeat(3, 400px);
  justify-content: center;
  align-content:initial;
  grid-gap: 20px;
  border: red solid;
  font-size: x-large;
  color: teal;
}

/*about layout*/
div.about{
  border: green solid;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 3fr;
  grid-template-areas: "title-about"
                        "description";
  justify-content: stretch;
  align-content: stretch;
}

div.title-about{
  display: grid;
  grid-area: title-about;
  justify-items: center;
  align-items: center;
}

div.description{
  display: grid;
  justify-items: center;
  align-items: center;
  grid-area: description;
  border: red solid;
}

/*end of about layout*/

/*start of stack layout*/
div.stack{
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 4fr;
  grid-template-areas: "title-stack"
                       "stack-images";
  grid-gap: 0px;
  border: navy solid;
}

div.title-stack{
  display: grid;
  grid-area: title-stack;
  justify-items: center;
}

div.stack-images{
  display: grid;
  grid-area: stack-images;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
}

img.stack-image{
  height: 40%;
  width: 80%;
}

/*end of stack layout*/

@media screen and (max-width: 769px){

  div.view-about{
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 300px);
  }
}
</style>
