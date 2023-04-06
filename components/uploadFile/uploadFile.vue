<template>
	<view>
		<view class="bg-img">

			<view v-if="types=='video'" v-for="(item, index) in billImgList" :key="index">
				<view style="position: relative;margin:5rpx;">

					<view style="width: 125rpx;height: 125rpx;">
						<video style="width: 100%;height:100%" v-if="types=='video'" id="myVideo" :src="item"
							:show-center-play-btn="true" :enable-play-gesture="true" controls loop class="p-video"
							show-fullscreen-btn>
						</video>
					</view>

					<view v-if="isDel" style="position: absolute;top: 0; right: 0;">
						<image style="width: 40rpx;height: 40rpx;" @tap.stop="billDelImg" :data-index="index"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/25/067d6e5b8f6a4b9c8362040b84e5a03a.png"
							></image>
					</view>

				</view>

			</view>



			<view v-if="types=='image'&&index<2" v-for="(item, index) in billImgList" :key="index" @tap="billViewImage"
				:data-url="billImgList[index]">
				<view style="position: relative;margin-right:10rpx;">
					<image style="width: 125rpx;border-radius:14rpx;height: 125rpx;" :src="item">
					</image>

					<view v-if="isDel" style="position: absolute;top: 0; right: 0;">
						<image style="width: 40rpx;height: 40rpx;" @tap.stop="billDelImg(index)" :data-index="index"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/25/067d6e5b8f6a4b9c8362040b84e5a03a.png"
							></image>
					</view>

				</view>
			</view>

			<!-- :style="{ background: `url(${billImgList[1]})`,width:'125rpx',height:'125rpx',borderRadius:'14rpx' }" -->
			<view style="position:relative;" v-if="types=='image'&&billImgList.length > 2">
				<!-- 	<view style="text-align: center;padding-top: 80rpx;">
					+{{ billImgList.length - 1 }}
				</view> -->
				<image style="width: 125rpx;border-radius:14rpx;height: 125rpx;" :src="billImgList[2]">
					<view class="mask" @tap="billViewImage" :data-url="billImgList[2]">
						<view style="padding-left:44rpx">
							+{{ billImgList.length - 2 }}
						</view>
					</view>
				</image>

			</view>


			<view @tap="billChooseImage" v-if="billImgList.length < limit">
				<image style="width: 125rpx;height: 125rpx;"
					:src="isOrder&&types=='image'?imageUrl:isOrder&&types=='video'?videoUrl:otherUrl">
				</image>
			</view>

			<u-overlay opacity='1' :show="showsImg" @click="showsImg=false">
				<view style="position: absolute;z-index: 9999;display: flex;top: 150rpx;align-items: center;width: 100%;">
				
					<view style="color:#fff;width: 41%;padding-left:370rpx;">
						{{indexx+1}}/{{billImgList.length}}
					</view>
					<view @click.stop='billDelImg(indexx)' v-if='!isInfo'>
						<u-icon name="trash" color="#ccc" size="28"></u-icon>
					</view>
					
				</view>
				<swiper @change='swiperChange' style="height: 100%;">
					<swiper-item style="display: flex;align-items: center;" v-for="(item,index) in billImgList" :key="index">
							<image style="width: 100%;" :src="item" mode='widthFix'></image>
					</swiper-item>


				</swiper>
			</u-overlay>
			<!-- 	<view :style="{'width':'100vw','margin-top':'250rpx'}" @tap.stop>
					<view style="color:#fff;position: absolute;top:50rpx;left: 48%;">
						{{indexx+1}}/{{billImgList.length}}
					</view>
						<image style="width: 100%;height:100%" :src="billImgList[0]" ></image>
			
				</view> -->


			<u-toast ref="uToast"></u-toast>
		</view>

	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import {
		delossByurl
	} from '@/api/oss.js'
	const {
		environment
	} = require('../../config/environment')
	export default {
		props: {
			fileListt: {
				type: Array,
			},
			limit: {
				type: Number
			},
			types: {
				type: String,
			},
			index: {
				type: Number
			},
			isDel: {
				type: Boolean,
				default: true
			},
			isOrder: {
				type: Boolean,
				default: false
			},
			//是否是详情就不显示删除按钮
			isInfo:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				indexx: 0,
				swiperHeight: '0px',
				showsImg: false,
				billImgList: [],
				urls: [],
				//billImgList: [],
				otherUrl: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/25/90db8b3c2cb341fca89284d3f08214f4.png',
				imageUrl: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/06/44b24e8072e4498aae3e51a3602a313d.png',
				videoUrl: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/06/f65617ac6030423da443fa93b2334db5.png'
			};
		},
		watch: {
			fileListt: {
				immediate: true,
				handler: function() {
					//	console.log(this.fileListt);
					this.billImgList = this.fileListt != undefined ? Array.from(new Set(this.fileListt)) : []
				}

			}

		},
		methods: {
			swiperChange(e) {
				console.log(e);
				this.indexx = e.detail.current
				// uni.getImageInfo({
				// 	src: this.billImgList[e.detail.current],
				// 	success: (res) => {
				// 		console.log(res)
				// 		let endwidth = res.width / res.height
				// 		this.swiperHeight = 100 / endwidth + "rpx"
				// 	},
				// 	fail: (err) => {
				// 		console.log(err)
				// 	}
				// });
			},
			billViewImage(e) {

					this.showsImg = true
				// uni.previewImage({
				// 	urls: this.billImgList,
				// 	current: e.currentTarget.dataset.url,

				// });

			},
			billDelImg(e) {
				console.log( this.billImgList);
				uni.showModal({
					title: '删除',
					content: '确定要删除吗？',
					cancelText: '确认',
					confirmText: '取消',
					success: res => {
						if (res.cancel) {
							let index =e.currentTarget!=undefined? e.currentTarget.dataset.index:e
							let data = {}
							data.url = this.billImgList[index]
							if (data.url == undefined || data.url == null || data.url == '') {
								uni.showToast({
									title: '删除失败',
									duration: 2000,
									icon: 'error'
								});
							} else {
								delossByurl({
									url: data.url
								}).then(res => {
									console.log(res);
									if (res.code === 200) {
										uni.showToast({
											title: '删除成功',
											duration: 2000
										});
										// 重新加载
									
										this.billImgList.splice(index, 1);
										this.indexx-=this.indexx
										if(this.billImgList.length==0){
											this.showsImg=false
										}
										this.$emit('getUrl', {
											type:this.types,
											urls: this.billImgList,
											index: this.index,
										})
									}
								});
							}
						}
					}
				});
			},
			billChooseImage() {
				let that = this
				console.log(this.types);
				if (this.types == 'video') {
					uni.chooseVideo({
						sourceType: ['camera', 'album'],
						success: function(res) {
							console.log(res.tempFilePath);
							that.upLoadHandle(res)
						}
					});
				} else {
					uni.chooseImage({
						count: 9 - this.billImgList.length, //默认9
						// sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
						// sourceType: ['album'], //从相册选择
						success: res => {
							this.upLoadHandle(res)
							console.log(res);
						}

					});

				}

			},


			//上传图片和视频
			upLoadHandle(res) {
				let that = this
				console.log(res);
				let billImgList = that.billImgList;
				uni.showLoading({
					title: '上传中'
				});
				if (this.types == 'video') {
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
								billImgList.push(data.data.url);
								that.billImgList = billImgList
								uni.hideLoading();
								that.$emit('getUrl', {
									urls: billImgList,
									index: that.index,
									type: 'video'
								})
								//	ossIds.push(data.data.ossId)
							}
						}
					});
				} else {
					for (let i = 0; i < res.tempFiles.length; i++) {
						const path = res.tempFiles[i].path;
						(function(i) {
							setTimeout(function() {
								uni.uploadFile({
									url: environment.baseURL + '/system/oss/upload',
									filePath: path,
									name: 'file',
									header: {
										Authorization: "Bearer " + storage.get('AccessToken')
									},
									success: res => {
										let data = JSON.parse(res.data);
										if (data.code == 200) {
											billImgList.push(data.data.url);
											that.$emit('getUrl', {
												urls: billImgList,
												index: that.index,
												type: 'image'
											})
											//	ossIds.push(data.data.ossId)
										}
									}
								});
								if (i == res.tempFiles.length - 1) {
									uni.hideLoading();
								}
							}, (i + 1) * 1500);
						})(i)
					}
				}
				console.log(this.billImgList);
			},


		}
	}
</script>

<style lang="scss" scoped>
	.bg-img {
		// height: 125rpx;
		// border: 1px dashed #333;
		display: flex;
		flex-wrap: wrap;
	}

	.mask {
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);

		padding-top: 80rpx;
		position: absolute;
		top: 0;
		height: 46rpx;
		width: 100%;
		color: #fff;
		border-radius: 14rpx;
	}
	::v-deep.u-transition .u-fade-enter-to .u-fade-enter-active{
		z-index:998 !important;
		}
</style>
