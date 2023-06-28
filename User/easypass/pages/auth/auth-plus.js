// pages/auth/auth-detail.js
import Toast from '../../dist/toast/toast';
import Dialog from '../../dist/dialog/dialog';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    minHour: 0,
    maxHour: 23,
    minDate: new Date().getTime(),
    currentDate: '12:00',
    loading: false,
    timeEnd: "",
    timeBegin: "",
    timePicker: false,
    timeSelect: 0,
    times: 1,
    user: {
      state: false,
      name: "",
      id: 0,
      account: ""
    },
    community: {
      state: false,
      value: 1,
      name: "",
      loading: true,
      values: {},
      id: 0,
      communityList: [],
      proprietorList: []
    },
    selected: {
      guest:null,
      proprietor_id:null,
      begin_time:null,
      end_time:null,
      times:1
    },
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
    wx.request({
      url: 'https://cneasypass.cn/user/auth.php?code=12121',
      data:
      {
        account_id: app.globalData.account_id,
        state: 0
      },
      success: function (res) {
        for(var i = 0; i < res.data.length; i++){
          that.data.community.communityList[i] = res.data[i].community_name;
          that.data.community.proprietorList[i] = res.data[i].id;
        }
        that.setData({
          ['community.communityList']: that.data.community.communityList
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
      default: ;
        return '';
    }
  },
  timeBeginPickerShow() {
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
  timePick(event) {
    const { detail, currentTarget } = event;
    const result = this.getResult(detail, currentTarget.dataset.type);
    if (this.data.timeSelect == 0) {
      this.setData({
        timeBegin: result,
        timePicker: false,
        [`selected.begin_time`]: this.getResult(detail, 'mysql')
      });
    } else {
      this.setData({
        timeEnd: result,
        timePicker: false,
        [`selected.end_time`]: this.getResult(detail, 'mysql')
      });
    }
  },
  timeCancel() {
    this.setData({
      timePicker: false
    });
  },
  onTimesChange(event) {
    this.setData({
      times: event.detail,
      [`selected.times`]: event.detail
    });
  },

  onSubmit() {
    var that = this;
    Dialog.confirm({
      title: '提醒',
      message: '是否添加该授权信息'
    }).then(() => {
     
      var time1 = new Date(this.data.selected.begin_time);
      var time2 = new Date(this.data.selected.end_time);
      // on confirm
      if(this.data.selected.guest == null){
        Toast('用户不存在!');
      } else if (this.data.selected.proprietor_id == null)
      {
        Toast('未选择小区!');
      } else if (this.data.selected.begin_time == null || this.data.selected.end_time == null)
      {
        Toast('访问限制时间未设定!');
        
      }else if (time1.getTime() >= time2.getTime()){
        Toast('结束时间必须大于开始时间!');
      }else{
        const toast = Toast.loading({
          duration: 0,       // 持续展示 toast
          mask: true,
          forbidClick: true, // 禁用背景点击
          message: '请稍后',
          loadingType: 'spinner',
          selector: '#custom-selector'
        });
        wx.request({
          url: 'https://cneasypass.cn/user/auth.php?code=12123',
           data:
           {
             guest_id: that.data.selected.guest,
             proprietor_id: that.data.selected.proprietor_id,
             begin_time: that.data.selected.begin_time,
             end_time: that.data.selected.end_time,
             times: that.data.selected.times
           },
           success: function(res)
           {
             if(res.data==-1){
               toast.clear();
               Toast("出现未知错误，授权失败");  
             } else if (res.data == -2){
               toast.clear();
               Toast("该用户已被您授权，请勿重复添加!");  
             }else{
               console.log(res.data);
               toast.clear();
               Toast("授权成功");
               that.sleep(1000);
               wx.redirectTo({
                 url: '/pages/auth/auth',
               })
             }
           }
        })
      }
      
     // wx.redirectTo({ url: "/pages/auth/auth" });
    }).catch(() => {
      // on cancel
    });
  },

  communityToggle() {
    this.setData({
      [`community.state`]: !this.data.community.state
    });
  },

  communityTogglePopup() {
    this.communityToggle();
  },

  communityClosePopup() {
    this.setData({
      [`community.name`]: this.data.community.values.value
    })
  },

  onCommunityChange(event) {
    const { value, index } = event.detail;
    this.data.community.values = { value, index };
    Toast(`Value: ${value}, Index：${index}`);
  },
  onCommunityConfirm(event) {
    const { value, index } = event.detail;
    this.data.community.values = { value, index };
    this.communityToggle();
    this.setData({
      [`community.name`]: value,
      [`selected.proprietor_id`]:  parseInt(this.data.community.proprietorList[index])
    })
  },
  onCommunityCancel(event) {
    this.communityToggle();
  },

  userCheck(event){
    var that = this;
    wx.request({
      url: 'https://cneasypass.cn/user/auth.php?code=12122',
      data:{
        login_name: event.detail.value
      },
      success: function(res){
        if(res.data == -2){
          that.data.selected.guest = null;
          Toast('该用户不存在，可以在\'我的\'界面中获取用户ID');
        }else{
          that.data.selected.guest = res.data;
        }
      }
    })
  },
  sleep(delay) {
    var start = (new Date()).getTime();
    while((new Date()).getTime() - start < delay) {
   continue;
  }
 }
})