import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'//action//行动
import getters from './getters'//getter：获得者
import mutations from './mutations'
Vue.use(Vuex);
const state={
  latitude:'',
  longitude:'',
  shopDetail:'',
  count:'12times'
};
export default  new Vuex.Store({
  state,
  getters,//相当于filter 过滤属性
  actions,
  mutations,
})
