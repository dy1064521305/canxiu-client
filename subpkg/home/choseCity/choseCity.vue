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
		<view class="address-box">
			  <u-radio-group
			    v-model="radiovalue1"
			    placement="column"
			    @change="groupChange"
			  >
			    <u-radio
			      :customStyle="{marginBottom: '8px'}"
			      v-for="(item, index) in addressList"
			      :key="index"
			      @change="radioChange"
			    >
				{{item.contact}}
				{{item.addressDetailed}}
			    </u-radio>
			  </u-radio-group>
		</view>
	</view>
</template>

<script>
	//import Citys from '../city.js';
	import storage from '@/utils/storage'
	import {
		getAddressList,
	} from "@/api/address.js"
	var QQMapWX = require('@/utils/qqmap-wx-jssdk.js')
	import * as home from '@/api/home.js'
	export default {
		components: {},
		props: {},
		data() {
			return {
				cityList: [], //城市列表
				cityName: '',
				addressList:[],
				radiovalue1:''
			}
		},

		onLoad() {
			//获取存储的最近访问
			var that = this

			that.getList()
			uni.getStorage({
				key: 'city',
				success: function(res) {
					console.log(res);
					that.cityName = res.data
				}
			});
		},
		methods: {
			getList() {
				getAddressList({
					clientId:storage.get('ClientId')
				}).then(res => {
					console.log(res);
					this.addressList=res.rows
				})
			},

			getLocation(type) {
				let that = this
				type == 'again' ? that.cityName = '重新定位中' : ''
				uni.getLocation({
					// isHighAccuracy: true,
					// highAccuracyExpireTime: 1234,
					// type: 'gcj02',
					success: (suc) => {
						console.log(suc, '1812222222222222222');
						// this.location.latitude = suc.latitude
						// this.location.longitude = suc.longitude
						var demo = new QQMapWX({
							key: 'X6YBZ-S42K2-OULU2-C5VJG-ZSRG6-7KFOO'
						})
						demo.reverseGeocoder({
							location: suc.latitude + "," + suc.longitude,
							success: function(res) {
								console.log(res)
								that.cityName = res.result.address_component.city
								uni.setStorage({
									key: 'city',
									data: that.cityName
								})
								console.log(that.cityName, '37837888888888888888');
								// that.position = res.result.address_component
								// 	.city;
								// let item = {
								// 	cityName: 
								// }
								// that.back_city(item);
							}
						})
					},
					fail(err) {
						console.log(err);
						uni.showToast({
							title: err.errMsg,
							icon: "none"
						})
					}
				})
			},



		}
	};
</script>

<style lang="scss" scoped>
	.top {
		background-color: #fff;
		padding: 20rpx;

		view:first-child {
			font-size: 25rpx;
			color: #A5A7A7;
		}

		.bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 10rpx;

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
</style>