<template>
    <div class="player-component" :style="{backgroundImage: imageURL}">
        <audio :src="state.song_preview" ref="player" @timeupdate="followingTime"
        :volume="volumeConverter">
        </audio>

        <i class="fa fa-play-circle-o player" @click="play" v-if="state.paused"></i>
        <i class="fa fa-pause-circle-o player" @click="pause" v-else></i>

        <input class="volume" type="range" v-model="state.volume" min="0" max="100"/>
        <input class="timer" type="range" min="0" max="30"
        :value="state.timer" ref="timer" @change="seekTime"/>
    </div>
</template>

<script>
import { state as setState, computed, watch } from 'vue-function-api'

function getComputedProperties(state){

    const imageURL = computed(() => {
        return `url(${state.images[0].url})`
    })

    const volumeConverter = computed(() => {
        return state.volume / 100
    })

    return{
        imageURL,
        volumeConverter
    }
}

export default {
    name: 'TrackPlayer',

    props:{
        info: {type: Object, required: true}
    },

    setup(props, context){

        const state = setState({
            song_preview: props.info.preview_url,
            volume: 30,
            timer: 0,
            images: props.info.album.images,
            paused: true
        })

        //computed properties
        const { imageURL, volumeConverter } = getComputedProperties(state)

        //methods
        const play = () => {
            context.refs.player.play()
            state.paused = false
        }

        const pause = () => {
            context.refs.player.pause()
            state.paused = true
        }

        const followingTime = () => {
            state.timer = context.refs.player.currentTime
        }

        const seekTime = () => {
            state.timer = context.refs.timer.value
            context.refs.player.currentTime = state.timer
        }

        watch(() => state.volume, (newVal) => {
            console.log(newVal)
        })

        return{
            state: state,
            imageURL,
            volumeConverter,
            play,
            pause,
            followingTime,
            seekTime
        }
    },
}
</script>

<style scoped>
@import './css/TrackPlayer.css';
</style>
