// pages/residue/residue.js
//引入数据模型
import model from '../../utils/Models/classListModel.js';

// 引入缓存
import cache from '../../utils/Cache.js';
//引入时间戳转换
const time = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    disp: "none",
    display: "none",
    classStatus: [
      {
        id: 1,
        name: '已发布'
      },
      {
        id: 2,
        name: '待发布'
      },
      {
        id: 3,
        name: '已下架'
      }
    ],
    classType: [
      {
        id: 1,
        name: '内部课程'
      },
      {
        id: 2,
        name: '外部课程'
      },
      {
        id: 3,
        name: '通用课程'
      }
    ],
    classList: [],//获取课程的列表
    current: 1,
    keyword: ''
  },
  //页面加载的时候触发的
  onLoad() {
    this.getClassList()
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

  //获取课程列表
  getClassList() {
    let that = this;
    let current = that.data.current;
    model.getClassList({
      data: { current }
    }).then(res => {
      console.log(res);
      let allCourses = res.data.data.courses;
      if (allCourses <= 0) {
        wx.showToast({ //如果全部加载完成了也弹一个框
          title: '我也是有底线的',
          icon: 'success',
          duration: 300
        });
        return false;
      } else {
        cache.set('classList', res.data.data.records);
        // console.log(res);
        //将数据写到视图中
        // console.log(allCourses);
        allCourses.map(item => {
          for (let i = 0; i < item.dateRange.length; i++) {
            item.dateRange[i] = time.formatTime(item.dateRange[i], 'Y/M/D h:m:s')
            // console.log(times);
          }
        });
        this.setData({
          current: res.data.data.current,
          classList: [...this.data.classList, ...allCourses]
        });

      }
    });

  },
  //筛选条件
  //课程状态
  bindClassStatusChange: function (e) {
    // console.log(e);
    let that = this;
    let status = parseInt(e.detail.value) + 1;
    console.log(status);
    model.getClassStatus({
      //参数
      data: { status }
    }).then(res => {
      //成功处理
      // console.log(res);
      let list = res.data.data.courses;
      let arr = [];
      list.map((item) => {
        if (item.status) {
          arr.push(item);
        }
      });
      console.log(arr);
      that.setData({ classList: arr });
    });
  },
  //课程类型
  bindClassTypeChange(e) {
    // console.log(e);
    let that = this;
    let type = parseInt(e.detail.value) + 1;
    console.log(type);
    model.getClassType({
      //参数
      data: { type }
    }).then(res => {
      //成功处理
      // console.log(res);
      let list = res.data.data.courses;
      let arr = [];
      list.map((item) => {
        if (item.type) {
          arr.push(item);
        }
      });
      console.log(arr);
      that.setData({ classList: arr });
    });
  },
  //根据课程名称筛选
  input(e) {
    // console.log(e);
    let keyword = e.detail.value;
    model.getClassName({
      data: { name: keyword }
    }).then(res => {
      if (keyword == '') {
        this.setData({
          classList: []
        });
        return;
      }
      let list = res.data.data.courses;
      // console.log(list);
      //对接收到的值进行正则验证
      let reg = new RegExp(keyword);
      //对输入的值与源数据进行匹配
      let result = list.filter((item, key) => {
        // consnole.log(item);
        return reg.test(item.name);
      });
      this.setData({
        classList:result
      });
    });
  },
  // searchClass(){

  // }
})