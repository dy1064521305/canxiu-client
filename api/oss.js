import request from '@/config/request.js';



//根据url删除图片
export const delossByurl = (params) => request.delete('/system/oss/deleteByUrl',params)