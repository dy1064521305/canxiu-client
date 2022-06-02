const http = uni.$u.http;

/**
 * 混入默认个性化配置
 * @param {*} config 
 * @returns 
 */
function mixinCustom (config) {
  config.custom = Object.assign({
    auth: true,
    toast: true,
    catch: true,
    loading: true
  }, config.custom || {});
  return config;
}

function urlFormater (url, params) {
  if (params) {
    let paramList = [];
    for (let key in params) {
      paramList.push(key + '=' + params[key])
    }
    return url.indexOf('?') > -1 ? (url + '&' + paramList.join('&')) : (url + '?' + paramList.join('&'))
  }
  return url;
}

const request = {
  // post提交
  post (url, params, config = {}) {
    config = mixinCustom(config)
    return http.post(url, params, config);
  },

  get (url, params, config = {}) {
    config = mixinCustom(config)
    let path = urlFormater(url, params)
    return http.get(path, config);
  },

};

export default request;