import {request} from './request.js';

// 获取点击的商品数据
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

// 获取推荐商品的数据
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

// 商品数据
export class GoodsInfo {
  constructor(itemInfo, columns, services){
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
  }
}

// 商家数据
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

// 商品参数
export class GoodsParam {
  constructor(info, rule) {
    // 注：images可能没有值
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
