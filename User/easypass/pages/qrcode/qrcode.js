// pages/qrcode/qrcode.js
import drawQrcode from '../../utils/weapp.qrcode.js'
import Notify from '../../dist/notify/notify';

Page({

  /**
   * 页面的初始数据
   */
  data: {
   id: null,
   dynamic_code: null,
   setInter: '',
   getState:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id;
    this.update();
    this.startSetInter();
    this.startGetState();
  },

  startSetInter: function () {
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function () {
        wx.request({
          url: 'https://cneasypass.cn/user/access.php?code=12142',
          data: {
            authority_id: that.data.id
          },
          success: function (res) {
            that.data.dynamic_code = that.data.id + '&' + res.data;
            drawQrcode({
              width: 240,
              height: 240,
              x: 20,
              y: 20,
              canvasId: 'myQrcode',
              text: that.data.dynamic_code,
              callback(e) {
              }
            })
          }
        });
      }
      , 60000);
  },

  startGetState: function () {
    var that = this;
    //将计时器赋值给setInter
    that.data.getState = setInterval(
      function () {
        wx.request({
          url: 'https://cneasypass.cn/user/access.php?code=12143',
          data: {
            authority_id: that.data.id
          },
          success: function (res) {
            if(res.data[0].state == 0){
              Notify({
                text: '扫描成功',
                selector: '#van-notify',
                backgroundColor: '#5af580'
              });
                that.sleep(1000);
                wx.navigateBack({
                  
                })
            }
          }
        });
      }
      , 1000);
  },

  update()
  {
    var that = this;
    wx.request({
      url: 'https://cneasypass.cn/user/access.php?code=12142',  
      data: {
        authority_id: this.data.id
      },
      success: function (res) {
        that.data.dynamic_code = that.data.id + '&' + res.data;
        drawQrcode({
          width: 240,
          height: 240,
          x: 20,
          y: 20,
          canvasId: 'myQrcode',
          text: that.data.dynamic_code,
          callback(e) {
          }
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
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter);
    clearInterval(that.data.getState);
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

  onReturn(){
    wx.navigateBack();
  },

  sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
      continue;
    }
  }
})