import {http} from '~/plugins/axios'
import { storage } from "~/untils/storage";
import {TOKEN_KEY, USERINFO_KEY} from "~/untils/config";
import { retK } from "~/untils/http";

const state = ()=>({
  token: '',
  userInfo:{}
}) 

const mutations = {
  SET_TOKEN(state,token){
    state.token = token
  },
  SET_USER(state,userInfo){
    state.userInfo = userInfo
  }

}

const actions = {
  async login({commit,state},data){
    const ret = await http.post('/user/login',data)
    if (ret && ret.code === 0) {
      const token = ret.data.token
      storage.setItem(TOKEN_KEY,token)
      commit('SET_TOKEN',token)
    }
    return ret
  },
  async getUserInfo({commit,state}){
    const token = storage.getItem(TOKEN_KEY)
    let ret = ''
    if(token){
      ret = await http.get('/user/detail')
      retK(ret, (data) => {
        commit('SET_USER', data)
        storage.setItem(USERINFO_KEY, data)
      })
    }
    return ret
  }
}

const getters = {

}


export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}
