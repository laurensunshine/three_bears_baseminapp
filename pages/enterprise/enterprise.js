// pages/enterprise/enterprise.js
// 报表开始
import * as echarts from '../../ec-canvas/echarts';

let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.69)'
      },
      axisTick: {
        show: false
      },
      data: ['1月', '3月', '5月', '7月', '9月', '11月']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        name: '总收入',
        type: 'line',
        stack: '总量',
        smooth: true,
        itemStyle: {
          itemWidth: 10,
          itemHeight: 10,
          normal: {
            color: '#fff'
          },
          lineStyle: {
            color: '#fff'
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(255, 255, 255, 1)'
            }, {
              offset: 1,
              color: 'rgba(255, 255, 255, 0)'
            }]),
          },
        },
        data: [1500, 1262, 891, 1354, 896, 1330]
      }
    ]
  };

  chart.setOption(option);
  return chart;
}
// 报表结束
Page({

  /**
   * 页面的初始数据 a
   */
  data: {
    ec: {
      onInit: initChart
    },
    date: '',
    date2: "",
    disp: "none",
    status: 1,
    hidden: true,
    hidedena: true,
    status1: 1,
    name: ['lauren', 'emily', 'nathan', 'tracy', 'Aaran', 'Edward'],
    proName: ['产品', '项目', '卡'],
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: options.navName });
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
  // 显示所有员工
  showStaffList(e) {
    // console.log(e);
    let hidden = this.data.hidden;
    let status = this.data.status;
    if (status == 1 && hidden == true) {
      this.setData({
        hidden: !hidden,
        status: 0
      });
    } else {
      this.setData({
        hidden: !hidden,
        status: 1
      });
    }
  },
  showProList(e) {
    // console.log(e);
    let hidedena = this.data.hidedena;
    let status1 = this.data.status1;
    if (status1 == 1 && hidedena == true) {
      this.setData({
        hidedena: !hidedena,
        status1: 0
      });
    } else {
      this.setData({
        hidedena: !hidedena,
        status1: 1
      });
    }
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


  // 报表开始
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },

  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      console.log(chart)
    }, 2000);
  }


})