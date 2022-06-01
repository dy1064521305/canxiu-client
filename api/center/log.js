import request from '@/config/request.js';

// 获取用户信息
export const operLog = () => request.get('/monitor/operlog/list?pageNum=1&pageSize=10')