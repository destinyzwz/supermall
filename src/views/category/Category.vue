<template>
  <div class="wrapper" ref="aaaa">
    <div>
      <!-- 1. 无论是否设置click:false，button都可以点击 -->
      <button @click="btnClick">按钮</button>
      
      <!-- 2. 必须设置click:true, 那么div才能监听点击 -->
      <div @click="divClick">呵呵呵呵</div>
    </div>
    
    <ul class="content">
      <button @click="btnClick">按钮</button>
         <li>星座1</li>
         <li>星座2</li>
         <li>星座3</li>
         <li>星座4</li>
         <li>星座5</li>
         <li>星座6</li>
         <li>星座7</li>
         <li>星座8</li>
         <li>星座9</li>
         <li>星座10</li>
         <li>星座11</li>
         <li>星座12</li>
         <li>星座13</li>
         <li>星座14</li>
         <li>星座15</li>
         <li>星座16</li>
         <li>星座17</li>
         <li>星座18</li>
         <li>星座19</li>
         <li>星座20</li>
         <li>星座21</li>
         <li>星座22</li>
         <li>星座23</li>
         <li>星座24</li>
         <li>星座25</li>
         <li>星座26</li>
         <li>星座27</li>
         <li>星座28</li>
         <li>星座29</li>
         <li>星座30</li>
         <li>星座31</li>
         <li>星座32</li>
         <li>星座33</li>
         <li>星座34</li>
         <li>星座35</li>
         <li>星座36</li>
         <li>星座37</li>
         <li>星座38</li>
         <li>星座39</li>
         <li>星座40</li>
         <li>星座41</li>
         <li>星座42</li>
         <li>星座43</li>
         <li>星座44</li>
         <li>星座45</li>
         <li>星座46</li>
         <li>星座47</li>
         <li>星座48</li>
         <li>星座49</li>
         <li>星座50</li>
         <li>星座51</li>
         <li>星座52</li>
         <li>星座53</li>
         <li>星座54</li>
         <li>星座55</li>
         <li>星座56</li>
         <li>星座57</li>
         <li>星座58</li>
         <li>星座59</li>
         <li>星座60</li>
         <li>星座61</li>
         <li>星座62</li>
         <li>星座63</li>
         <li>星座64</li>
         <li>星座65</li>
         <li>星座66</li>
         <li>星座67</li>
         <li>星座68</li>
         <li>星座69</li>
         <li>星座70</li>
         <li>星座71</li>
         <li>星座72</li>
         <li>星座73</li>
         <li>星座74</li>
         <li>星座75</li>
         <li>星座76</li>
         <li>星座77</li>
         <li>星座78</li>
         <li>星座79</li>
         <li>星座80</li>
         <li>星座81</li>
         <li>星座82</li>
         <li>星座83</li>
         <li>星座84</li>
         <li>星座85</li>
         <li>星座86</li>
         <li>星座87</li>
         <li>星座88</li>
         <li>星座89</li>
         <li>星座90</li>
         <li>星座91</li>
         <li>星座92</li>
         <li>星座93</li>
         <li>星座94</li>
         <li>星座95</li>
         <li>星座96</li>
         <li>星座97</li>
         <li>星座98</li>
         <li>星座99</li>
         <li>星座100</li>
        </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default{
    name: 'Category',
    data() {
      return {
        scroll: null
      }
    },
    // create钩子函数 组件构建完后调用；还未挂在模块
    created() {
    },
    mounted() {
      // console.log(this.$refs.aaaa);
      // console.log(document.querySelector('.wrapper'));
      this.scroll = new BScroll('.wrapper', {
        probeType: 3 ,// 监听滑动位置
        pullUpLoad: true ,// 进行加载
        click: false // 标签内点击事件
      })
      // 滑动位置
      this.getPosition();
      // 进行下一次请求
      this.nextRequset();
    },
    methods: {
      // better-scroll标签内的点击事件
      btnClick() {
        console.log('您进行了一次点击');
      },
      // 获取滑动位置
      getPosition() {
        this.scroll.on('scroll', position => {
          // console.log(position);
        })
      },
      // 进行下一次网络请求
      nextRequset() {
        this.scroll.on('pullingUp', () => {
          console.log('刷新');
          setTimeout(() => {
            this.scroll.finishPullUp()
          }, 1000)
        })
      }
    }
  }
</script>

<style>
  .wrapper {
    /* 1. 实现原生的局部滑动 */
    /* height: 300px;
    background-color: aqua;
    overflow: hidden;
    overflow-y: scroll; */

    /* 2. better-scroll框架实现 */
    height: 300px;
    background-color: pink;
    overflow: hidden;
  }
</style>
