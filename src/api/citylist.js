import request from '@/utils/request'
export const getcity = (params) =>
  request({
    url: 'area/city',
    params
  })

// 热门城市
export const hotcity = () => {
  return request({
    url: 'area/hot'
  })
}
