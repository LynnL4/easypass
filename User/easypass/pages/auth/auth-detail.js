// pages/auth/auth-detail.js
import Toast from '../../dist/toast/toast';
import Dialog from '../../dist/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    username: "",
    community: "",
    minHour: 0,
    maxHour: 23,
    minDate: new Date().getTime(),
    currentDate: '12:00',
    loading: false,
    timeEnd: null,
    timeBegin: null,
    timePicker: false,
    timeSelect: 0,
    times: null
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id;
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
    const toast = Toast.loading({
      duration: 0,       // 持续展示 toast
      mask: true,
      forbidClick: true, // 禁用背景点击
      message: '请稍后',
      loadingType: 'spinner',
      selector: '#custom-selector'
    });
    wx.request({
      url: 'https://cneasypass.cn/user/auth.php?code=12125',
      data: {
        auth_id: this.data.id
      },
      success: function (res) {

        that.setData({
          username: res.data[0].login_name,
          community: res.data[0].community_name,
          timeBegin: res.data[0].time_limit_start,
          timeEnd: res.data[0].time_limit_end,
          times: res.data[0].times
        });
        toast.clear();
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


  onTimeChange(event) {

   
  },

  onInput(event) {
    const { detail, currentTarget } = event;
    const result = this.getResult(detail, currentTarget.dataset.type);
    Toast(result);
  },

  getResult(time, type) {
    const date = new Date(time);
    switch (type) {
      case 'datetime':
        return date.toLocaleString();
      case 'date':
        return date.toLocaleDateString();
      case 'year-month':
        return `${date.getFullYear()}/${date.getMonth() + 1}`;
      case 'time':
        return time;
      case "mysql":
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      default:
        return '';
    }
  },
  timeBeginPickerShow(){
    this.setData({
      timePicker: true,
      timeSelect: 0
    });
  },
  timeEndPickerShow() {
    this.setData({
      timePicker: true,
      timeSelect: 1
    });
  },
  timePick(event){
   const { detail, currentTarget } = event;
    const result = this.getResult(detail, 'mysql');
   if(this.data.timeSelect == 0){
     this.setData({
       timeBegin: result,
       timePicker: false
     });
   }else{
     this.setData({
       timeEnd: result,
       timePicker: false
     });
   }
  },
  timeCancel(){
    this.setData({
      timePicker: false
    });
  },
  onTimesChange(event){
    this.setData({
      times: event.detail
    });
  },

  onChange(){
    var that = this;

    var time1 = new Date(this.data.timeBegin);
    var time2 = new Date(this.data.timeEnd);
    if (time1.getTime() >= time2.getTime()) {
      Toast('结束时间必须大于开始时间!');
    }else{
      Dialog.confirm({
        title: '提醒',
        message: '是否更改该授权信息'
      }).then(() => {
        const toast = Toast.loading({
          duration: 0,       // 持续展示 toast
          mask: true,
          forbidClick: true, // 禁用背景点击
          message: '请稍后',
          loadingType: 'spinner',
          selector: '#custom-selector'
        });
        wx.request({
          url: 'https://cneasypass.cn/user/auth.php?code=12126',
          data:
          {
            auth_id: this.data.id,
            begin_time: this.data.timeBegin,
            end_time: this.data.timeEnd,
            times: this.data.times
          },
          success: function (res) {
            if (res.data == 0) {
              toast.clear();
              Toast("修改成功");
              that.sleep(1000);
              wx.redirectTo({
                url: '/pages/auth/auth',
              });
            } else {
              toast.clear();
              Toast("出现未知错误，修改失败");
            }
          }
        })
      }).catch(() => {
        // on cancel
      });
    }
  },
  onDelete(){
    var that = this;
    Dialog.confirm({
      title: '提醒',
      message: '是否删除该授权信息'
    }).then(() => {
      const toast = Toast.loading({
        duration: 0,       // 持续展示 toast
        mask: true,
        forbidClick: true, // 禁用背景点击
        message: '请稍后',
        loadingType: 'spinner',
        selector: '#custom-selector'
      });
      wx.request({
        url: 'https://cneasypass.cn/user/auth.php?code=12127',
        data:
        {
          auth_id: this.data.id,
        },
        success: function (res) {
          if (res.data == 1) {
            toast.clear();
            Toast("删除授权成功");
            that.sleep(1000);
            wx.redirectTo({
              url: '/pages/auth/auth',
            });
          } else {
            toast.clear();
            Toast("出现未知错误，删除失败");
          }
        }
      })
      
    }).catch(() => {
      // on cancel
    });

  },
  sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
      continue;
    }
  }
})