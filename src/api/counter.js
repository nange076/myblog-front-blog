import request from '@/utils/request'

// 查询所有审核通过的友链列表
export function getCountInfo() {
  return request({
    url: '/count',
    method: 'get',
    headers: {
      isToken: false
    },
  })
}
