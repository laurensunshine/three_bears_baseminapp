// pages/myorder/myorder.js
import * as echarts from '../../ec-canvas/echarts';
const obj = require('../../utils/tab')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    styles: [
      { class: 'now', title: '本年' },
      { class: '', title: '本月' },
      { class: '', title: '本周' }
    ],
    index1: 0,
    winHeight: "",
    shopName: ['威海店', '青岛店', '北京店'],
    //报表
    ecPie: {
      onInit: function (canvas, width, height) {
        const Piechart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(Piechart);
        Piechart.setOption(getPieOption());
        return Piechart;
      },
    },
    ecYearLine: {
      onInit: function (canvas, width, height) {
        const YearLinechart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(YearLinechart);
        YearLinechart.setOption(getYearLineOption());
        return YearLinechart;
      }
    },
    ecMonthLine: {
      onInit: function (canvas, width, height) {
        const MonthLinechart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(MonthLinechart);
        MonthLinechart.setOption(getMonthLineOption());
        return MonthLinechart;
      }
    },
    ecWeekLine: {
      onInit: function (canvas, width, height) {
        const WeekLinechart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(WeekLinechart);
        WeekLinechart.setOption(getWeekLineOption());
        return WeekLinechart;
      }
    }
  },


  // 选择店铺
  bindShopChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
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
  }
})

// 客户分析报表
let chart = null;
function getPieOption() {
  return {
    tooltip: {
      trigger: 'item',
      formatter: "{b}: {c} ({d}%"
    },
    legend: {
      orient: 'vertical',
      x: 'right',
      itemWidth: 17,
      itemHeight: 17,
      data: ['微博', '团购', '上门', '微信', '其他', '客户介绍', '员工推荐']
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['30%', '40%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 335, name: '微博', itemStyle: { color: '#F9CC96' } },
          { value: 310, name: '团购', itemStyle: { color: '#FCA27C' } },
          { value: 234, name: '上门员卡耗', itemStyle: { color: '#F59798' } },
          { value: 135, name: '微信', itemStyle: { color: '#ACCBFD' } },
          { value: 888, name: '其他', itemStyle: { color: '#8E96DA' } },
          { value: 310, name: '客户介绍', itemStyle: { color: '#BADBB6' } },
          { value: 234, name: '员工推荐', itemStyle: { color: '#70A798' } }
        ]
      }
    ]
  };

}
function getYearLineOption() {
  return {
    // title: {
    //     text: '堆叠区域图'
    // },
    tooltip: {
      trigger: 'axis',
      padding: [10, 10, 10, 10],
      position: function (pos, params, dom, rect, size) {
        //         // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
        var obj = { top: 60 };
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
        return obj;
      },
      axisPointer: {
        type: 'cross',
        label: {
          // show:false,
          backgroundColor: '#6a7985'
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          interval: 1,
          color: '#000'
        },
        axisTick: {
          show: false
        },

        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']


      }
    ],
    yAxis: [
      {
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
      }
    ],
    series: [
      {
        name: '支出',
        type: 'line',
        stack: '总量',
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#FFF5F5'
            }, {
              offset: 1,
              color: '#FFFAFA'
            }]),
          }
        },
        // symbol: 'circle',
        itemStyle: {

          itemWidth: 10,
          itemHeight: 10,
          normal: {
            color: '#F59798'
          },
          lineStyle: {
            color: '#F59798',
          }
        },
        data: [1500, 1262, 891, 6554, 896, 1330, 256, 5478, 1236, 123, 258, 1456],
      }
    ]
  };

}
function getMonthLineOption() {
  return {
    tooltip: {
      trigger: 'axis',
      padding: [10, 10, 10, 10],
      position: function (pos, params, dom, rect, size) {
        //         // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
        var obj = { top: 60 };
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
        return obj;
      },
      axisPointer: {
        type: 'cross',
        label: {
          // show:false,
          backgroundColor: '#6a7985'
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          interval: 5,
          color: '#000'
        },
        axisTick: {
          show: false
        },

        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13', '14', '15', '16', '17', '18', '19', '20','21', '22', '23', '24', '25', '26', '27', '28', '29', '30']


      }
    ],
    yAxis: [
      {
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
      }
    ],
    series: [
      {
        name: '支出',
        type: 'line',
        stack: '总量',
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#FFF5F5'
            }, {
              offset: 1,
              color: '#FFFAFA'
            }]),
          }
        },
        // symbol: 'circle',
        itemStyle: {

          itemWidth: 10,
          itemHeight: 10,
          normal: {
            color: '#F59798'
          },
          lineStyle: {
            color: '#F59798',
          }
        },
        data: [1500, 1262, 891, 6554, 896, 1330, 256, 5478, 1236, 123, 258, 1456,1500, 1262, 891, 6554, 896, 1330, 256, 5478, 1236, 123,1500, 1262, 891, 6554, 896, 1330, 256, 5478, 1236, 123],
      }
    ]
  };

}
function getWeekLineOption() {
  return {
    tooltip: {
      trigger: 'axis',
      padding: [10, 10, 10, 10],
      position: function (pos, params, dom, rect, size) {
        //         // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
        var obj = { top: 60 };
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
        return obj;
      },
      axisPointer: {
        type: 'cross',
        label: {
          // show:false,
          backgroundColor: '#6a7985'
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          interval: 0,
          color: '#000'
        },
        axisTick: {
          show: false
        },

        data: ['周一', '周二', '周三', '周四', '周五', '周六','周日']


      }
    ],
    yAxis: [
      {
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
      }
    ],
    series: [
      {
        name: '支出',
        type: 'line',
        stack: '总量',
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#FFF5F5'
            }, {
              offset: 1,
              color: '#FFFAFA'
            }]),
          }
        },
        // symbol: 'circle',
        itemStyle: {

          itemWidth: 10,
          itemHeight: 10,
          normal: {
            color: '#F59798'
          },
          lineStyle: {
            color: '#F59798',
          }
        },
        data: [1500, 1262, 891, 6554, 896, 1330,458],
      }
    ]
  };

}
