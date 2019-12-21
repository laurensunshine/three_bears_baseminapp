// pages/vip-detail/vip-detail.js

//引入数据模型
import model from '../../utils/Models/vipModel.js';
// 引入缓存
// import cache from '../../utils/Cache.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {}
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
      detail: info
    });
  },

  cardsDetail(evt) {
    var that = this
    let info = that.data.detail;
    console.log(info);

    // 获取当前点击元素的id(索引值)
    let _id = info.id;
    console.log();
    model.getCardsdata({
      data: { id: _id }
    }).then(res => {
      console.log(res);
      //因为获取到的值是个对象，url只能传字符串，所以必须把它转化为字符串。
      let message = res.data.data;
      console.log(message);
      message = JSON.stringify(message);
      // //跳转到详情页 
      wx.navigateTo({
        //在接收页面的url后面加上“？自定义名称=字符串”就可以通过url传值
        url: '../cards-detail/cards-detail?Mesgs=' + message,
      })
    });

  },

  consumeData(evt) {
    var that = this
    let info = that.data.detail;
    console.log(info);

    // 获取当前点击元素的id(索引值)
    let _id = info.id;
    console.log();
    model.getConsumeData({
      data: { id: _id }
    }).then(res => {
      console.log(res);
      //因为获取到的值是个对象，url只能传字符串，所以必须把它转化为字符串。
      let message = res.data.data.records;
      //  console.log(message);
      message = JSON.stringify(message);
      // //跳转到详情页 
      wx.navigateTo({
        //在接收页面的url后面加上“？自定义名称=字符串”就可以通过url传值
        url: '../cost-record/cost-record?Mesgs=' + message,
      })
    });

  }
})