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
import { value, computed, onMounted } from 'vue-function-api'
import TrackPlayer from '@/components/TrackPlayer.vue'
import SearchForm from '@/components/SearchForm.vue'

export default {
    name: 'MainHeader',

    components:{
    TrackPlayer,
    SearchForm,
    },

    setup(props, context){

        const showMenu = value(false)
        const isMobile = value(window.screen.width <= 769)
        const query = value('')

        const track = computed(() => {
            return context.root.$store.state.track
        })

        //show or close navbar if user is on mobile
        const slideMenu = () => {
            //if-else block can be replaced with this
            showMenu.value = (showMenu === true) ? false : true
        }
        //redirect methods
        const redirectHome = () => {
            context.root.$router.history.push({name: "tracks"})
        }

        const redirectAbout = () => {
            context.root.$router.history.push({name: "about"})
        }

        const onResize = (width) => {
            //check if app should show mobile layout
            isMobile.value = width <= 769
        }

        onMounted(() => {
            let width = window.screen.width
            window.addEventListener('resize', onResize(width))
        })

        return {
            showMenu,
            isMobile,
            query,
            track,
            slideMenu,
            redirectHome,
            redirectAbout,
        }
    }
}
</script>

<style>
@import '../css/MainHeader.css';
</style>
