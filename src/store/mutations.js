import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
  // 记录购买的商品数量
  [ADD_COUNTER](state, payload) {
    payload.count += 1;
  },
  // 记录不同的商品
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload);
  }
}
