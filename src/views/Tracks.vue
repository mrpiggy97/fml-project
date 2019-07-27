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
                <span class="message-text" v-show="tracks.loading === false">{{message}}</span>
            </transition>
        </div>

        <div class="tracks">
            <track-info v-for="track in tracks.items" :key="track.id"
            :appear="tracks.showTrack" :info="track"></track-info>
        </div>
    </div>
</template>

<script>
import { value, onCreated, onMounted, watch, computed } from 'vue-function-api'
import { setTimeout } from 'timers'
import searchTracks from '@/api_services/searchTracks.js'

import TrackInfo from '@/components/TrackInfo.vue'
import SearchForm from '@/components/SearchForm.vue'


function APICall(){

    const tracks = value({items: [], loading: true, showTrack: false})
    const firstLoad = value(true)
    const backendError = value(false)
    const message = computed(() => {
        
        let numberOfTracks = null

        if(tracks.value.items.length > 0 && backendError.value === false){
            numberOfTracks = `we found ${tracks.value.items.length} tracks`
        }
        else if(tracks.value.items.length == 0 && backendError.value === true){
            numberOfTracks = 'sorry there was an error with the api'
        }

        return numberOfTracks
    })

    const searching = () => {
        if(backendError.value === true){
            backendError.value = false
        }
        tracks.value.loading = true
        tracks.value.showTrack = false
    }

    const searchDone = () => {
        tracks.value.loading = false
        tracks.value.showTrack = true
    }

    const getTracks = async (querySearch) => {
        
        if(firstLoad.value === false){
            searching()
        }

        try{
            let response = await searchTracks(querySearch)
            tracks.value.items = response.data.tracks.items
        }

        catch(error){
            backendError.value = true
        }

        setTimeout(() => {
            searchDone()
        }, 1000)
    }

    return{
        tracks,
        firstLoad,
        message,
        getTracks
    }
}

function mobileLayout(){

    const isMobile = value(window.screen.width <= 769)

    const onResize = () => {
        isMobile.value = window.screen.width <= 769
    }

    return{
        isMobile,
        onResize
    }
}

function getStore(context){
    
    const query = computed(() => {
        return context.root.$store.state.query
    })

    const getTrack = (id) => {
        context.root.$store.dispatch('getTrack', id)
    }

    return{
        query,
        getTrack
    }
}


export default {
    name: 'Tracks',

    setup(props, context){

        //state and computed
        const { tracks, firstLoad, message, getTracks } = APICall()
        const { isMobile, onResize } = mobileLayout()
        const { query, getTrack } = getStore(context)

        watch(() => query.value, (newVal) => {
            getTracks(newVal)
        })

        onMounted(() => {
            onResize()
        })

        onCreated(() => {
            getTracks(query.value).then(() => {
                firstLoad.value = false

                if(tracks.value.items.length >= 3){
                    let id = tracks.value.items[2].id
                    getTrack(id)
                }
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
