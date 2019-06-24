import axios from 'axios'

import api_urls from './api_urls.js'

function searchTracks(q){

    return axios.get(api_urls.search,{
        params: {
            type: "track",
            q: q
        },
        timeout: 5000
    })
}

export default searchTracks