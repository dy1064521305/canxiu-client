<template>
	<view class="info">
		<u-checkbox-group v-model="checkboxValue1" placement="column">
			<view v-for="(item, index) in dataList" :key="index">

				<view class="check">
					<u-checkbox v-if="submit" shape="circle" :name="item.id?item.id:item.projectId"
						activeColor='#72daa4' @change='val=>checkChange(val,item)'>
					</u-checkbox>
					<u-image radius='10rpx' width="150rpx" height="150rpx" :src="item.imgList[0]"
						@click="previewImage(item.imgList)">
					</u-image>

					<view class="info">
						<view style="font-size: 29rpx;color: #3D3F3E;font-weight: bold;height: 50%;display: flex;">
							<view :style="{'width':isDelete?'70%':''}"> {{item.projectName}}</view>
							<image @click="deleteById(item.id)" v-if="isDelete" style="width: 145rpx;height: 69rpx;"
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/94862fc485714c92b1cff30a2bf71425.png">
							</image>
						</view>
						<view class="bottom">
							<view class="left">
								<text v-if="!question"
									style="font-size: 22rpx;color: #EC5722;margin-right: 10rpx;">预估费用:</text>
								¥{{item.projectPrice}}
								<image @click='questionHandle(item)' v-if="question"
									src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0b076ac258454779a88431fc8f26cb56.png"
									mode=""></image>
							</view>
							<u-number-box v-model="item.projectNumber" class='number' button-size="27" color="#ffffff"
								bgColor="#72DAA4" @change='val=>numChange(item,val)' iconStyle="color: #fff">
							</u-number-box>
						</view>
					</view>
				</view>
				<view class="remark" v-if="checkboxValue1.includes(item.id?item.id:item.projectId)||isCar">
					<view>
						<text style="margin-right: 30rpx;">上传图片</text>

						<view style="width: 78%;">
							<upLoadFile :fileListt='item.projectImg' :limit='9' types='image' @getUrl='getUrl'
								:index='index' />
						</view>
					</view>
					<view>
						<text style="margin-right: 30rpx;">上传视频</text>
						<view style="width: 78%;">
							<upLoadFile :fileListt='item.projectVideo' :limit='9' types='video' @getUrl='getUrl'
								:index='index' />
						</view>
					</view>
					<view style="align-items: center;">
						<view style="margin-right: 10rpx;">订单备注</view>
						<view style='width: 80%'>
							<u--textarea height='30rpx' border='none' maxlength='50' confirmType="done" autoHeight
								v-model="item.remark" placeholder="备注内容(选填)" count></u--textarea>
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
				<view style="font-size: 29rpx;color: #A5A7A7;margin-top:40rpx;"> 
					<text>{{remark.content}}</text>
				</view>
			</view>
		</u-popup>
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
			//是购物车还是立即下单
			types:{
				type:String
			}
		},
		data() {
			return {
				accept: 'video',
				showQestion: false,
				checkboxValue1: [],
				isLogin: storage.get('AccessToken'),
				checkArr: [],
				remark:{},
				dataList:[]
			};
		},
		watch: {
			list: {
				immediate: true,
				deep:true,
				handler: function(n) {
					this.dataList = uni.$u.deepClone(n)
					this.checkboxValue1 = n.filter(l => l.checked).map(l1 => l1.id)
					console.log(this.checkboxValue1, 'this.checkboxValue1++++++++++++++140');
					console.log(n);
					this.dataList.forEach(item => {
						if (this.isCar&& item.serviceProjectName) {
							console.log('139......',item);
							item.projectName = item.serviceProjectName
						} else {
							item.shuoming=item.remark
							item.remark =''
							item.projectNumber = 1
							console.log(1111);
						}
						console.log(item);
						item.imgList = item.serviceProjectImg !== null ? item.serviceProjectImg.split(',') :[],
						
							item.projectImg = item.projectImg != '' && !Array.isArray(item.projectImg) ? item
							.projectImg.split(',') : Array.isArray(item.projectImg) ? item.projectImg : [],
							console.log( item.projectVideo );
							item.projectVideo = item.projectVideo != ''&&item.projectVideo !=undefined && !Array.isArray(item.projectVideo) ?
							item.projectVideo.split(',') : Array.isArray(item.projectVideo) ? item
							.projectVideo : []
					})


				}

			},

			isJoinCar: {
				handler: function() {
					console.log(this.checkboxValue1);
					console.log(this.dataList);
					let arr = [];
					arr = this.dataList.filter(item => this.checkboxValue1.includes(item.id ? item.id : item.projectId))
					console.log(arr);
					let query={
						list:arr,
						type:this.types
					}
					this.$emit('joinCarHandle', query)
				}

			},

		},
		methods: {
			checkChange(val, item) {
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
			numChange(item, value) {
				console.log('207...',item,value,this.dataList);
				this.$emit('getCheck', {
					item: item,
					num: value
				})

			},
			//预览图片
			previewImage(list) {
				uni.previewImage({
					urls: list,
					current: 0
				});
			},

			getUrl(val) {
				val.type == 'video' ? this.dataList[val.index].projectVideo = val.urls : this.dataList[val.index].projectImg = val
					.urls
				//this.isCar ? this.$emit('submitOrder', this.list) : ''
				console.log(this.dataList);
				this.$emit('getDeleteUrlList',this.dataList)
			},
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
									this.$emit('deleteCarList',arr)
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}

					}
				});

			},
			//问题
			questionHandle(item){
				this.remark={
					content:item.shuoming,
					name:item.projectName
				}
				this.showQestion=true
				
			}

		
		}
	}
</script>

<style lang="scss">
	.info {
		.check {
			height: 144rpx;
			padding: 20rpx;
			display: flex;
			border-top: 2rpx solid #F8F8F8;

		}

		.info {
			padding: 0 10rpx;
			width: 100%;

			.bottom {
				display: flex;
				margin-top: 20rpx;
				font-size: 33rpx;
				color: #EC5722;

				.left {
					display: flex;
					align-items: center;
					width: 70%;

					image {
						width: 36rpx;
						height: 36rpx;
						margin-left: 10rpx;
					}
				}


			}
		}

		.remark {
			font-size: 29rpx;
			color: #3D3F3E;
			font-weight: bold;
			padding: 20rpx 25rpx;

			view {
				display: flex;


			}
		}
	}
</style>
