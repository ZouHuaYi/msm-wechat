var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
		shopList:[],
		grade:['无','A','B','C','D','E','F','G','H','I','K','L','M','N'],
		shopHospital:{}
  },
	// 去列表详情
	gotoDetail:function(e){
		let {index,id} = e.currentTarget.dataset;
		wx.navigateTo({
			url:'../shopDetail/shopDetail?id='+id
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		let {id,token} = app.globalData.myUserInfo;
		app.postRequest("/rest/distribution/hospital_package",{
			userId:id,
			hospitalId:options.hospitalid,
			token:token
		},data=>{
			if(data.messageCode==900){
				if(data.data&&data.data.length>0){
					this.setData({
						shopList:data.data
					})
				}
				console.log(this.data.shopList)
			}else{
				wx.showToast({
					title: data.message,
					icon: 'none',
					duration: 2000
				})
			}
		})
  }
})