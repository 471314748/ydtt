<template>
  <div class="index">
    <!-- 标题 -->
    <van-nav-bar class="titleTop"
                 title="首页" />
    <!-- 标签页 -->
    <van-tabs v-model="active">
      <van-tab v-for="(item, index) in 7"
               :key="index"
               :title="'标签' +item">
        <!-- 标签页主题 -->
        <van-pull-refresh v-model="isLoading"
                          @refresh="onRefresh">
          <van-list v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad">
            <van-cell v-for="item in list"
                      :key="item"
                      :title="item" />
          </van-list>
        </van-pull-refresh>

      </van-tab>
    </van-tabs>
    <!-- 按钮 -->
    <div class="channelBtn">
      <van-icon name="plus" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 默认选中的
      active: 0,
      // list加载状态
      loading: false,
      // list是否加载完毕
      finished: false,
      // 数据源
      list: [1, 2, 3, 4, 5, 6, 7],
      // 下拉开关，关f
      isLoading: false
    }
  },
  methods: {
    // 下滑列表事件
    onLoad () {
      setTimeout(() => {
        var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        this.list = [...this.list, ...arr]
        // 下拉加载结束
        this.loading = false
        // 
        if (this.list.length >= 60) {
          this.finished = true
        }
        console.log('onLoad刷新列表');
        console.log(this.list.length);
      }, 1000)
    },
    // 下拉事件
    onRefresh () {
      setTimeout(() => {
        this.list = []
        this.finished = false
        this.isLoading = false
        this.onLoad()
        console.log('刷新成功')
      }, 1000);
    }
  },
}
</script>

<style lang='less'>
.index {
  margin-top: 90px;
  margin-bottom: 50px;
  .van-nav-bar.van-hairline--bottom {
    background-color: #3e9df8;
    .van-nav-bar__title.van-ellipsis {
      color: #fff;
    }
  }
  .van-tabs__wrap.van-tabs__wrap--scrollable {
    // margin-right: 37.5px;
    width: 90%;
  }
  .titleTop.van-nav-bar.van-hairline--bottom {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 99;
  }
  .channelBtn {
    z-index: 100;
    position: fixed;
    top: 45px;
    right: 0;
    width: 37.5px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    // color: #fff;
    // background-color: #3e9df8;
    color: #000;
  }
  .van-tabs__wrap.van-tabs__wrap--scrollable {
    position: fixed;
    top: 45px;
    z-index: 2;
  }
}
</style>