<template>
	<view>
		
		
	
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	export default {
		data() {
			return {}
		},
		onTabItemTap: function(item) {
			console.log(storage.get('AccessToken'))
			if (!storage.get('AccessToken')) {
			uni.navigateTo({
				url: '/pages/login/index'
			})
			}
		},
		methods:{
		
		}
	}
</script>
