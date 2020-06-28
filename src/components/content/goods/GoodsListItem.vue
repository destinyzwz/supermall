<template>
  <div class="goods-item" @click="goodsitemClick">
    <img :src="showImage" @load="imageLoad"/>
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      // 主商品和推荐商品的存储方式不同
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      // 方式二：通过取消函数监听
      imageLoad() {
        this.$bus.$emit('itemImageLoad');
      },

			// 方式一：通过路由路径来选择不同的事件监听
      /* imageLoad() {
				if(this.$route.path.indexOf('/home')) {
					this.$bus.$emit('homeImgRefresh');
				}else if(this.$route.path.indexOf('/detail')) {
					this.$bus.$emit('detailImgRefresh');
				}
      }, */
      goodsitemClick() {
        // console.log(this.goodsItem.iid);
        // 动态路由
        // this.$router.push('/detail/' + this.goodsItem.iid);
        // 通过query
        this.$router.push({
          path: '/detail',
          query: {
            iid: this.goodsItem.iid
          }
        })
      }
    }
  }
</script>
<style scoped>
  .goods-item {
    padding-bottom: 30px;
    width: 48%;
    position: relative;
    margin-top: 10px;
  }

  .goods-item img {
    width: 100%;
    border-radius: 3px;
  }

  .goods-info {
    font-size: 12px;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 5px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
