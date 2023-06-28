// pages/community/community-plus.js
import Toast from '../../dist/toast/toast';
import Dialog from '../../dist/dialog/dialog';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    area: {
      state: false,
      value: 440400,
      name: "",
      loading: true,
      values: {},
      areaList: {},
    },
    community: {
      state: false,
      value: 1,
      name: "",
      loading: true,
      values: {},
      communityList: [],
      community_id: []
    },

    build: {
      state: false,
      value: 1,
      name: "",
      loading: true,
      values: {},
      buildList: []
    },

    floor: {
      state: false,
      value: 1,
      name: "",
      loading: true,
      values: {},
      floorList: []
    },
    number: {
      state: false,
      value: 1,
      name: "",
      loading: true,
      values: {},
      numberList: [],
      number_id: []
    },
    selected:{
      id: null,
      area_code: null,
      community_id: null,
      building: null,
      floor: null,
      number: null
    }
  
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
    wx.request({
      url: 'https://cneasypass.cn/user/region.json',
      success: response => {
        this.setData({
          [`area.loading`]: false,
          [`area.areaList`]: response.data.data
        });
      }
    });
  },

  areaToggle() {
    this.setData({
      [`area.state`]: !this.data.area.state
    });
  },

  onAreaChange(event){
    const { values } = event.detail;
    this.data.area.values = values;
    Toast(values.map(item => item.name).join('-'));
  },
  onAreaConfirm(event) {
    const { values } = event.detail;
    this.data.area.values = values;
    this.areaToggle();
    this.setData({
      [`area.name`]: values.map(item => item.name).join('-'),
      [`community.name`]: null,
      [`build.name`]: null,
      [`floor.name`]: null,
      [`number.name`]: null
    })
    this.data.selected.area_code = values[2].code;
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
      url: 'https://cneasypass.cn/user/residence.php?code=10144',
      data: {
          area_code: values[2].code
      },
      success: function(res){
        that.data.selected.id = null;
        that.data.community.communityList = [];
        that.data.community.community_id = [];
        that.data.build.buildList = [];
        that.data.floor.floorList = [];
        that.data.number.numberList = [];
        that.data.number.number_id = [];
        for (var i=0; i < res.data.length; i++) {
          that.data.community.communityList[i] = res.data[i].community_name;
          that.data.community.community_id[i] = res.data[i].id;
        }
        that.setData({
          [`community.communityList`]: that.data.community.communityList
        });
        toast.clear();
        if (res.data.length == 0) {
            Toast('该地区还未开通');
        }
      }
    });
  },
  onAreaCancel(event) {
    const { values } = event.detail;
    this.areaToggle();
  },

  areaTogglePopup() {
    this.areaToggle();
  },

  areaClosePopup() {
    this.setData({
      [`area.name`]: this.data.area.values.map(item => item.name).join('-')
    })
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
      [`build.name`]: null,
      [`floor.name`]: null,
      [`number.name`]: null
    })
    
    this.data.selected.community_id = this.data.community.community_id[index];
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
      url: 'https://cneasypass.cn/user/residence.php?code=10145',
      data: {
        community_id: that.data.selected.community_id
      },
      success: function (res) {
        that.data.selected.id = null;
        that.data.build.buildList = [];
        that.data.floor.floorList = [];
        that.data.number.numberList = [];
        that.data.number.number_id = [];
        for (var i = 0; i < res.data.length; i++) {
          that.data.build.buildList[i] = res.data[i].building;
        }
        that.setData({
          [`build.buildList`]: that.data.build.buildList
        });
        toast.clear();
      }
    });
  },
  onCommunityCancel(event) {
    this.communityToggle();
  },


  buildToggle() {
    this.setData({
      [`build.state`]: !this.data.build.state
    });
  },

  buildTogglePopup() {
    this.buildToggle();
  },

  buildClosePopup() {
    this.setData({
      [`build.name`]: this.data.build.values.value
    })
  },

  onBuildChange(event) {
    const { value, index } = event.detail;
    this.data.build.values = { value, index };
    Toast(`Value: ${value}, Index：${index}`);
  },
  onBuildConfirm(event) {
    const { value, index } = event.detail;
    this.data.build.values = { value, index };
    this.buildToggle();
    this.setData({
      [`build.name`]: value,
      [`floor.name`]: null,
      [`number.name`]: null
    })
    this.data.selected.building = value;
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
      url: 'https://cneasypass.cn/user/residence.php?code=10146',
      data: {
        community_id: that.data.selected.community_id,
        building: that.data.selected.building
      },
      success: function (res) {
        that.data.selected.id = null;
        that.data.floor.floorList = [];
        that.data.number.numberList = [];
        that.data.number.number_id = [];
        for (var i = 0; i < res.data.length; i++) {
          that.data.floor.floorList[i] = res.data[i].floor;
        }
        that.setData({
          [`floor.floorList`]: that.data.floor.floorList
        });
        toast.clear();
      }
    });

  },
  onBuildCancel(event) {
    this.buildToggle();
  },


  floorToggle() {
    this.setData({
      [`floor.state`]: !this.data.floor.state
    });
  },

  floorTogglePopup() {
    this.floorToggle();
  },

  floorClosePopup() {
    this.setData({
      [`floor.name`]: this.data.floor.values.value
    })
  },

  onFloorChange(event) {
    const { value, index } = event.detail;
    this.data.floor.values = { value, index };
    Toast(`Value: ${value}, Index：${index}`);
  },
  onFloorConfirm(event) {
    const { value, index } = event.detail;
    this.data.floor.values = { value, index };
    this.floorToggle();
    this.setData({
      [`floor.name`]: value,
      [`number.name`]: null
    })
    this.data.selected.floor = value;
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
      url: 'https://cneasypass.cn/user/residence.php?code=10147',
      data: {
        community_id: that.data.selected.community_id,
        building: that.data.selected.building,
        floor: that.data.selected.floor
      },
      success: function (res) {
        that.data.selected.id = null;
        that.data.number.numberList = [];
        that.data.number.number_id = [];
        for (var i = 0; i < res.data.length; i++) {
          that.data.number.numberList[i] = res.data[i].number;
          that.data.number.number_id[i] = res.data[i].id;
        }
        that.setData({
          [`number.numberList`]: that.data.number.numberList
        });
        toast.clear();
      }
    });
  },
  onFloorCancel(event) {
    this.floorToggle();
  },



  numberToggle() {
    this.setData({
      [`number.state`]: !this.data.number.state
    });
  },

  numberTogglePopup() {
    this.numberToggle();
  },

  numberClosePopup() {
    this.setData({
      [`number.name`]: this.data.number.values.value
    })
  },

  onNumberChange(event) {
    const { value, index } = event.detail;
    this.data.number.values = { value, index };
    Toast(`Value: ${value}, Index：${index}`);
  },
  onNumberConfirm(event) {
    const { value, index } = event.detail;
    this.data.number.values = { value, index };
    this.numberToggle();
    this.setData({
      [`number.name`]: value
    })
    this.data.selected.number = value;
    this.data.selected.id = this.data.number.number_id[index];
  },
  onNumberCancel(event) {
    this.numberToggle();
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

  onSubmit(event){
    var that = this;
    Dialog.confirm({
      title: '提醒',
      message: '是否添加该授权信息'
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
        url: 'https://cneasypass.cn/user/auth.php?code=12120',
        data:
        {
          account_id: app.globalData.account_id,
          residence_id: this.data.selected.id
        },
        success: function(res){
           toast.clear();
            if(res.data == -1){
              Toast("您已提交该业主信息，审核中，请耐心等待，或者联系小区物业!");
            } else if (res.data == -2){
              Toast("您已认证该业主信息，无需重复提交!");
            }else{
              Toast("认证信息提交成功，审核中，请耐心等待，或者联系小区物业!");
              that.sleep(1000);
              wx.redirectTo({ url: "/pages/community/community" });
            }
        }
      });
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