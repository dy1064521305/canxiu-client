<template>
	<view class="more">
		<z-paging ref="paging" v-model="list" @query="queryList">
			<view v-for="(item,index) in list" :key="index">
				<goodCard :item='item' />
			</view>
		</z-paging>
	</view>
</template>

<script>
	import {
		getRegionService,
	} from '@/api/home.js';
	import storage from '@/utils/storage'
	import goodCard from '../../../components/goodCard/goodCard.vue'
	export default {
		components: {
			goodCard
		},
		data() {
			return {
				list: [],
				info: {},
				address: undefined
			};
		},
		onLoad(option) {
			this.info = JSON.parse(decodeURIComponent(option.infos))
			//console.log(JSON.parse(option.objects).list);
			let title = ''
			title = this.info.name == 'more' ? '热门报修' : this.info.name
			uni.setNavigationBarTitle({
				title: title
			})
			this.address = uni.getStorageSync(`address_refreash${storage.get('ClientId')}`)
			// this.list = info.list
			// this.list.forEach(item=>{
			// 	item.serviceImg = item.serviceImg!=null ?Array.isArray(item.serviceImg)?item.serviceImg : item.serviceImg.split(
			// 		','):[]
			// })
			console.log(this.list, '24444444444444444444444');
		},
		methods: {
		
			queryList(pageNo, pageSize) {
				uni.showLoading({
					title: "加载中"
				})
				getRegionService({
					pageNo,
					pageSize,
					region: this.info.name,
					clientId: storage.get('ClientId')?storage.get('ClientId'):'',
					address: this.address
				}).then(res => {
					console.info(res);
					res.rows.forEach(item => {
						item.servicePrice = !this.info.isShowMoney && item.servicePrice != null ? this
							.replaceMoney(item
								.servicePrice) :
							item.servicePrice
					})
					this.$refs.paging.complete(res.rows);
					uni.hideLoading();
				}).catch(res => {
					this.$refs.paging.complete(false);
				})
			},
			//将钱替换为星号
			replaceMoney(i) {
				//	console.log(i);
				return i.replace(/[0-9]/g, "x")
			},
		}

	}
</script>

<style lang="scss" scoped>
	.more {
		padding: 0 22rpx;
	}
</style>