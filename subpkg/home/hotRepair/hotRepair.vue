<template>
	<view class="more">
		<view v-for="item in list" class="">
			<goodCard :item='item'/>
		</view>
	</view>
</template>

<script>
	import goodCard from '../../../components/goodCard/goodCard.vue'
	export default {
		components:{
			goodCard
		},
		onLoad(option){
			let info=JSON.parse(decodeURIComponent(option.infos))
			//console.log(JSON.parse(option.objects).list);
			let title=''
			title=info.name=='more'?'热门报修':info.name
			uni.setNavigationBarTitle({
				title: title
			})
			this.list=info.list
			// this.list.forEach(item=>{
			// 	item.serviceImg = item.serviceImg!=null ?Array.isArray(item.serviceImg)?item.serviceImg : item.serviceImg.split(
			// 		','):[]
			// })
			console.log(this.list,'24444444444444444444444');
		},
		data() {
			return {
				list:[]
			};
		}
	}
</script>

<style lang="scss" scoped>
.more{
	padding:0 22rpx;
}
</style>
