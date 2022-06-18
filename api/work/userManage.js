import request from '@/config/request.js';

// 获取用户列表
export const userList = (params) => request.get('/system/user/list', params)