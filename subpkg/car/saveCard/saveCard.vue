<template>
	<view  @longtap="longtap">
		<!-- #ifdef H5 -->
			<l-painter ref="painter" :board="base" @success="path = $event" custom-style="position: relative;" height="1624rpx"
				 isCanvasToTempFilePath useCORS/>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
			<l-painter ref="painter" :board="base" @success="path = $event" custom-style="position: relative;" height="700rpx" width="400rpx"
				 isCanvasToTempFilePath/>
		<!-- #endif -->
	</view>
	
</template>

<script>
	// import client from '@/mixins/client.js'
	// import {
	// 	recruitmentDetail
	// } from '@/config/employmentHelp.js'
	import lPainter from './lime-painter/components/l-painter/l-painter.vue'

	export default {
		//mixins: [client],
		components: {
			lPainter
		},
		onLoad(option) {
			console.log('------------------------111111');
			this.getRecruitmentDetail(option.id)
			this.id = option.id
		},
		created() {
			console.log('++++++++++++++++111+++++++++++');
			this.getRecruitmentDetail()
		},
		data() {
			return {
				path: '',
				id: '',

				base: {},
				data: [],

			};
		},
		methods: {
			getRecruitmentDetail(id) {
				let params = {
					jobId: id
				}
			// 	uni.showLoading({
			// 		title: '加载中...'
			// 	});
			// 	recruitmentDetail(params).then(res => {
			// 		uni.hideLoading()
			// 		let data = res;
			// 		data.welfares = data.welfares.join(' ')
			
			// 	}).catch(res => {
			// 		uni.hideLoading()
			// 	})
			},
			longtap(res) {
				// #ifdef H5
					var eleLink = document.createElement('a');
					eleLink.download = "recruitment-poster";
					eleLink.style.display = 'none';
					eleLink.href = this.path;
					document.body.appendChild(eleLink);
					eleLink.click();
					// 然后移除
					document.body.removeChild(eleLink);
				// #endif
				// #ifndef H5
				this.$refs.painter.canvasToTempFilePathSync({
					fileType: "png",
					quality: 1,
					success: (res) => {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function() {
								uni.showToast({
									title: '已保存到相册',
									icon: 'success',
									duration: 2000
								})
							}
						});
					},
				});
				// #endif
			},


		}
	}
</script>

<style lang="scss">

</style>
