<template>
  <div class="home">
    <router-view />

    <van-tabbar route>
      <van-tabbar-item replace
                       to="/index"
                       icon="home-o">
        主页
      </van-tabbar-item>
      <van-tabbar-item to="/search"
                       icon="search">
        搜索
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o">
        视频
      </van-tabbar-item>
      <van-tabbar-item to="/my"
                       icon="setting-o">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created() {
    // 路由元信息
    console.log(this.$router.options.routes);
    console.log(this);
  },
}
</script>

<style>
</style>