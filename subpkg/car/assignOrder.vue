<template>
	<view class="page">

		<view class="position">
			<map id="map" style="width: 100vw;height:35vh;" :markers="covers" :latitude="latitude"
				:longitude="longitude" :polyline="polyline" show-location>
			</map>


			<cover-view v-show="show" class="daohang">
				<cover-image @click="markertap"
					src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/04/28/1c2068ce8c804ccebb3fff2765927e7d.png"
					style="width: 44rpx;height: 44rpx;"></cover-image>
				<cover-view @click="markertap" style="height: 100%;line-height:75rpx;">导航到商家</cover-view>
			</cover-view>

			<cover-view class="dingwei" v-show="show">
				<cover-image @click="backDingwei"
					src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/04/28/754f65a63aa649f6827158c8b345a241.png"
					style="width: 44rpx;height: 44rpx;"></cover-image>
			</cover-view>


		</view>

		<view class="page-all">
			<view class="page-all-con">
				<view class="page-all-con-t acea-row row-middle ">客户信息</view>
				<view class="page-all-con-mess acea-row row-middle ">
					<view class="page-all-con-mess-name acea-row row-middle">
						<image
							src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/06/8e4a60068dfd46f0954fa7b1eeb8ea44.png"
							mode=""></image>
						<text>李店长｜139****0961</text>
					</view>
					<view class="page-all-con-mess-name acea-row">
						<image
							src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/06/34e349ea77104880b7c917b0ec5d86d8.png"
							mode=""></image>
						<view>
							<view>门店名称</view>
							<text style="font-size: 24rpx;">浙江省杭州市拱墅区东新路543路</text>
						</view>
					</view>
					<view class="page-all-con-mess-name acea-row row-middle">
						<image
							src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/06/e8245f10edc24e888686333e943e7acd.png"
							mode=""></image>
						<text>期望上门时间：2024-12-12 12：12（周日）</text>
					</view>
				</view>
			</view>
		</view>

		<view class="page-all" >
			<view class="page-all-pro" v-for="(item,i) in 3" :key="i">
				<view class="page-all-pro-name acea-row  row-between-wrapper">
					#1订单信息
				</view>
				<view class="page-all-pro-list acea-row">
					<view class="top justify-between">
						<text>服务下单数量*下单数量</text>
						<text>服务费：¥151</text>
					</view>
					<view style="margin-top:20rpx;">
						<cl-upload :listStyle="{
						columnGap: '10rpx',
						columns:'4',
						rowGap:'10rpx',
						 height:'110rpx',
						 width:'110rpx'
						}" :imageFormData="{
							size:10
						}" :videoFromData="{
							size:10
						}" v-model="projectImg" :add="false" :remove="false"></cl-upload>
					</view>
					<view class="page-all-pro-list-mark">
						订单备注
						<view class="page-all-pro-list-mark-m">
							周TE2408250015门店这种缝隙没有玻璃胶，需要打玻璃胶，避免蟑螂和异味
						</view>
					</view>
				</view>
			
				<view class="page-all-pro-priceMxi">
					<view style="margin-bottom: 20rpx;font-size: 32rpx;">
						订单信息
					</view>
					<view class="page-all-pro-priceMxi-item acea-row row-between-wrapper">
						订单编号
						<view class="acea-row row-middle" >
							12345644564
							<text style="margin-bottom: 4rpx;">｜</text> 复制
						</view>
					</view>
					<view class="page-all-pro-priceMxi-item acea-row row-between-wrapper">
						下单时间
						<view>2023/12/12 12:12:12</view>
					</view>
					<view class="page-all-pro-priceMxi-item acea-row row-between-wrapper">
						期望上门时间
						<view>2023/12/12 12:12:12</view>
					</view>
					<view class="page-all-pro-priceMxi-item acea-row row-between-wrapper">
						是否加急单
						<view>2023/12/12 12:12:12</view>
					</view>
					<view class="page-all-pro-priceMxi-item acea-row row-between-wrapper">
						服务类型
						<view>2023/12/12 12:12:12</view>
					</view>
				
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var QQMapWX = require('@/utils/qqmap-wx-jssdk.js')
	export default {
	
		data() {
			return {
				projectImg:['https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/10/388529faf0fe452580bf96f954c128f1.png'],
				latitude: '',
				longitude: '',
				covers: [{
					id: 1,
					latitude: '',
					longitude: '',
					iconPath: '/static/img/qidian.png',


				}, {
					id: 2,
					latitude: '',
					longitude: '',
					iconPath: '/static/img/zhongdian.png',


				}],
				mapKey: 'X6YBZ-S42K2-OULU2-C5VJG-ZSRG6-7KFOO',
				polyline: [],

			}
		},
		onLoad() {
			this.getLoction()
		},
		methods: {
			//导航路线
			getLoction() {
				var that = this
				//  that.addressVo.addressRegion + '' + that.addressVo.addressDetailed
				var address = '浙江省杭州市拱墅区新天地'
				//获取师傅所在位置
				uni.getLocation({
					success: (suc) => {
						console.log(suc);
						that.latitude = that.covers[0].latitude = suc.latitude
						that.longitude = that.covers[0].longitude = suc.longitude
						//获取门店所在位置
						uni.request({
							url: 'https://apis.map.qq.com/ws/geocoder/v1/?address=' + address +
								'&key=X6YBZ-S42K2-OULU2-C5VJG-ZSRG6-7KFOO',
							success: (res) => {
								console.log(res);
								let data = res.data.result.location
								that.covers[1].longitude = data.lng
								that.covers[1].latitude = data.lat
								var demo = new QQMapWX({
									key: 'X6YBZ-S42K2-OULU2-C5VJG-ZSRG6-7KFOO'
								})
								demo.direction({
									//mode: 'walking', //可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
									//from参数不填默认当前地址
									from: that.covers[0].latitude + ',' + that.covers[0]
										.longitude,
									to: that.covers[1].latitude + ',' + that.covers[1]
										.longitude,
									success(res) {
										console.log(res);
										var ret = res;
										var coors = ret.result.routes[0].polyline,
											pl = [];
										//坐标解压（返回的点串坐标，通过前向差分进行压缩）
										var kr = 1000000;
										var pl = []
										for (var i = 2; i < coors.length; i++) {
											coors[i] = Number(coors[i - 2]) + Number(coors[
												i]) / kr;
										}
										//将解压后的坐标放入点串数组pl中
										for (var i = 0; i < coors.length; i += 2) {
											pl.push({
												latitude: coors[i],
												longitude: coors[i + 1]
											})
										}
										that.polyline = [{
											points: pl,
											color: '#EC8735',
											width: 8
										}]
										//设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
									}

								})

							}
						})
					},
					fail: (res) => {
						console.log(res);
					}
				})




			},
			//地图跳转
			markertap() {
				console.log(1111111);
				uni.openLocation({
					latitude: this.covers[1].latitude,
					longitude: this.covers[1].longitude,
					success: function() {
						console.log('success');
					}
				});
			},
			//回到当前位置
			backDingwei() {
				uni.createMapContext("map", this).moveToLocation({ //moveToLocation将地图中心移动到当前定位点，需要配合map组件的show-location使用
					latitude: this.latitude,
					longitude: this.longitude
				});
			},
		}
	}
</script>

<style lang="scss">
	.page {
		.position {
			// position: absolute;
			// top: 0%;
			// height: 34%;
			width: 100%;
			z-index: 1;

			.daohang,
			.dingwei {
				display: flex;
				align-items: center;
				justify-content: center;
			}


			.daohang {
				position: absolute;
				left: 28%;
				top: 26%;
				width: 310rpx;
				height: 75rpx;
				background: #FFFFFF;
				box-shadow: 0px 0px 4px 0px rgba(42, 64, 55, 0.1);
				border-radius: 40rpx;
				font-size: 35rpx;
				color: #3D3F3E;
				font-weight: bold;

			}

			.dingwei {
				position: absolute;
				right: 6%;
				top: 26%;
				width: 80rpx;
				height: 80rpx;
				background: #FFFFFF;
				box-shadow: 0px 0px 4px 0px rgba(42, 64, 55, 0.1);
				border-radius: 8rpx;
			}

			.types {
				position: absolute;
				left: 10%;
				top: 28%;
				width: 80rpx;
				height: 228rpx;
				background: #FFFFFF;
				box-shadow: 0px 0px 4px 0px rgba(42, 64, 55, 0.1);
				border-radius: 8rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-evenly;
			}
		}




		&-all {
			// width: 100%;
			// border-radius: 20rpx;
			margin-bottom: 20rpx;
			
			font-size: 28rpx;
			// margin: 0 20rpx 20rpx 20rpx;



			&-con {
				background-color: #fff;
				&-t {
					border-bottom: 1rpx solid #f5f5f5;
					padding: 24rpx;
				}

				&-mess {
					padding: 0 24rpx;
					font-size: 28rpx;
					color: #212121;

					&-name {
						width: 100%;
						padding: 24rpx 0;
						border-bottom: 1rpx solid #f5f5f5;

						image {
							width: 38rpx;
							height: 36rpx;
							margin-right: 12rpx;
						}
					}

					&-name:nth-last-child(1) {}
				}
			}

			&-pro {
				padding: 24rpx;
				margin-bottom: 20rpx;
				background-color: #fff;
				&-name {
					font-size: 32rpx;
					margin-bottom: 30rpx;

				}

				&-list {
					margin-bottom: 20rpx;

					.top{
						font-size: 28rpx;
						color: #212121;
						width: 100%;
					}
					&-mark {
						padding: 20rpx;
						background: rgba(243, 178, 62, 0.08);
						border-radius: 16rpx;
						color: #b8b8b8;
						margin-top: 20rpx;

						&-m {
							font-size: 24rpx;
							margin-top: 6rpx;
						}
					}
				}

				&-priceMxi {
					border-top: 1rpx solid #f5f5f5;
					padding: 30rpx 10rpx 0rpx;

					&-item {
						margin-bottom: 14rpx;

						view {
							color: #A4A4A4;
						}
					}
				}
			}
		}

	}
</style>