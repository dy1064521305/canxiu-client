<template>
	<view>
		<z-paging ref="paging" v-model="dataList" @query="queryList" :default-page-size="20"
			:use-chat-record-mode="true">
			<view v-for="(item,index) in dataList" :key="index" @click="toOrderDetail(item)">
				
				<uni-badge class="uni-badge-left-margin" :is-dot="true" :offset="[20,20]" :text="item.readStatus == 0 ? 1 : 0" absolute="rightTop" size="normal" style="width: 100%;">
					
					<uni-card :title="item.title" :extra="item.time" :border="false">
						
						<text class="uni-body" style="font-size: 26rpx;">{{ item.content }}</text>
						<view slot="actions" class="card-actions">
							<view class="card-actions-item" style="float: right;margin: 0 0 10px 0;font-size: 26rpx;">
								<text class="card-actions-item-text" style="color: #3398F3;">查看详情</text>
								<uni-icons type="right" size="18" color="#3398F3"></uni-icons>
							</view>
						</view>
						
					</uni-card>
					
				</uni-badge>
			</view>

		</z-paging>
	</view>
</template>

<script>
	import {
		queryList, editRead
	} from '@/api/tim.js'
	export default {
		data() {
			return {
				dataList: []
			}
		},
		onShow() {
			this.$refs.paging.reload()
		},
		methods: {
			queryList(pageNo, pageSize) {
				//这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				//这里的请求只是演示，请替换成自己的项目的网络请求，并在网络请求回调中通过this.$refs.paging.complete(请求回来的数组)将请求结果传给z-paging
				queryList({
					pageNo,
					pageSize
				}).then(res => {
					//请勿在网络请求回调中给dataList赋值！！只需要调用complete就可以了
					console.info(res);
					this.$refs.paging.complete(res.rows);
				}).catch(res => {
					//如果请求失败写this.$refs.paging.complete(false)，会自动展示错误页面
					//注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
					//在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
					this.$refs.paging.complete(false);
				})
			},
			toOrderDetail(data){
				if(data.readStatus == 0){
					editRead({
						logId: data.logId,
						readStatus: 1
					}).then()
				}
				uni.navigateTo({
					url: '/subpkg/car/orderDetail/orderDetail?id=' + data.orderId
				})
				console.info(data)
			}
		}
	}
</script>

<style>

</style>