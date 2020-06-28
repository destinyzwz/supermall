<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                @tabClick="tabClick"
                ref="tabControl1"
                v-show="isTabfixd"
                class="tab-controler"></tab-control>
    <scroll class="content"
             ref="scroll"
             :probe-type="3"
             @ScrollPosition="ScrollPosition"
             :pull-up-load="true"
             @ScrollPullingUp="ScrollPullingUp">
      <home-swiper :banners="banners"  @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                  @tabClick="tabClick"
                  ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBack"></back-top>
   </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'

  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabcontrol/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import {debounce} from 'common/utils'
  import {itemListenerMixin} from 'common/mixin'

  export default{
    name: 'Home',
    mixins: [itemListenerMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        }, // 商品数据
        currentType: 'pop',
        isShowBack: false, // 回顶部按钮的显示默认为false
        offsetTop: 0, // 距离顶部的距离
        isTabfixd: false, // 是否显示另一个tab来实现吸顶效果
        saveY: 0, // 离开时的位置
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    destroyed() {
      // console.log('home.vue被销毁了');
    },
    // 活跃时自动滑动到上次离开的位置
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 10);
      this.$refs.scroll.refresh();
    },
    // 记录离开的位置
    deactivated() {
      // 1. 保存离开时的位置信息
      this.saveY = this.$refs.scroll.getSaveY();

      // 2. 取消全局事件的监听
      this.$bus.$off("itemImageLoad", this.itemImgListener);
    },
    // create中的this是当前组件
    created() {
      // 1. 请求多个数据
      this.getHomeMultidata();
      // 2. 请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {
      // 1.图片加载完成的事件监听
     /*
     // 利用mixin混入实现防抖
     const refresh = debounce(this.$refs.scroll.refresh, 50)
      this.$bus.$on('itemImageLoad', () => {
        refresh();
      }) */
    },
    methods: {
      /*
        事件监听相关的方法
      */
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        // 同步两个tancont  rol栏的状态
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      // 监听返回顶部按钮的方式
     backClick() {
       this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0);
     },
     // 获取当前位置
     ScrollPosition(position) {
       // 1. 显示对顶小图标
       this.isShowBack = (-position.y) > 1000 ;
       // 2. 显示吸顶效果
       this.isTabfixd = (-position.y) > this.offsetTop;
     },
     // 进行下拉请求
     ScrollPullingUp() {
       this.getHomeGoods(this.currentType);
     },
     // 分类栏吸顶效果
     // 获取tabControl的offsetTop，所有的组件都有一个$el属性用于获取组件中的元素
     swiperImageLoad() {
       this.offsetTop =  this.$refs.tabControl2.$el.offsetTop;
     },
      /*
        网络请求相关的方法
      */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page +=1;
          // 能够进行下一次请求
          this.$refs.scroll.finishPullUp();
        })
      },
    }
  }
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #F0F0F0;

    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9; */
  }

  .tab-controler {
    position: relative;
    z-index: 9;
  }

  .content {
    /* height: calc(100vh - 137px); */
    /* height: 573px; */
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
