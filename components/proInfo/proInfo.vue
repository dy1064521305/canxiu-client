<template>
	<view class="info-all">
		<u-checkbox-group v-model="checkboxValue1" placement="column">
			<view v-for="(item, index) in dataList" :key="index">

				<view class="check" >
					<view v-if="isCar" class="box">
						<view class="top">
							<view style="display: flex;">
								<u-checkbox v-if="submit&&isCar&&item.projectStatus!='1'" shape="circle" :name="item.id?item.id:item.projectId"
									activeColor='#A4D091' @change='val=>checkChange(val,item)'>
								</u-checkbox>
							</view>


							<view class="no-img" :style="{'background':item.imgList.length!=0?'':'#F4F4F4'}">
								<image v-if="item.imgList.length!=0"
									style="border-radius: 10rpx;width: 100%;height: 100%;" :src="item.imgList[0]">

								</image>
								<view v-else class="imgs">
									<image style="width:98rpx ;height: 68rpx;"
										src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/12/11/0cee8335a9f94b82aab54ebab36f524b.png"
										mode=""></image>
									<text>暂无图片</text>
								</view>

							</view>

							<view v-if="isCar" class="info-one">
								<view
									style="font-size: 29rpx;color: #3D3F3E;font-weight: bold;display: flex;justify-content: space-between;">
									<view :style="{'width':isDelete?'70%':''}"> {{item.serviceProductName}}</view>
									<view class="delete-btn" @click="deleteById(item.id)" v-if="isDelete">
										删除
									</view>
									<!-- 		<image   style="width: 100rpx;height: 35rpx;"
										src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/94862fc485714c92b1cff30a2bf71425.png">
									</image> -->
								</view>
								<!-- 	<view class="center">
									<view class="left">
									
										<view class="">
											{{item.serviceTypeName}}
										</view>
									</view>

								</view>-->
								<view class="bottom">
									<!-- 	<view class="left">
										工时:{{item.serviceTime}}小时

									</view> -->
									<view style="color: #EC5722;margin-right: 10rpx;font-size: 22rpx;">
										维修服务费:<text
											style="font-size: 40rpx;font-weight: bold;margin: 0 10rpx;">{{item.discountPrice}}</text>元
									</view>
									<view class="right">
										<u-number-box min='1' v-model="item.projectNumber" class='number'
											button-size="26px" color="#ffffff" bgColor="#A4D091"
											@change='val=>numChange(item,val,index)' iconStyle="color: #fff">
										</u-number-box>
									</view>
								</view>

							</view>



						</view>
						<!-- 	<view class="top-bottom" :style="{'padding-left':!submit?'165rpx':'209rpx'}">
							<view style="color: #EC5722;margin-right: 10rpx;font-size: 22rpx;">
								维修费:<text style="font-size: 40rpx;font-weight: bold;margin: 0 10rpx;">{{item.discountPrice}}</text>元
							</view>
							<view class="right">
								<u-number-box min='1' v-model="item.projectNumber" class='number' button-size="26px"
									color="#ffffff" bgColor="#A4D091" @change='val=>numChange(item,val,index)'
									iconStyle="color: #fff">
								</u-number-box>
							</view>
						</view> -->
						<view style="margin-top: 24rpx;
    padding-left: 10rpx;color: #EC5722;background-color: #ffede7;height: 58rpx;line-height: 58rpx;">
							<text>服务费用小计：</text>
							<text>¥{{Number(item.projectNumber)*Number(item.discountPrice)}}</text>
						</view>
						<view @click="openHandle(item,index)" style="display: flex;justify-content: center;margin: 20rpx 0;cursor: pointer;">
							{{!item.isOpen?'展开':'收起'}}报修详情<u-icon style="margin-left: 10rpx;" :name="!item.isOpen?'arrow-down':'arrow-up'" size="18"></u-icon>
						</view>
					</view>









					<view v-if="!isCar" class="info-two">
						<view
							style="font-size: 29rpx;color: #3D3F3E;font-weight: bold;display: flex;align-items: center;justify-content: space-between;">
							<view class="left">
								<!-- 
							<text v-if="!question"
								style="font-size: 22rpx;color: #EC5722;margin-right: 10rpx;">预估费用:</text> -->
								<text style="font-size:27rpx;">¥</text>
								<text
									style="	font-weight: bold;font-size: 38rpx;margin: 0 10rpx;">{{item.discountPrice}}</text>

								<view @click='questionHandle(item)' v-if="question" style="color:#A5A7A7 ;">
									...
								</view>
								<!-- 	<image 
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0b076ac258454779a88431fc8f26cb56.png"
								mode=""></image> -->
							</view>
							<!-- 	<image @click="deleteById(item.id)" v-if="isDelete" style="width: 145rpx;height: 69rpx;"
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/94862fc485714c92b1cff30a2bf71425.png">
							</image> -->
							<u-number-box min='0' disabledInput v-model="item.projectNumber" class='number'
								button-size="27" color="#ffffff" bgColor="#A4D091" :asyncChange="true"
								@change='val=>numChange(item,val,index)' iconStyle="color: #fff">
							</u-number-box>
						</view>
						<view class="bottom">

							<view class="price-info" v-if="item.preferentialPrice!=0">
								<view style="position: absolute;
    top: -20rpx;
    left: 17rpx;">
									<u-icon name="arrow-up-fill" color="#A4D091" size="18"></u-icon>
								</view>
								<view class="bottom">

									<view class="one">

										品牌折扣价
									</view>
									<view class="two">
										已省¥{{item.preferentialPrice}}
									</view>
								</view>


							</view>
						</view>
					</view>
				</view>
				<!--  ||!submit-->
				<!-- v-if="checkboxValue1.includes(item.id?item.id:item.projectId)||isCar" -->
				<view  v-if="item.isOpen" class="remark">
					<view>
						<view class="">
							<text style="color: red">*</text><text style="margin:0 30rpx 14rpx 10rpx;">上传视频/图片</text>
						</view>
						<view style="color: #A5A7A7;font-size: 22rpx;margin: 17rpx 0;">
							请上传1-9张现场环境或设备故障视频/图片信息
						</view>
						<view style="width: 100%;margin: 10.87rpx 0 28.99rpx 0;">
							<cl-upload :listStyle="{
							columnGap: '10rpx',
							columns:'4',
							rowGap:'10rpx'
							}" :imageFormData="{
								size:10
							}" :videoFromData="{
								size:10
							}" :index='index' v-model="item.projectImg" :headers="headers" :action="action" @onSuccess="onSuccesss"
								@input='onInput' :carId='item.id'></cl-upload>
							<!-- <upLoadFile :fileListt='item.projectImg' :limit='9' types='image' @getUrl='getUrl'
								:index='index' /> -->
						</view>
					</view>
					<!-- 	<view>
						<text style="margin-right: 30rpx;">上传视频</text>
						<view style="width: 78%;">
							<upLoadFile :fileListt='item.projectVideo' :limit='9' types='video' @getUrl='getUrl'
								:index='index' />
						</view>
					</view> -->
					<view style="align-items: center;">
						<view style="margin-bottom: 10rpx;">故障描述</view>
						<view style="font-size: 22rpx;color: #A5A7A7;">请简单描述故障或特殊需求备注信息</view>
						<view style='width: 100%'>
							<u--textarea height='72' border='none' maxlength='50' confirmType="done"
								v-model="item.remark" placeholder="请输入内容" count @input='textareaInput'></u--textarea>
						</view>
					</view>
				</view>

			</view>
		</u-checkbox-group>

		<u-popup mode="bottom" closeable :show="showQestion" :round="10" @close="showQestion=false">
			<view style="height: 400rpx;text-align: center;margin-top: 80rpx;">
				<view>
					{{remark.name}}收费标准
				</view>

				<view v-if="remark.content!=null" style="font-size: 29rpx;color: #A5A7A7;margin-top:40rpx;">
					<text>{{remark.content}}</text>
				</view>
			</view>
		</u-popup>


		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import upLoadFile from '../uploadFile/uploadFile.vue'
	import storage from '@/utils/storage'
	import {
		deleteCar
	} from '@/api/car.js'
	import {
		login
	} from '../../api/login';
	const {
		environment
	} = require('../../config/environment')
	export default {
		components: {
			upLoadFile
		},
		options: {
			styleIsolation: 'shared',
		},
		props: {
			list: {
				type: Array
			},
			isCar: {
				type: Boolean
			},
			submit: {
				type: Boolean,
				default: true
			},
			//是否显示问号
			question: {
				type: Boolean,
				default: false
			},
			isJoinCar: {
				type: Number
			},
			//是否显示删除
			isDelete: {
				type: Boolean
			},
			//是否是凑单页面
			isCoudan: {
				type: Boolean,
				default: false
			},
			//是购物车还是立即下单
			types: {
				type: String
			}
		},
		data() {
			return {
				action: environment.baseURL + '/system/oss/upload',
				headers: {
					token: storage.get('AccessToken')
				},
				accept: 'video',
				showQestion: false,
				checkboxValue1: [],
				isLogin: storage.get('AccessToken'),
				checkArr: [],
				remark: {},
				dataList: []
			};
		},
		watch: {
			list: {
				immediate: true,
				deep: true,
				handler: function(n) {
					console.log(n);
					this.dataList = uni.$u.deepClone(n)
					this.checkboxValue1 = n.filter(l => l.checked).map(l1 => l1.id)
					// console.log(this.checkboxValue1, 'this.checkboxValue1++++++++++++++140');
					// console.log(n);
					// console.log(this.dataList, this.isCar, 'this.dataListthis.dataList');
					this.dataList.forEach(item => {
						if (this.isCar) {
							//	console.log('139......', item);
							item.projectName = item.serviceProjectName ? item.serviceProjectName : item
								.projectName
						} else {
							console.log(item, '.......147...');
							item.shuoming = item.remark
							item.remarks = item.remarks || ''
							item.projectNumber = (item.projectNumber === undefined || item.projectNumber ===
								0) ? 0 : item.projectNumber
							//		console.log(1111);
						}
						item.isOpen=false
						//	console.log(item);
						item.imgList = item.serviceProjectImg !== null && item.serviceProjectImg !== '' ? item
							.serviceProjectImg.split(',') : [],
							console.log(item);
						item.projectImg = item.projectImg != '' && !Array.isArray(item.projectImg) ? item
							.projectImg.split(',') : Array.isArray(item.projectImg) ? item.projectImg : []
						//console.log(item.projectVideo);
						// item.projectVideo = item.projectVideo != '' && item.projectVideo != undefined && !Array
						// 	.isArray(item.projectVideo) ?
						// 	item.projectVideo.split(',') : Array.isArray(item.projectVideo) ? item
						// 	.projectVideo : []
					})


				}

			},

			isJoinCar: {
				handler: function() {
					console.log(this.checkboxValue1);
					console.log(this.dataList);
					let arr = [];
					arr = this.dataList.filter(item => this.checkboxValue1.includes(item.id ? item.id : item
						.projectId))
					console.log(arr);
					let query = {
						list: arr,
						type: this.types
					}
					this.$emit('joinCarHandle', query)
				}

			},

		},
		methods: {
			checkChange(val, item) {
				console.log(val, item);
				if (val) {
					this.checkboxValue1.push(item.id)
				} else {
					let index = this.checkboxValue1.findIndex(check => check === item.id)
					this.checkboxValue1.splice(index, 1)
				}

				this.$emit('check_change', {
					value: val,
					item: item
				})
				// let arr=this.checkArr
				// if(val){
				// 	arr.push(item)
				// }else{
				// 	arr.forEach((i,index)=>{
				// 		if(i.id==item.id){
				// 			arr.splice(index,1)
				// 		}
				// 	})
				// }
				// this.checkArr=arr
				// console.log(this.checkArr,'aaaaaaaaaa');
			},
			numChange(item, value, i) {
				console.log('207...', item, value, this.dataList);
				if (item.projectImg.length == 0 && !this.isCar && !this.isCoudan) {
					this.$refs.uToast.show({
						type: 'error',
						message: '请先上传图片/视频'
					});

					return
				}
				console.log(value.value, item.projectNumber);
				let flag = value.value < item.projectNumber ? -1 : 1
				item.projectNumber = value.value
				let obj = item
				console.log(item.projectNumber);
				this.$set(this.dataList, i, obj)
				this.$emit('getCheck', {
					item: item,
					num: value,
					flag: flag
				})


			},
			// //预览图片
			// previewImage(list) {
			// 	uni.previewImage({
			// 		urls: list,
			// 		current: 0
			// 	});
			// },
			onSuccesss(reslut) {
				console.log(reslut);
				let index = reslut.data.index
				console.log(this.dataList[index].projectImg);
				this.dataList[index].projectImg.push(reslut.data.url)
				this.$emit('getDeleteUrlList', this.dataList)
			},
			onInput(data) {
				console.log(data);
				this.dataList[data.index].projectImg = data.list
				this.$emit('getDeleteUrlList', this.dataList)
			},
			// getUrl(val) {
			// 	console.log(val, '.....val......227');
			// 	val.type == 'video' ? this.dataList[val.index].projectVideo = val.urls : this.dataList[val.index]
			// 		.projectImg = val
			// 		.urls
			// 	//this.isCar ? this.$emit('submitOrder', this.list) : ''
			// 	console.log(this.dataList, '.......230');
			// 	this.$emit('getDeleteUrlList', this.dataList)
			// },
			//删除
			deleteById(id) {
				uni.showModal({
					title: '删除',
					content: '确定要删除吗？',
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							console.log(res);
							console.log(id);
							let arr = []
							arr.push(id)
							deleteCar(arr).then(res => {
								console.log(res);
								if (res.code === 200) {
									uni.showToast({
										title: '删除成功',
										duration: 2000
									});
									this.$emit('deleteCarList', arr)
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}

					}
				});

			},

			//问题
			questionHandle(item) {
				this.remark = {
					content: item.shuoming,
					name: item.projectName
				}
				this.showQestion = true

			},
			textareaInput() {
				uni.$u.debounce(() => this.$emit('textareaInput', this.dataList), 200)
			},
			openHandle(item,i){
				console.log(item,i);
				// this.$set(this.dataList[i],'isOpen',true)
				 item.isOpen=!item.isOpen
				this.$forceUpdate()
			}

		}
	}
</script>

<style lang="scss">
	.info-all {
		.check {
			//height: 144rpx;
			// padding: 14rpx;
			display: flex;
			// border-top: 2rpx solid #F8F8F8;


			.box {
				width: 100%;
				padding: 0 28rpx;

				.top {
					display: flex;
					width: 100%;
					height: 156rpx;

					.no-img {
						width: 156rpx;

						border-radius: 11rpx;

						.imgs {
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							height: 100%;

							text {
								font-size: 21rpx;
								color: #A4D091;
							}
						}


					}

				}

				.top-bottom {
					display: flex;
					margin-top: 27rpx;

					justify-content: space-between;
					align-items: baseline;
				}
			}

		}


		.info-two {
			padding: 28.99rpx;
			width: 100%;

			.left {
				display: flex;
				align-items: center;
				width: 70%;
				color: #EC5722;
				font-weight: bold;
				font-size: 38rpx;

				image {
					width: 36rpx;
					height: 36rpx;
					margin-left: 10rpx;
				}
			}

			.bottom {
				margin-top: 10rpx;


				.price-info {
					position: relative;

					.bottom {
						display: flex;
						margin-top: 15rpx;

						.one,
						.two {
							padding: 2rpx 15rpx;
							font-size: 24rpx;
						}

						.one {

							background-color: #A4D091;
							color: #fff;
							z-index: 1;
						}

						.two {
							color: #A4D091;
							border: 2rpx solid #A4D091;
						}
					}

				}


			}

		}

		::v-deep.u-textarea {
			background: rgba(165, 167, 167, 0.05);
			margin-top: 10.87rpx;
		}

		::v-deep.u-textarea__count {
			background: rgba(165, 167, 167, 0.05) !important;
		}

		.info-one {
			padding-left: 10rpx;
			width: 75%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.delete-btn {
				background-color: #ec5722;
				color: #fff;
				text-align: center;
				width: 103rpx;
				height: 48rpx;
				line-height: 48rpx;
				border-radius: 28rpx;
				font-size: 26rpx;
			}

			.center {

				font-size: 24rpx;
				color: #969696;

			}

			.center,
			.bottom {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.bottom {
				.left {
					font-size: 24rpx;
					color: #969696;
				}

			}

		}

		.remark {
			font-size: 29rpx;
			color: #3D3F3E;
			font-weight: bold;
			padding: 20rpx 28rpx;


		}
	}
</style>