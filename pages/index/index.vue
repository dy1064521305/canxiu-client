<template>
	<view style="background-color: #f3f4f6; min-height: 100vh;">
		<view style="padding: 40rpx; background-color: #fff; margin-top: 20rpx;">
      <view style="font-size: 40rpx; font-weight: bold; padding: 0 0 40rpx 0;">运行统计</view>
      <u-row gutter="16">
        <u-col span="4">
          <view class="item-tj item-tj-frist">
            <view style="padding: 16rpx; height: 100%; position: relative;">
              <view style="display: flex; color: white;">
                <u-icon name="photo" color="#fff"></u-icon>
                <text>在线人数</text>
              </view>
              <view style="position: absolute; bottom: 48rpx; right: 16rpx;">
                <u-count-to :startVal="0" :endVal="149" :duration="1500" fontSize="40" color="#fff" separator=","></u-count-to>
              </view>
            </view>
          </view>
        </u-col>
        <u-col span="4">
          <view class="item-tj item-tj-second">
            <view style="padding: 16rpx; height: 100%; position: relative;">
              <view style="display: flex; color: white;">
                <u-icon name="photo" color="#fff"></u-icon>
                <text>今日新增</text>
              </view>
              <view style="position: absolute; bottom: 48rpx; right: 16rpx;">
                <u-count-to :startVal="1" :endVal="2349" :duration="1500" fontSize="40" color="#fff" separator=","></u-count-to>
              </view>
            </view>
          </view>
        </u-col>
        <u-col span="4">
          <view class="item-tj item-tj-thrid">
            <view style="padding: 16rpx; height: 100%; position: relative;">
              <view style="display: flex; color: white;">
                <u-icon name="photo" color="#fff"></u-icon>
                <text>总人数</text>
              </view>
              <view style="position: absolute; bottom: 48rpx; right: 16rpx;">
                <u-count-to :startVal="1" :endVal="1249350" :duration="1500" fontSize="40" color="#fff" separator=","></u-count-to>
              </view>
            </view>
          </view>
        </u-col>
      </u-row>
    </view>
    <view style="padding: 40rpx; background-color: #fff; margin-top: 40rpx;">
      <view style="font-size: 40rpx; font-weight: bold; padding: 0 0 40rpx 0;">统计报表</view>
      <u-grid col="3">
        <u-grid-item>
          <u-icon name="star" color="#2979ff" size="60rpx"></u-icon>
          <text class="btn-text">访问量统计</text>
        </u-grid-item>
        <u-grid-item>
          <u-icon name="share-square" color="#2979ff" size="60rpx"></u-icon>
          <text class="btn-text">分享统计</text>
        </u-grid-item>
      </u-grid>
    </view>
	</view>
</template>

<script>
</script>

<style lang="scss">
.item-tj {
  width: 100%;
  height: 160rpx;
  border-radius: 16rpx;
  
  &-frist {
    
    background-color: rgba($color: #2979ff, $alpha: 0.8);
    // background-image: url('/static/img/bg/qb.png');
  }

  &-second {
    background-color: rgba($color: #303133, $alpha: 0.8);
    // background-image: url('/static/img/bg/qb.png');
  }

  &-thrid {
    background-color: rgba($color: #19be6b, $alpha: 0.8);
    // background-image: url('/static/img/bg/qb.png');
  }

}
</style>