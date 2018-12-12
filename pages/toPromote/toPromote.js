var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
			navlist:[
				{
					"title":"我的团队",
					"icon":"../../assets/me.png"
				},
				{
					"title":"消费记录",
					"icon":"../../assets/buys.png"
				},
				{
					"title":"退押明细",
					"icon":"../../assets/backbco.png"
				},
				{
					"title":"免费明细",
					"icon":"../../assets/free.png"
				},
				{
					"title":"重销明细",
					"icon":"../../assets/monney.png"
				},
				{
					"title":"奖励明细",
					"icon":"../../assets/give.png"
				}
			],
			newShowData:{},
			allShowData:[],
			multiArray: [['医院', '美容院'],['圣丹福“美丽天使”VIP-红钻套餐',3,4,5,6,7,8,0,9]],
			multiIndex: []
	},
	bindMultiPickerChange(e) {
		console.log('改变第一个', e.detail.value)
		this.setData({
			multiIndex: e.detail.value
		})
	},
	// 渲染现在的数据
	renderFun:function(data){
		this.setData({
			newShowData:data
		})
		wx.setNavigationBarTitle({
			title: data.hospitalName
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		let pack = ['无','A','B','C','D','E','F','G','H','I','K','L','M','N'];
		let grade =['一','二','三','四','五','六','七','八','九','十'];
		let formData={
			// latitude=22.984948&userId=4669&longitude=113.380914&token=42778d9a2b2f41312f095da02c6f8507
			"userId":4669,
			"token":"42778d9a2b2f41312f095da02c6f8507"
		}
		
		app.postRequest('/rest/distribution/home',formData,data=>{
			if(data.messageCode==900){
					this.setData({
						allShowData:data.data.map((data,key)=>{
							data.pack = pack[data.packageType]+'套餐';
							if(data.gradeText>0){
								data.gradeText = grade[data.grade-1]+'星级';
							}
							return data;
						})
					})
					console.log(this.data.allShowData);
					this.renderFun(this.data.allShowData[0])
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