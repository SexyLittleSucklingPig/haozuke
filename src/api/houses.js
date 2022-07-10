import request from '@/utils/request'
export const gethouses = (params) => {
  return request({
    url: 'houses',
    params
  })
}
// 筛选条件
export const gethouseslist = (params) => {
  return request({
    url: 'houses/condition',
    params
  })
}
// 发布所需信息
export const pushhose = () => {
  return request({
    url: 'houses/params'
  })
}

// 发布房屋图片
export const addimg = (data) => {
  return request({
    method: 'POST',
    url: 'houses/image',
    data
  })
}
// 发布房源
export const addhome = (data) => request({
  url: '/user/houses',
  method: 'POST',
  data
})
