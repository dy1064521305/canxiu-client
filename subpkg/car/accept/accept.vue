<template>
	<view class="accept">
		<image v-for="(item,index) in urlImg " :key="index" @click="billViewImage(item)" :src="item"></image>

		<view class="btn-box">
			<view v-if="info.name=='服务验收'" class="btn quxiao" @click="back">
				取消
			</view>
			<view v-if="info.name=='服务验收'" class="btn queren" @click="sign">
				确认验收
			</view>
			<view v-if="info.name=='维修报告'&&urlImg.length!=0" class="btn queren" @click="pay">
				去支付
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

	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import {
		generateReports,
		acceptance
	} from '@/api/order.js'
	const {
		environment
	} = require('../../../config/environment')
	export default {
		data() {
			return {
				urlImg: [],
				info: {},
				popHeight: 100,
				showAccept: false, //弹出框
				cavShow: false, //canvas
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
				
			};
		},
		onLoad(option) {
			this.info = JSON.parse(option.info)
			uni.setNavigationBarTitle({
				title: this.info.name
			})
			uni.showLoading({
				mask: true
			});
			generateReports(this.info.id).then(res => {
				console.log(res);
				this.urlImg = res.data
				uni.hideLoading();
			})
			// #ifdef MP-WEIXIN
			this.popHeight = 97
			// #endif
		},
		methods: {
			billViewImage(e) {
				uni.previewImage({
					urls: this.urlImg,
					current: e,

				});
			},
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
			sign() {
				this.showAccept = true
				this.cavShow = true
				this.ctx = uni.createCanvasContext("handWriting");
				this.$nextTick(() => {
					uni.createSelectorQuery().select('.handCenter').boundingClientRect(rect => {
							console.log(rect);
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
										console.log(data);
										acceptance({
											sign: data.data.url,
											orderId: that.info.id
										}).then(res => {
											console.log(res);
											uni.showToast({
												title: '签字成功',
												duration: 2000,
											});
											that.retDraw()
											that.cavShow = false
											that.showAccept = false
										})

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
			//支付
			pay() {
				uni.navigateTo({
					url: '../pay/pay?item=' + encodeURIComponent(JSON.stringify(this.info.info))
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.accept {
		padding: 20rpx;

		image {
			width: 100%;
			height: 80vh;
		}

		.btn-box {
			display: flex;
			width: 100%;
			justify-content: space-evenly;
			align-items: end;
			margin: 20rpx 0;

			.btn {
				width: 335rpx;
				height: 91rpx;
				line-height: 91rpx;
				text-align: center;

				border-radius: 45rpx;
				font-size: 36rpx;


			}

			.quxiao {

				border: 4rpx solid #9FD6BA;
				background: #FFFFFF;
				color: #9FD6BA;
			}

			.queren {
				background: #9FD6BA;
				color: #FFFFFF;
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
				background: #9FD6BA;
				border-radius: 45rpx;
				text-align: center;
				line-height: 91rpx;
				color: #fff;
				transform: rotate(90deg);
			}
		}
	}
</style>
