import Axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";
import { useLocalStorage } from "vue-composable";
const tokenTypeStorage = useLocalStorage("token_type");
const accessTokenStorage = useLocalStorage("access_token");
/**
 * @description: 定义请求实例
 */
const service = Axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

/**
 * @description: 请求状态反馈
 * @param {AxiosResponse} response
 */
const getErrorCode2text = (response: AxiosResponse): string => {
  // http status code
  const code = response.status;
  // 错误消息
  const msgs = new Map([
    [400, "Request Error"],
    [401, "Unauthorized, please login"],
    [403, "拒绝访问"],
    [404, "访问资源不存在"],
    [408, "请求超时"],
    [500, "位置错误"],
    [501, "承载服务未实现"],
    [502, "网关错误"],
    [503, "服务暂不可用"],
    [504, "网关超时"],
    [505, "暂不支持的 HTTP 版本"]
  ]);

  return msgs.get(code) || "Request Error";
};

/**
 * @description: 请求拦截配置
 * @returns {AxiosRequestConfig} config
 */
service.interceptors.request.use(async (config: AxiosRequestConfig) => {
  // 如果本地有token，则取，否则不添加Authorization
  if (tokenTypeStorage.storage.value && accessTokenStorage.storage.value) {
    const tokenType = tokenTypeStorage.storage.value;
    const accessToken = accessTokenStorage.storage.value;
    config.headers.Authorization = `${tokenType} ${accessToken}`;
  }

  //TODO:设置全局loading状态,需引入store
  if (config.data) {
    // store.commit("setLoadingStatus", config.data["isLoading"]);
  }
  console.log(process.env);
  return config;
});

/**
 * @description: 响应拦截配置
 */
service.interceptors.response.use(
  // 请求有响应
  async (response: AxiosResponse) => {
    if (response.status === 200) {
      return Promise.resolve(response.data);
    } else {
      const msg = getErrorCode2text(response);
      return Promise.reject(new Error(msg));
    }
  },

  // 请求无响应
  (error: AxiosError) => {
    let errorMsg: string = error.message || "";

    if (error.response) {
      errorMsg = error.response.data.message
        ? error.response.data.message
        : error.response.data.data;
    }

    if (error?.response?.status === 401) {
      // TODO: 登录失效，跳转登录页面
      // if (router.currentRoute.value.path !== "/entry/login") {
      //   router.push("/entry/login");
      // }
      return Promise.reject(new Error("401"));
    }
    return Promise.reject(new Error(errorMsg));
  }
);

export default service;
