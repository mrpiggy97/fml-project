<template>
    <div class="desktop-header">

        <div class="desktop-navbar">
            <span class="generic-desktop" @click="redirectHome">FML</span>
            <span class="generic-desktop" @click="redirectAbout">about the app</span>
        </div>

        <transition name="slide">
            <div class="desktop-player" v-show="trackSearched">
                <track-player v-if="trackIsObject" :info="track"></track-player>
                <span class="player-message" v-else-if="trackIsNull">{{error_message}}</span>
            </div>
        </transition>
    </div>
</template>

<script>
import TrackPlayer from '../TrackPlayer.vue'

import { mapState } from 'vuex'

export default {
    name: 'DesktopHeader',

    computed:{
        ...mapState(['track', 'error_message']),
        
        trackIsObject(){
            return this.track instanceof Object
        },

        trackIsNull(){
            return this.track === null
        },

        trackSearched(){

            let value = false

            if(this.trackIsObject === true || this.trackIsNull === true){
                value = true
            }
            
            return value
        },
    },

    components: {
        TrackPlayer
    },

    methods:{
        redirectHome(){
            this.$router.history.push({name: "tracks"})
        },

        redirectAbout(){
            this.$router.history.push({name: "about"})
        }
    }
}
</script>

<style>
div.desktop-header{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas: "desktop-navbar"
                         "desktop-player";
    grid-gap: 4px;
    position: fixed;
    min-width: 100%;
    min-height: 20%;
    max-height: 20%;
    z-index: 1000;
}

div.desktop-navbar{
    display: grid;
    grid-area: desktop-navbar;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    align-items: center;
    border: green solid;
    background-color: white;
}

div.desktop-player{
    display: grid;
    grid-area: desktop-player;
    justify-self: center;
    max-width: 50%;
    min-width: 50%;
    background-color: teal;
    border: navy solid;
}

span.generic-desktop{
    font-size: xx-large;
    color: teal;
    cursor: pointer;
}

span.player-message{
    display: grid;
    justify-self: center;
    align-self: center;
    font-size: xx-large;
    color: white;
}
</style>
