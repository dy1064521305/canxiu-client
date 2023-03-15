<template>
	<view class="worker">
		<image style="height:543rpx ;width: 100%;"
			src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/21/0e5d1d17ab0d4e379f0919441fc177f0.png"></image>
		<view class="main">
			<view class="info">
				<view>
					<image style="width: 136rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/05/2b752f2fa84446d8867149d48996ec45.png"
						mode="widthFix"></image>
				</view>
				<view class="name">
					<view style="font-size: 36rpx;font-weight: bold;">
						小小商店
					</view>
					<view style="font-size: 29rpx;">
						188****5698
					</view>
				</view>
			</view>

			<!-- 专业技能 -->
			<view class="skill box-bg">
				<view class="title">
					专业技能
				</view>
				<view style="display: flex;	padding-left: 10rpx;flex-wrap: wrap;">
					<view v-for="(item,index) in 7" :key="index" class="box">
						水龙头6666
					</view>
				</view>
			</view>

			<!-- 用户评论 -->
			<view class="comment box-bg">
				<view class="title">
					用户评论
				</view>
				<view class="mains" v-for="item in 4">
					<view style="display: flex;margin-bottom: 10rpx;">
						<u-avatar src="../../static/img/login/loginBg.png" size="28"></u-avatar>
						<view style="font-size: 25rpx;color: #3D3F3E;height: 60rpx;line-height: 60rpx;margin:0 20rpx;">
							哈*</view>
						<u-rate :count="count" v-model="value" allowHalf activeColor='#ec9322' readonly></u-rate>
						<view class="time" :style="{'width':isshow?'43%':'50%'}">
							{{$u.timeFrom(1645416000000)}}
						</view>
						<image	
						 v-if="isshow"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/20/21b951ca87d8420798c562475302716f.png"
							mode=""></image>
						<view  v-if="isshow" style="width:60rpx;">
							
						</view>
					</view>
					<view style="">
						过年这段时间油烟机超负荷运作，过完年油烟机就变得油腻腻的，网上找了很久终于确定了用餐修来下订单，总体不错油烟机也可以拆开清洗虽然多加了钱吧，但是可以变得和新的一样还是可以的
					</view>
					<view style="display: flex;flex-wrap: wrap;margin: 10rpx">
							<u-image style='margin:10rpx;' v-for="(item, index) in imgList"  radius='8px' width="156rpx" height="156rpx" :src="item" mode=""
								@click="previewImage(item)">
							</u-image>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				isshow:true,
				count: 5,
				value: 2,
				imgList: [
					'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/4cb33e4d1a614bda86187d7fd7d1732e.png',
					'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/4cb33e4d1a614bda86187d7fd7d1732e.png',
				],
			};
		},
		onLoad() {
			console.log(uni.$u.timeFrom(1676952000000), '-----80');
		},
		methods: {
			previewImage(e) {
				console.log(e);
				wx.previewImage({
					current: e, // 当前显示图片的http链接
					urls: this.imgList, // 需要预览的图片http链接列表
				})
			},
		}
	}
</script>



<style lang="scss">
	.worker {
		position: relative;

		.main {
			position: absolute;
			top: 0;
			left: 0;
			margin:0 20rpx;

			.info {
				margin: 40rpx 0;
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
				margin-top: 20rpx;

				.mains {
					//width: 100%;
					background: #FFFFFF;
					margin: 19rpx;
					position: relative;
				//	padding: 0 18rpx;

					image {
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
