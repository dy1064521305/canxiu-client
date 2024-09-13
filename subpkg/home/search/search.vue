<template>
	<view class="search-main">
		<header>
			<view class="search">
				<image src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/06/06/2ffd73b23d39409e83870d4edf2885ea.png">
				</image>
				<view style="width: 85%;">
					<u--input @input='searchs("change")' @clear="searchs('clear')" @confirm="searchs('search')"
						clearable border='none' v-model="serviceName" type="text" placeholder="请输入需要的服务" />
				</view>
			</view>

			<view class="close" @click="close">取消</view>
		</header>
		<view v-if="isSearch&&searchList.length!=0" style="padding: 0 20rpx;">
			<block v-for="(item,index) in searchList" :key="index">
				<goodCard :item='item' />
			</block>
		</view>
		<!-- 	<view v-if="serviceName==''&&searchList.length==0" class="">

		</view> -->
		<u-empty marginTop='30' text='没有找到哦，换个关键词试一下吧' v-if="isSearch&&serviceName!=''&&searchList.length==0"
			icon="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/04/cb8a19a85cd14c86ad85b72b97ea2d1e.png">
		</u-empty>
		<view class="history" v-if="showHistory&&historyList.length!=0">
			<view class="">
				<view class="top">
					<view class="left">
						搜索历史
					</view>
					<view class="right" @click="clearHitory">
						<text>清除</text>
						<view style="display: flex;margin-top: 5rpx;">
							<image
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/06/06/0aa7a1c7323a4a398f1614df4201f852.png"
								mode=""></image>
						</view>
					</view>
				</view>
				<view class="names">
					<view v-for="(item,index) in historyList" :key="index" class="box"
						@click="searchHandle(item,'history')">
						{{item}}
					</view>

				</view>

			</view>

			<!-- 	<view class="hotSearch">
				<view class="hotTop">
					<text>热门搜索</text>
					<image src="../../../static/img/home/hot.png" mode=""></image>
				</view>
				<view class="bottom">
					<view class="box" v-for="(item,index) in list" :key="index">
						<image src="../../../static/img/home/hot.png" mode=""></image>
						<view class="title">
							水龙头维修
						</view>
						<view class="price">
							<text style="font-size: 40rpx;font-weight: bold;margin-right: 10rpx;">385</text>元起
						</view>
					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import goodCard from '../../../components/goodCard/goodCard.vue'
	import {
		search
	} from '@/api/home.js'
	export default {
		components: {
			goodCard
		},
		data() {
			return {
				historyList: [],
				searchList: [],
				serviceName: '',
				showHistory: true,
				// 延时器的 timerId
				timer: null,
				isSearch: false,

			};
		},
		onLoad() {
			var that = this
			uni.getStorage({
				key: 'search_fuwu',
				success: function(res) {
					console.log(res);
					that.historyList = res.data
				}
			});
		},
		methods: {
			close() {
				uni.navigateBack()
			},
			searchs(type) {
				let _this = this;
				_this.isSearch = true
				console.log(type);
				if (_this.serviceName != '') {
					if (type == 'search') {
						_this.showHistory = false
						uni.getStorage({ //从缓存中取搜索历史记录的数组
							key: 'search_fuwu',
							success(res) { //获取成功
								let list = res.data;
								for (let i in list) { //循环遍历
									if (list[i] == _this.serviceName) { //如果缓存数组中有搜索关键词
										list.splice(i, 1) //删除数组中的该关键词
									}
								}
								list.unshift(_this.serviceName); //将搜索关键词添加到数组开头
								list.splice(6) //只保留6个
								_this.historyList = list;
								uni.setStorage({ //将新的数组存入缓存
									key: 'search_fuwu',
									data: _this.historyList,
								});
								_this.searchHandle(_this.serviceName)
							},
							fail() { //没有获取到缓存
								console.log(1111);
								_this.historyList = [];
								_this.historyList.push(_this.serviceName);
								uni.setStorage({
									key: 'search_fuwu',
									data: _this.historyList,
								});
								_this.searchHandle(_this.serviceName)
							}
						})
						console.log(_this.serviceName);
						//clearTimeout(this.timer)
					} else if (type == 'clear') {
						console.log(1111);
						_this.showHistory = true
						_this.searchList = []
						_this.serviceName = ''
						_this.isSearch = false
						//clearTimeout(this.timer)
					} else if (type == 'change') {
						_this.showHistory = false
						// 清除 timer 对应的延时器
						clearTimeout(_this.timer)
						// 重新启动一个延时器，并把 timerId 赋值给 this.timer
						_this.timer = setTimeout(() => {
							// 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
							let name = _this.serviceName
							if (name == '') {
								_this.searchList = []
								_this.showHistory = true
								console.log(name);
							} else {
								_this.searchHandle(name)
							}

						}, 400)
						console.log(_this);
					}

				} else {
					_this.isSearch = false
					_this.showHistory = true
				}
			},

			searchHandle(name, type) {
				console.log(name);
				if (type == 'history') {
					this.serviceName = name

				}
				this.showHistory = false
				this.isSearch = true
				this.searchList = []
				search({
					serviceName: name,
					address: uni.getStorageSync(`address_refreash${storage.get('ClientId')}`),
					clientId: storage.get('ClientId') ? storage.get('ClientId') : ''
				}).then(res => {
					console.log(this.serviceName);
					this.searchList = res.data
					console.log(res.data);
					this.searchList.forEach(item => {
						item.serviceImg = Array.isArray(item.serviceImg) ? item.serviceImg : item
							.serviceImg.split(
								',')
					})
					//	this.isSearch = true
				})
			},

			//清除历史记录
			clearHitory() {
				this.historyList = []
				uni.removeStorage({
					key: 'search_fuwu',

				})
			},


		}
	}
</script>



<style lang="scss" scoped>
	.search-main {

		header {
			background: #FFFFFF;
			display: flex;
			padding: 20rpx;

			.search {
				width: 600rpx;
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

			.close {
				font-size: 33rpx;
				height: 76rpx;
				color: #3D3F3E;
				line-height: 76rpx;
				margin-left: 32rpx;
			}
		}

		.history {
			padding: 20rpx;

			.top {
				display: flex;
				justify-content: space-between;

				.left {
					font-size: 33rpx;
					color: #3D3F3E;
				}

				.right {
					font-size: 29rpx;
					color: #A5A7A7;
					display: flex;

					text {
						margin-right: 14rpx;
					}

					image {
						width: 29rpx;
						height: 29rpx;
					}
				}
			}

			.names {
				display: flex;
				flex-wrap: wrap;

				.box {
					width: 30%;
					height: 65rpx;
					background: #F1F1F1;
					border-radius: 7rpx;
					margin: 10rpx;
					color: #3D3F3E;
					line-height: 65rpx;
					font-size: 29rpx;
					text-align: center;
				}

			}

			.hotSearch {
				margin-top: 40rpx;

				.hotTop {
					text {
						font-size: 33rpx;
						color: #3D3F3E;
					}

					image {
						width: 27rpx;
						height: 29rpx;
						margin-left: 10rpx;
					}
				}

				.bottom {
					display: flex;
					flex-wrap: wrap;

					.box {
						width: 31%;
						height: 330rpx;
						//background: #CBCBCB;
						border-radius: 11rpx;
						border: 1px solid #FAFAFA;
						margin: 20rpx 7rpx;

						image {
							width: 100%;
							height: 217rpx;
						}

						.title {
							margin-top: 14rpx;

						}

						.price {
							font-size: 22rpx;
							color: #EC5722;
							margin-top: 10rpx;
						}
					}
				}
			}
		}
	}
</style>