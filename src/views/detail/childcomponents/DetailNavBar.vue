<template>
  <div >
    <nav-bar>
      <div slot="left" class="imgBack" @click="routerBack">
        <img src="~assets/img/common/back.svg" />
      </div>
      <div slot="center" class="detail">
        <div v-for="(item, index) in titles"
              class="detail-item"
              :class="{active: index===currentIndex}"
              @click="itemClick(index)">{{ item }}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  export default {
    name: "DetailNavBar",
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'], //导航栏的信息
        currentIndex: 0 //记录当前点击位置
      }
    },
    components: {
      NavBar
    },
    methods: {
      // 监听当前选中选项
      itemClick(index) {
        this.currentIndex = index;
      },
      // 点击回退
      routerBack() {
        this.$router.back();
      }
    }
  }
</script>

<style>
  .detail{
    display: flex;
    font-size: 13px;
  }

  .detail-item{
    flex: 1;
  }

  .active{
    clear: pink;
  }

  .imgBack{
    margin-top: 6px;
    margin-left: 10px;
  }
</style>
