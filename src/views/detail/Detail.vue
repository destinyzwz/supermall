<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content"
            ref="scroll"
            @ScrollPosition="contenScroll"
            :probeType="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"  @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramsInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <goods-list ref="recommend" :goods="recommendInfo"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childcomponents/DetailNavBar'
  import DetailSwiper from './childcomponents/DetailSwiper'
  import DetailBaseInfo from './childcomponents/DetailBaseInfo'
  import DetailShopInfo from './childcomponents/DetailShopInfo'
  import DetailGoodsInfo from './childcomponents/DetailGoodsInfo'
  import DetailParamInfo from './childcomponents/DetailParamsInfo'
  import DetailCommentInfo from './childcomponents/DetailCommentInfo'

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail"

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {debounce} from 'common/utils'
  import {itemListenerMixin} from 'common/mixin'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      Scroll
    },
    mixins: [itemListenerMixin],
    data() {
      return {
        iid: null, // 详情页商品id
        topImages: [], // 商品轮播图数据
        goods: {}, // 商品信息
        shop: {}, // 店铺信息
        detailInfo: {}, // 商品详情
        paramsInfo: {}, // 商品参数信息
        commentInfo: {}, // 商品评论信息
        recommendInfo: [], // 推荐商品数据
        themeTopYs: [], // 用来保存每块内容的起始位置
        getThemeTopY: null, // 获取位置添加防抖
        currentIndex: 0, //用来记录当前滑动位置
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.query.iid;

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 1.获取顶部的图片轮播数据
        // console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages;

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo);

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        // 5.获取参数的信息
        this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        // 6.获取商品评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate;
        }

       /* // 这里依然不行，因为虽然数据拿过来了，但是还没有渲染
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs); */


       /* // DOM渲染完成后会调用该函数，但是不能保证图片加载完了
        this.$nextTick(() => {
          this.themeTopYs = [];

          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          console.log(this.themeTopYs);
        }) */

      });

      // 3. 获取推荐商品数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommendInfo = res.data.list;
      });

      // 4. 给getthemeTOpY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE); // 为推推荐商品的添加一个区间
        // console.log(this.themeTopYs);
      }, 100);
    },
    mounted() {
    /*  // 获取每块内容其实位置, 很显然这里是获取不了的，因为数据可能还没请求过来，就不会有div，就不会有$el
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs); */
    },
    updated() {
      /* // 因为每次数据更新都会回调updated函数，所以要令值为空; 该方式可以
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs); */
    },
    methods: {
      // 此时监听的商品详情中的图片
      imageLoad() {
        this.newRefresh();
        // 获取每块内容的offsetTopY
        this.getThemeTopY();
      },
      // 点击标题进行标题跳转
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
      },
      // 滑动内容进行标题跳转
      contenScroll(position) {
        // console.log(position);

        // 1. 获取y值
        const positionY = -position.y;

        // 2. positionY和主题中值进行对比
        const length = this.themeTopYs.length;
        /*
        方式一：
          this.currentIndex ！== i 防止赋值过于频繁，
          前三块内容判断区间
          推荐商品版块直接判断是否到达就行，没有区间
        */
        // for(let i=0;i<length;i++) {
        //   if( this.currentIndex !== i && (i<length-1 && positionY>this.themeTopYs[i] && positionY<this.themeTopYs[i+1]) ||
        //   (i===length-1 && positionY>=this.themeTopYs[i] )) {
        //     this.currentIndex = i;
        //     this.$refs.nav.currentIndex = this.currentIndex;
        //   }
        // }

        /*
        方式二：
          为推荐商品数据添加一个区间，直接在数组中添加一个Number.MAX_VALUE
        */
       for(let i=0; i<length-1; i++) {
         if(this.currentIndex !== i && (positionY>=this.themeTopYs[i] &&positionY< this.themeTopYs[i+1])){
           this.currentIndex = i;
           this.$refs.nav.currentIndex = this.currentIndex;
         }
       }
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
