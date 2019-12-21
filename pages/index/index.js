//index.js
//获取应用实例

const app = getApp()
import * as echarts from '../../ec-canvas/echarts';

let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    color: '#FBDFDF',
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      },
      confine: true
    },
    grid: {
      left: 5,
      right: 20,
      bottom: 15,
      top: 30,
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['微信', '卡耗', '现金', '支付宝', 'pos', '团购'],
        axisLine: {
          lineStyle: {
            color: '#EAE8E8',
          }
        },
        axisLabel: {
          color: 'rgba(0, 0, 0, 0.41)'
        },
        textStyle:{
          fontSize:10
        },
        minInterval: 1
      }
    ],
    yAxis: [
      {
        type: 'value',
        max:'2000',
        axisLine: {
          show:false,
          lineStyle: {
            color: 'rgba(0, 0, 0, 0.41)'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#EAE8E8',
            type:'dashed'
          }
        }
        
      }
    ],
    series: [
      {
        name: '收入',
        type: 'bar',
        label: {
          normal: {
            // show: true,
            position: 'inside'
          }
        },
        barWidth: '30%',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#FBEFEF'
            }, {
              offset: 1,
              color: '#FF9FA0'
            }]),
            barBorderRadius: 6,
          },
        },
        data: [400, 800, 300, 1500, 600, 700]
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      console.log(chart)
    }, 2000);
  }
});
