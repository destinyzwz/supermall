import {debounce} from './utils';

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
