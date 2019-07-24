import axiosInstance from './axiosInstance.js'

function searchTracks(q){

    return axiosInstance({
        method: "get",
        url: '/search',
        params:{
            type: "track",
            q: q
        },
        timeout: 5000
    })
}

export default searchTracks