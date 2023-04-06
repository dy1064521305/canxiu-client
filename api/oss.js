import request from '@/config/request.js';



//根据url删除图片
export const delossByurl = (params) => request.delete('/system/oss/deleteByUrl',params)

//查询OSS对象基于id串
export const listByIds = (ossIds) => request.get('/system/oss/listByIds/'+ossIds)