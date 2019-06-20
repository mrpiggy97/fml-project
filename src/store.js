import Vue from 'vue'
import Vuex from 'vuex'

import searchTrack from './api_services/searchTrack.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    track: '',
    error_message: '',
  },

  mutations: {
    setTrack(state, payload){
      state.track = payload
    },

    setErrorMessage(state, payload){
      state.error_message = payload
    },
  },

  actions: {
    //get track info from api or set track to null
    //if an error ocurres
    getTrack(context, payload){
      searchTrack(payload).then(res => {
        context.commit('setTrack', res.data)
        console.log(res.data)

      }).catch(res => {
        console.log(res)

        context.commit('setTrack', null)
        context.commit('setErrorMessage', 'sorry an error ocurred with the backend')

      })
    }
  }
})
