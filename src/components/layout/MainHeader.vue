<template>
    <div class="header-component">
        <transition name="slide">
            <div class="slide-menu" v-show="showMenu">
                <span class="mobile-navbar" @click="redirectHome">home</span>
                <span class="mobile-navbar" @click="redirectAbout">about</span>
            </div>
        </transition>

        <!-- render navbar based on mobile or desktop-->

        <div class="navbar">

            <div class="links" v-if="isMobile">
                <i class="fa fa-bars" @click="slideMenu"></i>
            </div>

            <div class="links" v-else>
                <span class="logo generic-navbar" @click="redirectHome">FML</span>
                <span class="generic-navbar" @click="redirectHome">home</span>
                <span class="generic-navbar" @click="redirectAbout">about</span>
            </div>

            <div class="search" v-if="isMobile === false">
                <search-form></search-form>
            </div>

        </div>

        <!--render player component with transition-->
        <transition name="slide">
            <div class="player" v-show="track">
                <track-player :info="track" v-if="track"></track-player>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import TrackPlayer from '../TrackPlayer.vue'
import SearchForm from '../SearchForm.vue'

export default {
    name: 'MainHeader',
    data(){
        return{
            showMenu: false,
            isMobile: window.screen.width <= 769,
            query: '',
        }
    },

    components:{
        TrackPlayer,
        SearchForm,
    },

    computed:{
        ...mapState(['track'])
    },

    methods:{
        //show or close navbar if user is on mobile
        slideMenu(){
            if(this.showMenu === true){
                this.showMenu = false
            }

            else{
                this.showMenu = true
            }
        },
        //redirect methods
        redirectHome(){
            this.$router.history.push({name: "tracks"})
        },

        redirectAbout(){
            this.$router.history.push({name: "about"})
        },

        onReszie(){
            //check if app should show mobile layout
            this.isMobile = window.screen.width <= 769
        }
    },

    mounted(){
        window.addEventListener('resize', this.onReszie)
    }
}
</script>

<style>

div.header-component{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas: "navbar"
                         "player";
    grid-gap: 5px;
    position: fixed;
    min-width: 100%;
    max-width: 100%;
    min-height: 20%;
    max-height: 20%;
    color: teal;
    font-size: x-large;
}

div.navbar{
    display: grid;
    grid-area: navbar;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-template-areas: "links search";
    background-color: white;
    border-bottom: purple solid 1px;
}

div.links{
    display: grid;
    grid-area: links;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    justify-items: left;
    align-items: center;
    color: teal;
    font-size: large;
}

div.search{
    display: grid;
    grid-area: search;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    align-content: center;
}

div.player{
    display: grid;
    grid-area: player;
    min-width: 50%;
    max-width: 50%;
    justify-self: center;
    background-color: transparent;
    border: navy solid;
}

div.slide-menu{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 100px);
    justify-content: center;
    align-content: flex-start;
    position: fixed;
    min-width: 20%;
    max-width: 20%;
    min-height: 101%;
    max-height: 101%;
    z-index: 1000;
    top: 70px;
    background-color: teal;
    color: white;
    font-size: x-large;
}

span.generic-navbar{
    cursor: pointer;
}

span.mobile-navbar{
    margin-top: 100px;
}

span.logo{
    color: purple;
    font-size: xx-large;
}

@media screen and (max-width: 769px){

    div.header-component{
        min-height: 150px;
        max-height: 150px;
        grid-gap: 0px;
    }

    div.player{
        max-width: 100%;
        min-width: 100%;
        justify-items: stretch;
        align-items: stretch;
    }
}
</style>
