<template>
  <div>
    <div class="title">
      <van-icon name="arrow-left" color="#fff" class="jiantou" @click="back" />
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        background="#4fc08d"
      >
        <template #label>
          <div @click="changecityid">
            {{ thiscity }}
            <i
              class="iconfont icon-xiajiantou"
              style="font-size: 12px; color: #7f7f80"
            ></i>
            &nbsp; <i>|</i> &nbsp;
          </div>
        </template>
        <template #action>
          <i class="iconfont icon-ditu1"></i>
        </template>
      </van-search>
    </div>
    <div class="selectbox">
      <!-- 筛选导航 -->
      <van-sticky>
        <van-dropdown-menu>
          <van-dropdown-item title="区域">
            <van-picker title="标题" :columns="columns" value-key="label" />
            <van-row>
              <van-col span="10">
                <van-button block>取消</van-button>
              </van-col>
              <van-col span="14">
                <van-button type="primary" block>确定</van-button>
              </van-col>
            </van-row>
          </van-dropdown-item>
          <van-dropdown-item title="方式">
            <van-picker title="标题" :columns="columns1" value-key="label" />
            <van-row>
              <van-col span="10">
                <van-button block>取消</van-button>
              </van-col>
              <van-col span="14">
                <van-button type="primary" block>确定</van-button>
              </van-col>
            </van-row>
          </van-dropdown-item>
          <van-dropdown-item title="租金">
            <van-picker title="标题" :columns="columns2" value-key="label" />
            <van-row>
              <van-col span="10">
                <van-button block>取消</van-button>
              </van-col>
              <van-col span="14">
                <van-button type="primary" block>确定</van-button>
              </van-col>
            </van-row>
          </van-dropdown-item>
          <van-dropdown-item
            title="筛选"
            @open="flag = true"
          ></van-dropdown-item>
        </van-dropdown-menu>
      </van-sticky>
      <van-popup
        position="right"
        style="height: 100%; width: 70%"
        v-model="flag"
      >
      </van-popup>
    </div>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- 中间数据 -->
      <div class="list">
        <div class="HouseList" v-for="(item, index) in houseslist" :key="index">
          <img :src="'http://liufusong.top:8080' + item.houseImg" alt="" />
          <div class="fanglist">
            <h3 class="van-ellipsis">{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
            <p>{{ item.tags[0] }}</p>
            <p>{{ item.price }}<span>元/月</span></p>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { gethouses, gethouseslist } from '@/api/houses'
export default {
  async created () {
    const res1 = await gethouseslist({ id: this.$store.state.cityid })
    console.log(res1)
    res1.data.body.area.children[0].children = [{ label: '' }]
    res1.data.body.subway.children[0].children = [{ label: '' }]
    this.columns = [res1.data.body.area, res1.data.body.subway]
    this.columns1 = res1.data.body.rentType
    this.columns2 = res1.data.body.price
    console.log(res1.data.body.price)
    this.gethouses()
  },
  data () {
    return {
      value: '',
      // 当前城市
      thiscity: '',
      houseslist: [],
      cityid: '',
      loading: false,
      finished: false,
      start: 1,
      end: 20,
      columns: [],
      columns1: [],
      columns2: [],
      flag: false
    }
  },
  methods: {
    back () {
      this.$router.push('/home')
    },
    changecityid () {
      this.$router.push('/citylist')
    },
    async gethouses () {
      try {
        // cityid
        // this.cityid =
        // console.log(this.$store.state.cityid)
        this.thiscity = this.$store.state.cityname
        this.cityid = this.$store.state.cityid
        const res = await gethouses({ cityId: this.cityid })
        console.log(res.data.body)
        this.houseslist.push(...res.data.body.list)
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    onLoad () {
      this.start += 20
      this.gethouses()
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
* {
  margin: 0;
  padding: 0;
}
.title {
  display: flex;
  background-color: #21b97a;
  height: 50px;
  line-height: 50px;
}
.icon-ditu1 {
  margin: 15px 0 0 10px;
  color: rgb(255, 255, 255);
  font-size: 25px;
}
.jiantou {
  margin-top: 13px;
}
.van-search {
  padding-left: 30px;
  span {
    color: rgb(117, 115, 115);
  }
}
.van-search__content {
  padding-left: 5px;
}
.choose {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #e4e6f0;
  p {
    font-size: 17px;
  }
  .icon-xiajiantou {
    margin-left: 5px;
    color: #bbbbbb;
    font-size: 12px;
  }
}
.van-picker__columns {
  width: 375px;
}
/deep/.van-picker__cancel {
  width: 125px;
  height: 50px;
  color: #21b97a;
}
/deep/.van-picker__confirm {
  width: 250px;
  height: 50px;
  color: #fff;
  background-color: #21b97a;
}
/deep/.van-dropdown-menu {
  width: 100%;
}
.selectbox {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
.btn {
  z-index: 9;
  position: absolute;
  top: 260px;
  z-index: 2;
  display: flex;
  .btn1 {
    width: 125px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #4fc08d;
    font-size: 18px;
    background-color: #fff;
  }
  .btn2 {
    line-height: 50px;
    width: 250px;
    height: 50px;
    background-color: #4fc08d;
    text-align: center;
    color: #fff;
    font-size: 18px;
  }
}
.list {
  margin: 0 auto;
  width: 345px;
  padding-bottom: 40px;
}
.HouseList {
  width: 100%;
  height: 110px;
  display: flex;
  padding-top: 18px;
  border-bottom: 1px solid #e5e5e5;
  img {
    width: 106px;
    height: 80px;
    margin-right: 10px;
  }
  h3 {
    font-size: 15px;
  }
  p {
    margin-top: 10px;
    font-size: 12px;
    &:nth-child(2) {
      font-size: 12px;
      color: #afb2b3;
    }
    &:nth-child(3) {
      display: block;
      width: 46px;
      height: 20px;
      color: #39becd;
      background: #e1f5f8;
    }
    &:nth-child(4) {
      font-size: 16px;
      color: #fa5741;
      span {
        font-size: 12px;
      }
    }
  }
}
</style>
