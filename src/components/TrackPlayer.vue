<template>
    <div class="player-component" :style="{backgroundImage: image_url}">
        <audio :src="song_preview" ref="player" @timeupdate="logTime" :volume="volume_converter">
        </audio>

        <i class="fa fa-play-circle-o player" @click="play" v-if="paused"></i>
        <i class="fa fa-pause-circle-o player" @click="pause" v-else></i>

        <input class="volume" type="range" v-model="volume" min="0" max="100"/>
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
            volume: 25,
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

        volume_converter(){
            //transform volume so it can be compatible with the audio tag
            return this.volume/100
        }
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
    },
}
</script>

<style scoped>

div.player-component{
    display: grid;
    grid-template-columns: 1fr 5fr 5fr;
    grid-template-rows: 1fr;
    justify-items: stretch;
    align-items: center;
    grid-gap: 20px;
    border: purple solid;
    background-position: center;
    background-size: cover;
}

i.player{
    color: teal;
    border: none;
    font-size: xx-large;
}

.volume{
    -webkit-appearance: none;
    background-color: teal;
    border-radius: 10px;
    cursor: not-allowed;
    pointer-events: none;
}

.volume::-webkit-slider-thumb{
    -webkit-appearance: none;
    appearance: none;
    background-color: snow;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    pointer-events: auto;
}

.timer{
    -webkit-appearance: none;
    background-color: teal;
    border-radius: 10px;
    pointer-events: auto;
}

.timer::-webkit-slider-thumb{
    -webkit-appearance: none;
    appearance: none;
    background-color: snow;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    pointer-events: auto;
}

</style>
