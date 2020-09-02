<template>
  <div class="search">
    <!-- <h2>搜索</h2> -->
    <!-- 头部搜索 -->
    <van-search class="mySearch"
                v-model="value"
                @input="think"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="onCancel">
      <!-- <template #action>
        <div @click="onSearch">搜索</div>
      </template> -->
    </van-search>
    <!-- 搜索联想区 -->
    <van-cell-group v-if="thinkList">
      <van-cell value="联想区域" />
      <van-cell icon='search'
                @click="toResult(item.oldItem)"
                v-for="(item, index) in thinkList"
                :key="index">
        <template>
          <span v-html="item.newItem"></span>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 搜索历史 -->
    <van-cell-group v-else>
      <van-cell value="搜索历史" />
      <van-cell icon='search'
                title="单元格"
                v-for="(item, index) in 3"
                :key="index">
        <template #default>
          <van-icon name="cross" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { apiThink } from '@/api/other.js'
export default {
  data () {
    return {
      value: '',
      thinkList: []
    }
  },
  methods: {
    // 搜索
    onSearch (vuele) {
      console.log('onSearch', vuele)
      this.$router.push('/SearhResult?key=' + vuele)
    },
    // 取消
    onCancel () {
      console.log('onCancel')
    },
    // 联想事件
    async think () {
      // console.log(this.value)
      if (this.value.trim().length > 0) {
        let res = await apiThink({ q: this.value })
        this.thinkList = res.data.options
        this.thinkList = this.thinkList.map(item => {
          // return item.replace(this.value, '<span style="color: #3e9df8">' + this.value + '</span>')
          return {
            oldItem: item,
            newItem: item.replace(this.value, '<span style="color: #3e9df8">' + this.value + '</span>')
          }
        })
        // console.log(this.thinkList)
      } else {
        this.thinkList = []
      }
    },
    // 点击联想结果
    toResult (item) {
      // console.log(item);
      this.$router.push('/SearhResult?key=' + item)
    }
  },
}
</script>

<style lang='less' scoped>
.mySearch {
  background-color: #3e9df8;
  .van-search__action {
    color: #fff;
    background-color: #3e9df8;
  }
}
</style>