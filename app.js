import wxValidate from 'utils/wxValidate';
import {postRequest,getRequest} from './utils/ajax.js'; 

App({
	//优雅的表单验证
	wxValidate: (rules, messages) => new wxValidate(rules, messages),
  onLaunch: function () {
    // 登录
		console.log('hello this is first step');
		// 验证是否登录
		
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  postRequest:postRequest,
	getRequest:getRequest,
	globalData: {
    userInfo: null,
		token:null,
		myUserInfo:null
  }
})