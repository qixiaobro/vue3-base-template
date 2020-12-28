/**
 * @description 公共模块的的网络请求，所有通用 api 放在此处
 */
import Axios from "@/utils/request";
import { HttpResponse, GetWeChatConfig } from "@/@types/index";

export class CommonService {
  /**
   * @description: 获取微信验签
   * @param {*}
   * @return {*}
   */
  static getWxSign(data?: {}): Promise<GetWeChatConfig> {
    return Axios.post(`/wechat/getWeChatConfig`, {
      appId: "xxxxx",
      ...data
    });
  }

  /**
   * @description: 获取基本信息
   * @param {*}
   * @return {*}
   */
  static getIndexInfo(): Promise<HttpResponse> {
    return Axios.get("/api/auth/userInfo");
  }
}
