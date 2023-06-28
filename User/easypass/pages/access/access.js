// pages/access/access.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    proCards: null,
    guestCards: null
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
    var that = this;
    wx.request({
      url: 'https://cneasypass.cn/user/access.php?code=12140',
      data: {
        account_id: app.globalData.account_id
      },
      success: function (res) {
        that.setData({
          proCards: res.data
        });
      }
    });
    wx.request({
      url: 'https://cneasypass.cn/user/access.php?code=12141',
      data: {
        account_id: app.globalData.account_id
      },
      success: function (res) {
        that.setData({
          guestCards: res.data
        });
      }
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

  },

  qrcodeCard(event){
    wx.navigateTo({
      url: '/pages/qrcode/qrcode?id='+event.currentTarget.dataset.id
    })
  },

  onChange(event) {
    wx.redirectTo({
      url: '/pages/index/index',
    })
  }
})