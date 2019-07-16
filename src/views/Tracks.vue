<template>
    
    <div class="tracks-component">

        <!--the transition css part is located at the App component-->

        <div class="loader">
            <transition name="slide">
                <p class="loader" v-show="showLoader"></p>
            </transition>
        </div>

        <div class="searching-tracks" v-if="isMobile">
            <search-form v-if="isMobile"></search-form>
        </div>

        <div class="message">
            <transition name="slide">
                <span class="message-text" v-show="showMessage">{{message}}</span>
            </transition>
        </div>

        <div class="tracks">
            <track-info v-for="track in tracks" :key="track.id"
            :appear="showTrack" :info="track"></track-info>
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

            tracks: [],
            tracksLoading: null,
            backendError: false,
            firstLoadCompleted: false,
            showMessage: false,
            showLoader: true,
            showTrack: false,
            isMobile: window.screen.width <= 769
        }
    },

    watch:{
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

                if(this.tracksLoading === false){
                    //when tracksLoading is false it means the api call
                    //was successful so we can begin to count the number
                    //of tracks found

                    numberOfTracks = `we found ${this.tracks.length} tracks`
                }

                else if(this.firstLoadCompleted === true && this.tracksLoading === null){
                    //firstLoadCompleted will only be true once the initial
                    //api call is finished and it is successful otherwise it will
                    //remain as false
                    numberOfTracks = "0 searches, take a look at Aerosmith"
                }
            }
            return numberOfTracks
        }
    },

    methods:{

        ...mapActions(['getTrack']),

        tracksAreLoading(){
            this.showMessage = false
            this.showLoader = true
            this.showTrack = false
            this.tracksLoading = true
        },

        tracksAreDoneLoading(){
            this.showLoader = false
            this.showMessage = true
            this.showTrack = true
            this.tracksLoading = false
        },

        async getTracks(query){

            this.tracksAreLoading()

            //if there was a failed api call let message computed
            //property know
            if(this.backendError === true){
                this.backendError = false
            }

            //make api call
            try{
                let response = await searchTracks(query)
                this.tracks = response.data.tracks.items
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

        //method will be called when component is created()
        async presentApp(query){
            //make api call
            try{
               let trackResponse = await searchTracks(query)
               this.tracks = trackResponse.data.tracks.items
               this.firstLoadCompleted = true              
            }
            //tell component there was an error with the servers
            catch(error){
                this.backendError = true
            }
            //show message, tracks, and hide loader that is by default
            //already showing
            setTimeout(() => {
                this.showMessage = true
                this.showTrack = true
                this.showLoader = false
            }, 1500)

            if (this.tracks.length >= 3){
                setTimeout(() => {
                    this.getTrack(this.tracks[3].id)
                }, 2000)                
            }
        },

        onResize(){
            this.isMobile = window.screen.width <= 769
        }
    },

    components: {
        TrackInfo,
        //search form has an event-bus that we will listen and then
        //call getTracks with the value it returns
        SearchForm,
    },

    created(){
        console.log("tracks has been created")
        if(this.query === null){
            this.presentApp('aerosmith')
        }
        else{
            this.presentApp(this.query)
        }
    },

    mounted(){
        window.addEventListener('resize', this.onResize)
    }
}
</script>

<style>
@import './css/Tracks.css';
</style>
