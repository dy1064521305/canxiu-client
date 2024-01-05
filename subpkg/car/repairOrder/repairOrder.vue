<template>
	<view class="repairOrder">
		<u-checkbox-group v-model="checkboxValue1"  placement="column" @change="checkboxChange">
			<view style="margin: 15rpx 0;" v-for="(item,index) in projectList" :key="index">
				<view style="background-color: #fff;padding: 20rpx;display: flex;">
					<u-checkbox   :name="item.projectId"  shape='circle' activeColor="#A4D091">
					
					</u-checkbox>
					<project-card :pro='item' style="width: 100%;"/>
				</view>
			</view>

		</u-checkbox-group>
			<view class="button" @click="repairOrderHandle" >
					发起返修
				</view>
	</view>
</template>

<script>
	import projectCard from '@/components/projectCard/projectCard.vue'
	export default {
		components: {
			projectCard
		},

		data() {
			return {
				projectList: [],
				checkboxValue1:[],
				choseList:[],
				type:''
			};
		},
		onLoad(option) {
			let info = JSON.parse(decodeURIComponent(option.info))
			this.projectList=info.list
			this.type=info.type
			console.log(this.projectList);
			
		},
		
		methods:{
			checkboxChange(val){
				console.log(val);
				this.choseList=[]
				this.projectList.forEach(item=>{
					if (val.includes(item.projectId)) {
						this.choseList.push(item)
					}
				})
				console.log(this.choseList);
			},
			repairOrderHandle(){
				let info={
					list:this.choseList,
					type:this.type
				}
				console.log(1111);
				uni.navigateTo({
					url:'../repairOrderInfo/repairOrderInfo?info='+encodeURIComponent(JSON.stringify(info))
				})
			}
		}
	}
</script>

<style lang="scss">
	.repairOrder {
			.button {
			width: 663rpx;
			height: 91rpx;
			background:#A4D091;
			border-radius: 45rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			line-height: 91rpx;
			text-align: center;
			position: absolute;
			bottom: 200rpx;
			left: 43rpx;
		}

	}
</style>