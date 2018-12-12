var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
		bindList:[],
		defaultIndex:0
  },
	// 选择绑定银行
	selectBank:function(){
		
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		let formData = {
			userId: 4669,//app.globalData.myUserInfo.id,
			token : '8b2b26b329fde0dd9153cf75e8ecabf8'// app.globalData.myUserInfo.token
		}
		app.postRequest('/rest/drawcash/card_list',formData,data=>{
			console.log(data)
			if(data.messageCode==900){
				this.setData({
					bindList:data.data
				})
			}else{
				wx.showToast({
					title: data.message,
					icon: 'none',
					duration: 2000
				})
			}
		})
		
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