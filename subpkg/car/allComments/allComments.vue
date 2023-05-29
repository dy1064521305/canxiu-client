<template>
	<!-- 全部评价 -->
	<view class="container">
		<z-paging ref="paging" v-model="appraiseList" @query="getList">
			<view slot='top'>
				<view class="top">
					<view :class="['box',check==index?'box-active':'box-unactive']" v-for="(item,index) in radios"
						:key="index" @click="checkHandle(index)">
						{{item}}
					</view>
				</view>
			</view>

			<view class="main" v-for="(item,index1) in appraiseList" :key='index1'>
				<view style="display: flex;margin-bottom: 10rpx;">
					<u-avatar :src="item.avatarUrl" size="28"></u-avatar>
					<view style="font-size: 25rpx;color: #3D3F3E;height: 60rpx;line-height: 60rpx;margin:0 20rpx;">
						{{item.name}}
					</view>
					<u-rate :count="count" v-model="item.num" allowHalf activeColor='#ec9322' readonly></u-rate>
					<view
						:style="{'text-align': 'end','font-size': '25rpx','color': '#3D3F3E','height': '60rpx','line-height': '60rpx','width':item.isWonderful=='Y'&&item.isWonderful!=null?'40%':'52%'}">
						{{item.time}}
					</view>
					<!-- 	v-if="item.isWonderful=='Y'&&item.isWonderful!=null" -->
					<image v-if="item.isWonderful=='Y'&&item.isWonderful!=null"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/14/b58459dc35794691a6953855e24f1c93.png"
						mode=""></image>
				</view>
				<view style="width: 95%;">
					{{item.appraiseContent}}
				</view>
				<view style="display: flex;width: 98%;flex-wrap: wrap;margin-top: 10rpx;">
					<view style='margin:15rpx 10rpx;' v-for="(itemm, index2) in item.imgs" :key="index2">
						<u-image radius='8px' width="156rpx" height="156rpx" :src="itemm" mode=""
							@click="previewImage(item.imgs,index2)">
						</u-image>
					</view>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import * as order from '@/api/order.js'
	import formatter from '@/utils/formatter.js'
	export default {
		data() {
			return {
				count: 5,
				value: 2,
				radios: ['全部'],
				check: 0,
				queryParams: {
					pageSize: 10,
					pageNum: 1,
					appraiseStatus:1
				},
				appraiseList: []
			};
		},
		onLoad(option) {
			this.queryParams.productId = option.id

		},
		onShow() {

		},
		methods: {
			getList(pageNo, pageSize) {
				this.queryParams.pageNum = pageNo;
				this.queryParams.pageSize = pageSize;
				//获取评论
				order.appraiseList(this.queryParams).then(res => {
					console.log(res);
					res.rows.forEach(item => {
						let num = (Number(item.attitudeScore) + Number(item.technicalScore) + Number(item
							.velocityScore)) / 3
						item.num = Math.floor(num)
						item.imgs = item.appraiseImg != null ? item.appraiseImg.split(',') : [],
							item.name = item.clientName!=null&& item.clientName!=''?item.clientName[0] + '*':'**'
						item.time = formatter.transDate(item.createTime).one

					})
					this.$refs.paging.completeByTotal(res.rows, res.total);
				})
			},
			checkHandle(i) {
				this.check = i
			},
			previewImage(list, i) {
				uni.previewImage({
					current: list[i], // 当前显示图片的http链接
					urls: list, // 需要预览的图片http链接列表
				})
			},
		}
	}
</script>

<style>
	page {
		background: #F5F9FA;
	}
</style>
<style lang="scss" scoped>
	.container {
		.top {
			height: 150rpx;
			background: #FFFFFF;
			display: flex;

			.box {
				width: 170rpx;
				height: 65rpx;
				font-weight: 600;
				box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
				border-radius: 7rpx;
				text-align: center;
				line-height: 65rpx;
				font-size: 29rpx;
				margin: 45rpx 20rpx 20rpx 30rpx;
			}

			.box-unactive {
				background: #F5F9FA;
			}

			.box-active {
				color: #72DAA4;
				background: rgba(159, 214, 186, 0.2);
			}

		}

		.main {
			background: #FFFFFF;
			padding: 30rpx;
			margin-top: 17rpx;
			position: relative;

			image {
				position: absolute;
				top: 30rpx;
				right: 20rpx;
				width: 53rpx;
				height: 62rpx;
				margin-top: -30rpx;
			}
		}
	}
</style>
