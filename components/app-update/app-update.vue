<template>
	<view class="wrap">
		<u-popup :show="popup_show" :closeOnClickOverlay="!force" mode="center" round="10"
			:overlayStyle="{background: 'rgba(0,0,0,0.6)'}">
			<view class="update-wrap">
				<view class="update-content">
					<view class="update-con-top">
						<!-- 发现新版本 -->
						<text class="update-top-title">发现新版本</text>
						<text class="update-top-version">V{{update_info.version}}</text>
					</view>
					<text class="uodate-content" v-if="downstatus < 1">更新内容:
						{{update_info.note}}</text>
					<text class="current-version" v-if="downstatus < 1">当前版本:V{{version}}</text>

					<view class="update-btn" v-if="downstatus < 1">
						<view class="btn-item" @click="closeUpdate">
							<!-- 残忍拒绝 -->
							<text class="item-text " style="width: 50%;">残忍拒绝</text>
						</view>
						<view class="btn-item" @click="nowUpdate">
							<!-- 立即升级 -->
							<text class="item-text text-bule" style="width: 50%;">立即升级</text>
						</view>
					</view>
					<!-- 下载进度 -->
					<view class="sche-wrap" v-else>
						<!-- 更新包下载中 -->
						<text class="sche-wrap-text">更新包下载中...</text>
						<view class="sche-bg">
							<view class="sche-bg-jindu" :style="lengthWidth">
								<view class="sche-bg-round">
									<text class="sche-bg-round-text" v-if="schedule">{{schedule}}%</text>
									<text class="sche-bg-round-text"
										v-else>{{(downloadedSize/1024/1024 ).toFixed(2)}}M</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="updata-bg-img"></view>
				<view class="updata-bg-color"></view>
			</view>
		</u-popup>
	</view>

</template>

<script>
	import {
		getAppUpdate
	} from '@/api/appUpdate.js';
	let vm;
	export default {
		name: "app_update",
		//@是否强制更新
		props: {
			force: {
				type: Boolean,
				default: true, //true强制更新  false非强制更新
			}
		},
		data() {
			return {
				popup_show: false, //弹窗是否显示
				platform: "", //ios or android
				version: "", //当前软件版本
				need_update: false, // 是否更新
				downing: false, //是否下载中
				downstatus: 0, //0未下载  1已开始 2已连接到资源  3已接收到数据  4下载完成
				update_info: {
					os: '', //设备系统
					version: '', //最新版本
					note: '', //升级说明
				},
				schedule: 0, //下载进度宽度
				downloadedSize: 0, //下载大小
				viewObj: null, //原生遮罩view
			};
		},
		created() {
			vm = this;
		},
		computed: {
			// 下载进度计算
			lengthWidth: function() {
				return {
					width: vm.schedule * 480 / 100 + "rpx"
				}
			}
		},
		methods: {
			// 检查更新
			update() {
				// #ifdef APP-PLUS

				// 获取手机系统信息
				uni.getSystemInfo({
					success: function(res) {
						vm.platform = res.platform //ios  or android
					}
				});

				// 获取版本号
				plus.runtime.getProperty(plus.runtime.appid, function(inf) {
					vm.version = inf.version
				});

				vm.getUpdateInfo(); //获取更新信息

				// #endif
			},

			// 获取线上版本信息
			getUpdateInfo() {
				//向后台发起请求，获取最新版本号
				getAppUpdate().then(res => {
					// 这里的返回的数据跟后台约定
					let data = [{
						os: 'android',
						version: res.data.version, // 最新版本
						note: res.data.versionInfo,
						download_url: res.data.downloadUrl, //下载地址 
					}, {
						os: 'ios',
						version: res.data.version, // 最新版本
						note: res.data.versionInfo, //
						download_url: res.data.downloadUrl, // 下载地址
					}];
					// 循环获取当前设备对应的更新数据
					for (let i = 0; i < data.length; i++) {
						if (vm.platform == data[i]['os']) {
							vm.update_info = data[i];
							break;
						}
					}

					if (!vm.update_info.os) {
						// 后台未配置当前系统的升级数据
					} else {
						// console.log('后台返回的当前系统的升级参数', vm.update_info);
						vm.checkUpdate(); ///检查是否更新
					}
				});
			},
			// 检查是否更新
			checkUpdate() {
				// console.info(vm.version);
				vm.need_update = vm.compareVersion(vm.version, vm.update_info.version); // 检查是否需要升级
				if (vm.need_update) {
					// console.info("需要么升级的")
					vm.popup_show = true; //线上版本号大于当前安装的版本号  显示升级框
					// 创建原生view用来遮罩tabbar的点击事件 (如果是没有用原生的tabbar这一步可以取消)
					vm.viewObj = new plus.nativeObj.View('viewObj', {
						bottom: '0px',
						left: '0px',
						height: '50px',
						width: '100%',
						backgroundColor: "rgba(0,0,0,0.6)"
					});
					vm.viewObj.show() //显示原生遮罩
				} else {

				}
			},

			// 取消更新
			closeUpdate() {
				if (vm.force) {
					// 强制更新，取消退出app
					plus.os.name == "Android" ? plus.runtime.quit() : plus.ios.import("UIApplication").sharedApplication()
						.performSelector(
							"exit");
				} else {
					vm.popup_show = false; //关闭升级弹窗
					vm.viewObj.hide() //隐藏原生遮罩
				}
			},
			// 立即更新
			nowUpdate() {
				if (vm.downing) {
					return false //如果正在下载就停止操作
				} else {
					vm.downing = true; //状态改变 正在下载中
				}

				if (/\.apk$/.test(vm.update_info.download_url)) {
					// 如果是apk地址
					vm.download_wgt() // 安装包/升级包更新
				} else if (/\.wgt$/.test(vm.update_info.download_url)) {
					// 如果是更新包
					vm.download_wgt() // 安装包/升级包更新
				} else {
					plus.runtime.openURL(vm.update_info.download_url, function() { //调用外部浏览器打开更新地址
						plus.nativeUI.toast("打开错误");
					});
				}
			},
			// 下载升级资源包
			download_wgt() {
				plus.nativeUI.showWaiting("下载更新文件..."); //下载更新文件...
				let options = {
					method: "get"
				};
				let dtask = plus.downloader.createDownload(vm.update_info.download_url, options, function(d, status) {

				});

				dtask.addEventListener("statechanged", function(task, status) {
					if (status === null) {} else if (status == 200) {
						//在这里打印会不停的执行，请注意，正式上线切记不要在这里打印东西///////////////////////////////////////////////////
						vm.downstatus = task.state;
						switch (task.state) {
							case 3: // 已接收到数据
								vm.downloadedSize = task.downloadedSize;
								let totalSize = 0;
								if (task.totalSize) {
									totalSize = task.totalSize //服务器须返回正确的content-length才会有长度
								}
								vm.schedule = parseInt(100 * task.downloadedSize / totalSize);
								break;
							case 4:
								vm.installWgt(task.filename); // 安装wgt包
								break;
						}
					} else {
						plus.nativeUI.closeWaiting();
						plus.nativeUI.toast("下载出错");
						vm.downing = false;
						vm.downstatus = 0;
					}
				});
				dtask.start();
			},

			// 安装文件
			installWgt(path) {
				plus.nativeUI.showWaiting("安装更新文件..."); //安装更新文件...
				plus.runtime.install(path, {}, function() {
					plus.nativeUI.closeWaiting();
					// 应用资源下载完成！
					plus.nativeUI.alert("应用资源下载完成！", function() {
						plus.runtime.restart();
					});
				}, function(e) {
					plus.nativeUI.closeWaiting();
					// 安装更新文件失败
					plus.nativeUI.alert("安装更新文件失败[" + e.code + "]：" + e.message);
				});
			},
			// 对比版本号
			compareVersion(ov, nv) {
				if (!ov || !nv || ov == "" || nv == "") {
					return false;
				}
				let b = false,
					ova = ov.split(".", 4),
					nva = nv.split(".", 4);
				for (let i = 0; i < ova.length && i < nva.length; i++) {
					let so = ova[i],
						no = parseInt(so),
						sn = nva[i],
						nn = parseInt(sn);
					if (nn > no || sn.length > so.length) {
						return true;
					} else if (nn < no) {
						return false;
					}
				}
				if (nva.length > ova.length && 0 == nv.indexOf(ov)) {
					return true;
				} else {
					return false;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {

		/deep/ .u-mode-center-box {
			background: none;
		}
	}

	.update-wrap {
		width: 580rpx;
		height: 500rpx;
		border-radius: 10rpx;
		padding-bottom: 0px;
		position: relative;
		display: flex;
		flex-direction: column;

		.updata-bg-img {
			margin-top: -20px;
			position: absolute;
			top: 0vw;
			left: 0px;
			width: 580rpx;
			height: 440rpx;
			background: url(images/update-img.png) no-repeat;
			background-size: 100% 100%;
			z-index: 1;
		}

		.updata-bg-color {
			position: absolute;
			width: 580rpx;
			top: 10vw;
			height: calc(100% - 10vw);
			background-color: #ffffff;
			z-index: 0;

		}

		.update-content {
			height: 100%;
			display: flex;
			flex-direction: column;
		}

		.update-content {
			position: relative;
			z-index: 2;
			display: flex;
			flex-direction: column;
		}

		.update-con-top {
			position: relative;
			padding: 70rpx 50rpx;
			margin-top: auto;
		}


		.update-btn {
			width: 100%;
			height: 80rpx;
			padding: 0px 50rpx;
			display: flex;
			align-items: center;
			border-top: 1px solid #e7e7e7;
			background-color: #fff;
			border-bottom-left-radius: 30rpx;
			border-bottom-right-radius: 30rpx;

			.btn-item {
				display: flex;
				align-items: center;
				justify-content: center;
				flex: 1;

				.item-text {
					text-align: center;
					font-size: 28rpx;
					color: #666;
				}

				.text-bule {
					color: #045FCF;
				}
			}

			.btn-item:first-child {
				border-right: 1px solid #e7e7e7
			}
		}

		.update-top-title {
			color: #fff;
			font-size: 34rpx;
			font-weight: bold;
		}

		.update-top-version {
			color: #fff;
			font-size: 28rpx;
			margin-top: 10rpx;
		}

		.uodate-content {
			color: #333;
			font-size: 30rpx;
			padding: 0px 50rpx;
			margin-top: 100rpx;
		}

		.current-version {
			text-align: center;
			margin-top: 20rpx;
			font-size: 24rpx;
			color: #666;
			margin-bottom: 16rpx;
		}
	}

	.sche-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		padding: 0px 50rpx 40rpx;
		height: 100rpx;
		border-bottom-left-radius: 30rpx;
		border-bottom-right-radius: 30rpx;
		flex: 1;

		.sche-wrap-text {
			font-size: 24rpx;
			color: #666;
			margin-bottom: 20rpx;
		}

		.sche-bg {
			position: relative;
			background-color: #ccc;
			height: 20rpx;
			border-radius: 100px;
			width: 480rpx;
			margin-bottom: 30rpx;
		}

		.sche-bg-jindu {
			position: absolute;
			left: 0px;
			top: 0px;
			height: 20rpx;
			background-color: #5775e7;
			border-radius: 100px;

			.sche-bg-round {
				position: absolute;
				left: 100%;
				height: 24rpx;
				width: 24rpx;
				background-color: #fff;
				border-color: #fff;
				border-style: solid;
				border-width: 10px;
				border-radius: 100px;
				transform: translateX(-20rpx) translateY(-10rpx);

				.sche-bg-round-text {
					position: relative;
					top: 10rpx;
					font-size: 24rpx;
					text-align: center;
					color: #5775e7;
				}
			}
		}

	}
</style>