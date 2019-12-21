// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    date2: "",
    // 一开始遮罩层与conts处于不显示状态
    disp: "none",
    display: "none",
    status: 1,
    name: ['lauren', 'emily', 'nathan', 'tracy', 'Aaran', 'Edward'],
    hidden: true,
    clientList: [
      {
        idx: 0,
        hidden: false,
        avatar: '',
        name: 'lauren',
        time: '11：00-12：00',
        reason:'忘记打卡',
        clientMessage: [
          {
            detailTime:"2019.10.23 09.23",
            position:'前台',
            attenReason:'忘记打卡',
            attenDetail:'因为个人原因'
          }
        ]
      },
      {
        idx: 1,
        hidden: true,
        avatar: '11',
        name: 'Emily',
        time: '11：00-12：00',
        reason:'忘记打卡',
        clientMessage: [
          {
            position:'前台',
            detailTime:"2019.10.23 09.23",
            attenReason:'忘记打卡',
            attenDetail:'因为个人原因'
          }
        ]
      }
    ],

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
  // 客户信息遮罩层
  showClient(e) {
    // console.log(e);
    let idx = e.currentTarget.dataset.index;
    let clientList = this.data.clientList;
    // console.log(idx);
    // console.log(clientList[idx]);

    let hiddena = clientList[idx].hidden;
    if (hiddena == true) {
      this.setData({
        ['clientList[' + idx + '].hidden']: !hiddena
      })
    } else {
      this.setData({
        ['clientList[' + idx + '].hidden']: !hiddena
      })
    }
    this.setData({
      display: 'block'
    })
  },
  hideClient() {
    this.setData({
      display: 'none'
    })
  },
  // 获取筛选时间
  bindLastChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindNowChange: function (e) {
    this.setData({
      date2: e.detail.value
    })
  },


})