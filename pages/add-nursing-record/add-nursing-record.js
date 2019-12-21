// pages/add-nursing-record/add-nursing-record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proName: ['美容', '肩颈', '按摩', '做脸'],
    tecName: ['lauren', 'emily', 'nathan', 'tracy'],
    imageList: [],
    countIndex: 3,
    count: [1, 2, 3, 4]
  },

  bindProChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  bindTecChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      // sourceType: sourceType[this.data.sourceTypeIndex],
      // sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex],
      success: function (res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  }
})