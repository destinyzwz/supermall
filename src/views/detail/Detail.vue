<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @detailImgLoad="imageLoad"/>
      <!-- <detail-param-info :param-info="paramInfo"/> -->
      <!-- <detail-comment-info :commentInfo="commentInfo"/> -->
      <!-- <goods-list :goods="recommends"/> -->
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childcomponents/DetailNavBar'
  import DetailSwiper from './childcomponents/DetailSwiper'
  import DetailBaseInfo from './childcomponents/DetailBaseInfo'
  import DetailShopInfo from './childcomponents/DetailShopInfo'
  import DetailGoodsInfo from './childcomponents/DetailGoodsInfo'
  import DetailParamInfo from './childcomponents/DetailParamInfo'
  import DetailCommentInfo from './childcomponents/DetailCommentInfo'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {debounce} from 'common/utils'

  import {getDetail, getRecommend, GoodsInfo, Shop, GoodsParam} from "network/detail";


  export default {
    name: "Detail",
    components: {
      DetailNavBar, // 导航栏
      DetailSwiper, // 轮播图
      DetailBaseInfo, // 商品信息展示
      DetailShopInfo, // 商家信息展示
      DetailGoodsInfo, // 商品详细信息
      DetailParamInfo, // 商品参数信息
      Scroll, // 滚动条
      DetailCommentInfo, // 商品评论信息展示
      GoodsList, // 推荐商品的展示
    },
    data() {
      return {
        iid: null, // 获取home点击的商品id
        topImages: null, // 获取商品轮播图数据
        goods: {}, // 获取商品的详细数据
        shop: {}, // 获取商家的信息
        detailInfo: {}, // 商品的详细信息
        paramInfo: {}, // 商品的参数信息
        commentInfo: {}, // 商品评论信息
        recommends: [], // 推荐商品的数据
      }
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 50);
      this.$bus.$on('detailImgLoad', () => {
        refresh();
        });
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid;

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 1.获取顶部的图片轮播数据
        console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages;

        // 2.获取商品信息
        this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services);

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo);

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        // 6. h获取商品评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
      });

      // 3. 获取推荐商品数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list;
      })
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh();
        this.allRefresh();
      },
      allRefresh() {
        this.$refs.scroll.refresh();
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
