<template>
	<view class="accept">
		<!-- <image v-for="(item,index) in urlImg " :key="index" @click="billViewImage(item)" :src="item"></image> -->
		<view class="bg info">
			<view class="title">
				服务信息
			</view>
			<view class="line">
				<text class="ziduan">报修门店</text>
				<text>{{info.info.warrantyStore}}</text>
			</view>
			<view class="line">
				<text class="ziduan">预约上门时间</text>
				<text>{{info.info.expectTime}}</text>
			</view>
			<view class="line">
				<text class="ziduan">服务地址</text>
				<text>{{info.info.addressVo.addressRegion}}{{info.info.addressVo.addressDetailed}}</text>

			</view>
			<view class="line">
				<text class="ziduan"></text>
				<text>{{info.info.addressVo.contact}} {{info.info.addressVo.phone}}</text>

			</view>
		</view>


		<view class="bg info">
			<view class="title">
				订单信息
			</view>
			<view class="line">
				<text class="ziduan">订单编号</text>
				<text>{{info.info.orderNumber}}</text>
			</view>
			<view class="line">
				<text class="ziduan">订单类型</text>
				<text>维修</text>
			</view>

			<view class="line">
				<text class="ziduan">下单时间</text>
				<text>{{info.info.orderTime}}</text>
			</view>
		</view>

		<view class="project bg">
			<view v-if="JSON.stringify(info.newProject)!='[]'" style="font-size: 33rpx;font-weight: bold;">
				原维修方案
			</view>
			<view v-for="(item,index) in info.info.projectDataVoList" :key="index" style="margin: 15rpx 0;">
				<project-card :pro='item' />
				<view class="info-box">
					<view class="font">
						图片/视频
					</view>
					<view>
						<cl-upload :listStyle="{
					columnGap: '10rpx',
					columns:'3',
					rowGap:'10rpx'
					}" :imageFormData="{
						size:10
					}" :videoFromData="{
						size:10
					}" :index='index' v-model="item.projectImg" :add="false" :remove="false"></cl-upload>
						<!-- <upLoadFile :fileListt='item.projectVideo' types='video' :index='index' :isDel='false' /> -->
					</view>
				</view>
				<view v-if="item.remark!=''" class="info-box">
					<view class="font">
						订单备注
					</view>
					<view class="right" style="color: #707271;">
						{{item.remark}}
					</view>
				</view>
			</view>


		</view>

		<view v-if="JSON.stringify(info.newProject)!='[]'||JSON.stringify(info.showMelList)!='[]'" class="bg">
			<view v-if="JSON.stringify(info.newProject)!='[]'" class="projec">
				<view style="font-size: 33rpx;font-weight: bold;">
					变更后服务项<image style="width: 62rpx;height: 27rpx;margin-left: 20rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/04/02/2657cdc6a3624dc58270db3fb924ff47.png">
					</image>
				</view>
				<!--  -->
				<view style="margin: 15rpx 0;" v-for="(item,index) in info.newProject" :key="index">
					<project-card :pro='item' />
				</view>
			</view>
			<view v-if="JSON.stringify(info.showMelList)!='[]'" class="info">
				<view class="mel-title">
					<text>维修材料</text>
					<!-- 	<text style="font-size: 33rpx;color: #EC5722;">¥{{melTotal}}</text> -->
				</view>
				<view v-for="(mel,mi) in info.showMelList" :key="mi">
					<view style="font-weight: bold;margin-top: 20rpx;">
						{{mel[0].classifyName}}
					</view>
					<view v-for="(chi,chii) in mel" :key="chii">
						<view style="display: flex;margin-top: 20rpx;">
							<u-image v-if="chi.img" radius='10rpx' width="140rpx" height="100%" :src="chi.img">
							</u-image>
							<view
								style="height: 100%;display: flex;flex-direction: column;justify-content: space-evenly;width: 100%;margin-left: 20rpx;">
								<view style="width: 100%;">
									<view>
										{{chi.materialName}}
									</view>
									<view
										style="display: flex;justify-content: space-between;color: #A5A7A7;margin-top: 10rpx;">
										<text v-if="chi.materialSpecsList==null" style="margin-right: 10rpx;">无</text>
										<text v-else style="margin-right: 10rpx;"
											v-for="(gui,gi) in chi.materialSpecsList" :key="gi">{{gui}}</text>
										<text> x{{chi.materialCount}}</text>
									</view>
								</view>
								<view
									style="width: 100%;display: flex;justify-content: space-between;margin-top: 10rpx;">
									<view>
										¥{{chi.salePrice?chi.salePrice:chi.materialPrice}}</view>
									<view>
										小计：¥{{Number(chi.salePrice?chi.salePrice:chi.materialPrice)*Number(chi.materialCount)}}
									</view>
								</view>


							</view>
						</view>


					</view>
				</view>

			</view>
		</view>
		<view class="bg info" style="margin-top: -20rpx;">
			<view class="title" style="display: flex;justify-content: space-between;align-items: center;">
				<view class="">
					订单费用
				</view>
				<view class="img"
					v-if="Number(info.info.startingFree)-(info.info.additionalPrice!=null?Number(info.info.orderPrice)-Number(info.info.additionalPrice):Number(info.info.orderPrice))>=0">
					<u-icon name="info-circle-fill" color="#faad14" size="22"></u-icon>
					未达标按起步价收取
				</view>
				<view
					v-if="Number(info.info.startingFree)-(info.info.additionalPrice!=null?Number(info.info.orderPrice)-Number(info.info.additionalPrice):Number(info.info.orderPrice))<0"
					class="img">
					<image style="width: 35rpx;height: 35rpx;margin-right: 10rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/cfc57172d7654b4ea531302d3592eca3.png">
					</image>已达到起步价
				</view>
			</view>
			<view class="line">
				<text class="ziduan">起步价</text>
				<text v-if="info.info.startingFree!=null">¥{{info.info.startingFree}}</text>
			</view>
			<view class="line">
				<text class="ziduan">工时费</text>
				<text style="text-decoration:line-through"
					v-if="info.info.servicePrice!=null">¥{{info.info.servicePrice}}</text>
			</view>
			<view class="line">
				<text class="ziduan">加急费</text>
				<text>¥{{info.info.additionalPrice!=null?info.info.additionalPrice:0}}</text>
			</view>
			<view v-if="info.info.materialPrice!=null" class="line">
				<text class="ziduan">材料费</text>
				<text>¥{{info.info.materialPrice}}</text>
			</view>
			<view class="line">
				<text class="ziduan">小计：</text>

				<text
					style="color: #EC5722;">¥{{(info.info.additionalPrice!=null?Number(info.info.additionalPrice):0)+(info.info.materialPrice!=null?Number(info.info.materialPrice):0)+Number(info.info.servicePrice)}}</text>
			</view>
			<view v-if="info.info.favorablePrice!=0&&info.info.favorablePrice!=null"
				style="margin-left: 20rpx;color: #A5A7A7;" class="line">
				<text class="ziduan">品牌折扣：</text>
				<text style="color: #EC5722;">-¥{{info.info.favorablePrice}}</text>
			</view>
			<view class="line">
				<text class="ziduan">合计</text>
				<!-- info.additionalPrice!=null?Number(info.additionalPrice)+Number(info.preferentialPrice):Number(info.preferentialPrice) -->
				<text style="color: #EC5722;">¥{{info.info.orderPrice}}</text>
			</view>
		</view>
		<view v-if="info.info.deliveryVo" class="bg project">
			<view class="title">
				维修详情
			</view>
			<view class="info-box">
				<view class="font">
					图片
				</view>
				<view>
					<upLoadFile
						:fileListt='info.info.deliveryVo.deliveryImg!=null?info.info.deliveryVo.deliveryImg.split(",") : []'
						types='image' :isDel='false' :isInfo='true' />
				</view>
			</view>
			<view class="info-box">
				<view class="font">
					订单备注
				</view>
				<view>
					{{info.info.deliveryVo.remark}}
				</view>
			</view>
		</view>

		<view v-if="signUrl!=''&&signUrl!=null" class=" title"
			style="display: flex;background-color: #fff;padding: 10rpx 28rpx;justify-content: space-between;">
			<view style="width: 25%;">
				客户签名：
			</view>
			<view style="width: 70%;">

				<img :style="{'transform':'rotate(-90deg)','width':big?'100%':'14%','height':big?'477rpx':'121rpx'}"
					:src="signUrl" alt="">
			</view>
			<view @click="big=!big">
				<img style='width:50rpx ;height: 50rpx;' v-if="big"
					src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/09/4497ca4f26e54c58871233a2170aa148.png"
					alt="">
				<img style='width:50rpx ;height: 50rpx;' v-else
					src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/09/83c8f89a91b442d8bdcf0358466df5e7.png"
					alt="">
			</view>
		</view>



		<view class="btn-box">
			<view v-if="info.name=='服务验收'" class="btn quxiao" @click="back">
				取消
			</view>
			<view v-if="info.name=='服务验收'" class="btn queren" @click="sign">
				确认验收
			</view>
			<view v-if="info.type=='待支付'" class="btn queren" @click="pay">
				去支付
			</view>
			<view v-if="info.name=='维修报告'" class="btn queren" @click="showDownLoad=true">
				下载
			</view>
		</view>

		<!-- 下载 -->
		<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect' :closeOnClickOverlay='false'
			:actions="actionList" :show="showDownLoad"></u-action-sheet>

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
	import projectCard from '@/components/projectCard/projectCard.vue'
	import upLoadFile from '../../../components/uploadFile/uploadFile.vue'
	const {
		environment
	} = require('../../../config/environment')
	export default {
		components: {
			projectCard,
			upLoadFile
		},
		data() {
			return {
				actionList: [{
						name: '图片'
					},
					{
						name: '取消'
					},
				], //拨打电话
				showDownLoad: false,
				big: false, //签名放大
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
				signUrl: '', //签字图片
			};
		},
		onLoad(option) {
			this.info = JSON.parse(option.info)
			console.log(this.info);
			this.signUrl = this.info.info.sign
			uni.setNavigationBarTitle({
				title: this.info.name
			})
			uni.showLoading({
				title: '生成中',
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
										that.signUrl = data.data.url
										console.log();
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
											let pages = getCurrentPages()
											let prevPage = pages[pages.length - 2]
											prevPage.$vm.acceptRefresh()
											uni.navigateBack()
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
			//下载
			actionSelect(e) {
				console.log(e);
				let phone = '19157668838'
				if (e.name == '取消') {
					this.showDownLoad = false
				} else {
					console.log(this.urlImg);
					let that=this
					that.urlImg.forEach((img,index) => {
						uni.saveImageToPhotosAlbum({
							filePath: img,
							success: function() {
								if ((index+1)==that.urlImg.length) {
									uni.showToast({
										title: '保存成功',
										duration: 2000,
										icon: 'success'
									});
								}
								console.log('save success');
							}
						});
					})

					that.showDownLoad = false
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.accept {
		// padding: 20rpx;

		.bg {
			background: #FFFFFF;
			padding: 20rpx 30rpx;
			margin-top: 20rpx;
		}

		.title {
			font-size: 31rpx;
			color: #3D3F3E;
			font-weight: bold;

			.img {
				align-items: center;
				display: flex;
				font-size: 24rpx;

			}
		}

		.project {
			.info-box {
				margin-top: 20rpx;
				display: flex;

				.font {
					width: 20%;
					font-size: 29rpx;
					font-weight: bold;
					color: #3D3F3E;
				}

				.right {
					width: 80%;
				}
			}

		}


		.info {
			.mel-title {
				height: 72rpx;
				line-height: 72rpx;
				font-weight: bold;
				background: rgba(159, 214, 186, 0.2);
				padding: 0 20rpx;
			}

			.line {
				margin-top: 15rpx;
				font-size: 29rpx;
				color: #3D3F3E;

				text:first-child {
					width: 28%;
					display: inline-block;
				}

				text:nth-child(2) {
					width: 72%;
					display: inline-block;
					text-align: end;
					color: #A5A7A7;
					vertical-align: text-top;
				}
			}
		}

		// image {
		// 	width: 100%;
		// 	height: 80vh;
		// }

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

				border: 4rpx solid #A4D091;
				background: #FFFFFF;
				color: #A4D091;
			}

			.queren {
				background: #A4D091;
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
				background: #A4D091;
				border-radius: 45rpx;
				text-align: center;
				line-height: 91rpx;
				color: #fff;
				transform: rotate(90deg);
			}
		}
	}
</style>
