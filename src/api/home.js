import request from '@/utils/request'
export const lunboAPI = () => {
  return request({
    url: 'home/swiper'
  })
}

export const homelist = () => {
  return request({
    url: 'home/groups?area=AREA%7C88cff55c-aaa4-e2e0'
  })
}
