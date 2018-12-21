var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
		//首页轮播设置
		indicatorDots:false,
		indicatorColor:"#fff",
		indicatorActiveColor:"#000",
		autoplay: true,
		interval: 3000,
		duration: 500,
		circular:true,
		giftcards:[
			{
				"Id":7,
				"Cardid":"pK4mvwgBbP2l0-1TSNzc7k1EkR0E",
				"Imgurl":"https://scrm.cnt-ad.net/static/images/upload/zlsdccsg.jpg",
				"Name":"在路上 · 享纯粹",
				"Fromid":1,
				"Createtime":0,
				"Descn":"","Orders":1,
			},
			{"Id":5,"Cardid":"pK4mvwp-p7H5VtuyD93j6iWPk5NY","Imgurl":"https://scrm.cnt-ad.net/static/images/upload/phsphc.jpg","Name":"品好水泡好茶","Fromid":1,"Createtime":0,"Descn":"","Orders":2},{"Id":3,"Cardid":"pK4mvwokiXEOchmmpGj9_xfznIlk","Imgurl":"https://scrm.cnt-ad.net/static/images/upload/yyzzccsk.jpg","Name":"此刻净享纯粹","Fromid":1,"Createtime":0,"Descn":"","Orders":3},{"Id":2,"Cardid":"pK4mvwsmOs6zq2m1RxyDkaDsZFfY","Imgurl":"https://scrm.cnt-ad.net/static/images/upload/jxndccsg.jpg","Name":"专属你的纯粹时刻","Fromid":1,"Createtime":0,"Descn":"","Orders":4},{"Id":4,"Cardid":"pK4mvwji03N87uNRcYuYK9rcc3R4","Imgurl":"https://scrm.cnt-ad.net/static/images/upload/ins.jpg","Name":"INS女王","Fromid":1,"Createtime":0,"Descn":"","Orders":5},{"Id":6,"Cardid":"pK4mvwgmbTIcmJpvXtgt_UO4v9Rk","Imgurl":"https://scrm.cnt-ad.net/static/images/upload/pwshysg.jpg","Name":"品味生活的仪式感","Fromid":1,"Createtime":0,"Descn":"","Orders":6}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		/*
		@RequestParam(required = true, value = "code") String code,
    @RequestParam(required = true, value = "cardId"
		*/
	 wx.login({
	 	success:res=>{
			app.postRequest('/rest/user/getCardSign',{
				code:res.code,
				cardId:'pCJDe0xjBeumLFAzWzEpAIBz0_eA'},data=>{
				wx.addCard({
					cardList: [
						{
							cardId: 'pCJDe0xjBeumLFAzWzEpAIBz0_eA',
							cardExt: `{"code":'', "openid": "", "timestamp": ${data.data.timestamp}, "signature":${data.data.signature}}`
						}
					],
					success(res) {
						console.log(res,'00')
						console.log(res.cardList) // 卡券添加结果
					},
					fail:error=>{
						console.log(error,'----')
					}
				})
			})
		}
	 })
		
  },


	
   /* 生命周期函数--监听页面初次渲染完成
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

/*

//获取应用实例
var app = getApp()
var userInfo = app.globalData.userInfo
var giftcards = app.globalData.giftcards
var utils = require('../../utils/util.js')
Page({
  data: {
    //首页轮播设置
    indicatorDots:false,
    indicatorColor:"#fff",
    indicatorActiveColor:"#000",
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular:true,
  },
  //点击卡面
  bindViewCoffeeOnMe: function (event){
    var Cardid = event.currentTarget.id
    var fromid=event.currentTarget.dataset.fromid
    var giftcards = this.data.giftcards
    var selCards={}
    for (let i in giftcards){
      if (giftcards[i].Id == Cardid){
        selCards.Id = giftcards[i].Id
        selCards.Cardid = giftcards[i].Cardid
        selCards.Imgurl = giftcards[i].Imgurl
        selCards.Name = giftcards[i].Name
        selCards.Fromid = giftcards[i].Fromid
      }
    }
    var selCards = JSON.stringify(selCards)
    wx.navigateTo({
      url: '../detail/detail?Cardid=' + Cardid + '&selCards=' + selCards + '&fromid=' + fromid
    })
  },
  //点击购买历史
  buyhistory:function(){
    wx.navigateTo({
      url: '../history/history',
    })
  },
  
  onLoad: function (options) {
    //从服务器获取banner
    utils.request('/voss/service/banner',{},(res)=>{
      this.setData({
        bannerImg: res.data
      })
      if (this.data.bannerImg.length > 1) {
        this.setData({
          indicatorDots: true
        })
      }
    })
    //从服务器获取卡面信息
    utils.request('/voss/service/cardlist',{},(res)=>{
      this.setData({
        giftcards: res.data
      })
    })
  },
  
  onLaunch: function () {
    wx.showShareMenu({
      withShareTicket: true //设置为false即可
    })
  },

  onShareAppMessage: function () {
    return utils.transmit()
  }
})



*/