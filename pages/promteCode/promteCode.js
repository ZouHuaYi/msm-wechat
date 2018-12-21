var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
		statusNowTime:0, // 0 正在加载的时候 1 点击加入 2 我的二维码页 
  },
	// 获取小程序二维码
	getQrCodeData:function(pId,hospitalId){
		app.postRequest('/rest/user/getAppletCodeUrl',{pId:pId,hospitalId:hospitalId,page:'/pages/promteCode/promteCode'},data=>{
			if(data.messageCode==900){
				this.setData({
					codeUrl:data.data.codeUrl
				})
			}
		})
		
	},
	// 获取医院的hospital 
	getHospitalData:function(pId,hospitalId){
		wx.showLoading({
			title:"正在加载"
		})
		app.postRequest('/rest/team/getpUserAndHospital',{pId:pId,hospitalId:hospitalId},data=>{
			wx.hideLoading();
			if(data.messageCode==900){
				this.setData({
					hospital_logo:data.data.hospital_logo,
					hospital_name:data.data.hospital_name
				})
			}else{
				wx.showToast({
					title:'无法获取医院信息',
					icon:'none',
					duration:3000
				})
				setTimeout(()=>{
					wx.navigateBack();
				},3000)
			}
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		if(options.myApp=='myApp'){
			let {avatar,nickname,id} = app.globalData.myUserInfo;
			wx.setNavigationBarTitle({
				title:"推广二维码",
			})
			this.setData({
				nickname:nickname,
				statusNowTime:2,
				avatar:avatar?avatar:'../../assets/default.png'
			})
			this.getHospitalData(id,options.hospitalId);
			this.getQrCodeData(id,options.hospitalId);
		}
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