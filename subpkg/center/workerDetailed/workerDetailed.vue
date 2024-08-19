<template>
	<view class="worker">
		<image style="height:543rpx ;width: 100%;"
			src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/11/22/9afcbb340d984a55950ec7e1cbdebe36.png"></image>

		<view class="main">
			<z-paging ref="paging" v-model="appraiseList" @query="getList">
				<view slot='top'>
					<view class="info">
						<view>
							<image v-if="workerInfo.avatarUrl==null" style="width:136rpx;height: 136rpx;"
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/11/10/38405b13b68b4ac3be692e812874e648.png">
							</image>
							<image v-else style="width:136rpx;height:136rpx;" :src="workerInfo.avatarUrl"></image>
						</view>
						<view class="name">
							<view style="font-size: 36rpx;font-weight: bold;">
								{{workerInfo.workerName}}
							</view>
							<view style="margin-left: -9rpx;">
								<u-rate count="5" v-model="workerInfo.value" inactiveColor='#fff' activeColor='#ec9322'
									size='50rpx' readonly> </u-rate>
							</view>

						</view>
					</view>

					<!-- 专业技能 technical-->
					<!-- 	<view class="skill box-bg">
						<view class="title">
							专业技能
						</view>
						<view style="display: flex;	padding-left: 10rpx;flex-wrap: wrap;">
							<view v-for="(item,index) in 7" :key="index" class="box">
								水龙头6666
							</view>
						</view>
					</view> -->
				</view>

				<!-- 用户评论 -->
				<view class="comment box-bg">
					<view class="title">
						用户评价
					</view>
					<view class="mains" v-for="(item,index1) in appraiseList" :key='index1'>
						<view style="display: flex;margin-bottom: 10rpx;align-items: center;">
							<view v-if="item.avatarUrl!=null">
								<!-- 	<u-avatar :src="item.avatarUrl" size="34"></u-avatar> -->
								<image style="width: 72rpx;height: 72rpx;border-radius: 50%;" :src="item.avatarUrl">
								</image>
							</view>
							<image v-else style="width: 72rpx;height: 72rpx;border-radius: 50%;"
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/23/5595ab7226854043abab1449a9067a94.png">
							</image>
							<view style="font-size: 29rpx;color: #3D3F3E;margin:0 20rpx;">
								哈*</view>
							<u-rate :count="count" v-model="item.num" allowHalf activeColor='#ec9322' size='35rpx'
								readonly></u-rate>
							<view class="time" :style="{'width':isshow?'43%':'50%'}">
								{{item.time}}
							</view>
							<image class="isWonderful" v-if="item.isWonderful=='Y'&&item.isWonderful!=null"
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/14/b58459dc35794691a6953855e24f1c93.png"
								mode=""></image>
						</view>
						<view style="">
							{{item.appraiseContent}}
						</view>
						<view style="display: flex;width: 98%;flex-wrap: wrap;margin-top: 10rpx;">
							<view style='margin:15rpx 5rpx;' v-for="(itemm, index2) in item.imgs" :key="index2">
								<u-image radius='8px' width="156rpx" height="156rpx" :src="itemm" mode=""
									@click="previewImage(item.imgs,index2)">
								</u-image>
							</view>
						</view>
					</view>
				</view>
			</z-paging>
		</view>

	</view>
</template>

<script>
	import * as order from '@/api/order.js'
	import formatter from '@/utils/formatter.js'
	export default {
		data() {
			return {
				isshow: true,
				count: 5,
				value: 2,
				imgList: [
					'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/4cb33e4d1a614bda86187d7fd7d1732e.png',
					'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/4cb33e4d1a614bda86187d7fd7d1732e.png',
				],
				queryParams: {
					pageSize: 10,
					pageNum: 1,
					appraiseStatus: 1
				},
				appraiseList: [],
				workerInfo: {}
			};
		},
		onLoad(option) {
			console.log(JSON.parse(option.info));
			this.queryParams.workerId = JSON.parse(option.info).workerId
			this.workerInfo = JSON.parse(option.info).info
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
							item.name = item.clientName != null && item.clientName != '' ? item.clientName[
								0] + '*' : '**'
						item.time = formatter.transDate(item.createTime).one

					})
					this.$refs.paging.completeByTotal(res.rows, res.total);
				})
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



<style lang="scss">
	.worker {
		position: relative;

		.main {
			// position: absolute;
			// top: 0;
			// left: 0;
			// margin: 0 20rpx;

			.info {
				margin: 40rpx 20rpx;
				display: flex;

				.name {
					margin-left: 29rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;
					color: #3D3F3E;
				}
			}

			.title {
				font-weight: bold;
				font-size: 33rpx;
				color: #3D3F3E;
				padding: 22rpx;
			}

			.box-bg {
				background: #FFFFFF;
				box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
				border-radius: 14rpx;

			}

			.skill {
				margin: 40rpx 20rpx;

				.box {
					padding: 5rpx 30rpx;
					height: 42rpx;
					background: #E6F1EB;
					border-radius: 7rpx;
					font-size: 25rpx;
					color: #38453D;
					line-height: 42rpx;
					text-align: center;
					margin: 0 10rpx 20rpx 10rpx;
				}
			}

			.comment {
				margin: 0 20rpx;

				.mains {
					//width: 100%;
					background: #FFFFFF;
					margin: 19rpx;
					position: relative;
					//	padding: 0 18rpx;

					.isWonderful {
						position: absolute;
						width: 53rpx;
						height: 62rpx;
						top: 0;
						right: 0;
					}

					.time {
						font-size: 25rpx;
						color: #3D3F3E;
						height: 60rpx;
						line-height: 60rpx;
						text-align: end;
					}
				}
			}
		}
	}
</style>