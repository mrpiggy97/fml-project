<template>
    <div class="player-component" :style="{backgroundImage: imageURL}">
        <audio :src="songPreview" ref="player" @timeupdate="followingTime"
        :volume="volume / 100">
        </audio>

        <i class="fa fa-play-circle-o player" @click="play" v-if="paused"></i>
        <i class="fa fa-pause-circle-o player" @click="pause" v-else></i>

        <input class="volume" type="range" min="0" max="100" ref="volume"
        value="30" @change="changeVolume"/>
        <input class="timer" type="range" min="0" max="30"
        :value="timer" ref="timer" @change="seekTime"/>
    </div>
</template>

<script>
import { value, computed } from 'vue-function-api'

function controls(context){
    //provide controls for the player

    const paused = value(true)
    const volume = value(30)

    const play = () => {
        context.refs.player.play()
        paused.value = false
    }

    const pause = () => {
        context.refs.player.pause()
        paused.value = true
    }

    const changeVolume = () => {
        context.refs.player.volume = context.refs.volume.value / 100
    }

    return{
        paused,
        volume,
        changeVolume,
        play,
        pause,
    }
}

function playerTime(context){
    //control the layout related to the timer
    //of the track
    const timer = value(0)

    const followingTime = () => {
        timer.value = context.refs.player.currentTime
    }

    const seekTime = () => {
        timer.value = context.refs.timer.value
        context.refs.player.currentTime = timer.value
    }

    return{
        timer,
        followingTime,
        seekTime
    }
}

function audioPlayerInfo(props){
    //provide the image for the background
    //and the source of the track
    const songPreview = computed(() => {
        return props.info.preview_url
    })

    const imageURL = computed(() => {
        let url = props.info.album.images[0].url
        return `url(${url})`
    })

    return{
        songPreview,
        imageURL
    }
}

export default {
    name: 'TrackPlayer',

    props:{
        info: {type: Object, required: true}
    },

    setup(props, context){

        const { paused, volume, changeVolume, play, pause } = controls(context)
        const { timer, followingTime, seekTime } = playerTime(context)
        const { songPreview, imageURL } = audioPlayerInfo(props)

        return{
            paused,
            volume,
            changeVolume,
            play,
            pause,
            timer,
            followingTime,
            seekTime,
            songPreview,
            imageURL
        }
    },
}
</script>

<style scoped>
@import './css/TrackPlayer.css';
</style>
