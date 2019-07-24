import axiosInstance from './axiosInstance.js'

function searchTrack(id){
    return axiosInstance({
        method: 'get',
        url: `/tracks/${id}`,
        timeout: 5000,
    })
}

export default searchTrack