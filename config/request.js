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
    catch: true
  }, config.custom || {});
  return config;
}

const request = {
  // post提交
  post (url, params, config = {}) {
    config = mixinCustom(config)
    return http.post(url, params, config);
  },

  get (url, config = {}) {
    config = mixinCustom(config)
    return http.get(url, config);
  },

};

export default request;