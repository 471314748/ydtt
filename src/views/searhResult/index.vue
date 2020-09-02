<template>
  <div class="searhResult">
    <h2>搜索结果</h2>
    <h2>参数{{key}}</h2>
  </div>
</template>

<script>
export default {
  data () {
    return {
      key: ""
    }
  },
  created () {
    this.key = this.$route.query.key
  },
}
</script>

<style>
</style>