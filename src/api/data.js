import axios from '@/libs/api.request'

export const getSuggestion = ({key}) => {
  const data = {
    key: key
  }
  return axios.request({
    url: 'suggestion',
    data,
    method: 'post'
  })
}

export const getUserTableData = ({ pageNo, pageSize }) => {
  const data = {
    pageNo,
    pageSize
  }
  return axios.request({
    url: 'user/list',
    data,
    method: 'post'
  })
}

export const deleteUserData = ({ userId }) => {
  const data = {
    id: userId
  }
  return axios.request({
    url: 'user/delete',
    data,
    method: 'post'
  })
}

export const addUserData = ({ form }) => {
  const data = form
  return axios.request({
    url: 'user/add',
    data,
    method: 'post'
  })
}
export const editUserData = ({ form }) => {
  const data = form
  return axios.request({
    url: 'user/edit',
    data,
    method: 'post'
  })
}

// =============== 消防设备管理 ===================

export const getDeviceTableData = ({ page_no, page_size }) => {
  const data = {
    page_no,
    page_size
  }
  return axios.request({
    url: 'device/list',
    data,
    method: 'post'
  })
}

export const deleteDeviceData = ({ deviceId }) => {
  const data = {
    id: deviceId
  }
  return axios.request({
    url: 'device/delete',
    data,
    method: 'post'
  })
}

export const addDeviceData = ({ form }) => {
  const data = form
  return axios.request({
    url: 'device/add',
    data,
    method: 'post'
  })
}
export const editDeviceData = ({ form }) => {
  const data = form
  return axios.request({
    url: 'device/edit',
    data,
    method: 'post'
  })
}

// ==============================================

// =================== 消防审批 =====================

export const getReviewTableData = ({ page_no, page_size }) => {
  const data = {
    page_no,
    page_size
  }
  return axios.request({
    url: 'review/list',
    data,
    method: 'post'
  })
}

export const editReviewData = ({ form }) => {
  const data = form
  return axios.request({
    url: 'review/edit',
    data,
    method: 'post'
  })
}

// =================== ==============================

// =========================== 消防记录上报 =======================

export const getReportTableData = ({ page_no, page_size }) => {
  const data = {
    page_no,
    page_size
  }
  return axios.request({
    url: 'report/list',
    data,
    method: 'post'
  })
}

export const editReportData = ({ form }) => {
  const data = form
  return axios.request({
    url: 'report/edit',
    data,
    method: 'post'
  })
}

export const deleteReportData = ({ reportId }) => {
  const data = {
    id: reportId
  }
  return axios.request({
    url: 'report/delete',
    data,
    method: 'post'
  })
}

export const addReportData = ({ form }) => {
  const data = form
  return axios.request({
    url: 'report/add',
    data,
    method: 'post'
  })
}

// =========================== 消防记录上报 =======================
export const editReceiveData = ({ form }) => {
  const data = form
  return axios.request({
    url: 'receive/edit',
    data,
    method: 'post'
  })
}

export const deleteReceiveData = ({ deviceId }) => {
  const data = {
    id: deviceId
  }
  return axios.request({
    url: 'receive/delete',
    data,
    method: 'post'
  })
}
export const getTopicList = ({ pageNo, pageSize }) => {
  const data = {
    pageNo,
    pageSize
  }
  return axios.request({
    url: 'topic/list',
    data,
    method: 'post'
  })
}

export const deleteTopicData = ({ topicId }) => {
  const data = {
    id: topicId
  }
  return axios.request({
    url: 'topic/delete',
    data,
    method: 'post'
  })
}

export const addTopicData = ({ form }) => {
  const data = form
  return axios.request({
    url: 'topic/publish',
    data,
    method: 'post'
  })
}

export const editTopicData = ({ form }) => {
  const data = form
  return axios.request({
    url: 'topic/edit',
    data,
    method: 'post'
  })
}
//==============================================


export const getCountData = ({addressId}) => {
  return axios.request({
    url: 'count/info',
    data: {
      addressId
    },
    method: 'post'
  })
}

export const getNewsData = ( {addressId}) => {
  return axios.request({
    url: 'news/list',
    data: {addressId},
    method: 'post'
  })
}


export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getTreeSelectData = () => {
  return axios.request({
    url: 'get_tree_select_data',
    method: 'get'
  })
}
