<template>
	<view>
		<view  class="top">
			<view>
				当前定位
			</view>
			<view class="bottom">
				<view style="display: flex;align-items: center;">
					<image style="width: 38rpx;height: 45rpx;"
						 src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/12/19/991f64631ffc414f9f624ac43a66ab71.png"
						 mode=""></image>
					<text class="city">{{cityName}}</text>
				</view>
				<text class="again" @click="getLocation('again')">重新定位</text>
			</view>

		</view>

		<view v-if="addressList.length!=0" class="list">
			<view class="title">
				<text>服务地址</text>
				<text @click="goMyAddress">地址管理</text>
			</view>
			<view style="overflow: scroll;height: 35vh;">
				<view v-for="(item,index) in addressList" :key='index' class="box" @click="choseAddress(item)">
					<view class="">
						<view v-if="choseForm.addressId==item.addressId" class="moren" @click.stop="choseAddress(item)">
							<image style="width: 32rpx;margin-right: 11rpx;height: 32rpx;"
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/18/87c7f99dab0b4efcb0ff259ecc86c7fd.png">
							</image>
						</view>
						<view v-else class="un">
							<view class="circle"></view>
						</view>
					</view>
					<view class="main">
						<view>
							{{item.contact}}
						</view>
						<view style="font-size: 25rpx;color: #A5A7A7;">
							{{item.addressDetailed}}
						</view>


					</view>
				</view>
			</view>
		</view>
		<view v-else class="noData">
			<image src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/14/9fbc00d1e6954ee6b19f5b911155c85a.png"
				style="width:320rpx;height:248rpx"></image>
			<view style="font-size: 36rpx;
color: #3D3F3E;">
				暂未创建服务地址
			</view>
			<view style="color: #A5A7A7;margin: 10rpx 0;">
				点击下方按钮新增
			</view>
			<view class="btn" @click="goAddAdress">
				新增服务地址
			</view>
		</view>

		<view class="nearby-box">
			<text style="font-size: 25rpx;color: #A5A7A7;">附近地址</text>
			<view style="	overflow: scroll;
		height: 41vh;">
				<blockquote v-if="nearbyList.length!=0">
					<view v-for="(item,index) in nearbyList" :key='index' class="box"
						@click="choseAddress(item,'near')">
						<view style="display: flex;justify-content: space-between;">
							<text>{{item.title}}</text>
							<text style="font-size: 22rpx;color: #A5A7A7;">{{item._distance}}Km</text>
						</view>
						<view style="font-size: 25rpx;
				color: #A5A7A7;margin-top: 10rpx;">
							{{item.address}}
						</view>
					</view>
				</blockquote>

				<view v-else style="text-align: center;
    margin-top: 38%;">
					获取定位失败
				</view>
			</view>

		</view>
		<yk-authpup ref="authpup" type="top" @changeAuth="changeAuth" @notQequest='notQequest'
			permissionID="ACCESS_FINE_LOCATION">
		</yk-authpup>

	</view>
</template>

<script>
	//import Citys from '../city.js';
	import storage from '@/utils/storage'
	import {
		getAddressList,
	} from "@/api/address.js"
	// import {
	// 	jsonp
	// } from 'vue-jsonp'
	var QQMapWX = require('@/utils/qqmap-wx-jssdk.js')
	import * as home from '@/api/home.js'
	import ykAuthpup from "@/components/yk-authpup/yk-authpup";
	export default {
		components: {
			ykAuthpup
		},
		props: {},
		data() {
			return {
				cityList: [], //城市列表
				cityName: '',
				addressList: [],
				choseForm: {},
				nearbyList: []
			}
		},
		onShow() {
			this.getList()

		},
		onLoad() {
			// #ifdef APP-PLUS
			this.$nextTick(() => {
				this.$refs['authpup'].open()
			})

			// #endif
			// #ifdef MP-WEIXIN
			this.getLocation()
			// #endif


		},
		methods: {
			getList() {
				getAddressList({
					clientId: storage.get('ClientId')
				}).then(res => {
					console.log(res, this.choseForm);
					this.addressList = res.rows
					if (this.addressList.length == 0) {
						uni.removeStorageSync('city')
					}
					if (Object.keys(this.choseForm).length < 1) {
						const cityRes = uni.getStorageSync('city')
						console.log(cityRes, '<<<=====cityres');
						this.choseForm = cityRes || {}
						console.log(this.choseForm, '<<<=====that.choseForm ');

					}
					const index = this.addressList.findIndex(r => r.addressId === this.choseForm.addressId)
					if (index < 0) return
					const item = this.addressList[index]
					this.addressList.splice(index, 1)
					this.addressList.unshift(item)
				})
			},
			changeAuth() {
				this.getLocation()
			},
			notQequest() {
				this.getAddress()
			},
			getLocation(type) {
				let that = this
				if (type == 'again') {
					uni.removeStorageSync('city')
					this.choseForm = {}
					that.cityName = '重新定位中'
				} else {
					that.cityName = ''

				}
				uni.getLocation({
					// isHighAccuracy: true,
					// highAccuracyExpireTime: 1234,
					// type: 'gcj02',
					success: (suc) => {
						console.log(suc, '1812222222222222222');
						// this.location.latitude = suc.latitude
						// this.location.longitude = suc.longitude
						// jsonp(
						// 	'https://apis.map.qq.com/ws/place/v1/here', {
						// 		boundary: 'nearby(40.040394,116.273523,1000)',
						// 		policy: '1',
						// 		page_size: '10',
						// 		page_index: '1',
						// 		key: 'X6YBZ-S42K2-OULU2-C5VJG-ZSRG6-7KFOO',
						// 		output: 'jsonp'
						// 	}
						// ).then(res => {
						// 	console.log(res, '.........res...........');
						// })
						uni.request({
							url: `https://apis.map.qq.com/ws/place/v1/here?boundary=nearby(${suc.latitude},${suc.longitude},1000)&policy=1&page_size=10&page_index=1&key=X6YBZ-S42K2-OULU2-C5VJG-ZSRG6-7KFOO`,

							success(res) {
								console.log(res);
								that.nearbyList = res.data.data
							},
							complete(c) {
								console.log(c);
							}
						})

						if (uni.getStorageSync('city')) {
							that.getAddress()
						} else {
							var demo = new QQMapWX({
								key: 'X6YBZ-S42K2-OULU2-C5VJG-ZSRG6-7KFOO'
							})
							demo.reverseGeocoder({
								location: suc.latitude + "," + suc.longitude,
								success: function(res) {
									console.log(res)
									let result = res.result.address_component
									that.cityName = result.street_number != null ? result
										.street_number : result.street
									uni.setStorageSync({
										key: 'city',
										data: {
											addressDetailed: that.cityName
										}
									})
									that.address = result.province + '-' +
										result.city + '-' + result.district
									uni.setStorageSync({
										key: 'address_refreash',
										data: that.address
									})

								}
							})
						}


					},
					fail(err) {
						console.log(err);
						if (uni.getStorageSync('city')) {
							that.getAddress()
						}
						uni.showToast({
							title: '获取位置失败',
							icon: "none"
						})
						that.cityName = '杭州市滨江区'
						uni.setStorageSync({
							key: 'address_refreash',
							data: '浙江省-杭州市-滨江区'
						})
						uni.setStorageSync({
							key: 'city',
							data: {
								addressDetailed: that.cityName
							}
						})



					}
				})
			},
			getAddress() {
				uni.getStorage({
					key: 'city',
					success: (res) => {
						console.log(res);
						this.choseForm = res.data
						this.cityName = res.data.addressDetailed

					}
				});
			},
			choseAddress(item, type) {
				if (type == 'near') {
					let info = item.ad_info
					this.choseForm = {
						addressDetailed: item.title,
						addressRegion: info.province + '/' +
							info.city + '/' +
							info.district
					}
					uni.setStorageSync('address_refreash', info.province + '-' +
						info.city + '-' +
						info.district)
				} else {
					this.choseForm = item
					uni.setStorageSync('address_refreash', item.addressRegion.replace(/\//g, "-"))
				}
				uni.setStorageSync('city', this.choseForm)
				const pages = uni.$u.pages()
				pages[pages.length - 2].$vm.changeData()

				uni.navigateBack()
			},
			goAddAdress() {
				uni.navigateTo({
					url: '../../car/addAddress/addAddress'
				})
			},
			goMyAddress() {
				uni.navigateTo({
					url: '../../car/myAddress/myAddress'
				})
			}

		}
	};
</script>

<style lang="scss" scoped>
	.top {
		background-color: #fff;
		padding: 20rpx 40rpx;

		view:first-child {
			font-size: 25rpx;
			color: #A5A7A7;
		}

		.bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 20rpx;

			.city {
				font-weight: bold;
				font-size: 33rpx;
				margin: 0 14.49rpx;
				color: black;
			}

			.again {
				font-size: 25rpx;
				color: #A4D091;
			}
		}


	}

	.list {
		background: #FFFFFF;
		padding: 12rpx 40rpx;
		margin-top: 18rpx;

		.title {
			font-size: 25rpx;
			display: flex;
			justify-content: space-between;

			text:first-child {
				color: #A5A7A7;
			}

			text:nth-child(2) {

				color: #A4D091;
			}
		}

		.box {
			margin-top: 18rpx;
			border-bottom: 2rpx solid #F8F8F8;
			display: flex;
			align-items: center;

			image {
				width: 29rpx;
				float: right;
			}

			.main {
				margin-left: 10rpx;

				view {
					margin: 10rpx 0;
				}
			}

			.un,
			.moren {
				display: flex;
				font-size: 25rpx;
			}



			.moren {
				color: #A4D091;
			}

			.un {

				color: #A5A7A7;

				.circle {
					width: 29rpx;
					height: 29rpx;
					border: 1px solid #D8DCDB;
					border-radius: 50%;
					margin-right: 11rpx;
				}
			}

		}
	}

	.noData {
		text-align: center;
		margin: 45rpx 0;

		.btn {
			width: 362rpx;
			height: 91rpx;
			background: #A4D091;
			border-radius: 45rpx;
			font-weight: 400;
			font-size: 36rpx;
			color: #FFFFFF;
			line-height: 91rpx;
			margin: 28rpx auto;
		}
	}

	.nearby-box {
		background-color: #fff;
		padding: 20rpx 40rpx;
		margin-top: 20rpx;

		.box {
			border-bottom: 2rpx solid #F8F8F8;
			padding: 20rpx 0;
		}
	}
</style>