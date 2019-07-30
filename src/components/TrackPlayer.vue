<template>
    <div class="player-component" :style="{backgroundImage: imageURL}">
        <audio :src="song_preview" ref="player" @timeupdate="followingTime"
        :volume="volumeConverter">
        </audio>

        <i class="fa fa-play-circle-o player" @click="play" v-if="paused"></i>
        <i class="fa fa-pause-circle-o player" @click="pause" v-else></i>

        <input class="volume" type="range" v-model="volume" min="0" max="100"/>
        <input class="timer" type="range" min="0" max="30"
        :value="timer" ref="timer" @change="seekTime"/>
    </div>
</template>

<script>
import { state as setState, computed } from 'vue-function-api'

function playerControls(context){

    const state = ({
        controls: {
            volume: 30,
            paused: true
        }
    })

    const volumeConverter = computed(() => {
        return state.controls.volume / 100
    })

    const play = () => {
        context.refs.player.play()
        state.controls.paused = false
    }

    const pause = () => {
        context.refs.player.pause()
        state.controls.paused = true
        console.log("pausing")
    }

    return{
        play: play,
        pause: pause,
        paused: state.controls.paused,
        volume: state.controls.volume,
        volumeConverter
    }
}

function timing(context){

    const state = setState({
        timer: 0
    })

    const followingTime = () => {
        state.timer = context.refs.player.currentTime
    }

    const seekTime = () => {

        state.timer = context.refs.timer.value
        context.refs.player.currentTime = state.timer
    }

    return{
        timer: state.timer,
        followingTime,
        seekTime
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
        })

        const imageURL = computed(() => {

            let url = props.info.album.images[0].url
            return `url(${url})`
        })

        //methods and pause state
        const { play, pause, paused, volume, volumeConverter } = playerControls(context)
        const { timer, followingTime, seekTime }  = timing(context)

        return{
            song_preview: state.song_preview,
            volume,
            volumeConverter,
            imageURL,
            play,
            pause,
            paused,
            timer,
            followingTime,
            seekTime
        }
    },
}
</script>

<style scoped>
@import './css/TrackPlayer.css';
</style>
