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
import { value, computed,  onCreated, onMounted, watch } from 'vue-function-api'

import searchTracks from '@/api_services/searchTracks.js'

import TrackInfo from '@/components/TrackInfo.vue'
import SearchForm from '@/components/SearchForm.vue'

import { setTimeout } from 'timers'

export default {
    name: 'Tracks',

    setup(props, context){

        //state
        const tracks = value([])
        const tracksLoading = value(true)
        const backendError = value(false)
        const showMessage = value(false)
        const showLoader = value(true)
        const showTrack = value(false)
        const isMobile = value(window.screen.width <= 769)

        //computed
        const query = computed(() => {
            return context.root.$store.state.query
        })

        const message = computed(() => {

            let numberOfTracks = null;

            if(backendError.value === true){
                numberOfTracks = "there was an error with the servers"
            }

            else{

                if(tracksLoading.value === false){
                    //when tracksLoading is false it means the api call
                    //was successful so we can begin to count the number
                    //of tracks found

                    numberOfTracks = `we found ${tracks.value.length} tracks`
                }
            }
            return numberOfTracks
        })

        //methods
        const searchForTrack = (id) => {
            context.root.$store.dispatch('getTrack', id)
        }

        const tracksAreLoading = () => {
            if(backendError.value === true){
                backendError.value = false
            }

            showTrack.value = false
            showMessage.value = false
            showLoader.value = true
            tracksLoading.value = true
        }

        const tracksAreDoneLoading = () => {
           tracksLoading.value = false
           showLoader.value = false
           showMessage.value = true
           showTrack.value = true
        }

        const getTracks = async (words) => {

            tracksAreLoading()

            //make api call
            try{
                let response = await searchTracks(words)
                tracks.value = response.data.tracks.items
            }
            //tell the component there was an error, computed property
            //message depends on this
            catch(error){
                console.log(error)
                backendError.value = true
            }
            //modify app presentation
            setTimeout(() => {
                tracksAreDoneLoading()
            }, 1000)
        }

        //method will be called when component is created
        const presentApp = async (words) => {
            //make api call
            try{
               let trackResponse = await searchTracks(words)
               tracks.value = trackResponse.data.tracks.items       
            }
            //tell component there was an error with the servers
            catch(error){
                console.log(error)
                backendError.value = true
            }
            //show message, tracks, and hide loader that is by default
            //already showing
            setTimeout(() => {
                tracksAreDoneLoading()
            }, 1500)

            if (tracks.value.length >= 3){
                setTimeout(() => {
                    searchForTrack(tracks.value[3].id)
                }, 2000)                
            }
        }

        const onResize = () => {
            isMobile.value = window.screen.width <= 769
        }

        onCreated(() => {
            if(query.value === null){
                presentApp('aerosmith')
            }
            else{
                presentApp(query.value)
            }
        })

        onMounted(() => {
            window.addEventListener('resize', onResize())
        })

        watch(
            () => query.value, (newVal) => {
                getTracks(newVal)
            }
        )

        return{
            //state
            tracks,
            tracksLoading,
            showMessage,
            showLoader,
            showTrack,
            isMobile,
            //computed
            query,
            message,
            //methods
            searchForTrack,
            getTracks,
            presentApp,
            tracksAreLoading,
            tracksAreDoneLoading,
            onResize,
        }
    },

    components: {
        TrackInfo,
        SearchForm,
    },
}
</script>

<style>
@import './css/Tracks.css';
</style>
