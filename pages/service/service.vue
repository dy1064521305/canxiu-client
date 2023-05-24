<template>
	<view class="service">
		<view class="top" :style="'padding-top:'+(titleHeight+92)+'rpx'">
			<view class="search" @click="goSearch">
				<!-- 	<view @click="choseCity" style="margin:0 18rpx 0 30rpx;">杭州</view>
				<image @click="choseCity" class="triangle" src="../../static/img/home/triangle.png" mode=""></image>
				<view class="line">|</view> -->
				<image class="search-icon" src="../../static/img/home/search.png" mode=""></image>
			
			<view style="width: 65%;color: #ccc;">
					请输入需要的服务	
				<!-- 		<u--input @clear='input("clear")' @input='input("input")' clearable border='none' @confirm="search"
						v-model="query.name" type="text" placeholder="请输入需要的服务" />-->
				</view> 
				<view class="search-title"  >搜索</view>
			</view>
		</view>
		<u-empty marginTop='70' text='没有找到该服务项目哦，换个关键词试一下吧' v-if="query.name!=''&&typesList.length==0&&isSearch"
			icon="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/04/cb8a19a85cd14c86ad85b72b97ea2d1e.png">
		</u-empty>
		<view class="main" style="background: #fff;padding: 40rpx;display: flex;flex-wrap: wrap;"
			v-if="typesList.length!=0&&isSearch">
			<view class="thumb-box" style="width: 150rpx;margin:0 20px;" v-for="(item, index) in typesList" :key="index"
				@click="featureC(item)">
				<image v-if="item.url != ''" class="item-menu-image" :src="item.url" mode="">
				</image>
				<view v-else class="item-menu-image row-c" style="background-color: #F4F6F8;">
					<text style="font-size: 20rpx;color: #d0d0d0;">加载失败</text>
				</view>
				<view class="item-menu-name">{{item.typeName}}</view>
			</view>
		</view>
		<view v-if="!isSearch" class="main">
			<view class="u-wrap">
				<view class="u-menu-wrap">
					<scroll-view style="background: #fff;" scroll-y scroll-with-animation
						class="u-tab-view menu-scroll-view" :scroll-top="scrollTop" :scroll-into-view="itemId">
						<view v-for="(item,index) in typesList" :key="index" class="u-tab-item"
							:class="[current == index ? 'u-tab-item-active' : '']" @tap.stop="swichMenu(index)">
							<text :class="[current == index ? 'u-line-1' : 'u-line']">{{item.typeName}}</text>
						</view>
					</scroll-view>
					<scroll-view :scroll-top="scrollRightTop" scroll-y scroll-with-animation class="right-box"
						@scroll="rightScroll">
						<view class="page-view">
							<view class="class-item" :id="'item' + index" v-for="(item , index) in typesList"
								:key="index">
								<view class="item-title">
									<text>{{item.typeName}}</text>
								</view>
								<view v-for="(item1, index1) in item.children" :key="index1" :id="'box' + index"
									style="margin-top: 30rpx;">
									<view class="item-title" style="margin-left: 15rpx;">
										<text>{{item1.typeName}}</text>
									</view>
									<view class="item-container">
										<view class="thumb-box" v-for="(item2, index2) in item1.children" :key="index2"
											@click="featureC(item2)">
											<image v-if="item2.url != ''" class="item-menu-image" :src="item2.url"
												mode="">
											</image>
											<view v-else class="item-menu-image row-c"
												style="background-color: #F4F6F8;">
												<text style="font-size: 20rpx;color: #d0d0d0;">加载失败</text>
											</view>
											<view class="item-menu-name">{{item2.typeName}}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import * as service from '@/api/service.js'
	import {
		getCarNum
	} from '@/utils/api.js'
	export default {
		data() {
			return {
				scrollTop: 0, //tab标题的滚动条位置
				oldScrollTop: 0, // tab标题的滚动条旧位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				itemId: '', // 栏目右边scroll-view用于滚动的id
				arr: [], // 储存距离顶部高度的数组
				scrollRightTop: 0, // 右边栏目scroll-view的滚动条高度
				timer: null, // 定时器		
				titleHeight: 0, //小程序的顶部高度
				typesList: [],
				query: {
					name: '', //搜索
				},
				isSearch: false,
			};
		},
		onLoad() {
			// #ifdef MP-WEIXIN
			this.getHeight();
			// #endif
			//this.getMenuItemTop()
			this.getList()


		},
		onShow() {
			if (getApp().index != undefined) {
				this.$nextTick(() => {
					this.swichMenu(getApp().index)
				})
			}
			getCarNum().then(res => {
				if (res != 0) {
					uni.setTabBarBadge({
						index: 2,
						text: res
					})
				}
			})

		},
		onHide() {
			console.log(111);
			getApp().index = undefined
		},
		methods: {
			getList(type) {
					this.typesList = []
				console.log(type);
				uni.showLoading({
					title: '加载中...'
				});
				service.getService(this.query).then(res => {
					if (type == 'search') {
						console.log(111);
						console.log(res.data);
						this.typesList = []
						res.data.forEach(item => {
							if (item.typeLevel == 3) {
								this.typesList.push(item)
							}
						})
							console.log(this.typesList);
							this.isSearch = true
							uni.hideLoading()
					} else {
						console.log(11111);
					
						this.typesList = res.data
						this.isSearch = false
					}

				
					console.log(this.typesList);
				})
			},
			// 获取微信右上角胶囊高度
			getHeight() {
				let res = wx.getMenuButtonBoundingClientRect();
				this.titleHeight = res.top + 30;
				console.log(this.titleHeight);
			},
			//搜索
			goSearch() {
				uni.navigateTo({
					url: '../../subpkg/home/search/search'
				})
			},
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
						resolve();
					}).exec();
				})
			},
			getMenuItemTop() {
				return new Promise(resolve => {
					let selectorQuery = uni.createSelectorQuery();
					selectorQuery.selectAll('.class-item').boundingClientRect((rects) => {
						// 如果节点尚未生成，rects值为[](因为用selectAll，所以返回的是数组)，循环调用执行
						if (!rects.length) {
							setTimeout(() => {
								this.getMenuItemTop();
							}, 10);
							return;
						}
						rects.forEach((rect) => {
							// 视情况而定，这里减去rects[0].top，是因为第一项顶部可能不是贴到导航栏(比如有个搜索框的情况)
							this.arr.push(rect.top - rects[0].top);
						})
						resolve();
					}).exec()
				})
			},
			async observer() {
				this.content.map((val, index) => {
					let observer = uni.createIntersectionObserver(this);
					observer.relativeTo('.right-box', {
						top: 0
					}).observe('#item' + index, res => {
						if (res.intersectionRatio > 0) {
							let id = res.id.substring(4);
							this.leftMenuStatus(id);
						}
					})
				})
			},
			/**
			 * 设置左边菜单的滚动状态
			 * @index 传入的 ID
			 */
			async leftMenuStatus(index) {
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			async swichMenu(index) {
				const ind = index
				if (this.typesList.length === 0) {
					setTimeout(() => {
						this.swichMenu(ind)
					}, 333)
					return
				}
				if (this.arr.length == 0) {
					await this.getMenuItemTop();
				}
				console.log(index);
				if (index == this.current) return;
				this.scrollRightTop = this.oldScrollTop;
				this.$nextTick(function() {
					this.scrollRightTop = this.arr[index];
					//	console.log(this.scrollRightTop, 'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr219', this.arr, index);
					this.current = index;
					this.leftMenuStatus(index);
				})
			},
			async rightScroll(e) {
				this.oldScrollTop = e.detail.scrollTop;
				if (this.arr.length == 0) {
					await this.getMenuItemTop();
				}
				if (this.timer) return;
				if (!this.menuHeight) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
				}
				setTimeout(() => { // 节流
					this.timer = null;
					// scrollHeight为右边菜单垂直中点位置
					// let scrollHeight = e.detail.scrollTop + this.menuHeight / 2;
					// scrollHeight为右边菜单头部位置
					let scrollHeight = e.detail.scrollTop + 20;
					for (let i = 0; i < this.arr.length; i++) {
						let height1 = this.arr[i];
						let height2 = this.arr[i + 1];
						if (!height2 || scrollHeight >= height1 && scrollHeight < height2) {
							this.leftMenuStatus(i);
							return;
						}
					}
				}, 10)
			},
			//进入详情
			featureC(item1) {

				this.query.name = ''
				this.isSearch = false
				this.getList()
				console.log(item1);
				uni.navigateTo({
					url: '../../subpkg/car/goodDetails/goodDetails?typeId=' + item1.typeId
				})
			},
			//搜索
			search() {
				// console.log(this.searchName);
				// console.log(this.typesList);
				if (this.query.name == '') {
					this.$refs.uToast.show({
						type: 'error',
						message: '搜索内容不能为空'
					});
					//this.getList(')
				} else {
					this.isSearch = true
					this.getList('search')
				}


			},
		
			clear() {
				this.query.name = ''
				this.isSearch = false
				this.typesList = []
				this.getList()
			},
			input(type) {
				this.typesList = []
				uni.$u.debounce(this.toNext(type), 500)
			},
			//搜索
			goSearch() {
				uni.navigateTo({
					url: '../../subpkg/home/search/search'
				})
			},
			toNext(type) {
				if (this.query.name != '' && type == 'input') {
					console.log(type);
					
					this.getList('search')
				} else {
					if (type == 'clear') {
						this.query.name = ''
					}
					this.isSearch = false
					this.getList()
				}
				console.log(this.query.name);
			}
		}
	}
</script>



<style lang="scss" scoped>
	.service {
		height: 100vh;
		overflow: hidden;

		.top {
			width: 100%;
			//height: 190rpx;
			background-color: #fff;
			position: relative;

			.search {
				align-items: center;
				display: flex;
				height: 72rpx;
				background: #F1F1F1;
				border-radius: 36rpx;
				margin: 0 20rpx;



				.search-icon {
					width: 25rpx;
					height: 25rpx;
					margin: 40rpx;
				}

				.search-title {
					width: 125rpx;
					height: 57rpx;
					background: #9FD6BA;
					border-radius: 29rpx;
					color: #FFFFFF;
					line-height: 58rpx;
					text-align: center;
					margin-left: 15rpx;
				}
			}
		}

		.main {

			//margin-top: 20rpx;
			.u-wrap {
				/* #ifdef H5 */
				height: calc(100vh - var(--window-top));
				/* #endif */
				display: flex;
				flex-direction: column;
				/* #ifdef MP-WEIXIN */
				height: 84vh;
				/* #endif */
				/* #ifdef APP-PLUS */
				height: 87vh;
				/* #endif */
			}

			.u-search-box {
				padding: 18rpx 30rpx;
			}

			.u-menu-wrap {
				flex: 1;
				display: flex;
				overflow: hidden;
			}

			.u-line-1 {
				width: 100%;
				text-align: center;
				display: inline-block;
				background: linear-gradient(90deg, #72DAA4 0%, #9FD6BA 100%);
				border-radius: 30rpx;

				height: 60rpx;
				margin: 0 10rpx;
				line-height: 60rpx;
			}

			.u-line {
				display: inline-block;
				height: 54rpx;

				line-height: 54rpx;
			}

			::v-deep.uni-scroll-view-content {
				//margin-top: 113rpx;
			}

			.u-tab-view {
				width: 250rpx;
				height: 100%;
			}

			.u-tab-item {
				height: 110rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 29rpx;
				color: #A5A7A7;
				font-weight: 400;
				line-height: 1;

			}

			.u-tab-item-active {
				position: relative;
				font-size: 29rpx;
				color: #FFFFFF;
				font-size: 30rpx;
				font-weight: 600;


			}

			.u-tab-item-active::after {
				content: "";
				position: absolute;
				/*  border-left: 4px solid #06A446; */
				height: 52rpx;
				left: 0;
				top: 29rpx;
			}

			.u-tab-view {
				height: 100%;
			}

			.right-box {
				background-color: rgb(250, 250, 250);
			}

			.page-view {
				padding: 16rpx;
			}

			.class-item {
				margin-bottom: 30rpx;
				background-color: #fff;
				padding: 16rpx;
				border-radius: 8rpx;
			}

			.class-item:last-child {
				min-height: 100vh;
			}

			.item-title {
				font-size: 26rpx;
				color: $u-main-color;
				font-weight: bold;
			}

			.item-menu-name {
				margin-top: 8rpx;
				font-weight: normal;
				font-size: 24rpx;
				color: $u-main-color;
			}

			.item-container {
				display: flex;
				flex-wrap: wrap;
			}

			.thumb-box {
				width: 33.333333%;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				margin-top: 20rpx;
			}

			.item-menu-image {
				width: 120rpx;
				height: 120rpx;
			}
		}

	}
</style>
