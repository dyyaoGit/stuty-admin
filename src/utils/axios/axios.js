import Vue from 'vue'
import allapi from './allapi'
import base from './config'
import axios from 'axios'

let xhr = {
  get(url,params){
    return new Promise((resolve,reject) => {
      base.get(allapi[url],{params}).then(res => {
        resolve(res.data)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  post(url,params){
    return new Promise((resolve,reject) => {
      base.post(allapi[url],params).then(res => {
        resolve(res.data)
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  },
  qiniuGet(isPublic=false){
    return new Promise((resolve,reject) => {
      axios.get('api/adminApi/getToken',{params: {isPublic}}).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })

  }
}

Vue.prototype.$axios = xhr;


