// 拨打电话
export const callPhone = (phone, type) => {
	if (type == 'app') {
		if (uni.getSystemInfoSync().platform == 'ios') {
			uni.makePhoneCall({
				phoneNumber: phone, //电话号码
				success(ress) {
					console.log("拨打电话成功", ress)
				},
				fail(err) {
					console.log("拨打电话失败", 'err')
				}
			});
		} else {
			plus.android.requestPermissions(
				["android.permission.CALL_PHONE"],
				function(resultObj) {
					var result = 0;
					for (var i = 0; i < resultObj.granted.length; i++) {
						var grantedPermission = resultObj.granted[i];
						console.log('已获取的权限：' + grantedPermission);
						result = 1
					}
					for (var i = 0; i < resultObj.deniedPresent.length; i++) {
						var deniedPresentPermission = resultObj.deniedPresent[i];
						console.log('拒绝本次申请的权限：' + deniedPresentPermission);
						result = 0
					}
					for (var i = 0; i < resultObj.deniedAlways.length; i++) {
						var deniedAlwaysPermission = resultObj.deniedAlways[i];
						console.log('永久拒绝申请的权限：' + deniedAlwaysPermission);
						result = -1
					}
					console.log(result);
					if (result == 1) {
						console.log(phone);
						uni.makePhoneCall({
							phoneNumber: phone, //电话号码
							success(ress) {
								console.log("拨打电话成功", ress)
							},
							fail(err) {
								console.log("拨打电话失败", 'err')
							}
						});
					} else {
						uni.showToast({
							title: "请开启拨号权限",
							icon: "error",
						})
					}
				},
				function(error) {
					console.log('申请权限错误：' + error.code + " = " + error.message);
				}
			);
		}
	} else {
		uni.makePhoneCall({
			phoneNumber: phone, //电话号码
			success(ress) {
				console.log("拨打电话成功", ress)
			},
			fail(err) {
				console.log("拨打电话失败", 'err')
			}
		});
	}

}