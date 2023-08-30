<template>
	<view class="swiper-container">
		<swiper indicator-active-color='#9FD6BA' class="swiper" :current="current" @change="swiperChange">
			<swiper-item v-for="(item,index) in swiperArr" :key="index">
				<view class="swiper-item ">
					<view style="height: 23vh;">
						
					</view>
					<view style="height: 39vh;">
						<image :src="item.image" style="width: 511rpx;height: 85%;"></image>
					</view>
					<view style="height: 6vh;">
							<image :src="item.title" style="width: 263rpx;height: 53rpx;"></image>
					</view>
				
					<view class="font">
						{{item.slogin}}
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="indicator">
			<ul v-if='current!=3'>
				<li v-for="(item1,index1) in swiperArr" :key="index1" :class="[current===index1&&'current']"></li>
			</ul>
				<image @click="lijitiyan" v-else  src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/07/5373c9e5f6eb44c0b17b913efd414e2b.png" style="width: 663rpx;height: 91rpx;"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				swiperArr: [{
					image:'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/07/1f22499602764d3ba2e9b7c740e75bfa.png',
					title:'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/07/1920d32ae67f406ca13e0480bbd88374.png',
					slogin:'一键下单，快速响应'
				},
				{
					image:'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/30/09c98427e1e64637a22949729c981869.png',
					title:'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/07/6427686bffe94313b9a8dd4628e61af0.png',
					slogin:'全国直营，就近上门'
				},
				{
					image:'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/07/c62fff3790d74309b5d1c54a873b8c82.png',
					title:'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/07/af56989ed05942f98eca4f7056595db3.png',
					slogin:'维修全面、种类齐全'
				},
				{
					image:'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/07/d1b2d97d84eb4286bb1d3b717368e49f.png',
					title:'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/07/f4b83760fb2847fd90d594e283317d33.png',
					slogin:'先修后付，全国质保'
				},
				]

			};
		},
		onLoad() {
			
		},
		methods: {
			//轮播组件滑动
			swiperChange(e) {
				this.current = e.detail.current
			},
			lijitiyan(){
				uni.switchTab({
					url:'/pages/home/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-container {
		position: relative;

		.indicator {
			position: absolute;
			bottom: 12%;
			left: 50%;
			transform: translateX(-50%);

			ul {
				display: flex;
				list-style: none;
				padding: 0;

				li {
					width: 16rpx;
					height: 16rpx;
					border-radius: 8rpx;
					background: #EBEBEB;
					margin-right: 22rpx;
					transition: all .3s linear;
				}

				.current {
					width: 40rpx;
					background-color: #9FD6BA;
				}
			}
		}
	}

	.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
	}

	.swiper {
		height: 100vh;

		.swiper-item {
			//line-height: 300rpx;
			text-align: center;
			    display: flex;
			    flex-direction: column;
			.font{
				font-size: 40rpx;
				color: #626D65;
			}
		}
	}
</style>

 