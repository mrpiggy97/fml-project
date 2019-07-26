import { value, computed } from 'vue-function-api'

function setStateAndComputed(context){

    const tracks = value({items: null, loading: true, showTrack: false})
    const backendError = value(false)
    const isMobile = value(window.screen.width <= 769)

    
    const message = computed(() => {

        let numberOfTracks = null

        if(tracks.value.items !== null && backendError.value === false){
            numberOfTracks = `we found ${tracks.value.items.length} tracks`
        }

        else if(backendError.value === true && tracks.value.items === null){
            numberOfTracks = 'sorry an error happened with the servers'
        }

        return numberOfTracks
    })

    const query = () => {
        return context.root.$store.state.query
    }

    return{
        tracks,
        backendError,
        isMobile,
        message,
        query
    }
}

export default setStateAndComputed