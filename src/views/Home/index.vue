<template>
  <div>
    <div class="shousuo">
      <van-cell-group>
        <van-field
          v-model="value1"
          label="北京"
          label-align="crnter"
          placeholder="请输入地址"
        >
          <template #label>
            <div @click="$router.push('/citylist')">
              <i
                >{{ thiscity }} <i class="iconfont icon-xiajiantou"></i>
                <i> | </i>
              </i>
            </div>
          </template>
        </van-field>
      </van-cell-group>
      <i class="iconfont icon-ditu1"></i>
    </div>
    <!-- 轮播 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img
          v-lazy="'http://liufusong.top:8080' + image.imgSrc"
          width="375px"
          height="212px"
        />
      </van-swipe-item>
    </van-swipe>
    <!-- 四个格子 -->
    <div>
      <van-grid :border="false" :column-num="4">
        <van-grid-item replace to="/home/serch">
          <img src="@/assets/four/下载 (3).png" alt="" />
          <div>整租</div>
        </van-grid-item>
        <van-grid-item replace to="/home/serch">
          <img src="@/assets/four/下载 (2).png" alt="" />
          <div>合租</div>
        </van-grid-item>
        <van-grid-item to="/map">
          <img src="@/assets/four/下载 (1).png" alt=""  />
          <div>地图找房</div>
        </van-grid-item>
        <van-grid-item replace to="/newhouses">
          <img src="@/assets/four/下载.png" alt="" />
          <div>去出租</div>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 租房小组 -->
    <div class="xiaozu">
      <van-cell-group>
        <van-cell title="租房小组" value="更多" replace to="/serch" />
      </van-cell-group>
      <div class="big">
        <div class="row" v-for="item in hm" :key="item.id">
          <img :src="'http://liufusong.top:8080' + item.imgSrc" />
          <div>
            <p>{{ item.title }}</p>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { lunboAPI, homelist } from '@/api/home'
export default {
  async created () {
    const imgs = await lunboAPI()
    this.images = imgs.data.body
    this.getuser()
    this.thiscity = this.$store.state.cityname
  },
  data () {
    return {
      value1: '',
      value2: '123',
      images: [],
      hm: [],
      thiscity: '北京'
    }
  },
  methods: {
    async getuser () {
      const hmlist = await homelist()
      this.hm = hmlist.data.body
    }
  },
  computed: {},
  watch: {

  },
  filters: {},
  components: {}
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.shousuo {
  position: fixed;
  display: flex;
  z-index: 99;
  margin-top: 30px;
  height: 29px;
  margin-left: 20px;
  margin-right: 10px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 100px;
  text-align: center;
  background-color: #39a9ed;
  height: 212px;
}
.van-field {
  padding-left: 5px;
}
.icon-ditu1 {
  color: rgb(255, 255, 255);
  font-size: 25px;
  margin-top: 5px;
  margin-left: 20px;
}
.icon-xiajiantou {
  font-size: 12px;
}
.four {
  display: flex;
  height: 123px;
}
.van-grid-item img {
  width: 60px;
  height: 60px;
}
.van-grid-item div {
  margin-top: 10px;
  font-size: 14px;
}
.van-cell {
  background-color: rgb(255, 255, 255);
}
.xiaozu {
  position: fixed;
  padding: 10px 10px;
  height: 188px;
  background-color: rgb(246, 245, 246);
}
.van-cell {
  margin-bottom: 15px;
  background-color: rgb(246, 245, 246);
}
.big {
  width: 355px;
  height: 160px;
  display: flex;
  flex-wrap: wrap;
}
.row {
  border-radius: 5px;
  display: flex;
  width: 165px;
  height: 55px;
  background-color: #fff;
  margin-right: 10px;
}
.row p {
  margin-top: 5px;
  font-size: 14px;
}
.row img {
  margin: 0 10px;
  width: 50px;
  height: 50px;
}
</style>
