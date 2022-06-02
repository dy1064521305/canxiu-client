import request from '@/config/request.js';

// 获取用户信息
export const operLog = (params) => request.get('/monitor/operlog/list', params)