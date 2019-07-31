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
                <span class="message-text" v-show="showMessage">{{message}}</span>
            </transition>
        </div>

        <div class="tracks">
            <track-info v-for="track in tracks.items" :key="track.id"
            :appear="tracks.showTrack" :info="track"></track-info>
        </div>
    </div>
</template>

<script>
import { value, computed, onCreated, onMounted, watch } from 'vue-function-api'
import { setTimeout } from 'timers'
import searchTracks from '@/api_services/searchTracks.js'

import TrackInfo from '@/components/TrackInfo.vue'
import SearchForm from '@/components/SearchForm.vue'


function APICall(){
    //make the api call and provide the layout
    //for the app when loading tracks

    const tracks = value({
        items: [],
        showTrack: false,
        loading: true
    })
    const showMessage = value(false)
    const firstLoad = value(true)
    const backendError = value(false)

    //message will be displayed when call to api has been endend
    //its result will depend on state.tracks.items.length
    //and state.backendError
    const message = computed(() => {
        
        let numberOfTracks = null
        let itemsLength = tracks.value.items.length

        if(itemsLength > 0 && backendError.value === false){
            numberOfTracks = `we found ${itemsLength} tracks`
        }
        else if(itemsLength == 0 && backendError.value === true){
            numberOfTracks = 'sorry there was an error with the api'
        }

        return numberOfTracks
    })

    //began call to api
    const searching = () => {
        if(backendError.value === true){
            backendError.value = false
        }
        showMessage.value = false
        tracks.value.showTrack = false
        tracks.value.loading = true
    }

    //call to api has been completed
    const searchDone = () => {
        if(firstLoad.value === true){
            firstLoad.value = false
        }
        showMessage.value = true
        tracks.value.showTrack = true
        tracks.value.loading = false
    }
    
    //call to api
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
        showMessage,
        message,
        getTracks
    }
}

function mobileLayout(){
    //check if app should dispay a mobile layout
    
    const isMobile = value(window.screen.width <= 769)

    const onResize = (width) => {
        isMobile.value = width <= 769
    }

    return{
        isMobile,
        onResize
    }
}

function getStore(context){
    //get query and getTrack from store
    
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
        const { tracks, showMessage, message, getTracks } = APICall()
        let { isMobile, onResize } = mobileLayout()
        const { query, getTrack } = getStore(context)

        watch(() => query.value, (newVal) => {
            getTracks(newVal)
        })

        onCreated(() => {
            getTracks(query.value).then(() => {

                if(tracks.value.items.length >= 3){
                    let id = tracks.value.items[2].id
                    getTrack(id)
                }
            })
        })

        onMounted(() => {
            let width = window.screen.width
            window.addEventListener('resize', onResize(width))
        })

        return{
            tracks,
            showMessage,
            message,
            isMobile,
        }
    },
}
</script>

<style>
@import './css/Tracks.css';
</style>
