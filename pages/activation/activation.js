const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
		//首页轮播设置
		indicatorDots:false,
		indicatorColor:"#fff",
		indicatorActiveColor:"#000",
		banner:[],
		autoplay: true,
		interval: 3000,
		duration: 500,
		circular:true,
		giftcards:[]
  },
	// 跳转到相应的详细页
	bindViewCoffeeOnMe:function(e){
		let {hospitalid,cardid,imgurl} = e.currentTarget.dataset;
		wx.navigateTo({
			url:`./detail/detail?hospitalid=${hospitalid}&cardid=${cardid}&imgurl=${encodeURIComponent(imgurl)}`
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		app.userInfoReadyCallback = res =>{
			app.postRequest('/rest/client/packageCouponList',{token:app.globalData.myUserInfo.token},data=>{
				if(data.messageCode==900){
					this.setData({
						giftcards:data.data.couponList
					})
				}
			})
		}
		
		app.postRequest('/rest/banner/list',{
			"page":1,
			"rows":10,
			"position":0
		},data=>{
			console.log(data);
			if(data.messageCode==900){
				this.setData({
					banner:data.data
				})
			}
			
		})
		
		
  }
})

