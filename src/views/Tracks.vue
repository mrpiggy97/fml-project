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
                <span class="message-text" v-show="tracks.showMessage">{{message}}</span>
            </transition>
        </div>

        <div class="tracks">
            <track-info v-for="track in tracks.items" :key="track.id"
            :appear="tracks.showTrack" :info="track"></track-info>
        </div>
    </div>
</template>

<script>
import { state as setState, onCreated, onMounted, watch, computed } from 'vue-function-api'
import { setTimeout } from 'timers'
import searchTracks from '@/api_services/searchTracks.js'

import TrackInfo from '@/components/TrackInfo.vue'
import SearchForm from '@/components/SearchForm.vue'


function APICall(){

    const state = setState({
        tracks: {
            items: [],
            loading: true,
            showTrack: false,
            showMessage: false
        },
        firstLoad: true,
        backendError: false,
    })

    //message will be displayed when call to api has been endend
    //its result will depend on state.tracks.items.length
    //and state.backendError
    const message = computed(() => {
        
        let numberOfTracks = null
        let itemsLength = state.tracks.items.length

        if(itemsLength > 0 && state.backendError === false){
            numberOfTracks = `we found ${itemsLength} tracks`
        }
        else if(itemsLength == 0 && state.backendError === true){
            numberOfTracks = 'sorry there was an error with the api'
        }

        return numberOfTracks
    })

    //began call to api
    const searching = () => {
        if(state.backendError === true){
            state.backendError = false
        }
        state.tracks.showMessage = false
        state.tracks.loading = true
        state.tracks.showTrack = false
    }

    //call to api has been completed
    const searchDone = () => {
        if(state.firstLoad === true){
            state.firstLoad = false
        }
        state.tracks.showMessage = true
        state.tracks.loading = false
        state.tracks.showTrack = true
    }
    
    //call to api
    const getTracks = async (querySearch) => {
        
        if(state.firstLoad === false){
            searching()
        }

        try{
            let response = await searchTracks(querySearch)
            state.tracks.items = response.data.tracks.items
        }

        catch(error){
            state.backendError = true
        }

        setTimeout(() => {
            searchDone()
        }, 1000)
    }

    return{
        tracks: state.tracks,
        message,
        getTracks
    }
}

function mobileLayout(){

    const state = setState({
        isMobile: window.screen.width <= 769
    })

    const onResize = () => {
        state.isMobile = window.screen.width <= 769
    }

    return{
        isMobile: state.isMobile,
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

    components: {
        TrackInfo,
        SearchForm,
    },

    setup(props, context){

        //state and computed
        const { tracks, message, getTracks } = APICall()
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

                if(tracks.items.length >= 3){
                    let id = tracks.items[2].id
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
}
</script>

<style>
@import './css/Tracks.css';
</style>
