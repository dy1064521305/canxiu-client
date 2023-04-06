export const MODE_TOKEN = 'mode_token';
export const MODE_CODE = 'mode_code';
const instance = {
  baseURL: 'https://service-c2zjvuxa-1252463788.gz.apigw.tencentcs.com',
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
};
const app = getApp();
export function login(options) {
  const {
    mode
  } = options;
  let data;
  return new Promise((resolve, reject) => {
    if (mode === MODE_TOKEN) {
      data = {
        method: 'login',
        token: options.token,
        phone: options.phone
      };
    } else {
      data = {
        method: 'login',
        code: options.code,
        sessionID: options.sessionID
      };
    }
	console.info('---------------0--------------------')
	console.info(data)
	console.info('-----------------------------------')
    wx.request({
      url: `${instance.baseURL}/release/sms`,
      data,
      success: res => {
        app.globalData.userSig = res.data.data.userSig;
        app.globalData.userID = res.data.data.userId;
	console.info('------------------1-----------------')
	console.info(res)
	console.info('-----------------------------------')
        resolve(res);
      },
      fail: error => {
		  
		  console.info('----------2-------------------------')
		  console.info(error)
		  console.info('-----------------------------------')
        reject(error);
      }
    });
  });
}
export function fetchUserInfoByPhone(data, handleSuccess, handleFail) {
  wx.request({
    url: `${instance.baseURL}/release/getUserInfo`,
    method: 'POST',
    data: {
      token: app.globalData.token,
      ...data
    },
    header: instance.headers,
    success: res => {
      handleSuccess && handleSuccess(res);
    },
    fail: error => {
      handleFail && handleFail(error);
    }
  });
}
export async function updateUserName(data, handleSuccess, handleFail) {
  wx.request({
    url: `${instance.baseURL}/release/setNickname`,
    method: 'POST',
    data: {
      token: app.globalData.token,
      ...data
    },
    header: instance.headers,
    success: res => {
      handleSuccess && handleSuccess(res);
    },
    fail: error => {
      handleFail && handleFail(error);
    }
  });
}
export async function cancellation(data, handleSuccess, handleFail) {
  wx.request({
    url: `${instance.baseURL}/release/sms`,
    data: {
      method: 'logout',
      token: app.globalData.userInfo.token,
      phone: app.globalData.userInfo.phone,
      ...data
    },
    header: instance.headers,
    success: res => {
      handleSuccess && handleSuccess(res);
    },
    fail: error => {
      handleFail && handleFail(error);
    }
  });
}