<template>
  <div>
    <van-nav-bar
      title="城市列表"
      left-arrow
      @click-left="onClickLeft"
      fixed
      sticky
    />
    <!-- 城市 -->
    <van-index-bar :index-list="indexList" highlight-color="#1cb676e6">
      <template>
        <div>
          <van-index-anchor index="当前城市" />
          <van-cell :title="thiscity" />
        </div>
        <div>
          <van-index-anchor index="热门城市" />
          <van-cell
            v-for="(item, index) in hotcity"
            :key="index"
            :title="item.label"
            @click="changecity(item.label, item.value)"
          />
        </div>
        <div v-for="(obj, index) in citylist" :key="index + '2'">
          <van-index-anchor :index="index.toUpperCase()" />
          <van-cell
            v-for="(item, index) in obj"
            :key="index"
            :title="item.label"
            @click="changecity(item.label)"
          />
        </div>
      </template>
    </van-index-bar>
  </div>
</template>

<script>
import { getcity, hotcity } from '@/api/citylist'
// import store from '@/api/store'
export default {
  created () {
    this.getcitylist()
    this.gethotcity()
  },
  data () {
    return {
      indexList: [],
      citylist: [],
      hotcity: {},
      thiscity: '北京'
    }
  },
  methods: {
    // 返回上一级箭头
    onClickLeft () {
      this.$router.push('/home')
    },
    // 城市列表
    async getcitylist () {
      try {
        // this.$toast.loading({
        //   message: '加载中...',
        //   forbidClick: true
        // })
        const res = await getcity({ level: 1 })
        this.citylist = res.data.body
        // eslint-disable-next-line prefer-const
        let souzimu = {}
        this.citylist.forEach((item) => {
          const firstpin = item.short.substr(0, 1)
          if (souzimu[firstpin]) {
            souzimu[firstpin].push(item)
          } else {
            souzimu[firstpin] = [item]
          }
        })
        const newkeys = Object.keys(souzimu).sort()
        const newobj = {}
        for (let i = 0; i < newkeys.length; i++) {
          newobj[newkeys[i]] = souzimu[newkeys[i]]
        }
        this.citylist = newobj
        console.log(this.citylist)
        // 右边序列
        const rightindex = Object.keys(souzimu).sort()
        this.indexList = ['#', '热'].concat(
          rightindex.map((item) => item.toUpperCase())
        )
      } catch (err) {
        console.log(err)
      }
    },
    // 热门城市
    async gethotcity () {
      const res = await hotcity()
      this.hotcity = res.data.body
    },
    // 点击事件
    changecity (val, id) {
      this.thiscity = this.$store.state.cityname
      this.$store.commit('setcityname', { val, id })
      console.log(this.$store.state.cityid)
      this.$router.push('/home')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-index-bar {
  margin-top: 40px;
}
.biao {
  font-size: 14px;
  padding: 10px 15px;
  color: rgb(153, 153, 153);
}
.van-cell__title {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
}
/deep/.van-index-anchor {
  color: #999999;
    z-index: -99;
}
</style>
