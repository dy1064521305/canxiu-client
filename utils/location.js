//判断是否打开了位置授权
/**
 * 查询微信访问权限
 * @param {String} scope 需要获取权限的 scope，详见 scope 列表:https://uniapp.dcloud.net.cn/api/other/authorize.html#scope-%E5%88%97%E8%A1%A8
 * @param {String} jurisdiction 权限字段
 * @return { Promise }
 **/

export  function checkForAuthorization(scope, jurisdiction, type) {
		console.log(type);
		return new Promise((resolve, reject) => {
			if (type == 'weixin') {
				const appAuthorizeSetting = wx.getAppAuthorizeSetting();
				if (appAuthorizeSetting[jurisdiction] === "denied") {
					uni.showModal({
							title: "服务未开启",
							content: "请在手机设置“设置->应用权限”中打开微信位置权限!",
							showCancel: false,
							confirmText: "我知道了",
						})
						.then((res) => {
							if (res[1]["confirm"]) {
								reject();
								uni.openAppAuthorizeSetting()
							}else{
								reject(appAuthorizeSetting[jurisdiction]);
							}
						});
				} else {
					uni.authorize({
						scope: scope,
						success() {
							console.log('yes')
							resolve();
						},
						fail(err) {
							err = err["errMsg"];
							uni.showModal({
								title: "温馨提示",
								content: "为享受智能小程序，您必须授权!",
								confirmText: "确认授权",
							}).then((res) => {
								if (res[1]["confirm"]) {
									uni.openSetting({
										success(res) {
											if (res.errMsg.includes('ok')) {
												resolve('ok')
											}
										},
									});

								} else {
									reject();
								}
							});
						},
					});
				}
			} else {
				console.log('appappappappapp');

			}

		});
	}
