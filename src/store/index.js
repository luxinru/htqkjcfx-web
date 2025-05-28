import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    personInfo: {},
    caseInfo: {
      dwbm: "",
      name: "",
      vlaue: ""
    },
  },
  mutations: {
    SET_PERSONINFO(state, data) {
      state.personInfo = data.yhxx ? { ...data.yhxx } : { ...data.personInfo };
      state.caseInfo = { ...data.ajxx };
    },
    SET_CASEINFO(state, payload) {
      state.caseInfo = payload;
    }
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
});
