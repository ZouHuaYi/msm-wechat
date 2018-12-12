import {postRequest} from '../../../utils/ajax.js'; 
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
		type:'',
		bankcardNo:'',
		ower:'',
		phone:'',
		code:'',
		verfiyCode:'获取验证码'
  },
	// 提交数据
	formSubmit:function(e){
		if (!this.WxValidate.checkForm(e)) {
			const error = this.WxValidate.errorList[0]
			wx.showToast({
				title: `${error.msg}`,
				icon: 'none',
				duration: 2000
			})
			return false
		}
		let formData = e.detail.value;
		formData.userId = 4669 //app.myUserInfo.id;
		formData.token = 'daa61f5fab98605bedf59bd6e5b4ba27' //app.myUserInfo.token;
		app.postRequest('/rest/drawcash/add_card',formData,data=>{
			if(data.messageCode==900){
				wx.showToast({
					title: '绑定成功',
					icon: 'success',
					duration: 2000
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
	// 绑定手机 验证吗 密码
	bindAllInput:function(e){
		let status = e.currentTarget.dataset.status;
		this.setData({
			[status]:e.detail.value
		})
	},
	// 发送验证码
	sendCode:function(){
		let {phone,verfiyCode} = this.data;
		if(!/^1\d{10}$/.test(phone)){
			wx.showToast({
				title: '请输入正确的手机号码',
				icon: 'none',
				duration: 2000
			})
			return;
		}
		if(this.clickStatus) return;
		this.clickStatus = true;
		postRequest('/rest/user/send_code',{type:2,phone:phone},(data)=>{
			if(data.messageCode==900){
				wx.showToast({
					title: '发送成功',
					icon: 'success',
					duration: 2000
				})
				let tim = 60;
				let timStatus = setInterval(()=>{
					tim -= 1;
					this.setData({
						verfiyCode:`${tim}后重试`
					})
					if(tim<=0){
						clearInterval(timStatus);
						this.clickStatus = false;
						this.setData({
							verfiyCode:'获取验证码'
						})
					}
				},1000)	
			}else{
				this.clickStatus = false;
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
		this.WxValidate = app.wxValidate({
			type: {
				name:true,
				required: true
			},
			bankcardNo:{
				required:true,
				rangelength:[13,19]
			},
			ower:{
				required: true
			},
			phone: {
				required: true,
				tel: true,
			},
			code:{
				required: true
			},
			
		},{
				type: {
					required: '银行类型不能为空'
				},
				bankcardNo:{
					required: '银行卡号不能为空',
					rangelength: '银行卡号格式不正确'
				},
				ower:{
					required: '持卡人不能为空'
				},
				phone: {
					required: '请填写您的手机号',
					tel:'电话号码格式不正确'
				},
				code:{
					required: '验证码不能为空'
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