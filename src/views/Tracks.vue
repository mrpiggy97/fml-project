<template>
    
    <div class="tracks-component">

        <!--the transition css part is located at the App component-->

        <div class="loader">
            <transition name="slide">
                <p class="loader" v-show="showLoader"></p>
            </transition>
        </div>

        <div class="searching-tracks" v-if="isMobile">
            <search-form></search-form>
        </div>

        <div class="message">
            <transition name="slide">
                <span class="message-text" v-show="showMessage">{{message}}</span>
            </transition>
        </div>

        <div class="tracks">
            <track-info v-for="track in tracks" :key="track.id"
            :appear="showTrack" :info="track"></track-info>
        </div>
    </div>
</template>

<script>

import searchTracks from '../api_services/searchTracks.js'

import TrackInfo from '../components/TrackInfo.vue'
import SearchForm from '../components/SearchForm.vue'

import { setTimeout } from 'timers'
import trackBus from '../event-buses/trackBus';

export default {
    name: 'Tracks',

    data(){
        return{

            tracks: [],
            tracksLoading: null,
            backendError: false,
            firstLoadCompleted: false,
            showMessage: false,
            showLoader: true,
            showTrack: false,
            isMobile: window.screen.width <= 769
        }
    },

    computed:{

        message(){

            let numberOfTracks = null;

            if(this.backendError === true){
                numberOfTracks = "there was an error with the servers"
            }

            else{

                if(this.tracksLoading === false){
                    //when tracksLoading is false it means the api call
                    //was successful so we can begin to count the number
                    //of tracks found

                    numberOfTracks = `we found ${this.tracks.length} tracks`
                }

                else if(this.firstLoadCompleted === true && this.tracksLoading === null){
                    //firstLoadCompleted will only be true once the initial
                    //api call is finished and it is successful otherwise it will
                    //remain as false
                    numberOfTracks = "0 searches, take a look at queen"
                }
            }
            return numberOfTracks
        }
    },

    methods:{

        getTracks(query){
            //message depends on whether tracksLoading is true false or null
            this.showMessage = false
            this.showLoader = true
            this.showTrack = false
            this.tracksLoading = true

            //make call to api
            searchTracks(query).then(res => {
                //if there was an error raised prevously
                //wipe it out
                if(this.backendError === true){
                    this.backendError = false
                }

                //before changing all tracks there is transition that happens
                //and it needs time to be completed as each track dissapears after
                //.8s
                setTimeout(() => {
                    this.tracks = res.data.tracks.items
                }, 1000)

            }).catch(() => {
                //if error signal that an error has occured to the user
                this.backendError = true
            })

            setTimeout(() => {
                this.tracksLoading = false
                this.showMessage = true
                this.showLoader = false
                this.showTrack = true
            }, 4000)
        },

        onResize(){
            this.isMobile = window.screen.width <= 769
        }
    },

    components: {
        TrackInfo,
        SearchForm,
    },

    created(){
        console.log("it has been created")
        //show the loader at the very beggining
        let query = 'queen'

        searchTracks(query).then(res =>{

            this.tracks = res.data.tracks.items
            this.firstLoadCompleted = true

        }).catch(() => {
            this.backendError = true
        })

        setTimeout(() => {
            this.showMessage = true
            this.showTrack = true
            this.showLoader = false
        }, 1500)

        console.log("it has finished creating")
    },

    mounted(){
        window.addEventListener('resize', this.onResize)

        trackBus.$on('setQuery', (query) => {
            this.getTracks(query)
        })
    }
}
</script>

<style>

div.tracks-component{
    display: grid;
    grid-template-columns: 1fr 12fr 1fr;
    grid-template-rows: 50px 50px 14fr;
    grid-template-areas: ". loader ."
                         ". message ."
                         ". tracks .";
    grid-gap: 30px;
    justify-content: center;
    align-content: center;
    border: transparent solid;
    border-radius: 5px;
}

div.loader{
    display: grid;
    grid-area: loader;
    background-color: transparent;
    justify-items: center;
    align-items: center;
}

div.message{
    display: grid;
    grid-area: message;
    justify-content: center;
    align-content: center;
    border: teal solid;
    border-radius: 5px;
    background-color: teal;
}

div.tracks{
    display: grid;
    grid-area: tracks;
    grid-template-columns: repeat(3, 150px);
    grid-gap: 5px;
    justify-content: space-around;
    align-content: stretch;
    background-color: white;
}

i.search-icon{
    color: silver;
}

span.message-text{
    font-size: x-large;
    color: white;
}

/*loader animation*/
p.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid purple;
  border-bottom: 16px solid mediumblue;
  border-right: 16px solid white;
  border-left: 16px solid green;
  min-width: 30px;
  max-width: 30px;
  min-height: 30px;
  max-height: 30px;
  background-color: white;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/*end of loaer animation*/

@media screen and (max-width: 769px){

    div.tracks-component{
        grid-template-columns: 1fr;
        grid-template-rows: 30px 50px 80px 14fr;
        grid-template-areas: "loader"
                             "searching-tracks"
                             "message"
                             "tracks";
    }

    div.searching-tracks{
        display: grid;
        grid-area: searching-tracks;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        justify-content: stretch;
        align-content: stretch;
    }

    div.tracks{
        grid-template-columns: repeat(3, 130px);
    }
}

@media screen and (max-width: 375px){

    div.tracks-component{
        grid-template-rows: 50px 50px 70px 14fr;
    }

    div.tracks{
        grid-template-columns: repeat(3, 100px);
    }
}

</style>
