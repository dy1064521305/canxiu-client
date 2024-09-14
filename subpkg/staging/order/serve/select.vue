<template>
	<view class="page" :class="{onColor:isSearch&&query.keyWord!=''&&searchList.length==0}">
		<header-search :q="query.keyWord" placeholder="请输入保修项" @clear="onSearch('','clear')"
			@search="onSearch($event,'change')" @input="onSearch($event,'change')">
		</header-search>
		<view v-show="!query.keyWord">
			<view class="store" v-if="!this.addServes">
				<view class="acea-row row-between-wrapper">
					<view class="acea-row">
						<view class="" v-if="storeInfo.storeImg">
							<image :src="storeInfo.storeImg">
							</image>
						</view>
						<image v-else src="@/static/logo.png"></image>
						<view class="flex-colum-between" style="padding: 4rpx 0;">
							<view class="">
								{{storeInfo.storeName||'暂无名称'}}
							</view>
							<view class="acea-row row-middle" style="font-size: 24rpx;color: #A5A7A7">
								{{storeInfo.storeType||'暂无类型'}}<text style="margin: 0 4rpx;"
									v-if="storeInfo.businessDistrict">|
								</text> {{storeInfo.businessDistrict}}
							</view>
						</view>
					</view>
					<view style="font-size: 24rpx;" @click="$jump(-1)">
						更换 <text class="iconfont icon-arrow-right" style="font-size: 32rpx;"> </text>
					</view>
				</view>
				<view class="store-content">
					<scroll-view class="scroll-view_H acea-row" scroll-x="true" @scroll="scroll" scroll-left="300">
						<view class="left scroll-view-item_H acea-row row-middle" v-for="(item,index) in storeTypeLast"
							@click="toPlace(item.typeId)" :key="index">
							<image v-if="item.projectImg" :src="item.projectImg" mode=""></image>
							<image v-else src="@/static/logo.png"></image>
							<view class="right flex-colum-between" style="padding: 4rpx 0;">
								{{item.serviceProductName}}
								<view class="acea-row row-middle"
									style="font-size: 24rpx;color: #A5A7A7;margin-top: 10rpx;">
									{{item.serviceTypeName}}
								</view>
							</view>
						</view>
					</scroll-view>
				</view>

			</view>
			<view class="title acea-row">
				请选择报修项
				<view class="title-r">（*仅显示该门店可报修项目）</view>
			</view>
			<view class="venue_list">
				<view class="venue_list_img">
					<image src="https://img.reduxingke.com/2023/06/03/2bb6b202306031018201429.png" mode=""></image>
				</view>
				<view class="all acea-row">
					<scroll-view class="nav" :class="{fixed: navFix}" :style="{top: navFix ? fixedTop+'px' : '0'}"
						scroll-y>
						<view v-for="(item, index) in typelist" :key="index" class="nav-item"
							:class="{on: navIndex === index}" @click="scrollTo(index)">
							<text v-if="typelist.length>0"> {{item.typeName}}</text>
						</view>
					</scroll-view>
					<view class="right">
						<view class="content">
							<view v-for="(item,index) in typelist" :key="index" class=""
								:style="typelist.length == index + 1 ? lastConStyle : ''">
								<view class="contentItems remen">
									{{item.typeName}}
								</view>
								<view class="contentItem2">
									<view v-for=" (i,n) in item.children" :key="n">
										<text
											style="margin: 20rpx 0;font-weight: bold; font-size: 28rpx;">{{i.typeName}}</text>
										<view class="items acea-row row-between-wrapper" v-for="(m,c) in i.children"
											:key="c" @click="onchange(m,item.typeId,i.typeId)">
											<view>{{m.typeName}}</view>
											<text v-if="m.checkShow" class="iconfont icon-selectfill"
												style="font-size: 36rpx;"></text>
											<text v-else class="iconfont icon-yuanxingweixuanzhong"></text>
										</view>
									</view>
								</view>

							</view>

							<!-- <view class="contents" v-for="(item1,index1) in item.list" :key="index1"
									@click="$jump(item1.url+'&guide_id='+item1.id)">
									<view class="contents_bgimg">
										<image :src="item1.bg_img" mode="scaleToFill"></image>
									</view>
									<view class="zhuanti acea-row ">
										<image class="zhuanti_image acea-row" :src="item1.img" mode="scaleToFill">
										</image>
										<view class="zhuanti_title">
											{{item1.title}}
										</view>
									</view>
									<view class=" xianshi  acea-row row-between-wrapper">
										<view>{{item1.subtitle}}</view>
										<text class="gengduo acea-row row-center">更多<text
												class="iconfont icon-iconmore-copy"></text></text>
									</view>
			
									<view class="venues_number acea-row ">
										<view class="venues_item" v-for="(items,indexs) in item1.item" :key="indexs">
											<image :src="items.venue_img" mode=""></image>
											<text>{{items.venue_title}}</text>
										</view>
									</view>
								</view>
							</view>
							<empty-page v-if="!category.length" msg="暂无数据"></empty-page> -->
						</view>
					</view>
				</view>
			</view>

		</view>
		<view v-show="query.keyWord">
			<view v-if="isSearch&&searchList.length!=0" style="padding: 0 20rpx 150rpx;">
				<view class="page-list" v-for="(item,index) in searchList" :key="index">
					<view class="page-list-item acea-row row-between-wrapper">
						<view class="page-list-item-left acea-row">
							<view class="image">
								<image v-if="item.projectImg==null||item.projectImg==''||item.projectImg=='null'"
									src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/02/23d8137225a440f3a4e19e43d527cc32.png">
								</image>
								<image v-else :src="item.projectImg" mode=""></image>
							</view>
							<view class="page-list-item-left-name flex-colum">
								<view class="acea-row row-middle">
									<view class="name line1">
										{{item.projectName}}
									</view>
								</view>
								<text style="color: red;"> <text
										style="font-size: 20rpx;">￥</text>{{item.discountPrice}}</text>
							</view>
						</view>
						<view class="page-list-item-right acea-row row-middle" @click="toSelect(item.typeId,index)">
							<image v-if="item.checkShow"
								src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/26/0533ff643a9b40acaa0fb32980d58842.png"
								mode=""></image>
							<image v-else
								src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/26/73f7603eb003465fa5198a7fb04cd22e.png"
								mode=""></image>
						</view>

					</view>
				</view>
			</view>
			<!-- 	<view v-if="serviceName==''&&searchList.length==0" class="">

		</view> -->
			<u-empty marginTop='30' text='没有找到哦，换个关键词试一下吧' v-if="isSearch&&query.keyWord!=''&&searchList.length==0"
				icon="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/04/cb8a19a85cd14c86ad85b72b97ea2d1e.png">
			</u-empty>
		</view>
		<view class="bottom">
			<view class="btn" @click="sureRuzhu()">确认入驻</view>
		</view>
	</view>
</template>

<script>
	import $cache from '@/utils/cache.js';
	import HeaderSearch from '@/components/header/search.vue'
	import {
		rpxToPx
	} from '@/utils/index.js'
	import {
		getCustomerInfo,
		getProjectRecord,
		getStoreList,
		getListServiceQuery
	} from '@/api/car.js'
	import * as service from '@/api/service.js'
	export default {
		components: {
			HeaderSearch,
		},
		data() {
			return {
				query: {
					keyWord: ""
				},
				navFix: false,
				offsetHList: [],
				navIndex: 0,
				typelist: [{
						id: 1,
						title: '水龙头'
					},
					{
						id: 1,
						title: '水龙头'
					},
					{
						id: 1,
						title: '水龙头'
					}

				],
				category: [{

				}],
				scrollTop: 0,
				fixedTop: 44,
				lastConStyle: '',
				customerId: "",
				storeInfo: {},
				storeTypeLast: [],
				id: $cache.get('ClientId') || '',
				selectedList: [],
				searchList: [],
				isSearch: false,
				addServes: false
			}
		},
		onLoad(options) {
			if (options && options.id) {
				this.customerId = options.id || ''
				// type :add表示专门添加服务项
				if (options.type) {
					this.addServes = true
				}
			}

			let {
				safeAreaInsets,
				windowHeight
			} = uni.getSystemInfoSync()
			let h = rpxToPx(88);
			this.fixedTop = h + safeAreaInsets.top;
			let contentH = windowHeight - this.fixedTop - 88;
			this.lastConStyle = 'min-height: ' + contentH + 'px';
			this.getStore()
		},
		onShow() {

			this.getList()
		},
		onPageScroll(e) {
			let top = e.scrollTop;
			this.scrollTop = top;
			let count = this.offsetHList.length
			if (!count) return;
			if (top >= this.offsetHList[0]) {
				this.navFix = true
			} else {

				this.navFix = false
			}
			if (this.offsetHList.length < 2) return;
			if (top < this.offsetHList[0]) {
				this.navIndex = 0;
				return;
			}
			let arr = [...this.offsetHList, top].sort((a, b) => {
				return a - b;
			});

			this.navIndex = arr.indexOf(top) - 1;
		},
		methods: {
			getStore() {
				getCustomerInfo(this.customerId).then(res => {
					this.storeInfo = res.data
				})
				getProjectRecord(this.customerId, {
					clientId: this.id
				}).then(res => {
					this.storeTypeLast = res.data
				})

				// getStoreList({
				// 	pageSize: 10,
				// 	pageNum: 1,
				// 	clientId: this.id,
				// 	keyword: '',
				// }).then(res => {
				// 	this.storeTypeLast = res.rows

				// })

			},
			getList() {
				service.getService({
					name: this.query.keyWord,
					clientId: this.id,
				}).then(res => {
					this.typelist = res.data.filter((item) => {
						if (item.children && item.children.length) {
							return item.children = item.children.filter(i => {
								if (i.children && i.children.length) {
									return i.children = i.children.filter(m => {
										return m.serviceProjectVoList && m
											.serviceProjectVoList.length
									})
								}
							})
						}
					})
					this.typelist = this.typelist.filter((item) => {
						if (item.children && item.children.length) {
							return item.children = item.children.filter(i => {
								return i.children && i.children.length
							})
						}
					})

					this.typelist = this.typelist.filter((item) => {
						return item.children && item.children.length
					})
					uni.$once('selectHideList', (list) => {
						this.selectedList = [...list]
						console.log(this.selectedList, "this.selectedList----------- ");
					})
					this.typelist.forEach((item) => {
						if (item.children && item.children.length) {
							item.children.forEach(i => {
								if (i.children && i.children.length) {
									i.children.forEach(m => {
										m.checkShow = false
										if (this.selectedList.length) {
											this.selectedList.forEach(k => {
												if (k.typeId == m.typeId) {
													m.checkShow = k.checkShow
												}
											})
										}
									})

								}

							})

						}
					})
					setTimeout(() => {
						let navH = 40;
						const query = uni.createSelectorQuery().in(this);
						query.selectAll('.remen').boundingClientRect(data => {
							console.log(data, "@22");
							this.offsetHList = data.map(item => {
								return item.top + this.scrollTop - this.fixedTop
							})
						}).exec();
					}, 300)
				})
			},
			// onSearch(e) {
			// 	this.getList();
			// },
			onSearch(e, type) {
				let _this = this;
				_this.query.keyWord = e;
				_this.isSearch = true
				console.log(type);
				if (_this.query.keyWord != '') {
					if (type == 'clear') {
						console.log(1111);
						_this.searchList = []
						_this.query.keyWord = ''
						_this.isSearch = false
						//clearTimeout(this.timer)
					} else if (type == 'change') {
						// 清除 timer 对应的延时器
						clearTimeout(_this.timer)
						// 重新启动一个延时器，并把 timerId 赋值给 this.timer
						_this.timer = setTimeout(() => {
							// 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
							let name = _this.query.keyWord
							if (name == '') {
								_this.searchList = []
							} else {
								_this.searchHandle()
							}

						}, 400)
						console.log(_this);
					}
				} else {
					_this.isSearch = false
				}
			},
			searchHandle() {
				this.isSearch = true
				this.searchList = []
				getListServiceQuery({
					name: this.query.keyWord,
					clientId: this.id,
				}).then(res => {
					this.searchList = res.data
					if (this.selectedList.length) {
						this.selectedList.forEach(item => {
							this.searchList.forEach(it => {
								if (item.typeId == it.typeId) {
									it.checkShow = true
								} else {
									it.checkShow = false
								}
							})
						})
					}
				})
			},
			toSelect(id, index) {
				if (this.selectedList.length) {
					let bool = this.selectedList.findIndex(it => {
						return it.typeId == id
					})
					console.log(bool, '===');
					if (bool != -1) {
						console.log('打印1');
						this.searchList[index].checkShow = false
						this.$set(this.searchList, index, {
							...this.searchList[index]
						})
						this.selectedList[bool].checkShow = false
						this.selectedList.splice(bool, 1)
					} else {
						console.log('打印2');
						this.typelist.forEach((item) => {
							if (item.children && item.children.length) {
								item.children.forEach(i => {
									if (i.children && i.children.length) {
										i.children.forEach((m, s) => {
											if (m.typeId == id) {
												m.checkShow = true
												this.searchList[index].checkShow = true
												this.$set(this.searchList, index, {
													...this.searchList[index]
												})
												this.selectedList.push(m)
											}
										})
									}

								})

							}
						})
					}
				} else {
					console.log('打印3');
					this.typelist.forEach((item) => {
						if (item.children && item.children.length) {
							item.children.forEach(i => {
								if (i.children && i.children.length) {
									i.children.forEach((m, s) => {
										if (m.typeId == id) {
											m.checkShow = true
											this.searchList[index].checkShow = true
											this.$set(this.searchList, index, {
												...this.searchList[index]
											})
											this.selectedList.push(m)
										}

									})
								}

							})

						}
					})
				}
				console.log(this.searchList, "this.searchListsearchListsearchList");
				console.log(this.selectedList, "this.selectedList");

			},
			onchange(item, item1, item2) {
				this.typelist.forEach((it, its) => {
					if (it.typeId && it.typeId == item1) {
						it.children.forEach((m, ms) => {
							if (m.typeId && m.typeId == item2) {
								m.children.forEach((n, ns) => {
									if (n.typeId && n.typeId == item.typeId) {
										this.$set(this.typelist[its].children[ms].children, ns, {
											...m.children[ns],
											checkShow: !n.checkShow
										});
										console.log(n.checkShow, "checkShowcheckShow");
										if (!n.checkShow) {
											let data = {
												...m.children[ns],
												checkShow: true
											}
											this.selectedList.push(data)
										} else {
											let data = {
												...m.children[ns],
												checkShow: false
											}
											this.selectedList.splice(data, 1)
										}

										console.log(this.selectedList, "this.selectedList1234");
									}

								})
							}
						})
					}
				})
			},
			// 确定入驻
			sureRuzhu() {
				if (this.selectedList.length <= 0) return this.$toast('选择服务项')
				if (this.addServes) {
					this.$jump('/subpkg/staging/order/serve/edit?customerId=' + this.customerId)
					setTimeout(() => {
						uni.$emit('selectList2', this.selectedList)
					}, 500)
				} else {
					this.$jump('/subpkg/staging/order/serve/repair?customerId=' + this.customerId)
					setTimeout(() => {
						uni.$emit('selectList', this.selectedList)
					}, 500)
				}
			},
			// 左边滑动type
			scrollTo(index) {
				setTimeout(() => {
					this.navIndex = index;
				}, 500)
				uni.pageScrollTo({
					scrollTop: this.offsetHList[index] + 2
				})
			},
			// 选择最近操作服务项
			toPlace(id) {
				this.typelist.forEach((item) => {
					if (item.children && item.children.length) {
						item.children.forEach(i => {
							if (i.children && i.children.length) {
								i.children.forEach(m => {
									if (m.typeId == id) {
										m.checkShow = true
										this.selectedList = []
										this.selectedList.push(m)
									}
								})

							}

						})

					}
				})
				this.sureRuzhu()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;
		background-color: #f9f9f9;

		&.onColor {
			min-height: 100vh;
			background-color: #fff;
		}

		&-list {
			background-color: #fff;
			padding: 24rpx 30rpx 24rpx 22rpx;
			margin: 20rpx;
			box-sizing: border-box;
			border-radius: 18rpx;

			&-item {
				&-left {
					.image {
						width: 80rpx;
						height: 80rpx;

						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}
					}

					&-name {
						font-size: 24rpx;
						color: #999999;
						margin-left: 20rpx;
						justify-content: space-between;
						padding: 4rpx 0;

						view {
							font-size: 28rpx;
							color: #212121;

							.name {
								max-width: 380rpx;
							}

							.color {
								display: inline-block;
								background: $pageColor;
								font-size: 20rpx;
								padding: 2rpx 8rpx;
								color: #fff;
								border-radius: 6rpx;
								margin-left: 10rpx;
							}
						}
					}
				}

				&-right {
					image {
						width: 32rpx;
						height: 32rpx;
					}
				}


			}
		}

		.store {
			margin: 20rpx;
			padding: 20rpx;
			background-color: #FFFFFF;
			border-radius: 16rpx;

			image {
				width: 80rpx;
				height: 80rpx;
				margin-right: 20rpx;
				border-radius: 10rpx;
			}

			&-content {
				margin-top: 20rpx;
				// height: 144rpx;

				.scroll-view_H {
					white-space: nowrap;
					width: 100%;
				}

				.scroll-view-item_H {
					display: inline-block;
					width: 100%;
					padding: 28rpx 14rpx;
					box-sizing: border-box;
				}

				.left {
					// width: 46%;
					width: 308rpx;
					padding: 28rpx 14rpx;
					background: rgba(243, 178, 62, 0.08);
					border-radius: 8rpx;
					margin-right: 28rpx;
					box-sizing: border-box;

					.right {
						display: inherit;
						padding: 4rpx 0;
					}
				}
			}
		}

		.title {
			margin: 20rpx 20rpx 40rpx;
			font-size: 28rpx;

			&-r {
				color: #999999;
			}
		}

		.venue_list {
			width: 100%;
			min-height: 600rpx;
			border-radius: 30rpx 30rpx 0 0;
			background-size: 100%;
			position: relative;
			// top: -10rpx;
			z-index: 1;
			padding-top: 44rpx;
			padding-bottom: 160rpx;



			.venue_list_img {
				height: 55rpx;
				width: 100%;
				position: absolute;
				top: -25rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.all_guide {
				padding: 16rpx 20rpx 30rpx 20rpx;
				font-size: 30rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
			}

			.all {
				padding: 0rpx 20rpx 0rpx 190rpx;
				position: relative;
				box-sizing: border-box;

				.nav {
					width: 190rpx;
					height: 100%;
					background: #fff;
					margin-right: 26rpx;
					position: absolute;
					border-radius: 0 20rpx 0 0;
					top: 0;
					left: 0;
					/* #ifdef APP-PLUS ||MP-WEIXIN */
					padding-bottom: calc(constant(safe-area-inset-bottom) + 250rpx);
					/* 兼容 iOS 设备 */
					padding-bottom: calc(env(safe-area-inset-bottom) + 2 50rpx);

					/* 兼容 iPhone X 及以上设备 */
					/* #endif */
					box-sizing: border-box;

					&.fixed {
						position: fixed;
					}

					.nav-item {

						font-size: 26rpx;
						color: #666;
						padding: 30rpx 0 20rpx 20rpx;

						&.on {
							font-size: 30rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #FF7700;
							line-height: 42rpx;
						}
					}
				}

				.remen {
					margin-bottom: 20rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: bold;
				}

				.renmenTop {
					position: relative;
					z-index: 1;
					padding-top: 24rpx;
					margin-bottom: 16rpx;
				}

				.renmenTop::before {
					content: "";
					position: absolute;
					bottom: -1rpx;
					width: 138rpx;
					height: 16rpx;
					background: linear-gradient(to right, rgba(252, 217, 135, 0.9), rgba(252, 217, 135, 0.9), rgba(252, 217, 135, 0.5), rgba(252, 217, 135, 0));
					z-index: -1;
				}

				.right {
					flex: 1;
					min-height: 80vh;
					padding: 20rpx;
					border-radius: 14rpx;
					background-color: #fff;
					margin-left: 20rpx;
					color: #666;

					.remenActivy {
						width: 100%;

						.remen {
							margin: 0 0 16rpx 20rpx;
							font-size: 32rpx;
							font-family: PingFangSC-Semibold, PingFang SC;
							font-weight: 600;

						}

						.renmenComtent {
							background: #fff;
							border-radius: 20rpx;

							.venues_item {
								margin-bottom: 20rpx;
								margin-right: 5%;
								width: 30%;
								text-align: center;

								image {
									width: 148rpx;
									height: 148rpx;
									border-radius: 10rpx;
									background: #fff;
								}

								text {
									font-size: 24rpx;
									// color: #333333;
								}
							}

							.venues_item:nth-child(3n) {
								margin-right: 0rpx;
							}
						}
					}

					.content {
						min-height: 80vh;

						// margin-top: -24rpx;
						.items {
							padding: 18rpx 16rpx;

							font-size: 26rpx;

							text {
								color: #F3B23E;
								font-size: 32rpx;
							}
						}

						.remen {
							padding: 14rpx 0 0;
							font-size: 30rpx;
							font-family: PingFangSC-Semibold, PingFang SC;
							font-weight: bold;
						}

						.contentItem2 {
							padding: 20rpx;
							background-color: #f8f8f8;
							border-radius: 20rpx;
						}

						.contents {
							margin-bottom: 15rpx;
							background: #fff;
							position: relative;
							border-radius: 20rpx;
							// padding: 0 20rpx 20rpx 20rpx;

							.contents_bgimg {
								position: absolute;
								right: 0;
								top: 0;
								height: 100rpx;
								width: 340rpx;

								image {
									width: 100%;
									height: 100%;
									border-radius: 0 20rpx 0 0;
								}
							}

							.zhuanti {
								height: 94rpx;
								align-items: center;
								margin-left: 20rpx;

								.zhuanti_image {
									width: 60rpx;
									height: 60rpx;
									border-radius: 6rpx;
									margin-right: 16rpx;
									background-color: #fff;
								}

								.zhuanti_title {
									font-size: 30rpx;
									font-family: PingFangSC-Semibold, PingFang SC;
									font-weight: 600;
									color: #333333;
									position: relative;
									z-index: 1;
									margin-top: -12rpx;
								}

								.zhuanti_title::before {
									content: "";
									position: absolute;
									bottom: -1rpx;
									width: 138rpx;
									height: 16rpx;
									background: linear-gradient(to right, rgba(252, 217, 135, 0.9), rgba(252, 217, 135, 0.9), rgba(252, 217, 135, 0.5), rgba(252, 217, 135, 0));
									z-index: -1;
								}
							}

							.xianshi {
								height: 56rpx;
								font-size: 20rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								color: #666666;
								margin: 10rpx 20rpx 20rpx 20rpx;

								view {
									width: 334rpx;
									font-size: 22rpx;
									text-overflow: -o-ellipsis-lastline;
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;
									-webkit-line-clamp: 2;
									line-clamp: 2;
									-webkit-box-orient: vertical;
								}

								.gengduo {
									height: 30rpx;
									font-size: 20rpx;
									line-height: 30rpx;
									color: #333333;
									border-radius: 16rpx;
									border: 1rpx solid #333333;
									padding-left: 14rpx;

									.iconfont {
										margin-right: 6rpx;
									}
								}
							}

							.venues_number {
								padding: 0 20rpx;

								.venues_item {
									margin-bottom: 20rpx;
									margin-right: 5%;
									width: 30%;
									text-align: center;

									image {
										width: 148rpx;
										height: 148rpx;
										border-radius: 10rpx;
										background: #fff;
									}

									text {
										font-size: 24rpx;
										color: #333333;
									}
								}

								.venues_item:nth-child(3n) {
									margin-right: 0rpx;
								}

							}
						}
					}
				}
			}


		}

		.bottom {
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			box-sizing: border-box;
			z-index: 2;
			padding: 24rpx 24rpx 40rpx;
			background: #FFFFFF;
			border-top: 1rpx solid #f9f9f9;


			.btn {
				background: $pageColor;
				padding: 20rpx 0;
				text-align: center;
				font-family: PingFangSC, PingFang SC;
				font-weight: 500;
				font-size: 32rpx;
				border-radius: 10rpx;
				color: #FFFFFF;
			}
		}
	}
</style>