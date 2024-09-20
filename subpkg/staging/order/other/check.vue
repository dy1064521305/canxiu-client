<template>
	<view class="page">
		<view class="sign">
			<view class="sign-top acea-row row-between-wrapper" @click="opneSign">
				请签名
				<view class="sign-top-agen acea-row row-middle">
					重新签名
					<text class="iconfont icon-iconmore-copy"></text>
				</view>
			</view>
			<view class="sign-bottom acea-row row-center-wrapper">
				<view v-if="signUrl!=null&&signUrl!=''" style=" width: 100%; text-align: center;">
					<img :style="{'transform':'rotate(-90deg)','width':'20%','height':'141rpx'}" :src="signUrl" alt="">
				</view>
				<text v-else>请点击此区域进行签名</text>
			</view>
		</view>
		<view class="page-all">
			<view class="page-all-over flex-colum">
				<view class="name">服务完工图片</view>
				<text class="type">装修维修/打胶/打胶</text>
				<view style="margin-top:20rpx;">
					<cl-upload
						:listStyle="{columnGap: '10rpx',columns:'6',rowGap:'10rpx',height:'110rpx',width:'110rpx'}"
						:imageFormData="{size:10}" :videoFromData="{size:10}" v-model="projectImg" :add="false"
						:remove="false">
					</cl-upload>
				</view>
			</view>
		</view>
		<view class="page-all">
			<view class="page-all-name acea-row  row-between-wrapper">
				订单信息
			</view>
			<view class="page-all-pro" v-for="(item,i) in 2" :key="i">
				<view class="page-all-pro-list acea-row">
					<view class="top justify-between">
						<text>#1服务下单数量*下单数量</text>
						<text>服务费：¥151</text>
					</view>
					<view style="margin-top:20rpx;">
						<cl-upload
							:listStyle="{columnGap: '10rpx',columns:'4',rowGap:'10rpx',height:'110rpx',width:'110rpx'}"
							:imageFormData="{size:10}" :videoFromData="{size:10}" v-model="projectImg" :add="false"
							:remove="false">
						</cl-upload>
					</view>
					<view class="page-all-pro-list-mark">
						订单备注
						<view class="page-all-pro-list-mark-m">
							周TE2408250015门店这种缝隙没有玻璃胶，需要打玻璃胶，避免蟑螂和异味
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 验收 -->
		<u-popup :show="showAccept" @close="popupClose" closeable>
			<view :style="{'height':popHeight+'vh'}">
				<view class="acceptMask">
					<view class="font">
						确认验收签字
					</view>
					<view class="handCenter">
						<view class="fontt">
							<text style="color: #A5A7A7;">请手写签名确认</text>
						</view>
						<canvas v-if="cavShow" class="handWriting" :disable-scroll="true" @touchstart="uploadScaleStart"
							@touchmove="uploadScaleMove" canvas-id="handWriting"></canvas>
						<view class="image">
							<image @click="retDraw"
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/09/b45cb670cda941bab45e6146ae1619bf.png"
								style="width:40rpx ;height: 27rpx;"></image>
						</view>
					</view>
					<view class="btn" @click="subCanvas">
						确认同意
					</view>
				</view>
			</view>
		</u-popup>
		<view class="button acea-row row-between-wrapper">
			<view class="btn">确认验收</view>
		</view>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import {
		base64ToPath
	} from '@/js_sdk/mmmm-image-tools/index.js'
	import {
		generateReports,
		acceptance
	} from '@/api/order.js'
	import projectCard from '@/components/projectCard/projectCard.vue'
	import upLoadFile from '@/components/uploadFile/uploadFile.vue'
	const {
		environment
	} = require('@/config/environment')
	export default {
		data() {
			return {
				projectImg: [
					'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/10/388529faf0fe452580bf96f954c128f1.png',
					'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/10/388529faf0fe452580bf96f954c128f1.png',
					'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/10/388529faf0fe452580bf96f954c128f1.png',
				],
				popHeight: 100,
				showAccept: false, //弹出框
				cavShow: false,
				canvasName: 'handWriting',
				ctx: '',
				startX: null,
				startY: null,
				canvasWidth: '0',
				canvasHeight: '0',
				selectColor: 'black',
				lineColor: '#1A1A1A', // 颜色
				lineSize: 5, // 笔记倍数
				item: undefined,
				count: undefined,
				signUrl: '', //签字图片
			}
		},
		onLoad() {
			// #ifdef MP-WEIXIN
			this.popHeight = 97
			// #endif
		},
		methods: {
			//签字版关闭
			popupClose() {
				this.cavShow = false
				this.showAccept = false
			},
			//取消
			back() {
				uni.navigateBack()
			},
			// 笔迹开始
			uploadScaleStart(e) {
				this.startX = e.changedTouches[0].x
				this.startY = e.changedTouches[0].y
				//设置画笔参数
				//画笔颜色
				this.ctx.setStrokeStyle(this.lineColor)
				//设置线条粗细
				this.ctx.setLineWidth(this.lineSize)
				//设置线条的结束端点样式
				this.ctx.setLineCap("round") //'butt'、'round'、'square'
				//开始画笔
				this.ctx.beginPath()
			},
			// 笔迹移动
			uploadScaleMove(e) {
				//	console.log(e);
				//取点
				let temX = e.changedTouches[0].x
				let temY = e.changedTouches[0].y
				//画线条
				this.ctx.moveTo(this.startX, this.startY)
				this.ctx.lineTo(temX, temY)
				this.ctx.stroke()
				this.startX = temX
				this.startY = temY
				this.ctx.draw(true)
			},
			//验收
			opneSign() {
				this.showAccept = true
				this.cavShow = true
				this.ctx = uni.createCanvasContext("handWriting");
				this.$nextTick(() => {
					uni.createSelectorQuery().select('.handCenter').boundingClientRect(rect => {
							this.canvasWidth = rect.width;
							this.canvasHeight = rect.height;
							/* 将canvas背景设置为 白底，不设置  导出的canvas的背景为透明 */
							this.setCanvasBg('#fff');
						})
						.exec();
				});
			},
			//设置canvas背景色  不设置  导出的canvas的背景为透明
			//@params：字符串  color
			setCanvasBg(color) {

				/* 将canvas背景设置为 白底，不设置  导出的canvas的背景为透明 */
				//rect() 参数说明  矩形路径左上角的横坐标，左上角的纵坐标, 矩形路径的宽度, 矩形路径的高度
				//这里是 canvasHeight - 4 是因为下边盖住边框了，所以手动减了写
				this.ctx.rect(0, 0, this.canvasWidth, this.canvasHeight - 4);
				// ctx.setFillStyle('red')
				this.ctx.setFillStyle(color);
				this.ctx.fill(); //设置填充
				this.ctx.draw(); //开画
			},

			/**
			 * 重写
			 */
			retDraw() {
				this.ctx.clearRect(0, 0, 700, 730);
				this.ctx.draw();
				//设置canvas背景
				this.setCanvasBg('#fff');
			},
			//完成
			subCanvas() {
				let that = this;
				let length = this.ctx.subpath.length;

				if (length !== 2) {
					uni.showToast({
						title: '未检测到您签字',
						duration: 2000,
						icon: 'error'
					});
				} else {
					let key = this.item;

					uni.canvasToTempFilePath({
						canvasId: 'handWriting',
						fileType: 'png',
						quality: 1, //图片质量
						success(res) {
							uni.uploadFile({
								url: environment.baseURL + '/system/oss/upload',
								filePath: res.tempFilePath,
								name: 'file',
								header: {
									Authorization: "Bearer " + storage.get('AccessToken')
								},
								success: res => {
									let data = JSON.parse(res.data);
									if (data.code == 200) {
										that.signUrl = data.data.url
										console.log(that.signUrl, "that.signUrl ");
										uni.showToast({
											title: '签字成功',
											duration: 2000,
										});
										that.retDraw()
										that.cavShow = false
										that.showAccept = false
										// acceptance({
										// 	sign: data.data.url,
										// 	orderId: that.info.id,
										// 	repairId: that.info.repairId ? that.info.repairId :
										// 		undefined
										// }).then(res => {
										// 	uni.showToast({
										// 		title: '签字成功',
										// 		duration: 2000,
										// 	});
										// 	that.retDraw()
										// 	that.cavShow = false
										// 	that.showAccept = false
										// 	if (!that.info.repairId) {
										// 		let pages = getCurrentPages()
										// 		let prevPage = pages[pages.length - 2]
										// 		prevPage.$vm.acceptRefresh()
										// 	}
										// 	uni.navigateBack()
										// })

									}
								}
							});
						},
						fail(res) {
							uni.showToast({
								title: '签字失败',
								duration: 2000,
								icon: 'error'
							});
						}
					});
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;
		font-size: 28rpx;

		.sign {
			background: #FFFFFF;
			padding: 24rpx;
			margin: 24rpx 0;

			&-top {
				&-agen {
					font-size: 24rpx;
					color: #1981F9;
				}
			}

			&-bottom {
				height: 152rpx;
				border-radius: 4rpx;
				border: 1rpx dashed #999999;
				margin-top: 20rpx;
				font-size: 24rpx;
				color: #999999;
				padding: 14rpx;
			}

		}

		&-all {
			background-color: #FFFFFF;
			margin-bottom: 20rpx;
			font-size: 28rpx;

			&-over {
				padding: 24rpx;

				.type {
					color: #999;
					font-size: 24rpx;
					margin-top: 10rpx;
				}
			}

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

			&-name {
				font-size: 32rpx;
				margin: 0rpx 0 0rpx 24rpx;
				padding-top: 24rpx;

			}

			&-pro {
				padding: 24rpx;
				margin-bottom: 10rpx;
				background-color: #fff;
				border-bottom: 1rpx solid #f5f5f5;



				&-list {
					margin-bottom: 10rpx;

					.top {
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

	.acceptMask {
		display: flex;
		flex-direction: row-reverse;
		margin-top: 60rpx;
		width: 100%;
		height: 93vh;
		position: relative;

		.font {
			position: absolute;
			top: 100rpx;
			right: -50rpx;
			font-weight: 600;
			transform: rotate(90deg);
		}

		.handCenter {
			position: relative;
			top: -26rpx;
			right: 100rpx;
			width: 65%;
			height: 100%;
			border-radius: 14rpx;
			border: 2px solid #A5A7A7;
			display: flex;
			flex-direction: row-reverse;

			.fontt {
				position: absolute;
				top: 100rpx;
				right: -70rpx;
				z-index: 8;
				transform: rotate(90deg);
			}

			.image {
				position: absolute;
				bottom: 24rpx;
				left: 16rpx;
				transform: rotate(90deg);
			}

			.handWriting {

				width: 100%;
				height: 93vh;
			}

		}

		.btn {
			position: absolute;
			top: 600rpx;
			left: -250rpx;
			font-size: 36rpx;
			font-weight: 500;
			width: 663rpx;
			height: 91rpx;
			background: #A4D091;
			border-radius: 45rpx;
			text-align: center;
			line-height: 91rpx;
			color: #fff;
			transform: rotate(90deg);
		}
	}

	.button {
		background-color: #fff;

		padding: 24rpx 24rpx 40rpx;

		.btn {
			width: 100%;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			background: $pageColor;
			border-radius: 16rpx;
			border: 1rpx solid $pageColor;
			color: #fff;
		}
	}
</style>