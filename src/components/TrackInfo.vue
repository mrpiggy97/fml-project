<template>
    <div class="trackinfo-component" :class="[hasPreviewURL ? 'has-track' : 'no-track',
    selected ? 'selected' : 'unselected']" @click="selectTrack">
        <transition name="slide">
            <div class="track-image" :style="{backgroundImage: image_url}" v-show="appear">
                <div class="track-name">
                    <span>Name</span>
                    <span>{{track_name}}</span>
                </div>
            </div>
        </transition>

        <transition name="slide">
            <div class="track-artists" v-show="appear">
                <span>artists:</span>
                <span v-for="artist in artists"
                :key="artist.name" class="artist-name">{{artist.name}}</span> 
                <i class="fa fa-play w3-large play-icon"></i>                      
            </div>
        </transition>
    </div>
</template>

<script>
import { computed } from 'vue-function-api'

function layout(props){

    const track_name = computed(() => {
        return props.info.name
    })

    const image_url = computed(() => {
        let url = props.info.album.images[0].url
        return `url(${url})`
    })

    const artists = computed(() => {
        let musicians = []

        if(props.info.artists.length < 2){
            musicians.push(props.info.artists[0])
        }
        else{
            for(let i=0; i < 2; i++){
                musicians.push(props.info.artists[i])
            }
        }

        return musicians
    })

    const hasPreviewURL = computed(() => {
        return props.info.preview_url !== null
    })

    return {
        track_name,
        image_url,
        artists,
        hasPreviewURL
    }
}

function getStore(props, context){

    const trackId = computed(() => {

        let value = null
        let track = context.root.$store.state.track
        let trackIsObject = track instanceof Object

        if(trackIsObject === true){
            value = track.id
        }

        return value
    })

    const selected = computed(() => {

        let value = false

        if(trackId !== null){
            if(trackId === props.info.id){
                value = true
            }
        }

        return value
    })

    const selectTrack = () => {
        context.root.$store.dispatch('geteTrack', props.info.id)
    }

    return{
        selected,
        selectTrack
    }
}

export default {
    name: 'TrackInfo',

    props:{
        info: {type: Object, required: true},
        appear: {type: Boolean, required: true}
    },

    setup(props, context){

        const { track_name, image_url, artists, hasPreviewURL } = layout(props)
        const { selected, selectTrack } = getStore(props, context)

        return{
            track_name,
            image_url,
            artists,
            hasPreviewURL,
            selected,
            selectTrack
        }
    }
}
</script>

<style scoped>
@import './css/TrackInfo.css';
</style>
