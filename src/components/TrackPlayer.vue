<template>
    <div class="player-component" :style="{backgroundImage: image_url}">
        <audio :src="song_preview" ref="player" @timeupdate="logTime" volume="volumeConverter">
        </audio>

        <i class="fa fa-play-circle-o player" @click="play" v-if="paused"></i>
        <i class="fa fa-pause-circle-o player" @click="pause" v-else></i>

        <input class="volume" type="range" min="0" max="100"
            :value="volume" ref="volume" @change="changeVolume"/>
        <input class="timer" type="range" min="0" max="30"
            :value="timer" ref="timer" @change="logSeeked"/>
    </div>
</template>

<script>
export default {
    name: 'TrackPlayer',

    props:{
        info: {type: Object, required: true}
    },

    data(){
        return{
            timer: 0,
            volume: 30,
            volumeConverter: 30/100,
            paused: true,
        }
    },

    computed:{

        song_preview(){

            let url = null
            
            if(this.info.preview_url){
                url = this.info.preview_url
            }

            return url
        },

        image_url(){

            let url = null

            if(this.info.album){
                url = `url(${this.info.album.images[0].url})`
            }

            return url
        },

        track_name(){

            let name = null

            if(this.info.name){
                name = this.info.name
            }

            return name
        },
    },

    methods:{

        play(){

            if(this.paused === false){
                return null
            }
            
            this.$refs.player.play()
            this.paused = false
        },

        pause(){

            if(this.paused === true){
                return null                
            }

            this.$refs.player.pause()
            this.paused = true
        },

        logTime(){
            this.timer = this.$refs.player.currentTime

            if(this.timer > 29.91000){
                this.timer = 0
            }
        },

        logSeeked(){
            this.timer = this.$refs.timer.value
            this.$refs.player.currentTime = this.timer
        },

        changeVolume(){
            this.volume = this.$refs.volume.value
            this.volumeConverter = this.volume / 100
            this.$refs.player.volume = this.volumeConverter
        }
    },
}
</script>

<style scoped>
@import './css/TrackPlayer.css';
</style>
