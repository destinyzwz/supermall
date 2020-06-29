import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
  addShopCart(context, payload) {
    // 判断是否为为同一商品 添加购物车
    /*   // 方式一: 利用 of 循环
    let oldProduct = null;
    for(let item of state.cartList) {
      if(item.iid === payload.iid) {
        oldProduct = item;
      }
    } */
    // 方式二：利用 find方法
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
    // 判断oldProduct
    if(oldProduct) {
      // oldProduct.count += 1;
      context.commit(ADD_COUNTER, oldProduct);
    }else {
      payload.count = 1;
      // state.cartList.push(payload);
      context.commit(ADD_TO_CART, payload);
    }
  }
}
