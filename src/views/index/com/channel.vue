<template>
  <div class="channel">
    <!-- 弹出层 -->
    <van-popup class="tcc"
               v-model="show"
               position="bottom"
               :style="{ height: '80%' }">
      <!-- 单元格--头 -->
      <van-cell>
        <template #title>
          <span class="titleSizi">我的频道</span>
        </template>
        <template #default>
          <van-button v-if="isEdit===false"
                      class="btn"
                      size="mini"
                      plain
                      color="#ee0a24"
                      @click="isEdit=true">编辑</van-button>
          <van-button v-else
                      class="btn"
                      size="mini"
                      plain
                      color="#ee0a24"
                      @click="isEdit=false">完成</van-button>
        </template>
      </van-cell>
      <!-- 我的频道列表 -->
      <van-grid>
        <van-grid-item @click="changeActive(index)"
                       class="gridf"
                       v-for="(item, index) in channelList"
                       :key="item.id">
          <template #text>
            <span :class="{'active':active===index}">{{item.name}}</span>
            <van-icon v-if="isEdit && index!==0"
                      @click.stop="delChannel(index)"
                      class="icons"
                      name="clear" />
          </template>
        </van-grid-item>
      </van-grid>
      <!-- 频道推荐 -->
      <van-cell>
        <template #title>
          <span class="titleSizi">频道推荐</span>
        </template>
      </van-cell>
      <!-- 我的频道列表 -->
      <van-grid>
        <van-grid-item v-for="(item, index) in recomm"
                       :key="index"
                       @click="addChannel(item)">
          <template #text>
            {{item.name}}
          </template>
        </van-grid-item>
      </van-grid>
      <!-- {{channelList}} -->
      <!-- 结束 -->
    </van-popup>

  </div>
</template>

<script>
import { getChannelsAll, apiResetChannel } from '@/api/channel.js'
import { setLocal } from '@/utils/mylocal.js'
export default {
  props: ['channelList', 'active'],
  data () {
    return {
      // 弹出层开关
      show: false,
      // 所有的频道数据
      allChannel: [],
      // 剩下的
      remainChan: [],
      // 删除按钮显示隐藏
      isEdit: false
    }
  },
  computed: {
    // 定义一个推荐频道，数据来源于全部频道删除我的
    recomm: function () {
      // console.log('频道数据', this.channelList);
      // console.log('全部数据', this.allChannel);
      let ids = this.channelList.map(item => {
        return item.id
      })
      let newArr = this.allChannel.filter(item => {
        return !ids.includes(item.id)
      })
      return newArr
    }
  },
  methods: {
    async gerAllChannel () {
      let res = await getChannelsAll()
      // console.log('全部推荐',res);
      this.allChannel = res.data.channels
      // console.log('全部推荐',this.allChannel);
    },
    // 点击频道数据
    async addChannel (item) {
      // 点击推荐频道添加到我的频道
      item.articleList = []
      item.loading = false
      item.finished = false
      item.isLoading = false
      // console.log('item', item)
      this.channelList.push(item)
      // 判断用户是否登录
      let token = this.$store.state.userInfo.token
      if (token) {
        let channels = this.channelList.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        await apiResetChannel({ channels })
        // console.log('数据666', this.channelList);
      } else {
        // 没登录，添加到本地
        setLocal('channels', this.channelList)
      }
      // this.$parent.onLoad()
      console.log(this.$parent);
    },
    // 删除频道列表数据 
    async delChannel (index) {
      console.log(index);
      this.channelList.splice(index, 1)
      // 判断用户是否登录 
      let token = this.$store.state.userInfo.token
      if (token) {
        let channels = this.channelList.slice(1).map((item, index) => {
          return {
            id: index,
            seq: index + 2
          }
        })
        await apiResetChannel({ channels })
      } else {
        // 没登录，添加到本地channels
        setLocal('channels', this.channelList)
      }
    },
    // 点击我的频道每一项
    changeActive (index) {
      console.log(index);
      // this.$emit('changeactive', index)
      this.$emit('update:active', index)
    }
  },
  mounted () {
    // console.log('666', this.channelList);
    this.gerAllChannel()
  }
}
</script>

<style lang='less' scoped>
.btn {
  border-radius: 10px;
  padding: 0 10px;
}
.titleSizi {
  font-size: 18px;
}
.gridf {
  position: relative;
  .icons {
    position: absolute;
    top: 0;
    right: 0;
    color: #ccc;
  }
}
/deep/ .van-grid-item__content.van-grid-item__content--center.van-hairline {
  font-size: 14px;
}
.active {
  color: red;
}
</style>