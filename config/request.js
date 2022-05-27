const http = uni.$u.http;

const custom = {
  auth: true,
  toast: true,
  catch: true
};

function mixinCustom (config) {
  config.custom = Object.assign(custom, config.custom || {});
  return config;
}

const request = {
  
  post (url, params, config = {}) {
    config = mixinCustom(config)
    return http.post(url, params, config);
  },

  get (url, config = {}) {
    config = mixinCustom(config)
    console.log(config)
    return http.get(url, config);
  },

};

export default request;