// pages/client-analysis/client-analysis.js
const obj = require('../../utils/tab')
//引入数据模型
import model from '../../utils/Models/vipModel.js';
// 引入缓存
import cache from '../../utils/Cache.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    disp: "none",
    display: "none",
    shopTimes: [{
      id: 1,
      label: '1次以上/月'
    }, {
      id: 3,
      label: '3次以上/月'
    }, {
      id: 6,
      label: '6次以上/月'
    }],
    //客户来源
    resource: [
      {
        id: 1,
        name: '微信'
      },
      {
        id: 2,
        name: '微博'
      },
      {
        id: 3,
        name: '团购'
      },
      {
        id: 4,
        name: '上门'
      },
      {
        id: 6,
        name: '客户介绍'
      },
      {
        id: 6,
        name: '员工推荐'
      },
      {
        id: 7,
        name: '其他'
      },
    ],
    //多久未到店（时间分类）
    // timeType: ['超过一个月未到店', '超过三个月未到店', '超过半年未到店'],
    timeType: [
      {
        id: 30,
        label: '超过一个月未到店'
      },
      {
        id: 90,
        label: '超过三个月未到店'
      },
      {
        id: 180,
        label: '超过半未到店'
      },
    ],
    index1: 0,
    index2: 0,
    index3: 0,
    styles: [
      {
        class: 'now',
        title: '会员'
      },
      {
        class: '',
        title: '散客'
      },
    ],
    index: 0,//tab拦切换的时候默认的是第一个
    winHeight: "",
    //获取列表
    current: 1,//当前页码散客
    page: 1,//当前页码 会员
    vipClientList: [],//会员列表
    clientList: [],//散客列表
    //搜索输入的关键字
    keyWord: '',
    //超时时间
    timer: null
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

  // 蒙层显示
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
  onLoad() {
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

    //获取会员列表
    this.getVipClientList('onload');
    //获取散客列表
    this.getClientList('onload');
    //input搜索功能

  },


  // 请求数据开始
  //获取会员列表
  getVipClientList(evt) {
     // 当前页码数
    // let page = evt == 'onload' ? 1 : this.data.page + 1;
   
    // let current = this.data.current;
    model.getVipClientList({
      //传参
      data: { member: 1, current: page }
    }).then(res => {//成功处理
      if (res.data.data.records <= 0) {
        wx.showToast({ //如果全部加载完成了也弹一个框
          title: '我也是有底线的',
          icon: 'success',
          duration: 300
        });
        return false;
      } else {
        cache.set('vipClientList', res.data.data.records);
        // console.log(res);
        //将数据写到视图中
        this.setData({
          current: res.data.data.current,
          vipClientList: [...this.data.vipClientList, ...res.data.data.records]
        });
      }
    });
  },
  //获取散客列表vipClientList
  getClientList(evt) {
    // 当前页码数

    let current = evt == 'onload' ? 1 : this.data.current + 1;


    model.getClientList({
      //传参
      data: { member: 2, current }
    }).then(res => {//成功处理
      if (res.data.data.records <= 0) {
        wx.showToast({ //如果全部加载完成了也弹一个框
          title: '我也是有底线的',
          icon: 'success',
          duration: 500
        });
        return false;
      } else {
        cache.set('clientList', res.data.data.records);
        //将数据写到视图中
        this.setData({
          current: res.data.data.current,
          clientList: [...this.data.clientList, ...res.data.data.records],
          // current
        });
      }

    });
  },

  //键盘输入时实时调用搜索方法
  input(e) {
    // console.log(e)
    this.search(e.detail.value)
  },
  //点击完成按钮时触发
  confirm(e) {
    this.search(e.detail.value)
  },
  search(keyWord) {
    console.log(keyWord);
    let that = this;
    let currentTab = that.data.index;
    model.search({
      //传参
      data: { name: keyWord }
    }).then(res => {//成功处理
      if (keyWord == '') {
        that.setData({
          vipClientList: []
        });
        return;
      }
      // console.log(res);

      if (currentTab == 0) {
        let list = res.data.data.records;
        //对接收到的值进行正则验证
        let reg = new RegExp(keyWord);
        //对输入的值与源数据进行匹配
        let result = list.filter((item, key) => {
          if (item.member == 1) {
            return reg.test(item.name);
          }
        });
        // console.log(result);
        that.setData({ vipClientList: result });
      } else if (currentTab == 1) {
        let list = res.data.data.records;
        //对接收到的值进行正则验证
        let reg = new RegExp(keyWord);
        //对输入的值与源数据进行匹配
        let result = list.filter((item, key) => {
          if (item.member == 2) {
            return reg.test(item.name);
          }
        });
        console.log(result);
        that.setData({ clientList: result });
      }

    });
  },
  //筛选条件
  // 到店频次
  bindTimesChange: function (e) {
    // console.log(e);
    let that = this;
    let shopTimes = that.data.shopTimes;
    let currentTab = that.data.index;
    shopTimes.map((item) => {
      let times = item.id;
      model.searchTimes({
        //传参
        data: { reachShopFrequency: times }
      }).then(res => {//成功处理
        // console.log(res);
        if (currentTab == 0) {
          let list = res.data.data.records;
          let arr = [];
          list.map((item) => {
            if (item.member == 1) {
              arr.push(item);
            }
          });
          console.log(arr);
          that.setData({ vipClientList: arr });

        } else if (currentTab == 1) {
          let list = res.data.data.records;
          //对接收到的值进行正则验证
          let arr = [];
          list.map((item) => {
            if (item.member == 1) {
              arr.push(item);
            }
          });
          // console.log(result);
          that.setData({ clientList: arr });
        }

      });
    });
    that.setData({
      index1: e.detail.value
    });
  },
  //客户来源
  bindResourceChange: function (e) {
    let that = this;
    let currentTab = that.data.index;
    let resType = parseInt(e.detail.value) + 1;
    // console.log(resType);
    model.searchResource({
      //参数
      data: { channel: resType }
    }).then(res => {
      //成功处理
      // console.log(res);
      if (currentTab == 0) {
        let list = res.data.data.records;
        let arr = [];
        list.map((item) => {
          if (item.member == 1) {
            arr.push(item);
          }
        });
        console.log(arr);
        that.setData({ vipClientList: arr });

      } else if (currentTab == 1) {
        let list = res.data.data.records;
        //对接收到的值进行正则验证
        let arr = [];
        list.map((item) => {
          if (item.member == 1) {
            arr.push(item);
          }
        });
        // console.log(result);
        that.setData({ clientList: arr });
      }
    });
  },
  // 时间分类
  bindTimeChange: function (e) {
    // console.log(e);
    let that = this;
    let shopTimes = that.data.shopTimes;
    let currentTab = that.data.index;
    shopTimes.map((item) => {
      let times = item.id;
      model.searchTime({
        //传参
        data: { notReachShopDays: times }
      }).then(res => {//成功处理
        // console.log(res);
        if (currentTab == 0) {
          let list = res.data.data.records;
          let arr = [];
          list.map((item) => {
            if (item.member == 1) {
              arr.push(item);
            }
          });
          console.log(arr);
          that.setData({ vipClientList: arr });

        } else if (currentTab == 1) {
          let list = res.data.data.records;
          //对接收到的值进行正则验证
          let arr = [];
          list.map((item) => {
            if (item.member == 1) {
              arr.push(item);
            }
          });
          // console.log(result);
          that.setData({ clientList: arr });
        }

      });
    });
    that.setData({
      index1: e.detail.value
    });

  },
  
  //按照所在店铺查询
  searchShop(e) {

  },


  //跳转到详情页
  //会员信息
  viptDetail(e) {
    // console.log(e);
    var that = this
    //获取当前点击元素的id(索引值)
    var Id = e.currentTarget.dataset.index;
    // //获取当前点击元素的属性值。
    var message = that.data.vipClientList[Id];
    console.log(message);

    // //因为获取到的值是个对象，url只能传字符串，所以必须把它转化为字符串。
    message = JSON.stringify(message);
    // //跳转到详情页 
    wx.navigateTo({
      //在接收页面的url后面加上“？自定义名称=字符串”就可以通过url传值
      url: '../vip-detail/vip-detail?Mesgs=' + message,
    })
  },
  clientDetail(e) {
    // console.log(e);
    var that = this
    //获取当前点击元素的id(索引值)
    var Id = e.currentTarget.dataset.index;
    // //获取当前点击元素的属性值。
    var message = that.data.clientList[Id];
    console.log(message);

    // //因为获取到的值是个对象，url只能传字符串，所以必须把它转化为字符串。
    message = JSON.stringify(message);
    // //跳转到详情页 
    wx.navigateTo({
      //在接收页面的url后面加上“？自定义名称=字符串”就可以通过url传值
      url: '../vip-detail/vip-detail?Mesgs=' + message,
    })
  }
})