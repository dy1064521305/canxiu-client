<template>
	<view style="background-color: #f3f4f6; min-height: 100vh;">
		<!-- <view>
      <u-notice-bar text="text1"></u-notice-bar>
    </view> -->
    <view style="padding: 40rpx; background-color: #fff;">
      <view style="font-size: 40rpx; font-weight: bold; padding: 30rpx 0;">待处理</view>
      <u-grid col="4">
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
	</view>
</template>

<script>
</script>

<style lang="scss">
</style>