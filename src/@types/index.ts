/*
 * @Date: 2020-12-10 10:16:09
 * @Description:类型封装
 */

// 接口响应通过格式
export interface HttpResponse {
  status: number;
  statusText: string;
  data: {
    code: number;
    desc: string;
    [key: string]: any;
  };
}
