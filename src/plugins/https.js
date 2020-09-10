import request from './request'
import qs from 'qs'

export default {
  //实例
  // getSearchList: params => request.get(`/dal_prod/commons/getSearchType.do?${qs.stringify(params)}`),
  // getSupplier: params => request.get(`/dal_prod/commons/getSupplierByUser.do?${qs.stringify(params)}`),
  // getBrandList: params => request.get(`/dal_prod/commons/getBrandListByUser.do?${qs.stringify(params)}`),
  // getTableList: params => request.post('/dal_prod/operate/limit/queryPage.do', params),
  // getDetail: params => request.get(`/dal_prod/operate/limit/queryInfo.do?${qs.stringify(params)}`),
  // detailSave: params => request.post('/dal_prod/operate/limit/save.do', params),

  // qs.stringify(params)
  // ---------------------------------------------------  公共接口   -----------------------------------------------------------
  // 图片服务接口
  fileUpload: params => request.post('/api/fileUpload', params, false),

  // 分享注册页
  // bannerH5Log: params => request.post('/api/common/v1/bannerH5Log', params, false),

  // ---------------------------------------------------  我的信息   -----------------------------------------------------------
  // 我的信息-基本、账户信息
  getUpdateOfficeInfo: params => request.post('/api/office/getUpdateOfficeInfo', params, false), //fromdata
  // 我的信息-安全信息
  updatePassWord: params => request.post('/api/sys/user/updatePassWord', params, false),
  // 我的信息-充值提现记录
  querySubWithdrawlist: params => request.post('/api/recharge/querySubWithdrawlist', params, false),
  // 我的信息-充值提现记录详情
  queryWithdrawDedail: params => request.post('/api/recharge/queryWithdrawDedail', params, false),
  // 我的信息-提现展示
  withdrawForm: params => request.post('/api/recharge/withdrawForm', params, false),
  // 我的信息-提现提交
  subWithdrawForm: params => request.post('/api/recharge/subWithdrawForm', params, false),
  // 我的信息-充值表单展示
  // withdrawForm: params => request.post('/api/recharge/withdrawForm', params, false),
  // 我的信息-充值表单提交
  doRecharge: params => request.post('/api/recharge/doRecharge', params, false),
  // 我的信息-充值信息提交
  saveAdminAccount: params => request.post('/api/office/saveAdminAccount', params, false),



  // ---------------------------------------------------  活动管理   -----------------------------------------------------------
  // 机具列表查询
  queryProductActiveList: params => request.post('/api/active/queryProductActiveList', params, false),
  // 机具查看详情
  queryRewardDetail: params => request.post('/api/active/queryRewardDetail', params, false),
  // 修改活动状态
  changeStatus: params => request.post('api/active/changeStatus', params, false),
  // 机具列表导出
  productActiveExport: params => request.post('/api/active/productActive/excel/export', params, false),
  // 机具详情导出
  rewardDetailExport: params => request.post('/api/active/rewardDetail/excel/export', params, false),
  // 创建/修改机具活动
  saveProductActive: params => request.post('/api/active/saveProductActive', params, false),
  // 机具查询品牌
  queryChannelNameList: params => request.post('/api/brand/queryChannelNameList', params, false),
  // 机具查询品牌类型
  queryChannelTypeList: params => request.post('/api/brand/queryChannelTypeList', params, false),
  // 机具查询商品型号、单价
  productList: params => request.post('/api/product/list', params, false),
  // 机具查询商品型号、单价
  toChannelTypequeryProductList: params => request.post('/api/product/toChannelTypequeryProductList', params, false),
  // 机具修改前的查询（编辑）
  queryUpdateActive: params => request.post('/api/active/queryUpdateActive', params, false),

  // 开通达标
  // 达标活动列表查询
  queryPayActiveList: params => request.post('/api/active/queryPayActiveList', params, false),
  // 达标活动一级详情
  queryAgentInfo: params => request.post('/api/active/queryAgentInfo', params, false),
  // 达标活动二级详情
  queryProductInfo: params => request.post('/api/active/queryProductInfo', params, false),
  // 达标创建/修改
  savePayActive: params => request.post('/api/active/savePayActive', params, false),
  // 达标列表导出
  payActiveListExport: params => request.post('/api/active/payActiveList/excel/export', params, false),
  // 达标详情导出
  agentInfoExport: params => request.post('/api/active/agentInfo/excel/export', params, false),
  // 达标子详情导出
  productInfoExport: params => request.post('/api/active/productInfo/excel/export', params, false),


  // ------------------------------------------------------   商城管理   -------------------------------------------------------------
  // 库存列表
  mallList: params => request.post('/api/mall/list', params, false),
  // 库存详情
  storeDetailList: params => request.post('/api/mall/storeDetailList', params, false),
  // 库存 出入库记录
  storeRecordListData: params => request.post('/api/mall/storeRecordListData', params, false),
  // 库存 修改库存状态
  updateStatus: params => request.post('/api/mall/updateStatus', params, false),
  // 库存 商城订单
  orderList: params => request.post('/api/mall/orderList', params, false),
  // 库存 商城订单详情
  queryOrderDetail: params => request.post('/api/mall/queryOrderDetail', params, false),
  // 库存 订单派发
  queryOrderAllot: params => request.post('/api/mall/queryOrderAllot', params, false),
  // 库存新增
  mallSave: params => request.post('/api/mall/save', params, false),
  // 库存 上/下架
  mallShopUpdate: params => request.post('/api/mall/shopUpdate', params, false),
  // 查询机构
  officeList: params => request.post('/api/office/list', params, false),
  // 库存 删除
  mallDeleteSn: params => request.post('/api/mall/deleteSn', params, false),
  // 库存 修改机具归属
  updateDeviceAffiliation: params => request.post('/api/mall/updateDeviceAffiliation', params, false),
  // 库存 订单派发详情
  queryProductSN: params => request.post('/api/mall/queryProductSN', params, false),
  // 库存 订单派发
  distributeSn: params => request.post('/api/mall/distributeSn', params, false),
  // 库存 转让
  deviceTransfer: params => request.post('/api/mall/deviceTransfer', params, false),


  // ------------------------------------------------------   O单管理   -------------------------------------------------------------
  // 首页定制-首页
  queryMenuList: params => request.post('/api/made/queryMenuList', params, false),
  // 首页定制-保存
  saveMenuInfo: params => request.post('/api/made/saveMenuInfo', params, false),
  // 首页定制-上传  保存/编辑
  uploadMenuInfo: params => request.post('/api/made/uploadMenuInfo', params, false),
  // 首页定制
  statusMenuInfo: params => request.post('/api/made/statusMenuInfo', params, false),
  // 背景定制-查询
  queryBackGround: params => request.post('/api/made/queryBackGround', params, false),
  // 背景定制-删除
  delBackGround: params => request.post('/api/made/delBackGround', params, false),
  // 背景定制-保存
  saveBackGround: params => request.post('/api/made/saveBackGround', params, false),


  // ------------------------------------------------------   通道管理   -------------------------------------------------------------
  // 通道列表
  queryChannelList: params => request.post('/api/channel/queryChannelList', params, false),
  // 通道 新增/修改
  saveChannel: params => request.post('/api/channel/saveChannel', params, false),
  // 通道 回显
  queryUpdateChannel: params => request.post('/api/channel/queryUpdateChannel', params, false),
  // 通道 停用/启用
  channelUpdateStatus: params => request.post('/api/channel/updateStatus', params, false),
  // 通道流水查询
  queryChannelDeal: params => request.post('/api/channel/queryChannelDeal', params, false),
  // 账户管理-分润明细
  queryEarnDetail: params => request.post('/api/account/queryEarnDetail', params, false),
  // 账户管理-代付管理列表
  queryRepayList: params => request.post('/api/repay/queryRepayList', params, false),
  // 账户管理-申请额度
  repayDetail: params => request.post('/api/repay/repayDetail', params, false),
  // 账户管理-申请额度提交
  updaterepay: params => request.post('/api/repay/updaterepay', params, false),
  // 查询通道
  queryChannel: params => request.post('/api/channel/queryChannel', params, false),
  // 充值管理-列表
  queryRechargelist: params => request.post('/api/recharge/queryRechargelist', params, false),
  // 充值管理-列表详情
  doRechargeDetail: params => request.post('/api/recharge/doRechargeDetail', params, false),
  // 充值管理-审核
  doRechargeAuditing: params => request.post('/api/recharge/doRechargeAuditing', params, false),



  // ------------------------------------------------------   系统设置   -------------------------------------------------------------
  // 角色列表查询
  queryRolelist: params => request.post('/api/sys/role/queryRolelist', params, false),
  // 角色列表详情
  queryRoleDetail: params => request.post('/api/sys/role/queryRoleDetail', params, false),
  // 角色修改增加和是否停用修改
  saveUpdateRole: params => request.post('/api/sys/role/saveUpdateRole', params, false),
  // 查询是否有未设置的权限
  queryRoleByMenu: params => request.post('/api/sys/role/queryRoleByMenu', params, false),
  // 角色加入权限
  addRoleByMenu: params => request.post('/api/sys/role/addRoleByMenu', params, false),

  // 权限列表
  querySysMenulist: params => request.post('/api/sys/menu/querySysMenulist', params, false),
  // 添加权限/修改权限/修改状态
  saveUpdateMenu: params => request.post('/api/sys/menu/saveUpdateMenu', params, false),
  // 权限查询详情
  queryMenuDetail: params => request.post('/api/sys/menu/queryMenuDetail', params, false),
  // 所有父级列表
  queryMenuParentIds: params => request.post('/api/sys/menu/queryMenuParentIds', params, false),

  // 查询用户列表
  userList: params => request.post('/api/sys/user/list', params, false),
  // 添加/修改用户
  userSave: params => request.post('/api/sys/user/save', params, false),
  // 查看用户详情
  queryUpdateUser: params => request.post('/api/sys/user/queryUpdateUser', params, false),
  // 查询角色分配的信息
  queryRoleDistributor: params => request.post('/api/sys/user/queryRoleDistributor', params, false),
  // 角色分配
  roleDistributor: params => request.post('/api/sys/user/roleDistributor', params, false),
  // 修改用户状态
  userUpdateStatus: params => request.post('/api/sys/user/updateStatus', params, false),



  // 系统日志
  sysLogList: params => request.post('/api/sysLog/list', params, false),


}
