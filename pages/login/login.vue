<template>
  <view class="container">
    <!-- 页面头部 -->
    <view class="header">
      <view class="title">
        <text>Fastbuild管理平台</text>
      </view>
      <view class="sub-title">
        <text>暂未开放注册功能</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="login-form">
      <!-- 登录账号 -->
      <view class="form-item">
        <input class="form-item--input" type="text" v-model="username" maxlength="16" placeholder="请输入账号" />
      </view>
	  <!-- 登录密码 -->
	  <view class="form-item">
	    <input class="form-item--input" type="password" v-model="password" maxlength="18" placeholder="请输入账号" />
	  </view>
      <!-- 图形验证码 -->
      <view class="form-item">
        <input class="form-item--input" type="text" v-model="captchaCode" maxlength="5" placeholder="请输入图形验证码" />
        <view class="form-item--parts">
          <view class="captcha" @click="getCaptcha()">
            <image class="image" :src="captcha"></image>
          </view>
        </view>
      </view>
      <!-- 登录按钮 -->
      <view class="login-button" @click="handleLogin">
        <text>登录</text>
      </view>
    </view>

  </view>
</template>

<script>
  import store from '@/store'
  import * as CaptchaApi from '@/api/captcha'
  
  export default {
    components: {
    },

    data() {
      return {
        // 正在加载
        isLoading: false,
        // 图形验证码信息
        captcha: null,
        // 登录账号
        username: 'admin',
		// 密码
		password: 'admin123',
        // 图形验证码
        captchaCode: '',
		uuid: ''
      }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    created() {
      // 获取图形验证码
      this.getCaptcha()
    },

    methods: {

      // 获取图形验证码
      getCaptcha() {
        const app = this
        CaptchaApi.image().then(result => {
			app.captcha = 'data:image/gif;base64,' + result.img
			app.uuid = result.uuid
		});
      },

      // 表单验证
      formValidation() {
        const app = this
        if (!app.validteCaptchaCode(app.captchaCode)) {
			return false
        }
        return true
      },

      // 验证图形验证码
      validteCaptchaCode(str) {
        // if (Verify.isEmpty(str)) {
        //   this.$toast('请先输入图形验证码')
        //   return false
        // }
        return true
      },

      // 点击登录
      handleLogin() {
        const app = this
        if (!app.isLoading && app.formValidation()) {
          app.submitLogin()
        }
      },

      // 确认登录
      submitLogin() {
        const app = this
        app.isLoading = true
        store.dispatch('Login', {
            username: app.username,
            password: app.password,
            code: app.captchaCode,
            uuid: app.uuid
          })
          .then(result => {
			uni.switchTab({
				url: '/pages/main/index',
				fail(err) {
					console.log(err)
				}
			})
          })
          .catch(err => {
            app.getCaptcha();
          })
          .finally(() => app.isLoading = false)
      },

    }
  }
</script>

<style lang="scss" scoped>
  .container {
    padding: 100rpx 60rpx;
    min-height: 100vh;
    background-color: #fff;
  }

  // 页面头部
  .header {
    margin-bottom: 60rpx;

    .title {
      color: #191919;
      font-size: 54rpx;
    }

    .sub-title {
      margin-top: 20rpx;
      color: #b3b3b3;
      font-size: 28rpx;
    }
  }

  // 输入框元素
  .form-item {
    display: flex;
    padding: 18rpx;
    border-bottom: 1rpx solid #f3f1f2;
    margin-bottom: 30rpx;
    height: 96rpx;

    &--input {
      font-size: 28rpx;
      letter-spacing: 1rpx;
      flex: 1;
      height: 100%;
    }

    &--parts {
      min-width: 100rpx;
      height: 100%;
    }

    // 图形验证码
    .captcha {
      height: 100%;

      .image {
        display: block;
        width: 192rpx;
        height: 100%;
      }
    }

    // 短信验证码
    .captcha-sms {
      font-size: 28rpx;
      line-height: 50rpx;
      padding-right: 20rpx;

      .activate {
        color: #cea26a;
      }

      .un-activate {
        color: #9e9e9e;
      }
    }
  }


  // 登录按钮
  .login-button {
    width: 100%;
    height: 86rpx;
    margin-top: 80rpx;
    background: linear-gradient(to right, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 80rpx;
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
    letter-spacing: 5rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>