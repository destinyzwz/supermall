import {debounce} from './utils';
import BackTop from 'components/content/backTop/BackTop';

// 这是用来监听图片加载
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null,
      num: 1,
    }
  },
  mounted() {
    // 1. 图片加载完成的事件监听 解决滚动区域bug
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100);
    // 2. 对监听的事件进行保存
    this.itemImgListener = () => {
      this.newRefresh();
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener);
  }
}

// 这是用来实现点击返回顶部的功能
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBack: false, // 回顶部按钮的显示默认为false
    }
  },
  methods: {
    // 监听返回顶部按钮的方式
    backClick() {
      this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0);
    },
    listenShowBackTop(position) {
      this.isShowBack = (-position.y) > 1000 ;
    }
  }
}
