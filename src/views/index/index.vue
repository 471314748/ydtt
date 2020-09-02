<template>
  <div class="index">
    <!-- 标题 -->
    <van-nav-bar :fixed="true"
                 class="titleTop"
                 title="首页" />
    <!-- 标签页 -->
    <van-tabs v-model="active"
              swipeable>
      <van-tab v-for="item in channelList"
               :key="item.id"
               :title="item.name">
        <!-- 标签页主体 -->
        <van-pull-refresh v-model="item.isLoading"
                          @refresh="onRefresh">
          <van-list v-model="item.loading"
                    :finished="item.finished"
                    finished-text="--我的底线在这里--"
                    @load="onLoad">
            <van-cell 
                      v-for="(subitem, subindex) in item.articleList"
                      :key="subindex">
              <!-- 数据渲染静态结构 -->
              <template #title>
                <!-- 标题 -->
                <h3>{{subitem.title}}</h3>
                <!-- 图片--自定义宫格 -->
                <van-grid v-if='subitem.cover.type !== 0' :border="false"
                          :column-num="3">
                  <van-grid-item v-for="(imgItem, ImgIndex) in subitem.cover.images" :key="ImgIndex">
                    <van-image lazy-load :src="imgItem" />
                  </van-grid-item>
                </van-grid>
                <!-- 其他 -->
                <div class="box2">
                  <div class="left">
                    <span>{{subitem.aut_name}}</span>
                    <span>{{subitem.comm_count}} 评价</span>
                    <span>{{subitem.pubdate | myTime}}</span>
                  </div>
                  <div class="right">
                    <!-- 叉叉 -->
                    <van-icon @click="openmore(subitem)" name="close" />
                  </div>
                </div>

              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 按钮 -->
    <div class="channelBtn">
      <van-icon name="plus"
                @click="showbtn" />
    </div>
    <!-- 弹出层， -->
    <!-- <van-popup class="tcc" v-model="show" position="bottom" :style="{ height: '80%' }" >
      <div>6666</div>
    </van-popup> -->
    <!-- 弹出层子组件 -->
    <div class='channel'>
      <!-- <channel @changeactive='v=>active=v' ref='channel' :active='active' :channelList='channelList' /> -->
      <!-- <channel @update:active='v=>active=v' ref='channel' :active='active' :channelList='channelList' /> -->
      <channel ref='channel'
               :active.sync='active'
               :channelList='channelList' />
    </div>
    <!-- 举报子组件 -->
    <div class="more">
      <more ref='more' :artid='artid' @delart='delart'></more>
    </div>
  </div>
</template>

<script>
import { getChannels } from "../../api/channel.js"
import { getLocal, setLocal } from '@/utils/mylocal.js'
import { getArticles } from '@/api/article.js'
import channel from './com/channel.vue'
import more from './com/more.vue'
export default {
  components: {
    channel,
    more
  },
  data () {
    return {
      // 默认选中的
      active: 0,
      // list加载状态
      loading: false,
      // list是否加载完毕
      finished: false,
      // 数据源
      list: [],
      // 下拉开关，关f
      isLoading: false,
      // 标签头
      channelList: [],
      // currentChannel: []
      // 弹出层显示
      show: true,
      // 点击id
      artid: 0
    };
  },
  methods: {
    // 下滑列表事件
    async onLoad () {
      var currentChannel = this.channelList[this.active]
      // 选中id
      var id = currentChannel.id
      // 请求数据
      var res = await getArticles({ channel_id: id, timestamp: Date.now(), with_top: 0 })
      // 请求数据加进去
      currentChannel.articleList = [...currentChannel.articleList, ...res.data.results]
      // 
      currentChannel.loading = false
      // console.log('数据', currentChannel.articleList);
      // if(res.data.results.length ===0){
      //   currentChannel.finished = true;
      // }
      if (currentChannel.articleList.length >= 60 || currentChannel.articleList.length === 0) {
        currentChannel.finished = true;
      }
    },
    // 下拉事件
    onRefresh () {
      setTimeout(() => {
        var currentChannel = this.channelList[this.active]
        // 清空数据
        currentChannel.articleList = [];
        currentChannel.loading = false;
        // 数据加载完毕
        currentChannel.finished = false;
        // 刷新结束
        currentChannel.isLoading = false;
        // 请求数据
        this.onLoad();
        // console.log("刷新成功");
      }, 1000);
    },
    // 获取频道数据
    async channelsList () {
      // 判断是否登录
      var token = this.$store.state.userInfo.token
      if (token) {
        // 登录了
        var res = await getChannels()
        this.channelList = res.data.channels
        setLocal('channels', res.data.channels)
      } else {
        // 没登录
        // console.log(getLocal('channels'));
        var localchannel = getLocal('channels')
        // console.log('localchannel', localchannel);
        // 如果存在频道数据
        if (localchannel) {
          this.channelList = localchannel
        } else {
          // 不存在
          var res2 = await getChannels()
          this.channelList = res2.data.channels
        }
      }
      // console.log(this.channelList);
      this.addOtherProp()
    },
    // 给频道添加额外属性
    addOtherProp () {
      this.channelList.forEach(item => {
        // console.log(item.channels);
        // item.articleList = [],
        //   item.loading = false,
        //   item.finished = false,
        //   item.isLoading = false
        this.$set(item, 'articleList', [])
        this.$set(item, 'loading', false)
        this.$set(item, 'finished', false)
        this.$set(item, 'isLoading', false)
      });
      console.log('数据', this.channelList);
    },
    // 弹出层
    showbtn () {
      // this.show = !this.show
      this.$refs.channel.show = !this.$refs.channel.show
    },
    // 点叉叉事件
    openmore (subitem) {
      this.$refs.more.show = true
      console.log(subitem)
      this.artid = subitem.art_id
    },
    // 删除文章数据
    delart (artid) {
      let datalist = this.channelList[this.active].articleList
      datalist.forEach((item, index)=>{
        if (item.art_id === artid) {
          datalist.splice(index, 1)
        }
      })

    }
  },
  mounted () {
    this.channelsList()
  },
};
</script>

<style lang='less' scoped>
.van-nav-bar.van-hairline--bottom {
  background-color: #3e9df8;
}

/deep/ .van-nav-bar__title.van-ellipsis {
  color: #fff;
}
.index {
  margin-top: 90px;
  margin-bottom: 50px;
  /deep/ .van-tabs__wrap.van-tabs__wrap--scrollable {
    position: fixed;
    top: 46px;
    left: 0px;
    width: 90%;
    z-index: 999;
  }
  .channelBtn {
    position: fixed;
    top: 46px;
    right: 0px;
    width: 10%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #000;
    font-size: 18px;
    background: #fff;
    z-index: 1000;
  }
}
.box {
  display: flex;
  justify-content: space-between;
  .left {
    span {
      margin-right: 10px;
      color: #999;
      font-size: 12px;
    }
  }
  .right {
    border: 1px solid #999;
    color: #999;
    height: 14px;
    line-height: 14px;
    padding: 0 5px;
    font-size: 12px;
  }
}
.box2{
  display: flex;
  justify-content: space-between;
  .left{
    span{
      margin-right: 10px;
      color: #999;
      font-size: 12px;
    }
  }
  .right{
    // border: 1px solid #999;
    color: #999;
    height: 14px;
    padding: 0 5px;
    line-height: 14px;
    font-size: 12px;
  }
}
 // 频道数据的不超过一行的类名
    /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0px;
    width: 90%;
    z-index: 999;
  }
// }
</style>