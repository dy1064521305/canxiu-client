<template>
	<view class="">
    <view style="background-color: #f3f4f6;">
      <view style="padding: 40rpx; height: 180rpx; line-height: 180rpx;">
        <view style="display: inline-block; width: calc(100% - 162rpx)">
          <view style="height: 30px; line-height: 30px; font-size: 50rpx; font-weight: bold; width: 100%;">{{ user.nickName }}</view>
          <text style="height: 30px; line-height: 30px;">{{ user.email }}</text>
        </view>
        <view style="display: inline-block; float: right;">
          <u-image src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle" width="160rpx" height="160rpx"></u-image>
        </view>
      </view>
      <view style="padding: 40rpx 40rpx 0 40rpx;">
        <view class="profile-rule">
          <u-row>
            <u-col span="8">
              <view style="color: white; font-size: 20px;">研发中心</view>
            </u-col>
            <u-col span="4">
              <u-button icon="question-circle" text="问题反馈" @click="logout" style="height: 36px;"></u-button>
            </u-col>
          </u-row>
        </view>
      </view>
    </view>
    <view style="padding: 40rpx; background-color: #fff;">
      <u-grid>
        <u-grid-item>
          <u-icon name="account-fill" color="#2979ff" size="60rpx"></u-icon>
          <text class="btn-text">个人资料</text>
        </u-grid-item>
        <u-grid-item>
          <u-icon name="lock-fill" color="#2979ff" size="60rpx"></u-icon>
          <text class="btn-text">修改密码</text>
        </u-grid-item>
        <u-grid-item>
          <u-icon name="coupon-fill" color="#2979ff" size="60rpx"></u-icon>
          <text class="btn-text">操作日志</text>
        </u-grid-item>
      </u-grid>
    </view>

    <view style="padding: 40rpx; margin-top: 300rpx;">
      <u-row gutter="32">
        <u-col span="6">
          <u-button icon="phone" text="联系我们" @click="logout" plain></u-button>
        </u-col>
        <u-col span="6">
		      <u-button icon="reload" text="退出" type="error" @click="logout"></u-button>
        </u-col>
      </u-row>
    </view>
	</view>
</template>

<script>
import * as UserApi from '@/api/user'

export default {
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      const app = this
      UserApi.getInfo().then(res => {
        app.user = res.user;
      })
    },
    logout () {
      const app = this
      app.$store.dispatch('Logout').then(res => {
        uni.reLaunch({
          url: '/'
        })
      })
    }
  }
}
</script>

<style lang="scss">
.profile-rule {
  height: 140rpx;
  line-height: 140rpx;
  padding: 0px 40rpx;
  background-color: $u-main-color;
  border-radius: 16px 16px 0 0;
  box-shadow: 0px 16px 26px rgba(0, 0, 0, .8);
}
.btn-text {
  font-size: 28rpx;
  color: #606266;
}
</style>