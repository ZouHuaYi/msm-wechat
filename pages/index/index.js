//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
	// 跳转到分享页的链接
	goToWebUrl:function(){
		wx.navigateTo({
			url:`/pages/webview/webview?url=${this.weburl}&type=share&token=${app.globalData.myUserInfo.token}`
		})
	},
  //事件处理函数
  bindViewTap: function() {
  },
  onLoad: function (options) {
		if(options.url){
			this.weburl = options.url;
		}
		if(app.globalData.myUserInfo){
			if(this.weburl){
				this.goToWebUrl();
			}
		}
  },
	// 小程序没有授权允许的情况下
  getUserInfo: function(e) {
		if(e.detail.errMsg=='getUserInfo:ok'){
			app.loginFun(e.detail,(data)=>{
				if(data.messageCode==900){
					app.globalData.myUserInfo = data.user;
					if(this.wenurl){
						this.goToWebUrl();
					}else{
						wx.reLaunch({
							url:app.globalData.navigateBackUrl
						})
					}
				}else if(data.messageCode==132){
					// app没有绑定微信小程序的时候
					this.globalData.unionId = data.data.unionid;
					if(this.weburl){
						app.globalData.navigateBackUrl = `/pages/webview/webview?url=${this.weburl}&type=share`
					}
					wx.reLaunch({
						url:'/pages/login/login'
					})
					
				}
			})
		}
  }
})
