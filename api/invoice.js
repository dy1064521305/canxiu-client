import request from '@/config/request.js';

// 获取客户端用户详细信息
export const getInvoiceHeaderInfo = (headerId) => request.get('/client/invoiceHeader/'+headerId)

// 修改客户发票抬头管理
export const editInvoiceHeader = (data) => request.put('/client/invoiceHeader',data)

// 新增客户发票抬头管理
export const addInvoiceHeader = (data) => request.post('/client/invoiceHeader',data)

//获取客户发票抬头管理
export const getInvoiceHeaderList = (params) => request.get('/client/invoiceHeader/list',params)

//客户可开发票列表
export const getListOrder= (params) => request.get('/client/invoice/listOrder',params)

//修改默认抬头
export const editDefault = (data) => request.put('/client/invoiceHeader/editDefault',data)


// 客户开具发票
export const postInvoice = (data) => request.post('/client/invoice',data)

//客户开票记录列表
export const getListInvoice= (params) => request.get('/client/invoice/listInvoice',params)

// 获取发票详情
export const getInvoiceDetailed = (requestId) => request.get('/client/invoice/'+requestId)


// 发票详情中订单列表
export const getInvoiceDetailedOrder = (orderIds) => request.get('/client/invoice/invoiceOrderList/'+orderIds)
