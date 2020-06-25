<template>
  <swiper class="detail-swiper">
    <Swiper-item v-for="item in topImages">
      <img :src="item" />
    </Swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style>
  .detail-swiper{
    height: 350px;
    overflow: hidden;
  }
</style>
