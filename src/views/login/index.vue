<template>
  <div class="login">
    <!-- <div class="loginImg">
      <img style=""
           src="@/assets/logo.png"
           alt="">
    </div> -->

    <div class="main">
      <!-- 电话 -->
      <van-nav-bar title="登录" />
      <van-field v-model="form.mobile"
                 required
                 placeholder="请输入手机号"
                 :error-message="result.mobile">
        <template #left-icon>
          <i class="iconfont icon-iphone"></i>
        </template>
      </van-field>
      <!--验证码 -->
      <van-field v-model="form.code"
                 required
                 clearable
                 placeholder="请输入验证码"
                 :error-message="result.code">
        <template #button>
          <van-button round
                      size="small"
                      @click="getCodes">发送验证码</van-button>
        </template>
        <template #left-icon>
          <i class="iconfont icon-lock"></i>
        </template>
      </van-field>
    </div>
    <!-- 按钮 -->
    <div class="footer">
      <van-button type="info"
                  class="btn"
                  size="large"
                  :loading='loading'
                  loading-text="加载中"
                  @click="submit">登录</van-button>
    </div>
  </div>
</template>

<script>
import { userInfo, getCode } from '@/api/login.js'
import { setLocal } from '@/utils/mylocal.js'
export default {
  data () {
    return {
      // 表单数据
      form: {
        mobile: '13611111111',
        code: '246810'
      },
      // 正则表达式
      pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
      pattern2: /^\d{6}$/,
      // 错误提示
      result: {
        mobile: '',
        code: ''
      },
      loading: false
    }
  },
  methods: {
    // 验证表单
    checkdata () {
      var isPass = []
      if (!this.pattern.test(this.form.mobile)) {
        this.result.mobile = '手机号验证失败'
        isPass.push(true)
      } else {
        this.result.mobile = ''
        isPass.push(false)
      }
      if (!this.pattern2.test(this.form.code)) {
        this.result.code = '验证码验证失败'
        isPass.push(true)
      } else {
        this.result.code = ''
        isPass.push(false)
      }
      // 登录
      if (!isPass.includes(true)) {
        return true
      }
    },
    async login () {
      if (this.checkdata()) {
        this.loading = true
        try {
          var res = await userInfo(this.form)
          console.log(res.data.token);
          this.$store.commit('setUserInfo', res.data)
          setLocal('userInfo', res.data)
          this.$router.push('/index')
        } catch (error) {
          this.$toast.fail('登录失败')
        }
        this.loading = false
      }
    },
    // 点击登录
    submit () {
      this.login()
    },
    // 获取验证码
    async getCodes () {
      let codes = await getCode({ mobile: 13426543201 })
      console.log(codes);
      this.$toast.success('验证码' + codes);
    }
  },
}
</script>

<style lang='less'>
.login {
  .van-nav-bar.van-hairline--bottom {
    background-color: #3e9df8;
  }
  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }
  button.van-button.van-button--default.van-button--small.van-button--round {
    color: #666;
    background: rgb(237, 237, 237);
    border-color: rgb(237, 237, 237);
  }
  .footer {
    padding: 30px 20px;
    .btn {
      background-color: #1989fa;
    }
  }
}
.loginImg{
  display: flex;
  justify-content: center;
  // text-align: center;
  img{
    width: 100px;
    height: 100px;
  }
}
</style>