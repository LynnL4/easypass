// pages/community/community.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeName: '',
    community_auth: null,
    community_authing: null,
    community_reject: null
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
      url: 'https://cneasypass.cn/user/auth.php?code=12121',
      data:
      {
        account_id: app.globalData.account_id,
        state: 0
      },
      success: function (res) {
        that.setData({
          community_auth:  res.data
        });
      }
    })
    wx.request({
      url: 'https://cneasypass.cn/user/auth.php?code=12121',
      data:
      {
        account_id: app.globalData.account_id,
        state: 1
      },
      success: function (res) {
        that.setData({
          community_authing: res.data
        });
      }
    })
    wx.request({
      url: 'https://cneasypass.cn/user/auth.php?code=12121',
      data:
      {
        account_id: app.globalData.account_id,
        state: 2
      },
      success: function (res) {
        that.setData({
          community_reject: res.data
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

  onChange(event) {
    this.setData({
      activeName: event.detail
    });
  },
  onPlus(event) {
    wx.navigateTo({
      url: '/pages/community/community-plus',
    })
  }
})