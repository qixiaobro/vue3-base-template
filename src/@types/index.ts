/*
 * @Date: 2020-12-10 10:16:09
 * @Description:类型封装,声明
 */

/**
 * @description: 响应通过
 */
export interface HttpResponse {
  status: number;
  statusText: string;
  data: {
    code: number;
    desc: string;
    [key: string]: any;
  };
}

/**
 * @description: 微信验签返回结构
 */
export interface GetWeChatConfig {
  resultCode: number;
  resultMsg: string;
  resultBody: {
    appId: string;
    debug: boolean;
    jsApiList?: [string];
    nonceStr: string;
    signature: string;
    timestamp: string;
  };
}

/**
 * @description: 微信支付
 */
export interface WcPay {
  appId: string;
  package: string;
  signType: string;
  paySign: string;
  timeStamp: string; // 必填，生成签名的时间戳
  nonceStr: string; // 必填，生成签名的随机串
}

/**
 * @description: 微信支付返回消息
 */
export interface WxMsg {
  err_msg: string;
  [prop: string]: string;
}
