import request from '@/config/request.js';

// 获取通知公告列表
export const noticeList = (params) => request.get('/system/notice/list', params)