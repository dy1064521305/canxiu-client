<template>
	<view class="page">
		<header-search :q="query.keyWord" placeholder="请输入门店名称" @clear="onSearch('')" @search="onSearch">
		</header-search>
		<view class="store">
			<view class="acea-row row-between-wrapper">
				<view class="acea-row">
					<!-- <view class="" v-if="item.storeImg">
													<image :src="item.storeImg">
													</image>
												</view> -->
					<image src="@/static/logo.png"></image>
					<view class="flex-colum-between" style="padding: 4rpx 0;">
						<view class="">
							222
						</view>
						<view class="acea-row row-middle" style="font-size: 24rpx;color: #A5A7A7">
							222<text style="margin: 0 4rpx;">|
							</text> 111
						</view>
					</view>
				</view>
				<view style="font-size: 24rpx;">
					更换 <text class="iconfont icon-arrow-right" style="font-size: 32rpx;"> </text>
				</view>
			</view>
			<view class="store-content acea-row row-between-wrapper">
				<view class="store-content-left acea-row">
					<image src="@/static/logo.png"></image>
					<view class="flex-colum-between" style="padding: 4rpx 0;">
						222
						<view class="acea-row row-middle" style="font-size: 24rpx;color: #A5A7A7">
							000
						</view>
					</view>
				</view>
				<view class="store-content-left acea-row">
					<image src="@/static/logo.png"></image>
					<view class="flex-colum-between" style="padding: 4rpx 0;">
						222
						<view class="acea-row row-middle" style="font-size: 24rpx;color: #A5A7A7">
							000
						</view>
					</view>
				</view>
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
				<scroll-view class="nav" :class="{fixed: navFix}" :style="{top: navFix ? fixedTop+'px' : '0'}" scroll-y>
					<view v-for="(item, index) in typelist" :key="index" class="nav-item"
						:class="{on: navIndex === index}" @click="scrollTo(index)">
						<text v-if="typelist.length>0"> {{item.title}}</text>
					</view>
				</scroll-view>
				<view class="right">
					<view class="content">
						<view v-for="(item,index) in category" :key="index"
							:style="category.length == index + 1 ? lastConStyle : ''">
							<view class="items acea-row row-between-wrapper"
								v-for="(i) in [1,2,3,4,5,6,7,8,10,1,2,3,4,5,6,7,8,101,2,3,4,5,6,7,8,10]">
								<view>疏通3M内</view>
								<!-- <text class="iconfont icon-yuanxingweixuanzhong"></text> -->
								<text class="iconfont icon-selectfill" style="font-size: 36rpx;"></text>
							</view>

							<!-- 	<view class="remen">
								222
							</view> -->
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
							</view> -->
						</view>
						<empty-page v-if="!category.length" msg="暂无数据"></empty-page>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="btn">确认入驻</view>
		</view>
	</view>
</template>

<script>
	import HeaderSearch from '@/components/header/search.vue'
	import {
		rpxToPx
	} from '@/utils/index.js'
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
				lastConStyle: ''
			}
		},
		onLoad() {
			let {
				safeAreaInsets,
				windowHeight
			} = uni.getSystemInfoSync()
			let h = rpxToPx(88);
			this.fixedTop = h + safeAreaInsets.top + 12;

			let contentH = windowHeight - this.fixedTop;
			this.lastConStyle = 'min-height: ' + contentH + 'px';
			console.log(h, "this.h  ");
			console.log(safeAreaInsets.top, "this.lastConStyle ");
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
			getList() {
				setTimeout(() => {
					let navH = 40;
					const query = uni.createSelectorQuery().in(this);
					query.selectAll('.items').boundingClientRect(data => {
						this.offsetHList = data.map(item => {
							return item.top + this.scrollTop - this.fixedTop
						})
						console.log(this.offsetHList, "this.offsetHList")

						// if (this.option) {
						// 	for (let i = 0, count = category.length; i < count; i++) {
						// 		let list = category[i]?.list;
						// 		if (list) {
						// 			for (let j = 0; j < list.length; j++) {
						// 				if (list[j].id == this.option) {
						// 					this.scrollTo(i);
						// 					return;
						// 				}
						// 			}
						// 		}
						// 	}
						// }
					}).exec();
				}, 300)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;
		background-color: #f9f9f9;

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

				&-left {
					width: 45%;
					padding: 28rpx 14rpx;
					background: rgba(243, 178, 62, 0.08);
					border-radius: 8rpx;
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
				// height: 1230rpx;
				padding: 0rpx 20rpx 0rpx 190rpx;
				position: relative;
				box-sizing: border-box;

				.nav {
					width: 170rpx;
					height: 100%;
					background: #fff;
					margin-right: 26rpx;
					position: absolute;
					border-radius: 0 20rpx 0 0;
					top: 0;
					left: 0;

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
					margin-bottom: 15rpx;
					font-size: 30rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #333333;
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

					.remenActivy {
						width: 100%;

						.remen {
							margin: 0 0 16rpx 20rpx;
							font-size: 32rpx;
							font-family: PingFangSC-Semibold, PingFang SC;
							font-weight: 600;
							color: #333333;
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
									color: #333333;
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
							padding: 16rpx;
							color: #212121;
							font-size: 28rpx;

							text {
								color: #F3B23E;
								font-size: 32rpx;
							}
						}

						.remen {
							padding: 14rpx 0 0;
							font-size: 32rpx;
							font-family: PingFangSC-Semibold, PingFang SC;
							font-weight: 600;
							color: #333333;
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
				background: #F3B23E;
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