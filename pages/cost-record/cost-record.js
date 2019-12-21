// pages/cards-detail/cards-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    consumeData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options);
    // debugger;
    let that = this;
    let info = JSON.parse(options.Mesgs);
    console.log(info);
    that.setData({
      consumeData: info
    });
  },
})