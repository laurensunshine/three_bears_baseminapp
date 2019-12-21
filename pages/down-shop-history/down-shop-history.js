// pages/myorder/myorder.js
const obj = require('../../utils/tab')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  //   onLoad: function (options) {
  //     wx.setNavigationBarsTitle({ title: options.navName });
  //   },

  // 点击标题切换
  tab(evt) {
    let index = evt.target.dataset.index;
    let styles = this.data.styles;
    let res = obj.fn(styles, index);
    this.setData(res);
  },

  // 滑动切换
  switchTab(evt) {
    // console.log(evt)
    let index = evt.detail.current;
    let styles = this.data.styles;
    let res = obj.fn(styles, index);
    this.setData(res);
  },
  
})