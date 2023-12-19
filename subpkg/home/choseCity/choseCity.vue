<template>
	<div class="wrapper" :style="'top:'+statusBarHeight+'px'">
		<div class="header">
			<view class="back_div">
				<!-- 		<image class="back_img" @click="back_city()" src="../../static/back_img.png" mode=""></image> -->
			</view>

		</div>
		<scroll-view class="calendar-list" scroll-y="true" :scroll-into-view="scrollIntoId"
			style="margin: -40px 0 0 0;">
			<view v-if="disdingwei" id="hot">
				<header>
					<view class="search">

						<image src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/06/06/2ffd73b23d39409e83870d4edf2885ea.png">
						</image>
						<view style="width: 85%;">
							<u--input @clear='clear' clearable border='none' @confirm="history" v-model="searchCity" type="text"
								placeholder="请输入城市名称"   />
						</view>
					</view>

					<view v-if="isSearch&&searchResult!=''" class="result" @click="checkCity(searchResult)">
						{{searchResult}}
					</view>
					<view v-if="isSearch&&searchResult==''" class="result">
						暂无该城市
					</view>

					<view v-if="!isSearch" class="bottom">
						<view style="display: flex;align-items: center;">
							<image style="width: 38rpx;height: 45rpx;"
								 src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/12/19/991f64631ffc414f9f624ac43a66ab71.png"
								 mode=""></image>
						</view>
						<view class="right">

							<text>{{cityName}}</text>
							<text>当前定位</text>
							<text @click="getLocation('again')">重新定位</text>
						</view>
					</view>
				</header>

				<view v-if="!isSearch" class="citys">
					<view class="title">
						最近访问
					</view>
					<view style="display: flex;flex-wrap: wrap;">
						<view v-if="hList.length!=0" v-for="(item,index) in hList" :key="index" class="box"
							@click="checkCity(item)">
							{{item}}
						</view>
					</view>
					<view v-if="hList.length==0" class="fangwen"  >
						暂无最近访问
					</view>
					<view class="title">
						热门城市
					</view>
					<view class="boxs">
						<view class="box" v-for="(item,index) in hotCity" :key="index" @click="checkCity(item.cityName)">
							{{item.cityName}}
						</view>
					</view>
				</view>

			</view>


			<!-- 城市列表 -->
			<view v-if="searchValue == ''&&!isSearch" v-for="(item, index) in list" :id="getId(index)" :key="index">
				<view class="letter-header">{{ getId(index) }}</view>
				<view class="city-div" v-for="(city, i) in item.data" :key="i" @click="checkCity(city.regionName)">
					<text class="city">{{ city.regionName }}</text>
				</view>
			</view>

		</scroll-view>

		<!-- 右侧字母 -->
		<view class="letters" v-if="searchValue == ''&&!isSearch">
			<!-- <view class="letters-item" @click="scrollTo('hot')">最近</view> -->
			<view :class="['letters-item',scrollIntoId==item?'letters-item-active':'']" v-for="item in letter"
				:key="item" @click="scrollTo(item)">{{ item }}</view>
		</view>

		<!-- 选中之后字母 -->
		<view class="mask" v-if="showMask">
			<view class="mask-r">{{selectLetter}}</view>
		</view>
	</div>
</template>

<script>
	//import Citys from '../city.js';
	var QQMapWX = require('@/utils/qqmap-wx-jssdk.js')
	import * as home from '@/api/home.js'
	import {
		pinyin
	} from 'pinyin-pro'
	export default {
		components: {},
		props: {},

		computed: {
			// hotCity() {
			// 	return Citys.hotCity;
			// },

			// citys() {
			// 	return Citys.cities;
			// }
		},
		data() {
			return {
				statusBarHeight: this.statusBarHeight,
				letter: [],
				selectLetter: '',
				searchValue: '',
				scrollIntoId: '',
				list: [],
				showMask: false,
				disdingwei: true,



				hotCity: [],
				currentCity: '',
				cityList: [], //城市列表
				indexList: [],
				cityName: '',
				isAgain: false,
				isSearch: false, //是否在搜索
				searchCity: '', //搜索城市名称
				hList: [], //搜索历史城市
				searchResult: '', //搜索的城市名

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
			uni.getStorage({
				key: 'search_cache',
				success: function(res) {
					console.log(res);
					that.hList = res.data
				}
			});


		},
		methods: {
			getList() {
				//获取热门城市
				home.getHotCity().then(res => {
					console.log(res, '1601600160');
					console.log(111111111111111111);
					this.hotCity = res.data
				})
				return new Promise((r, j) => {
					//获取城市列表
					home.getListCity().then(res => {
						console.log(res);
						this.cityList = res.data
						let list = res.data.map(item => pinyin(item.regionName, {
							toneType: 'none'
						}).substring(0, 1).toLocaleUpperCase() + item.name)
						let s = list.sort()
						let s_add = []
						let Info = []
						res.data.forEach((item, itemindex) => {
							s.forEach((ss, ssindex) => {
								if (itemindex == ssindex) {
									item.code = ss.substring(0, 1)
								}
							})
						})
						s.forEach(item1 => {
							if (!s_add.some(s => item1.substring(0, 1) === s)) {
								s_add.push(item1.substring(0, 1))
							}
						})
						r(s_add)
						let indexList = s_add
						this.letter = indexList
						// let itemArr = indexList.map(indexEle => ({
						// 	"letter": indexEle,
						// 	"data": res.data.filter(l => l.code === indexEle).map(l1 => l1
						// 		.regionName)
						// }))
						let itemArr = indexList.map(indexEle => ({
							"letter": indexEle,
							"data": res.data.filter(l => l.code === indexEle).map(l1 => l1)
						}))

						this.list = itemArr
						console.log(itemArr);
					})

				})

			},

			getId(index) {
				return this.letter[index];
			},

			scrollTo(letter) {
				this.showMask = true
				this.selectLetter = letter == 'hot' ? '最' : letter
				setTimeout(() => {
					this.showMask = false
				}, 300);
				this.scrollIntoId = letter;
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

			//切换城市
			checkCity(name) {
				this.cityName = name
				uni.setStorage({
					key: 'city',
					data: name
				})

				this.historyCity(name)
				uni.navigateBack()
			},
			//清空
			clear() {
				console.log(1111);
				this.searchCity = ''
				this.isSearch = false
			},
			historyCity(name) {
				let _this = this;
				uni.getStorage({ //从缓存中取搜索历史记录的数组
					key: 'search_cache',
					success(res) { //获取成功
						let list = res.data;
						for (let i in list) { //循环遍历
							if (list[i] == name) { //如果缓存数组中有搜索关键词
								list.splice(i, 1) //删除数组中的该关键词
							}
						}
						list.unshift(name); //将搜索关键词添加到数组开头
						list.splice(6) //只保留6个
						_this.hList = list;
						uni.setStorage({ //将新的数组存入缓存
							key: 'search_cache',
							data: _this.hList,
						});
					},
					fail() { //没有获取到缓存
						console.log(1111);
						_this.hList = [];
						_this.hList.push(name);
						uni.setStorage({
							key: 'search_cache',
							data: _this.hList,
						});
					}
				})
			},
			//访问历史
			history() {
				let _this = this;
				_this.isSearch = true
				if (_this.searchCity == '') {
					this.isSearch = false
				} else {
					_this.historyCity(_this.searchCity)
					_this.search(_this.searchCity); //搜索
					// uni.getStorage({ //从缓存中取搜索历史记录的数组
					// 	key: 'search_cache',
					// 	success(res) { //获取成功
					// 		let list = res.data;
					// 		for (let i in list) { //循环遍历
					// 			if (list[i] == _this.searchCity) { //如果缓存数组中有搜索关键词
					// 				list.splice(i, 1) //删除数组中的该关键词
					// 			}
					// 		}
					// 		list.unshift(_this.searchCity); //将搜索关键词添加到数组开头
					// 		list.splice(6) //只保留6个
					// 		_this.hList = list;
					// 		uni.setStorage({ //将新的数组存入缓存
					// 			key: 'search_cache',
					// 			data: _this.hList,
					// 		});
					// 		_this.search(_this.searchCity); //搜索
					// 	},
					// 	fail() { //没有获取到缓存
					// 		console.log(1111);
					// 		_this.hList = [];
					// 		_this.hList.push(_this.searchCity);
					// 		uni.setStorage({
					// 			key: 'search_cache',
					// 			data: _this.hList,
					// 		});

					// 	}
					// })
				}
			},
			//搜索
			search(name) {
				let bool = this.cityList.some(item => item.regionName == name)
				if (bool) {
					this.searchResult = this.searchCity
				} else {
					this.searchResult = ''
				}

			},


		}
	};
</script>

<style lang="scss" scoped>
	header {
		height: 190rpx;
		background: #FFFFFF;
		padding: 18rpx 22rpx 0 22rpx;

		.search {
			width: 707rpx;
			height: 72rpx;
			background: #F1F1F1;
			border-radius: 36rpx;
			align-items: center;
			display: flex;

			image {
				width: 25rpx;
				height: 25rpx;
				margin: 10rpx 30rpx;
			}
		}

		.bottom {
			padding: 30rpx 0;
			display: flex;

			.right {
				flex: 1;

				text:nth-child(1) {
					font-weight: bold;
					font-size: 33rpx;
					margin: 0 14.49rpx;
				}
				
				
				text:nth-child(2) {
					font-size: 25rpx;
					color: #A5A7A7;
					width: 64%;
					display: inline-block;
				}

				text:nth-child(3) {
					font-size: 25rpx;
					color: #A4D091;
				}
			}


		}
	}

	.result {
		width: 100%;
		background-color: #fff;
		height: 70rpx;
		line-height: 70rpx;
		padding: 25rpx;
	}

	.citys {
		padding: 22rpx;
		background: #F5F9FA;

		.title {
			font-size: 25rpx;
			color: #A5A7A7;
			margin-bottom: 20rpx;
		}

		.fangwen {
			margin: 0 0 20rpx 10rpx;
		}

		.box {
			//width: 220rpx
			padding: 0 40rpx;
			height: 65rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
			border-radius: 7rpx;
			text-align: center;
			line-height: 65rpx;
			margin-bottom: 20rpx;
			margin-right: 10rpx;
		}

		.boxs {
			display: flex;
			flex-wrap: wrap;
			//justify-content: space-between;

		}
	}


	.wrapper {
		position: fixed;
		z-index: 999999;
		background: #ffffff;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0px;
	}

	.mask {
		position: absolute;
		bottom: 0upx;
		top: 83upx;
		left: 0upx;
		right: 0upx;
		width: 750upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, 0);
	}

	.mask-r {
		height: 120upx;
		width: 120upx;
		border-radius: 60upx;
		display: flex;
		background: rgba(0, 0, 0, 0.5);
		justify-content: center;
		align-items: center;
		font-size: 40upx;
		color: #FFFFFF
	}

	.content {
		height: 100%;
		width: 100%;
		background-color: #ffffff;
	}

	.header {
		height: 85upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}


	.back_div {
		width: 65upx;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.back_img {
		width: 35upx;
		height: 35upx;
	}

	.input {
		font-size: 28upx;
		width: 620upx;
		height: 55upx;
		border-radius: 40upx;
		background-color: #F5F5F5;
		padding-left: 20upx;
		padding-right: 20upx;
		box-sizing: border-box;
	}

	.title {
		font-size: 30upx;
		color: white;
	}

	.show {
		left: 0;
		width: 100%;
		transition: left 0.3s ease;
	}

	.hide {
		left: 100%;
		width: 100%;
		transition: left 0.3s ease;
	}


	.title {
		font-size: 30upx;
		color: white;
	}

	.calendar-list {
		position: absolute;
		top: 83upx;
		bottom: 0upx;
		width: 100%;
		background-color: #FFFFFF;
	}

	.letters {
		margin-top: 200rpx;
		position: absolute;
		right: 30upx;
		bottom: 0px;
		width: 30upx;
		top: 260upx;
		//	color:#72DAA4;
		text-align: center;
		font-size: 24upx;
	}

	.letters-item {
		margin-bottom: 5upx;
		font-size: 21upx;
		margin-bottom: 20rpx;
	}

	.letters-item-active {
		background: #72DAA4;
		border-radius: 50%;
		color: #fff;
	}

	.letter-header {
		height: 45upx;
		font-size: 22upx;
		color: #333333;
		padding-left: 24upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		background-color: #ebedef;

	}

	.city-div {
		width: 660upx;
		height: 85upx;
		margin-left: 24upx;
		border-bottom-width: 0.5upx;
		border-bottom-color: #ebedef;
		border-bottom-style: solid;
		display: flex;
		align-items: center;
		margin-right: 35upx;
	}

	.city {
		font-size: 28upx;
		color: #000000;
		padding-left: 30upx;
	}

	.dingwei {
		width: 100%;
		padding-top: 25upx;
		box-sizing: border-box;
		margin-bottom: 26upx;
	}

	.dingwei_Tips {
		margin-left: 24upx;
		margin-bottom: 24upx;
		font-size: 24upx;
		color: #A5A5A5;
	}

	.dingwei_city {
		width: 100%;
		height: 60upx;
		padding-left: 55upx;
		padding-right: 70upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.dingwei_city_one {
		width: 185upx;
		height: 60upx;
		background-color: #F5F5F5;
		border-radius: 10upx;
		font-size: 32upx;
		color: #333333;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.dingweis_div {
		display: flex;
		align-content: flex-end;
		align-items: center;
		font-size: 24upx;
		color: #FD5745;
	}

	.dingweis {
		width: 32upx;
		height: 32upx;
	}

	.dingwei_city_zuijin {
		display: flex;
		justify-content: flex-start;
	}

	.toright {
		margin-right: 25upx;
	}
</style>