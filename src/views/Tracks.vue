<template>
    
    <div class="tracks-component">

        <!--the transition css part is located at the App component-->

        <div class="loader">
            <transition name="slide">
                <p class="loader" v-show="tracks.loading"></p>
            </transition>
        </div>

        <div class="searching-tracks" v-if="isMobile">
            <search-form v-if="isMobile"></search-form>
        </div>

        <div class="message">
            <transition name="slide">
                <span class="message-text" v-show="message">{{message}}</span>
            </transition>
        </div>

        <div class="tracks">
            <track-info v-for="track in tracks.items" :key="track.id"
            :appear="tracks.showTrack" :info="track"></track-info>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapState } from 'vuex'

import searchTracks from '@/api_services/searchTracks.js'

import TrackInfo from '@/components/TrackInfo.vue'
import SearchForm from '@/components/SearchForm.vue'

import { setTimeout } from 'timers'

export default {
    name: 'Tracks',

    data(){
        return{

            tracks: {
                items: [],
                loading: true,
                showTrack: false
            },
            backendError: false,
            isMobile: window.screen.width <= 769,
            firstLoad: true
        }
    },

    watch:{
        //everytime query changes make api call
        query(newVal){
            this.getTracks(newVal)
        }
    },

    computed:{
        
        ...mapState(['query']),

        message(){

            let numberOfTracks = null;

            if(this.backendError === true){
                numberOfTracks = "there was an error with the servers"
            }

            else{

                if(this.tracks.items.length > 0){

                    numberOfTracks = `we found ${this.tracks.items.length} tracks`
                }
            }
            return numberOfTracks
        }
    },

    methods:{

        ...mapActions(['getTrack']),

        tracksAreLoading(){
            if(this.backendError === true){
                this.backendError = false
            }

            this.tracks.showTrack = false
            this.tracks.loading = true
        },

        tracksAreDoneLoading(){
            this.tracks.loading = false
            this.tracks.showTrack = true
        },

        async getTracks(query){

            if(this.firstLoad === false){
                this.tracksAreLoading()
            }

            //make api call
            try{
                let response = await searchTracks(query)
                this.tracks.items = response.data.tracks.items
            }
            //tell the component there was an error, computed property
            //message depends on this
            catch(error){
                this.backendError = true
            }
            //modify app presentation
            setTimeout(() => {
                this.tracksAreDoneLoading()
            }, 1000)
        },

        onResize(){
            this.isMobile = window.screen.width <= 769
        }
    },

    components: {
        TrackInfo,
        SearchForm,
    },

    created(){

        this.getTracks(this.query).then(() => {
            this.firstLoad = false

            if(this.tracks.items.length >= 3){
                let id = this.tracks.items[2].id
                this.getTrack(id)
            }
        })
    },

    mounted(){
        window.addEventListener('resize', this.onResize)
    }
}
</script>

<style>
@import './css/Tracks.css';
</style>
