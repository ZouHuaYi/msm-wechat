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
			alertSelect:[{"hospital":"医院","icon":"icon-yiyuan","list":[]},{"hospital":"美容院","icon":"icon-yiyuan-2","list":[]}],
			alertStatus:false,
			animationData:{},
			opacityData:{}
	},
	// 跳转到购买页
	goToPay:function(e){
		let hospitalId = e.currentTarget.dataset.hospitalid;
		console.log(e)
		wx.navigateTo({
			url:"/pages/buyShop/shopList/shopList?hospitalid="+hospitalId
		})
	},
	// 调转到我的推广页
	gotoScanMak:function(e){
		let {pid,hospitalid,title} = e.currentTarget.dataset;
		wx.navigateTo({
			url:`/pages/promteCode/promteCode?pId=${pid}&hospitalId=${hospitalid}&myApp=myApp`
		})
	},
	// 恢复原来的状态
	initSelectStatus:function(){
		let {animation,opacity} = this;
		opacity.opacity(0).step();
		animation.translateY("100%").step();
		this.setData({
			opacityData: opacity.export(),
			animationData:animation.export()
		})
		setTimeout(()=>{
			this.setData({
				alertStatus:false
			})
		},500)
	},
	// 弹出选择 医院列表
	changeAlert:function(){
		let {alertStatus} = this.data,{animation,opacity} = this;
		this.setData({
			alertStatus:!alertStatus
		})
		opacity.opacity(1).step();
		animation.translateY(0).step();
		 this.setData({
			 opacityData: opacity.export(),
			animationData: animation.export()
		})
		
	},
	// 选择医院的函数
	selectFun:function(e){
		let key = e.currentTarget.dataset.key;
		let {allShowData,alertSelect} = this.data;
		alertSelect = alertSelect.map((data,ke)=>{
			data.list = data.list.map((el,k)=>{
				el.select = el.key==key?true:false;
				return el;
			})
			return data;
		})
		this.setData({
			alertSelect:alertSelect
		})
		this.renderFun(allShowData[key]);
		this.initSelectStatus();
	},
	// 渲染现在的数据
	renderFun:function(data){
		app.globalData.recommended = data.pUserNickname;
		this.setData({
			newShowData:data
		})
		wx.setNavigationBarTitle({
			title: data.hospitalName
		})
	},
	// 获取用户信息
	gainAllData:function(userId,token){
		let pack = ['无','A','B','C','D','E','F','G','H','I','K','L','M','N'];
		let grade =['一','二','三','四','五','六','七','八','九','十'];
		let formData={
			"userId":userId,
			"token":token
		}
		wx.showLoading({
			title:"正在加载",
			mask:true
		})
		let alertSelect = this.data.alertSelect;
		app.postRequest('/rest/distribution/home',formData,data=>{
			wx.hideLoading();
			if(data.messageCode==900){
					this.setData({
						allShowData:data.data.map((data,key)=>{
							data.pack = pack[data.packageType]+'套餐';
							if(data.gradeText>0){
								data.gradeText = grade[data.grade-1]+'星级';
							}
							alertSelect[data.hospitalType].list.push({
								"title":data.hospitalName,
								"key":key,
								"select":key==0?true:false
							})
							return data;
						})
					})
					this.setData({
						alertSelect:alertSelect
					})
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
    * 生命周期函数--监听页面加载
    */
	onLoad: function (options) {
		if(app.globalData.myUserInfo){
			this.gainAllData(app.globalData.myUserInfo.id,app.globalData.myUserInfo.token)
		}else{
			app.userInfoReadyCallback = info => {		
				this.gainAllData(info.id,info.token)
			}
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
	    this.animation = wx.createAnimation({
		  duration: 200,
		  timingFunction: 'ease',
		})
		this.opacity = wx.createAnimation({
		  duration: 200,
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