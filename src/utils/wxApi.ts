/*
 * @Date: 2020-12-25 10:44:19
 * @Description:微信jsAPi
 */
import { WcPay, WxMsg } from "@/@types/index";
import { CommonService } from "@/api/common";
const wx = window["wx"];
/**
 * @description: 微信jsApi注入
 * @param {*}
 * @return {*} Promise
 */
async function wxConfig() {
  const result = await CommonService.getWxSign();
  const data = result.data;
  return new Promise(resolve => {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来。
      appId: data.appId, // 必填，公众号的唯一标识。
      timestamp: data.timestamp, // 必填，生成签名的时间戳。
      nonceStr: data.nonceStr, // 必填，生成签名的随机串。
      signature: data.signature, // 必填，签名
      jsApiList: [
        // 必填，需要使用的JS接口列表。
        "updateAppMessageShareData",
        "updateTimelineShareData",
        "chooseImage",
        "previewImage",
        "uploadImage",
        "downloadImage",
        "hideOptionMenu",
        "showOptionMenu",
        "hideMenuItems",
        "showMenuItems",
        "hideAllNonBaseMenuItem",
        "showAllNonBaseMenuItem",
        "scanQRCode",
        "chooseWXPay",
        "openAddress"
      ],
      openTagList: ["wx-open-launch-weapp"]
    });
    wx.ready(function() {
      console.log("wxConfig初始化成功！");
      resolve(true);
    });
    wx.error(function(res: any) {
      console.log("wxConfig初始化成功！");
      console.log("wxConfigError:", res);
      resolve(false);
    });
  });
}

/**
 * 微信支付
 * @param {*} WX_PUB
 * @return {*} Promise
 */
function wxPay(WX_PUB: WcPay) {
  return new Promise(resolve => {
    WeixinJSBridge.invoke(
      "getBrandWCPayRequest",
      {
        appId: WX_PUB.appId,
        timeStamp: WX_PUB.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。
        nonceStr: WX_PUB.nonceStr, // 支付签名随机串，不长于 32 位
        package: WX_PUB.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType: WX_PUB.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: WX_PUB.paySign
      },
      function(res: WxMsg) {
        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        if (res.err_msg === "get_brand_wcpay_request:ok") {
          resolve(1);
        } else if (res.err_msg === "get_brand_wcpay_request:cancel") {
          resolve(2);
        } else if (res.err_msg === "get_brand_wcpay_request:fail") {
          resolve(3);
        } else {
          resolve(false);
        }
      }
    );
  });
}

/**
 * 微信分享
 * @param {*} title 分享标题
 * @param {*} link 分享描述
 * @param {*} imgUrl 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
 * @param {*} desc 分享图标
 */
function wxShare(title: string, link: string, imgUrl: string, desc: string) {
  return new Promise(resolve => {
    //自定义“分享给朋友”及“分享到QQ”按钮的分享内容
    wx.updateAppMessageShareData({
      title,
      desc,
      link,
      imgUrl,
      success: function() {
        resolve(true);
      },
      fail: function() {
        resolve(false);
      }
    });
    //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
    wx.updateTimelineShareData({
      title,
      link,
      imgUrl,
      success: function() {
        resolve(true);
      },
      fail: function() {
        resolve(false);
      }
    });
  });
}

export default {
  wxConfig,
  wxPay,
  wxShare
};
