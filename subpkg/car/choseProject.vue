<template>
	<view class="selectProject">
		<u-loading-page :loading="loading"></u-loading-page>
		<view class="top" :style="{'padding-top':titleHeight+'px'}">
			<view @click="$jump(-1)" style="margin: 0 20rpx;">
				<u-icon name="arrow-left" size='20'></u-icon>
			</view>
			<view :style="{'padding-right':menuButtonInfoWidth+'px','width':'100%'}">
				<u-search placeholder="请输入门店名称" :showAction='false' @search="search" @clear='clear' v-model="typeSearch"
					clearable></u-search>
			</view>


		</view>
		<view class="tips">
			<text>请选择报修项</text>
			<text>（*仅显示该门店可报修项目）</text>
		</view>
		<u-empty marginTop='70' text='没有找到哦，换个关键词试一下吧' v-if="!loading&&isSearch&&typeSearch!=''&&searchList.length==0"
			icon="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/04/cb8a19a85cd14c86ad85b72b97ea2d1e.png">
		</u-empty>
		
		<view  class="main">
			<view v-if="!loading" class="u-wrap">
				<view class="u-menu-wrap">
					<scroll-view style="background: #fff;" scroll-y scroll-with-animation
						class="u-tab-view menu-scroll-view" :scroll-top="scrollTop" :scroll-into-view="itemId">
						<view v-for="(item,index) in typesList" :key="index" class="u-tab-item"
							:class="[current == index ? 'u-tab-item-active' : '']"
							@tap.stop="swichMenu(index,item.typeName)">
							<text :class="[current == index ? 'u-line-1' : 'u-line']">{{item.typeName}}</text>
						</view>
					</scroll-view>
					<scroll-view :scroll-top="scrollRightTop" scroll-y scroll-with-animation>
						<u-loading-icon vertical v-if="loadingRight" text="加载中" textSize="18">
						</u-loading-icon>
						<view class="right-box" v-if="typesList.length!=0&&checksArr.length!=0&&!loadingRight">

						</view>
					</scroll-view>
				</view>
			</view>
		</view>

		<view class="bottom">
			<view class="btn-green">
				确认选择
			</view>
		</view>


		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		getListProject,
		searchProject
	} from '@/api/order.js'
	export default {
		options: {
			styleIsolation: 'shared'
		},
		data() {
			return {
				loading: true,
				loadingRight: false,
				scrollTop: 0, //tab标题的滚动条位置
				oldScrollTop: 0, // tab标题的滚动条旧位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				itemId: '', // 栏目右边scroll-view用于滚动的id
				arr: [], // 储存距离顶部高度的数组
				scrollRightTop: 0, // 右边栏目scroll-view的滚动条高度
				titleHeight: 0, //小程序的顶部高度

				total: 0,
				typesList: [],
				remark: {},
				showQestion: false,
				query: {
					type: ''
				},
				typeSearch: '',
				optionList: [],
				checksArr: [],
				isSearch: false,
				yijiList: [],
				searchList: [],
				checkss: [],
				remarkId: '',
				menuButtonInfoWidth: 0,
				showArr: [],
				oldPro: []
			};
		},
		onReady() {

		},
		async onLoad(option) {


			this.getHeight();
			await this.getList('init')
			this.getOldListHandle()
			this.swichMenu(0)
		},

		methods: {
			getEditProHandle(info) {
				this.optionList = info.showArr
				this.getList()
				this.checksArr = info.checksArr
			},
			numChange(e, item) {
				item.projectNumber = e.value
				if (this.isSearch) {
					// this.yijiName = yijiName
					this.current = this.yijiList.findIndex(itemm => {
						return itemm == item.yijiName
					})
				}
				this.checksArr[this.current].checkdInfo.forEach(pro => {
					if (pro.projectId == item.projectId) {
						pro.projectNumber = e.value
					}
				})
			},
			getList(type) {
				return new Promise(r => {

					getListProject(this.query).then(res => {
						res.data.forEach((item, itemi) => {
							//	let num = 0
							type == 'init' && this.checksArr.push({
								checks: [],
								checkdInfo: [],
								num: 0,
								yijiName: item.typeName
							})
							this.checksArr[itemi].num = 0
							this.yijiList.push(item.typeName)
							item.children != null && item.children.forEach((yiji, yijii) => {

								yiji.children != null && yiji.children.forEach(
									(erji, erjii) => {

										this.checksArr[itemi].num += erji
											.serviceProjectVoList !=
											null ? erji.serviceProjectVoList
											.length : 0
										erji.serviceProjectVoList != null && erji
											.serviceProjectVoList.forEach(
												(sanji, sanjii) => {
													sanji.projectNumber = 1
													sanji.checked = true
													// sanji.typeIndex = itemi
													// sanji.yijiIndex = yijii
													// sanji.erjiIndex = erjii
													// sanji.sanjiIndex = sanjii
													sanji.yijiName = item.typeName
													if (this.optionList.length != 0) {
														this.checksArr[itemi]
															.checkdInfo.find(
																i => {
																	if (i.projectId ==
																		sanji
																		.projectId) {
																		return sanji
																			.projectNumber =
																			i
																			.projectNumber
																	}
																})

													}

													sanji.img = sanji.projectImg !=
														null ? sanji
														.projectImg
														.split(',') : []


												})
									})
							})
						})

						this.typesList = res.data
						this.loading = false
						this.loadingRight = false
						r()
					})
				})

			},
			getOldListHandle() {
				console.log(this.oldPro, '368888');
				this.checksArr.forEach(ch => {
					//赋值原有的项目
					if (this.oldPro.length != 0) {
						this.oldPro.forEach(old => {
							old.serviceProductName = old.productName || old.projectName
							let name = old.typeName ? old.typeName.split('/')[0] : old.serviceTypeName
								.split('/')[0]
							old.yijiName = name
							if (name == ch.yijiName) {
								ch.checkdInfo.push(old)
								ch.checks.push(old.projectId)
							}
						})
					}
				})
			},
			// 获取微信右上角胶囊高度
			getHeight() {
				// #ifdef MP-WEIXIN
				let res = wx.getMenuButtonBoundingClientRect();
				this.titleHeight = res.top;
				this.menuButtonInfoWidth = res.width + 10

				// #endif
				// #ifndef MP-WEIXIN
				uni.getSystemInfo({
					success: res => {
						this.titleHeight = res.statusBarHeight + 10;
						this.menuButtonInfoWidth = 10
					}
				});
				// #endif
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
				new Promise(resolve => {
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
							//this.arr.push(rect.top)
							resolve();
						})
					}).exec()
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
			async swichMenu(index, name) {
				if (this.arr.length == 0) {
					//await this.getMenuItemTop();
				}
				if (index == this.current) return;
				this.scrollRightTop = this.oldScrollTop;
				this.$nextTick(function() {
					this.scrollRightTop = this.arr[index];
					this.current = index;
					this.leftMenuStatus(index);
					this.loadingRight = true
					this.query.type = name
					this.getList()


				})

			},
			checkChange(e, info) {
				console.log(info);
				if (this.isSearch) {
					// this.yijiName = yijiName
					this.current = this.yijiList.findIndex(item => {
						return item == info.yijiName
					})
				}
				// else{
				// 	var index=this.current
				// }
				if (e) {
					this.checksArr[this.current].checks.push(info.projectId)
					this.checksArr[this.current].checkdInfo.push(info)
				} else {
					let i = this.checksArr[this.current].checks.findIndex(item => {
						return item == info.projectId
					})
					this.checksArr[this.current].checks.splice(i, 1)
					this.checksArr[this.current].checkdInfo.splice(i, 1)
				}
				this.total = this.checksArr.reduce((pre, item) => {
					return pre + item.checks.length
				}, 0)
			},
			back() {
				uni.navigateBack()
			},
			//问题
			questionHandle(val, erji) {
				this.remark = {
					content: erji.remark,
					name: erji.projectName
				}
				uni.showModal({
					title: erji.projectName + '收费标准',
					content: erji.remark,
					showCancel: false,
					success: function(res) {
						if (res.confirm) {} else if (res.cancel) {}
					}
				});
				//this.showQestion = true


			},
			//搜索
			search() {
				if (this.typeSearch == '') {
					this.$refs.uToast.show({
						type: 'error',
						message: '搜索内容不能为空'
					});
				} else {
					this.isSearch = true
					// this.current=0
					this.loading = true
					this.searchList = []
					searchProject({
						search: this.typeSearch
					}).then(res => {
						this.checkss = []
						res.data.forEach((item, itemi) => {
							item.children != null && item.children.forEach((yiji, yijii) => {
								yiji.children != null && yiji.children.forEach(
									(erji, erjii) => {

										erji.serviceProjectVoList != null && erji
											.serviceProjectVoList.forEach(
												(sanji, sanjii) => {
													sanji.projectNumber = 1

													let index = this.yijiList.findIndex(
														itemm => {
															return itemm == item.typeName
														})
													// this.checkss.push(...item.checks)

													this.checksArr[index].checkdInfo.find(
														i => {
															if (i.projectId == sanji
																.projectId) {
																sanji.projectNumber = i
																	.projectNumber
																this.checkss.push(sanji
																	.projectId)
															}
														})
													// sanji.typeName = item.typeName
													sanji.yijiName = item.typeName
													sanji.img = sanji.projectImg != null ?
														sanji
														.projectImg
														.split(',') : []
													this.searchList.push(sanji)

												})
									})
							})
						})
						this.loading = false
					})

					//this.getList()
					// this.typesList.forEach((yiji, yijii) => {
					// 	if (this.typeSearch == yiji.typeName) {
					// 		this.swichMenu(yijii, yiji.typeName)
					// 	}
					// })
				}
			},

			clear() {
				this.typeSearch = ''
				this.loading = true
				this.isSearch = false
				this.query.type = this.yijiList[0]
				this.searchList = []
				this.optionList = this.checksArr
				this.getList()
				this.swichMenu(0, '')
			},
			//全选
			allCheckedHandle(arr, bool) {
				let arrs = []
				this.checksArr[this.current].checks = this.checksArr[this.current].checkdInfo = []
				arr.children != null && arr.children.forEach(item => {
					item.children != null && item.children.forEach(erji => {
						erji.serviceProjectVoList != null && erji.serviceProjectVoList.forEach(sanji => {
							if (bool) {
								arrs.push(sanji.projectId)
								this.checksArr[this.current].checks = arrs
								this.checksArr[this.current].checkdInfo.push(sanji)

							} else {
								let index = this.checksArr[this.current].checks.findIndex(c =>
									c === sanji.projectId)
								this.checksArr[this.current].checks.splice(index, 1)
								this.checksArr[this.current].checkdInfo.splice(index, 1)
							}
						})
					})

				})
				this.total = this.checksArr.reduce((pre, item) => {
					return pre + item.checks.length
				}, 0)

			},
			//查看备注
			watchRemark(item, bool) {
				if (bool) {
					item.checked = true
				} else {
					item.checked = false
				}
			},
			submit() {

				let arr = []
				this.checksArr.forEach(item => {
					arr = [...item.checkdInfo, ...arr]
				})

				const pages = uni.$u.pages();
				if (pages.some(p => p.route.includes('submitProgramme'))) {
					var pagess = getCurrentPages();
					var prevPage = pagess[pagess.length - 2]; //上一个页面
					let info = {
						checksArr: this.checksArr
					}
					prevPage.$vm.getProListHandle(info)
					uni.navigateBack()
				} else {
					let info = {
						checksArr: this.checksArr,
						type: '维修服务方案',
						newMelList: this.newMelList
					}
					uni.navigateTo({
						url: '../submitProgramme/submitProgramme?info=' + JSON.stringify(info)
					})
				}
			}
		}
	}
</script>



<style lang="scss" scoped>
	.selectProject {
		height: 100vh;
		overflow: hidden;

		.img-text {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background: #F4F4F4;
			border-radius: 10rpx;

			text {
				font-size: 19rpx;
				color: #F3B23E;
			}
		}

		::v-deep.u-loading-icon {
			margin-top: 80%;
		}

		.top {
			display: flex;
			width: 100%;
			// //height: 190rpx;
			background-color: #fff;
			// position: relative;
			align-items: center;
			padding-bottom: 20rpx;

		}

		.tips {
			padding:11px;
			background-color: #fff;
			text:first-child {
				font-weight: 600;
			}
			text:nth-child(2) {
				color: #aaaaaa;
			}

		}

		.main {


			.u-wrap {
				display: flex;
				flex-direction: column;
				/* #ifdef MP-WEIXIN */
				height: 73vh;
				/* #endif */
				/* #ifdef APP-PLUS */
				height: 70vh;
				/* #endif */
				/* #ifdef H5 */
				height:80vh;
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
				background: #F3B23E;
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




			.class-item:last-child {
				min-height: 100vh;
			}

			::v-deep.right-box {
				background: #FFFFFF;
				box-shadow: 0px 0px 4px 0px rgba(42, 64, 55, 0.05);
				border-radius: 14rpx;
				margin: 13rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.u-checkbox-group {
					width: 100% !important;
				}

				.u-collapse {
					width: 100%;
				}

				.u-collapse-item__content__text {
					// width: 100%;
					padding: 0 15rpx;
				}
			}

		}

		.bottom {
			width: 100%;
			// height: 217rpx;
			background: #fff;
			position: fixed;
			bottom: 0;
			z-index: 999;

			.btn-green {
				height: 85rpx;
				border-radius: 20rpx;
				text-align: center;
				line-height:85rpx;
				font-size: 36rpx;
				background: #F3B23E;
				color: #fff;
				margin: 30rpx;
			}


		}


	}
</style>