import request from '@/config/request.js';

// 根据字典类型查询字典数据信息
export const getDict = (dictType) => request.get('/system/dict/data/type/'+dictType)