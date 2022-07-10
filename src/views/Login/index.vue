<template>
  <div>
    <van-nav-bar title="账号登录" left-arrow color="white" @click-left="back" />
    <div class="dl">
      <van-form @submit="onSubmit">
        <van-field v-model="username" name="username" placeholder="用户名" />
        <van-field
          v-model="password"
          type="password"
          name="password"
          placeholder="密码"
          size="large"
        />
        <div style="margin: 16px">
          <van-button block type="info" native-type="submit" color="#1cb676"
            >提交</van-button
          >
        </div>
      </van-form>
      <a>还没有账号，去注册</a>
    </div>
  </div>
</template>

<script>
import { getuser } from '@/api/login'
export default {
  created () {
  },
  data () {
    return {
      username: '200010',
      password: '200010',
      user: {}
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await getuser(values)
        this.user = res.data.body
        this.$store.commit('setuser', res.data.body)
        if (this.$store.state.xuser && this.$store.state.xuser.token) {
          this.$toast.success('成功')
          setTimeout(() => this.$router.push({ name: 'set' }), 2000)
        } else {
          if (this.username.length < 6 || this.password.length < 6) {
            this.$toast('账号格式小于6位')
          } else {
            this.$toast.fail('账号或密码存在问题')
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    back () {
      this.$router.push('home/set')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.dl {
  text-align: center;
  a {
    font-size: 12px;
  }
  .van-field {
    padding-top: 50px;
    font-size: 18px;
  }
}
</style>
