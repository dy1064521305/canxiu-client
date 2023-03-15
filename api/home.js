import request from '@/config/request.js';

// 获取一级分类
export const getServiceType = () => request.get('/client/home/queryServiceType')

// 获取热门报修
export const getHotService = () => request.get('/client/home/listHotService')

// 获取服务区域
export const getRegionService = () => request.get('/client/home/listRegionService')

// 获取热门城市
export const getHotCity = () => request.get('/client/home/listHotCity')

// 获取故障现象
export const getServiceSymptoms = (params) => request.get('/client/home/listServiceSymptoms',params)


//城市选择列表
export const getListCity = () => request.get('/client/home/listCity',  { custom: { auth: false } })

// 首页搜索
export const search = (params) => request.get('/client/home/search',params)


