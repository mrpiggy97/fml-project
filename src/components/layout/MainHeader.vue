<template>
    <div class="header-component">
        <!--slider menu for mobile-->
        <transition name="slide">
            <div class="slide-menu" v-show="showMenu">
                <div class="mobile-home">
                    <i class="fa fa-home mobile-navbar" @click="redirectHome"></i>
                </div>
                <div class="mobile-about">
                    <span @click="redirectAbout">about</span>
                </div>
            </div>
        </transition>

        <div class="navbar">
            <!--if mobile render this-->
            <div class="links" v-if="isMobile">
                <i class="fa fa-bars" @click="slideMenu"></i>
            </div>

            <!--if desktop render this-->
            <div class="links" v-else>
                <span class="logo generic-navbar" @click="redirectHome">FML</span>
                <span class="generic-navbar" @click="redirectHome">Home</span>
                <span class="generic-navbar" @click="redirectAbout">about the app</span>
            </div>
            <!--only render searchform in this component when on dektop-->
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
import TrackPlayer from '@/components/TrackPlayer.vue'
import SearchForm from '@/components/SearchForm.vue'

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
            //if else block can be replaced by this
            this.showMenu = (this.showMenu === true) ? false : true
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
@import '../css/MainHeader.css';
</style>
