// pages/index/blank.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeName:'',
    selfRecord:null,
    guestRecord:null,
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
      url: 'https://cneasypass.cn/user/record.php?code=14140',
      data: {
        account_id: app.globalData.account_id
      },
      success: function (res) {
        that.setData({
          selfRecord: res.data
        });
      }
    })
    wx.request({
      url: 'https://cneasypass.cn/user/record.php?code=14141',
      data: {
        account_id: app.globalData.account_id
      },
      success: function (res) {
        that.setData({
          guestRecord: res.data
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
  onReturn() {
    wx.redirectTo({
      url: '/pages/access/access',
    })
  },

  onChange(event) {
    this.setData({
      activeName: event.detail
    });
  },
})