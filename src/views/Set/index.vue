<template>
  <div class="main">
    <div class="zhutia" v-if="xuser && xuser.token">
      <img src="@/assets/four/denglu.png" alt="" />
      <div class="usera">
        <div class="touxianga">
          <img src="@/assets/four/avatar.png" alt="" />
        </div>
        <div class="btn">
          <div class="title">游客</div>
          <span type="primary" size="small" @click="logout"> 退出 </span>
          <p>去编辑资料 <van-icon name="play" /></p>
        </div>
      </div>
    </div>
    <div class="zhuti1" v-else>
      <img
        src="@/assets/four/bg.png"
        alt=""
        style="width: 375px; height: 191px"
      />
      <div class="user">
        <div class="touxiang">
          <img src="@/assets/four/avatar.png" alt="" />
        </div>
        <div class="btn">
          <p>游客</p>
          <van-button type="primary" size="small" @click="login">
            去登录
          </van-button>
        </div>
      </div>
    </div>
    <div class="zhuti2">
      <van-grid :column-num="3">
        <van-grid-item icon="like-o" text="我的收藏" />
        <van-grid-item icon="wap-home-o" text="我的出租" />
        <van-grid-item icon="clock-o" text="看房记录" />
        <van-grid-item icon="debit-pay" text="成为房主" />
        <van-grid-item icon="manager-o" text="个人资料" />
        <van-grid-item icon="service-o" text="联系我们" />
      </van-grid>
    </div>
    <div class="zhuti3" @click="bottom">
      <img src="@/assets/four/join.png" alt="" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  created () { },
  data () {
    return {}
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    logout () {
      this.$dialog.confirm({
        title: '提示',
        message: '是否确定退出？',
        confirmButtonText: '退出'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setuser', {})
        })
    },
    bottom () {
      this.$router.push('/people')
    }
  },
  computed: {
    ...mapState(['xuser'])
  },
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
.main {
  padding-bottom: 60px;
}
/deep/.user {
  position: absolute;
  background: #fff;
  width: 74%;
  height: 55%;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 10px 3px #ddd;
  margin: 50px auto 0;
  padding: 0 20px;
  text-align: center;
  font-size: 13px;
}
.touxiang img {
  position: absolute;
  transform: translateX(-50%);
  top: -25px;
  width: 100%;
  border-radius: 50%;
  border: 5px solid #f5f5f5;
}
.touxiang {
  position: relative;
  width: 60px;
  height: 60px;
  margin: 0 auto;
}
.zhuti1 {
  height: 300px;
  position: relative;
}
.van-button {
  color: rgb(255, 255, 255);
  font-size: 13px;
  height: 30px;
  line-height: 30px;
  padding: 0 15px;
  background-color: #21b97a;
}
//中间部分 宫格
.zhuti2 {
  width: 100%;
  height: 190px;
}
.van-grid {
  margin-top: 15px;
}
.zhuti3 {
  margin: 0 15px;
  border-radius: 15%;
  height: 88px;
}
.zhuti3 img {
  width: 100%;
  height: 100%;
}
.van-grid-item ::after {
  border: unset;
}
//zhutia
.zhutia {
  position: relative;
  width: 375px;
  height: 375px;
  img {
    width: 100%;
    height: 100%;
  }
  /deep/.usera {
    position: absolute;
    background: #fff;
    width: 75%;
    height: 55%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 10px 3px #ddd;
    margin: 50px auto 0;
    padding: 0 20px;
    text-align: center;
    font-size: 13px;
    margin: 0 auto;
    .btn {
      margin-top: 60px;
      span {
        width: 54px;
        margin-top: 10px;
        border-radius: 30px;
        color: #fff;
        padding: 2px 15px;
        background: #21b97a;
        font-size: 12px;
      }
      p {
        color: #999;
        font-size: 12px;
        margin-top: 30px;
      }
      .title {
        margin-bottom: 5px;
      }
    }
  }
  .touxianga img {
    position: absolute;
    transform: translateX(-50%);
    top: -30px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 5px solid #f5f5f5;
  }
}
</style>
