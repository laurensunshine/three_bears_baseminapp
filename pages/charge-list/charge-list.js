// pages/charge-list/charge-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disp: "none",
    date: '',
    date2: "",
  },
  // 当点击“筛选时，执行show，遮罩层与conts显示出来
  show() {
    this.setData({
      disp: "block"
    })
  },
  // 点击遮罩层或conts时，遮罩层与conts被隐藏
  hide() {
    this.setData({
      disp: "none"
    })
  },
  // 获取筛选时间
  bindStartChange: function (e) {
    console.log(e);
    this.setData({
      date: e.detail.value
    })
  },
  bindEndChange: function (e) {
    this.setData({
      date2: e.detail.value
    })
  },

})