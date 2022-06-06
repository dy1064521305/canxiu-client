import request from '@/config/request.js';

// 获取通知公告列表
export const noticeList = (params) => request.get('/system/notice/list', params)

// 获取通知公告详情信息
export const noticeById = (id) => request.get('/system/notice/' + id)