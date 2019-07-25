import { value, computed } from 'vue-function-api'

function generalState(){

    const tracks = value(null)
    const loading = value(true)
    const backendError = value(false)
    const showTrack = value(false)

    
    const message = computed(() => {

        let numberOfTracks = null

        if(tracks.value !== null && backendError.value === false){
            numberOfTracks = `we found ${tracks.value.length} tracks`
        }

        else if(backendError.value === true && tracks.value === null){
            numberOfTracks = 'sorry an error happened with the servers'
        }

        return numberOfTracks
    })

    return{
        tracks,
        loading,
        backendError,
        message,
        showTrack
    }
}

export default generalState