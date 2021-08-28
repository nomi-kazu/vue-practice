import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export const state = () => ({
  name: "",
  isLoggedIn: false,
  loading: false,
  notification: {
    status: false,
    message: "",
  }
})

export const mutations = {
  login (state, user) {
    if (!user){
      state.name = "";
      state.isLoggedIn = false;
    } else {
      state.name = user.name;
      state.isLoggedIn = true;
      console.log(state);
    }
  },

  setLoading(state, payload) {
    state.loading = payload;
  },

  setNotice(state, payload) {
    state.notification = payload
  }
}