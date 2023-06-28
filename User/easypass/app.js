//app.js
import Dialog from '/dist/dialog/dialog';
import Toast from '/dist/toast/toast';
App({
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              
              // 登录
              wx.login({
                success: res => {
                  var code = res.code;//发送给服务器的code 
                  wx.getUserInfo({
                    success: function (res) {
                      var userNick = res.userInfo.nickName;//用户昵称
                      var avataUrl = res.userInfo.avatarUrl;//用户头像地址 
                      var gender = res.userInfo.gender;//用户性别 
                      if (code) {
                        Dialog.alert({
                          title: '授权信息',
                          message: '我们将获取您的公开信息'
                        }).then(() => {
                          const toast = Toast.loading({
                            duration: 0,       // 持续展示 toast
                            mask: true,
                            forbidClick: true, // 禁用背景点击
                            message: '请稍后',
                            loadingType: 'circular',
                            selector: '#custom-selector'
                          });
                          wx.request({
                            url: 'https://cneasypass.cn/user/register.php',//服务器的地址，现在微信小程序只支持https请求，所以调试的时候请勾选不校监安全域名 
                            data: {
                              code: code,
                              nick: userNick,
                              avaurl: avataUrl,
                              sex: gender
                            },
                            header: {
                              'content-type': 'application/json'
                            },
                            success: function (res) {
                              wx.setStorageSync('account_id', res.data);
                              that.globalData.account_id = res.data;
                              wx.request({
                                url: 'https://cneasypass.cn/user/getLoginName.php',//服务器的地址，现在微信小程序只支持https请求，所以调试的时候请勾选不校监安全域名 
                                data: {
                                  id: res.data
                                },
                                header: {
                                  'content-type': 'application/json'
                                },
                                success: function (res) {
                                  wx.setStorageSync('login_name', res.data);
                                  that.globalData.login_name = res.data;
                                  toast.clear();
                                  wx.redirectTo({
                                    url: '/pages/access/access',
                                  })
                                }
                              });
                            }
                          });
                        });
                      }
                      else {
                        console.log("获取用户登录态失败！");
                      }
                    }
                  })
                },
                fail: function (error) {
                  console.log('login failed ' + error);
                }

              })

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    login_name: null,
    account_id: null
  }
})