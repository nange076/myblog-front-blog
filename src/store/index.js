import Vue from 'vue'
import Vuex from 'vuex'
// import * as getters from './getters.js'

Vue.use(Vuex)

/** 状态定义 */
export const state = {
  loading: false,
  themeObj: 0,//主题
  keywords:'',//关键词
  errorImg: 'this.onerror=null;this.src="' + require('../../static/img/tou.jpg') + '"',
  baseURL:'https://backend.zenithzone.top/blog/front/'//访问的地址，记得每次发布前都修改为服务器地址
  // baseURL:'http://localhost:9001/blog/front'//访问的地址，记得每次发布前都修改为服务器地址
}

export default new Vuex.Store({
    state,
})
