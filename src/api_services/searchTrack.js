import axios from 'axios'

import api_urls from './api_urls.js'

function searchTrack(id){

    let url = api_urls.track.replace(':id', id)
    return axios({
        method: 'get',
        url: url,
        timeout: 5000,
    })
}

export default searchTrack