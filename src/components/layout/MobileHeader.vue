<template>
    <div class="mobile-header">
        <transition name="slide">
            <div class="slide-menu" v-show="showMenu">
                <span class="generic-mobile" @click="redirectHome">FML</span>
                <span class="generic-mobile" @click="redirectAbout">about</span>
            </div>
        </transition>
        
        <div class="mobile-navbar">
            <i class="fa fa-bars menu-slider" @click="slideMenu"></i>
        </div>

        <transition name="slide">
            <div class="mobile-player" v-show="trackSearched">
                <track-player v-if="trackIsObject" :info="track"></track-player>
                <span class="mobile-message" v-else-if="trackIsNull">{{error_message}}</span>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapState } from 'vuex'

import TrackPlayer from '../TrackPlayer.vue'

export default {
    name: 'MobileHeader',

    data(){
        return{
            showMenu: false
        }
    },

    components:{
        TrackPlayer,
    },

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
        }
    },

    methods:{
        slideMenu(){

            if(this.showMenu === true){
                this.showMenu = false
            }

            else{
                this.showMenu = true
            }
        },

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

div.mobile-header{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas: "mobile-navbar"
                            "mobile-player";
    min-height: 150px;
    max-height: 150px;
    position: fixed;
    z-index: 1000;
    min-width: 100%;
    max-width: 100%;
    justify-content: stretch;
    align-content: stretch;
}

div.mobile-navbar{
    display: grid;
    grid-area: mobile-navbar;
    justify-items: left;
    align-items: center;
    border: red solid;
    background-color: white;
}

div.mobile-player{
    display: grid;
    grid-area: mobile-player;
    border: navy solid;
    background-color: transparent;
}

div.slide-menu{
    display: grid;
    position: fixed;
    top: 70px;
    justify-items: center;
    align-items: center;
    min-width: 20%;
    max-width: 20%;
    min-height: 100%;
    max-height: 100%;
    z-index: 1000;
    background-color: teal;

}

span.generic-mobile{
    color: white;
    font-size: xx-large;
    cursor: pointer;
}

span.mobile-message{
    display: grid;
    justify-self: center;
    align-self: center;
    font-size: xx-large;
    color: purple;
}

i.menu-slider{
    color: purple;
    font-size: xx-large;
}
</style>
