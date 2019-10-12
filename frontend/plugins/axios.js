import Vue from 'vue'
import axios from 'axios'
import { storage } from "~/untils/storage";
import { TOKEN_KEY } from "~/untils/config";
import { getCookie } from "~/untils/tools";
const service = axios.create({
  timeout: 5000,
  baseURL: '/api'
})




export default ({ store, redirect }) => {
  /**
  *  请求拦截器
  */
  service.interceptors.request.use(
    config => {
      const token = storage.getItem(TOKEN_KEY)
      // TODO 
      // token 添加白名单
      if(token){
        config.headers.common['Authorization'] = 'Bearer ' + token
      }
      return config
    }, err => {
      return Promise.resolve(err)
    }
  )
  /*
    响应拦截器
   */
  service.interceptors.response.use(
    async response => {
      const { data, config } = response
      /*
        约定10010 token过期
        10010 token无效
      */
      if(data.code === 10010 || data.code === 10011){
        // 清空token
        // 跳转到登录页
        storage.removeItem(TOKEN_KEY)
        redirect({path: '/login'}) 
      }
      // return response
      return data
    },
    err => {
      return Promise.resolve(err)
    }
  )
}



Vue.prototype.$http = service

export const http = service
