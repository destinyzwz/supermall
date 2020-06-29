import Vue from 'vue'
import VueX  from 'vuex'

import mutations from './mutations'
import actions from './actions'

// 1. 安装插件
Vue.use(VueX);

// 这里本来应该是一个用户对象下有购物车对象，但是因为没有登录功能，也就没有用户，所以只有一个购物车
const  state = {
  cartList: []
}

// 2. 创建Store对象
const store = new VueX.Store({
  state,
  // mutations为一个目的就是修改state中状态 其中的每个方法尽可能完成比较单一功能
  mutations,
  actions,
})

// 3. 挂载到Vue实例上
export default store
