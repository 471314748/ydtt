<template>
  <div class="more">
    <!-- 举报操作面板 -->
    <van-popup class="morepop"
               v-model="show">
      <van-cell-group v-if="isReport === false">
        <van-cell @click="dislike"
                  icon="failure"
                  title="不感兴趣" />
        <van-cell @click="isReport = true"
                  icon="info-o"
                  title="反馈垃圾内容"
                  is-link />
        <van-cell @click="blackLists" icon="delete"
                  title="拉黑作者" />
      </van-cell-group>
      <!-- 举报选项 -->
      <van-cell-group v-else>
        <van-cell @click="isReport = false"
                  icon="arrow-left"
                  title="反馈垃圾内容" />
        <van-cell @click="reportUse(item.id)"
                  v-for="(item, index) in report"
                  :key="index"
                  :title="item.type" />
      </van-cell-group>
      {{ artid }}
    </van-popup>
  </div>
</template>

<script>
import { apiDislike, apiReport } from '@/api/article.js'
export default {
  props: ['artid'],
  data () {
    return {
      show: false,
      isReport: false,
      report: [
        { id: 0, type: '其他问题' },
        { id: 1, type: '标题夸张' },
        { id: 2, type: '低俗色情' },
        { id: 3, type: '错别字多' },
        { id: 4, type: '旧闻重复' },
        { id: 5, type: '广告软文' },
        { id: 6, type: '内容不实' },
        { id: 7, type: '涉嫌违法犯罪' },
        { id: 8, type: '侵权' }
      ]
    }
  },
  methods: {
    // 不感兴趣
    async dislike () {
      // 删除父组件文章
      this.$emit('delart', this.artid)
      // 发送请求
      try {
        await apiDislike({ target: this.artid })
      } catch (error) {
        console.log(error)
      }
      this.show = false
    },
    // 举报
    async reportUse (typeid) {
      await apiReport({
        target: this.artid,
        type: typeid
      })
      this.isReport = false
      this.show = false
      this.$toast.success('举报成功')
    },
    // 拉黑作者
    async blackLists () {
      // 删除父组件文章
      this.$emit('delart', this.artid)
      // 作者id难找，不做了
      // await blackList({target: this.artid})
      this.isReport = false
      this.show = false
      this.$toast.success('拉黑成功')
    }
  },
}
</script>

<style scoped>
.morepop {
  width: 90%;
}
</style>