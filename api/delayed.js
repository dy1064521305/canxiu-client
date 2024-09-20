import request from '@/config/request.js';



export const subscribe = (params) => request.get('/demo/queue/delayed/subscribe',params)

export const addSubscribe = (params) => request.get('/demo/queue/delayed/add',params)

export const destroy = (params) => request.get('/demo/queue/delayed/destroy',params)

