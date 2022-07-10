<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/home/serch" icon="search"
        >找房</van-tabbar-item
      >
      <van-tabbar-item replace to="/home/people" icon="comment-o"
        >咨询</van-tabbar-item
      >
      <van-tabbar-item replace to="/home/set" icon="manager-o"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      active: 0
    }
  },
  methods: {
    change (v) {
      console.log(v)
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang='less'>
.van-tabbar{
  position:fixed
}
</style>
