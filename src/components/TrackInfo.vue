<template>
    <div class="trackinfo-component" :class="[has_preview_url ? 'has-track' : 'no-track',
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
                <span v-for="artist in artists" :key="artist.name">{{artist.name}}</span> 
                <i class="fa fa-play w3-large play-icon"></i>                      
            </div>
        </transition>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'TrackInfo',

    props:{
        info: {type: Object, required: true},
        appear: {type: Boolean, required: true}
    },

    computed: {
        ...mapState(['track']),

        selected(){

            let value = false

            let trackType = this.track instanceof Object
            
            if(trackType === true && this.track.id == this.id){
                value = true
            }                
            //if track was selected it should be an Object

            return value
        },

        image_url(){
            let value = null

            if(this.info.album){
                if(this.info.album.images[0]){
                    value = `url(${this.info.album.images[0].url})`                    
                }
            }

            return value
        },

        artists(){

            let musicians = []
            let length = this.info.artists.length

            for(let i=0; i < length; i++){
                musicians.push({name: this.info.artists[i].name})
            }

            return musicians
        },

        id(){
            return this.info.id
        },

        track_name(){
            return this.info.name
        },

        has_preview_url(){
            return this.info.preview_url !== null
        },
    },

    methods: {
        ...mapActions(['getTrack']),

        selectTrack(){

            if(this.has_preview_url === true){
                this.getTrack(this.id)
            }

            else if(this.has_preview_url === false){
                return null
            }
        },
    }
}
</script>

<style scoped>

div.trackinfo-component{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2fr 1fr;
    grid-template-areas: "track-image"
                         "track-artists";
    justify-content: stretch;
    align-content: stretch;
    background-color: transparent;
}

div.track-image{
    display: grid;
    grid-area: track-image;
    justify-items: stretch;
    align-items: stretch;
    background-size: cover;
    background-position: center;
    color: white;
}

div.track-name{
    display:  grid;
    justify-items: center;
    align-items: center;
    background-color: rgba(0,0,0,0.4);
}

div.track-artists{
    display: grid;
    grid-area: track-artists;
    justify-items: center;
    align-items: center;
    color: teal;
}

div.no-track{
    cursor: not-allowed;
    opacity: 0.5;
}

div.has-track{
    cursor: pointer;
}

i.play-icon{
    color: teal;
}

div.selected{
    border: purple solid;
    border-radius: 5px;
}

div.unselected{
    border: transparent solid;
}

span.generic{
    color: white;
}
</style>
