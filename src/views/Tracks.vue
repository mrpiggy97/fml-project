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
import { onCreated, onMounted, watch } from 'vue-function-api'

import searchTracks from '@/api_services/searchTracks.js'

import TrackInfo from '@/components/TrackInfo.vue'
import SearchForm from '@/components/SearchForm.vue'

import { setTimeout } from 'timers'
import setStateAndComputed from './functions/Tracks';

export default {
    name: 'Tracks',

    setup(props, context){

        //state
        const {tracks, backendError, isMobile, message, query} = setStateAndComputed(context)

        const searchForTrack = (id) => {
            context.root.$store.dispatch('getTrack', id)
        }

        //methods
        const getTracks = async (querySearch) => {
            
            if(tracks.value.loading === false){
                tracks.value.loading = true
            }

            if(backendError.value === true){
                backendError.value = false
            }

            try{
                let response = await searchTracks(querySearch)
                tracks.value.items = response.data.tracks.items
            }

            catch(error){
                backendError.value = true
            }

            setTimeout(() => {
                tracks.value.loading = false
                tracks.value.showTrack = true
            }, 1000)
        }

        const onResize = () => {
            isMobile.value = window.screen.width <= 769
        }

        watch(() => query.value, (newVal) => {
            getTracks(newVal)
        })

        onMounted(() => {
            onResize()
        })

        onCreated(() => {
            getTracks(query.value).then(() => {
                searchForTrack(tracks.value.items[2].id)
            })
        })

        return{
            tracks,
            message,
            isMobile,
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
