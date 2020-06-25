import axios from 'axios'

// 最终方案，让调用者得到网络请求结果
export function request(config) {
  // 1. 创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 5000
  })

  // 2. axios拦截器
  // 2.1 请求拦截
  instance.interceptors.request.use(config => {
    return config;
  }, err => {
    console.log(err);
  })
  // 2.2 响应拦截
  instance.interceptors.response.use(res => {
    return res.data;
  }, err => {
    console.log(err);
  })

  // 3. 传入对象进行网络请求
  return instance(config); //本身返回的是一个回调函数
}


