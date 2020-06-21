<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        bscroll: null,
        message: "lucy in the sky"
      }
    },
    mounted() {
      // 1. 创建BScroll对象
      this.bscroll = new BScroll(this.$refs.wrapper, {
        click: true,
        // probeType: 3, 封装，根据页面需求来选择是否实时监听位置
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      // 2， 监听滚动区域
      // 监听滑动位置
      if(this.probeType === 2 || this.probeType === 3) {
        this.getPosition();
      }
      // 页面数据，请求刷新
      if(this.pullUpLoad) {
        this.nextRequest();
      }
    },
    methods: {
      // 点击按钮回到顶部事件
      scrollTo(x, y, time=300) {
        this.bscroll && this.bscroll.scrollTo(x, y, time)
      },

      // 调用该方法，以便能进行下一次请求
      finishPullUp() {
        this.bscroll && this.bscroll.finishPullUp();
      },

      // 自动回滚到离开时的位置
      getSaveY() {
        return this.bscroll ? this.bscroll.y : 0
      },

      // 解决首页滚动bug
      refresh() {
        // console.log("--------");
        this.bscroll && this.bscroll.refresh();
      },

      // 滑动位置
      getPosition() {
        this.bscroll.on('scroll', position => {
          // console.log(position);
          this.$emit("ScrollPosition", position);
        })
      },

      // 下拉请求
      nextRequest() {
        this.bscroll.on("pullingUp", () => {
          this.$emit("ScrollPullingUp" );
          // console.log("上拉加载更多");
        })
      }
    }
  }
</script>

<style scoped>
</style>
