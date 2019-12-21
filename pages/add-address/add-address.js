// pages/add-address/add-address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['', '', ''],
  },
  //选择地区
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: options.navName });
  },

})