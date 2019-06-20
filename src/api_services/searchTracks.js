import axios from 'axios'

import api_urls from './api_urls.js'

function searchTracks(q){
    
    let url = api_urls.search

    return axios({
        method: 'get',
        url: url,
        timeout: 5000,
        params:{
            type: 'track',
            q: q
        }
    })
}

export default searchTracks