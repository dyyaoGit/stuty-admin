import Vue from 'vue'
import { Message } from 'element-ui';
import router from '../router/index'

Vue.prototype.$Msg = function (type='success',url,err) {
  if(type == 'success'){
    Message({
      message: '恭喜你，操作成功',
      type: 'success'
    });
    setTimeout(() => {
      router.push(url)
    },1000)
  }else if(type == 'err'){
    Message({
      message: err,
      type: 'error'
    })
  }
}
