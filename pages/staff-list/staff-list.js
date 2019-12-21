// pages/staff-list/staff-list.js
const obj = require('../../utils/tab')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    disp: "none",
    display: "none",
    styles: [
      { class: 'now', title: '在职' },
      { class: '', title: '离职' },
      { class: '', title: '停职' }
    
    ],
    index: 0,
    winHeight: "",
    staffs: [
      { name: 'lauren', avatar: '11' },
      { name: 'alex', avatar: '11' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
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
  onLoad: function () {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        that.setData({
          winHeight: calc
        });
      }
    });
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
  }

})