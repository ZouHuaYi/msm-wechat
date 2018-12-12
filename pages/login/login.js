var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
		animationPhone:{},
		animationPass:{},
		phoneType:false,
		passwType:false,
		phone:'',
		passw:''
  },
	// 登录 接口
	loginHandler:function(){
		let {phone,passw} = this.data;
		app.postRequest('/rest/user/login',{
			phone:phone,
			password:passw
		},data=>{
			if(data.messageCode==900){
				app.globalData.myUserInfo = data.data
			}else{
				wx.showToast({
					title: data.message,
					icon: 'none',
					duration: 2000
				})
			}
		})
		
	},
	// 绑定手机 验证吗 密码
	bindAllInput:function(e){
		let status = e.currentTarget.dataset.status
		this.setData({
			[status]:e.detail.value
		})
	},
	// 点击电话的时候
	phoneClick:function(){
		let that = this;
		that.animation.scale(0.8,0.8).translate(0,-40).step();
		this.setData({
			phoneType:true,
			animationPhone:that.animation.export()
		})
	},
	// 点击密码部分
	passwClick:function(){
		let that = this;
		that.animation.scale(0.8,0.8).translate(0,-40).step();
		this.setData({
			passwType:true,
			animationPass:that.animation.export()
		})
	},
	// 密码失去焦点
	passwBlur:function(e){
		this.setData({
			passwType:false
		})
		if(e.type=='blur' && e.detail.value) return;
		let that = this;
		that.animation.scale(1,1).translate(0,0).step();
		this.setData({
			animationPass:that.animation.export()
		})
	},
	// 电话失去焦点
	phoneBlur:function(e){
		this.setData({
			phoneType:false
		})
		if(e.type=='blur' && e.detail.value) return;
		let that = this;
		that.animation.scale(1,1).translate(0,0).step();
		this.setData({
			animationPhone:that.animation.export()
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
		 this.animation = wx.createAnimation({
      duration: 200,
			transformOrigin:'0% 50% 0',
  	  timingFunction: 'ease',
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})