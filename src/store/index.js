import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token : null,
    profile : null,
  },
  getters: {
    isAuthenticated(state){
      return !!state.token
    },
    getProfile(state){
      return state.profile
    }
  },
  mutations: {
    setToken(state,token){
      state.token = token;  
    },
    setProfile(state,profile){
      state.profile = profile;
    },
    clearUser(state) {
      
      state.profile = null;
      state.token = null;
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    setProfile({commit}, profile){
      commit('setProfile', profile);
    },
    logout({commit}){
      commit('clearUser')
      router.push('/')
    }
  },
  plugins : [createPersistedState({
    storage : window.sessionStorage
  })]
})
