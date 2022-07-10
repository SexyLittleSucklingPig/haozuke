<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar title="发布房源" left-arrow @click-left="back" />
    <!-- 表格 -->
    <div class="bigbox">
      <div class="fangyuan">
        <p>房源信息</p>
      </div>
      <div class="xiaoqu">
        <van-cell-group>
          <van-cell title="小区名称" is-link value="请输入小区名称" center />
        </van-cell-group>
        <van-cell-group>
          <van-field
            v-model="datas.price"
            label="租金"
            placeholder="请输入租金/月"
            center
          >
            <template #right-icon>
              <i>￥/月</i>
            </template>
          </van-field>
          <van-field
            v-model="datas.size"
            label="建筑面积"
            placeholder="请输入建筑面积"
            center
          >
            <template #right-icon>
              <i>㎡</i>
            </template>
          </van-field>
          <!-- 弹出 -->
          <van-field
            v-model="fieldValue1"
            is-link
            readonly
            label="户型"
            placeholder="请选择所在地区"
            ref="itme1"
            @click="onshow1"
          />
          <van-field
            v-model="fieldValue2"
            is-link
            readonly
            label="所在楼层"
            placeholder="请选择所在地区"
            ref="itme2"
            @click="onshow2"
          />
          <van-field
            v-model="fieldValue3"
            is-link
            readonly
            label="朝阳"
            placeholder="请选择所在地区"
            ref="item3"
            @click="onshow3"
          />
          <van-popup v-model="dishow" round position="bottom">
            <van-picker
              show-toolbar
              :columns="columns"
              @confirm="onConfirm"
              @cancel="onCancel"
            />
          </van-popup>
        </van-cell-group>
      </div>
      <div class="biao">
        <p>房屋标题</p>
        <input
          v-model="datas.title"
          type="text"
          placeholder="请输入标题（例如：整租 小区名 2室 5000元"
          center
        />
      </div>
      <div class="tupian">
        <p>房屋图像</p>
        <van-uploader :after-read="afterRead" v-model="imgs">
          <template #icon> </template>
        </van-uploader>
      </div>
      <div class="tupian">
        <p>房屋配置</p>
        <van-grid :column-num="5">
          <van-grid-item
            v-for="(item, index) in phototext"
            :key="index"
            :text="item.label"
            :class="{ clickcolors: clickcolorindex.indexOf(index) !== -1 }"
            @click="peizhiclick(item.label, index)"
          >
            <template #icon>
              <i class="iconfont icon-xiyiji"></i>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="biao">
        <p>房屋描述</p>
        <van-field
          v-model="datas.description"
          rows="2"
          autosize
          type="textarea"
          placeholder="请输入留言"
          show-word-limit
        />
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="btn">
      <div @click="esc" style="backgroundcolor: #fff">取消</div>
      <div @click="up" style="backgroundcolor: #21b97a">提交</div>
    </div>
  </div>
</template>

<script>
import { addimg, pushhose, addhome } from '@/api/houses'
export default {
  created () {
    this.pushhose()
    // this.datas.community = this.$store.state.cityid
  },
  data () {
    return {
      dishow: false, // 底部弹出层级
      message: '', // 房屋描述
      fieldValue1: '',
      fieldValue2: '',
      fieldValue3: '',
      roomvalue: [],
      columns: [],
      columns1: [],
      columns2: [],
      columns3: [],
      peizhi: [],
      file: [], // 照片
      required: {}, // 所需信息
      phototext: [], // 配置渲染
      peishiclick: [], // 配置点击添加渲染
      clickcolorindex: [], // index
      clickcolor: false,
      imgs: [],
      datas: {
        title: '', // 标题]
        description: '',
        // 表述]
        houseImg: '', // 图片]
        oriented: '', // 朝向]
        supporting: '', // 配置]
        price: '', // 价格]
        roomType: '', // 几室value]
        size: '', // 大小]
        floor: '', // 高中层编码]
        community: '' // token
      }
    }
  },
  methods: {
    // 照片
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      // eslint-disable-next-line prefer-const
      let obj = new FormData()
      obj.append('file', file.file)
      const res = await addimg(obj)
      console.log(res)
      console.log(this.imgs)
      this.imgs.push(res.data.body)
      console.log(this.imgs)
      this.datas.houseImg = this.imgs[1].join('|')
    },
    back () {
      this.$router.push('/home')
    },
    onshow1 () {
      this.dishow = true
      this.columns = this.columns1
    },
    onshow2 () {
      this.dishow = true
      this.columns = this.columns2
    },
    onshow3 () {
      this.dishow = true
      this.columns = this.columns3
    },
    // 弹框信息
    onConfirm (value, index) {
      this.dishow = false

      if (this.columns === this.columns1) {
        this.fieldValue1 = value
        // this.datas.roomType = this.roomType.filter(item => item.value === value)
        this.datas.roomType = this.roomvalue[index].value
        console.log(this.datas.roomType)
      } else if (this.columns === this.columns2) {
        this.fieldValue2 = value
        this.datas.floor = this.floors[index].value
        console.log(this.datas.floor)
      } else {
        this.fieldValue3 = value
        this.datas.oriented = this.orienteds[index].value
      }
      console.log(this.datas)
      console.log(this.datas.description)
    },
    onCancel () {
      this.dishow = false
    },
    async pushhose () {
      const res = await pushhose()
      console.log(res.data.body)
      res.data.body.roomType.forEach((item) => this.columns1.push(item.label))
      res.data.body.floor.forEach((item) => this.columns2.push(item.label))
      res.data.body.oriented.forEach((item) => this.columns3.push(item.label))
      this.phototext = res.data.body.supporting // 配置图片文本
      this.roomvalue = res.data.body.roomType
      this.orienteds = res.data.body.oriented
      this.floors = res.data.body.floor
      console.log(this.phototext)
    },
    peizhiclick (value, index) {
      if (this.peishiclick.indexOf(value) !== -1) {
        this.peishiclick.splice(this.peishiclick.indexOf(value), 1)
        this.clickcolorindex.splice(this.clickcolorindex.indexOf(index), 1)
      } else {
        this.peishiclick.push(value)
        this.clickcolorindex.push(index)
      }
      this.datas.supporting = this.peishiclick.join('|')
      // console.log(this.datas.supporting)
    },
    async up () {
      try {
        if (this.imgs.length < 0) {
          return this.$toast('上传图片')
        }
        console.log(this.datas)
        const msg = await addhome(this.datas)
        console.log(msg)
      } catch (err) {
        console.log(err)
      }
    },
    esc () {
      for (const key in this.datas) {
        this.datas[key] = ''
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.bigbox {
  margin-bottom: 70px;
  p {
    font-size: 14px;
    padding-bottom: 15px;
    border-bottom: 2px solid #d3d3d7;
  }
}
.xiaoqu {
  padding: 0 15px;
  background-color: #fff;
}
/deep/.van-cell {
  height: 44px;
}
.biao {
  padding: 15px 15px 9px;
  font-size: 14px;
  input {
    border: 0;
    width: 100%;
    height: 44px;
  }
}
.fangyuan {
  padding: 15px 15px 9px;
  color: #21b97a;
  background-color: #fff;
  font-size: 15px;
}
.tupian {
  padding: 0 15px;
}
.peizhi {
  width: 375px;
  height: 122px;
  background-color: rgb(43, 131, 141);
}
.btn {
  position: fixed;
  justify-content: space-between;
  display: flex;
  bottom: 0;
  div {
    width: 185px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    &:nth-child(1){
      background-color: #fff;
    }
     &:nth-child(2){
      background-color: #21b97a;
    }
  }
}
.content {
  padding: 16px 16px 160px;
}
//配置动态类
.clickcolors {
  color: #21b97a !important;
}
</style>
