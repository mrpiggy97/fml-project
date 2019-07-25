<template>
    
    <div class="tracks-component">

        <!--the transition css part is located at the App component-->

        <div class="loader">
            <transition name="slide">
                <p class="loader" v-show="loading"></p>
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
            <track-info v-for="track in tracks" :key="track.id"
            :appear="showTrack" :info="track"></track-info>
        </div>
    </div>
</template>

<script>
import { value, computed,  onCreated, onMounted, watch } from 'vue-function-api'
import generalState from './functions/TracksFunctions.js'

import searchTracks from '@/api_services/searchTracks.js'

import TrackInfo from '@/components/TrackInfo.vue'
import SearchForm from '@/components/SearchForm.vue'

import { setTimeout } from 'timers'

export default {
    name: 'Tracks',

    setup(props, context){

        //state
        const {tracks, loading, backendError, message, showTrack} = generalState()
        const isMobile = value(window.screen.width <= 769)

        const query = computed(() => {
            return context.root.$store.state.query
        })

        const searchForTrack = (id) => {
            context.root.$store.dispatch('getTrack', id)
        }

        //methods
        const getTracks = async (querySearch) => {
            
            if(loading.value === false){
                loading.value = true
            }

            if(backendError.value === true){
                backendError.value = false
            }

            try{
                let response = await searchTracks(querySearch)
                tracks.value = response.data.tracks.items
            }

            catch(error){
                backendError.value = true
            }

            setTimeout(() => {
                loading.value = false
                showTrack.value = true
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
                searchForTrack(tracks.value[2].id)
            })
        })

        return{
            tracks,
            loading,
            message,
            showTrack,
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
