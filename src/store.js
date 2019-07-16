import Vue from 'vue'
import Vuex from 'vuex'

import searchTrack from './api_services/searchTrack.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    track: '',
    query: null
  },

  mutations: {
    setTrack(state, payload){
      state.track = payload
    },

    setQuery(state, payload){
      state.query = payload
    }
  },

  actions: {
    //get track info from api or set track to null
    //if an error ocurres
    getTrack(context, payload){
      searchTrack(payload).then(res => {
        context.commit('setTrack', res.data)

      }).catch(() => {

        context.commit('setTrack', null)

      })
    }
  }
})
