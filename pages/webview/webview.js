var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
		linkUrl:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		let {hospitalId,myApp,pId,url,type} = options,token = app.globalData.myUserInfo.token;;
		if(type=='share'){
			// 分享的是时候打开页面
			url = decodeURIComponent(url);
			this.setData({
				linkUrl:url+'&token='+ token
			})
		}else if(myApp=='myApp'){
			// 这里如果是 myApp 判断是否有token值 ，如果没有则跳转到登陆页
			let linkUrl = `${app.globalData.root_url}/distribution.html?hospitalId=${hospitalId}&pId=${pId}&token=${token}&isXiaoCX=isXiaoCX`;
			this.relink = `${app.globalData.root_url}/distribution.html?hospitalId=${hospitalId}&pId=${pId}&isXiaoCX=isXiaoCX`
			this.setData({
				linkUrl:linkUrl
			})
		}
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
		let url = encodeURIComponent(this.relink);
		let shareObject={
				path:`pages/index/index?url=${url}&type=share`,
				success:function(){}
		}
		return shareObject;
  }
})