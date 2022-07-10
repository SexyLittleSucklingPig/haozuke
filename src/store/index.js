import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    xuser: {},
    cityname: '北京',
    cityid: ''
  },
  getters: {
    name: state => state.settings.name,
    token: state => state.user.token

  },
  mutations: {
    setuser (state, payload) {
      state.xuser = payload
    },
    // 当前城市名字
    setcityname (state, payload) {
      state.cityname = payload.val
      state.cityid = payload.id
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
