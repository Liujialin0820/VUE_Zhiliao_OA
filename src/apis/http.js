import axios from "axios";

class Http {
  constructor() {
    this.http = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 1000,
    });
  }

  post(path, data) {
    return new Promise(async (resolve, reject) => {
      // await: 网络请求发出后, 线程会挂起等待, 释放cpu资源, 直到请求返回结果
      try {
        const response = await this.http.post(path, data);
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  get(path, params) {
    return this.http.get(path, params);
  }

  put(path, data) {
    return this.http.put(path, data);
  }

  delete(path) {
    return this.http.delete(path);
  }
}

export default new Http();
