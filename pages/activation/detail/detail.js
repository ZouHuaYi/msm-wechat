const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
		flag:false,
		hospitalImg:null,
		packages:[],
		oneList:{},
		monney:0,
		totalNum:0
  },
	//购买产品
	buyShop:function(e){
		if(this.data.totalNum<=0){
			wx.showToast({
				title: '请选择套餐',
				icon: 'none',
				duration: 2000
			})
			return;
		}
		let packageId = e.currentTarget.dataset.id;
	
	
		app.postRequest('/rest/client/CouponPlaceOrder',{
			token:app.globalData.myUserInfo.token,
			buyUserId:app.globalData.myUserInfo.id,
			couponId:this.cardid,
			packageId:packageId,
			count:this.data.totalNum
		},data=>{
			console.log(data);
			if(data.messageCode==900){
				app.postRequest('/rest/client/buyCouponOrder',{
					orderNumber:data.data.orderNumber,
					body:"购买激活卡",
					subject:"购买激活卡"
				},resd=>{
					if(data.messageCode==900){
						
						wx.requestPayment({
							timeStamp: '',
							nonceStr: '',
							package: '',
							signType: 'MD5',
							paySign: '',
							success(res) {
								
							},
							fail(res) { }
						})
					}else{
						wx.showToast({
							title: resd.message,
							icon: 'none',
							duration: 2000
						})
					}
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
	// 关闭详情页
	shut:function(){
		this.setData({
			flag:false
		})
	},
	// 查看详情页
	detailClick:function(e){
			let index = e.currentTarget.dataset.index;
			let oneList = this.data.packages[index];
			this.setData({
				flag:true,
				oneList:oneList
			})
	},
	// 选择对应卡套餐
	selectCard:function(e){
		let {index,price,reduce} = e.currentTarget.dataset;
		let packages = this.data.packages;
		let number = 0;
		packages = packages.map((el,key)=>{
			if(key!=index){
				el.number = 0
			}
			return el
		})
		if(reduce){
			packages[index].number = packages[index].number>0?packages[index].number-1:0;
		}else{
			packages[index].number = packages[index].number>0?packages[index].number+1:1;
		}
		number = packages[index].number;
		console.log((parseFloat(number))*(parseFloat(price)),price)
		this.setData({
			packages:packages,
			totalNum:number,
			oneList:packages[index],
			monney:(parseFloat(number))*(parseFloat(price))
		})
	},
	/**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {
		if(options.hospitalid){
			this.cardid = options.cardid;
			this.setData({
				hospitalImg:decodeURIComponent(options.imgurl)
			})
			app.postRequest('/rest/client/couponHospitalPackages',{
				 hospitalId:options.hospitalid,
				 token:app.globalData.myUserInfo.token,
				},data=>{
				if(data.messageCode==900){
					this.setData({
						packages:data.data
					})
				}
			})
		}
		
  }
})

