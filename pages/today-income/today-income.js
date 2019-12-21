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
      trigger: 'item',
      formatter: "{a} {b}: {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      x: 'right',
      itemWidth:12,
      itemHeight:12,
      data: ['现金', 'pos', '会员卡耗', '微信支付', '团购', '支付宝', '欠款', '扫码支付', '店内活动']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        center:['23%','50%'],
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
          { value: 335, name: '现金', itemStyle: { color: '#FFF99F' } },
          { value: 310, name: 'pos', itemStyle: { color: '#F9CC96' } },
          { value: 234, name: '会员卡耗', itemStyle: { color: '#FCA27C' } },
          { value: 135, name: '微信支付', itemStyle: { color: '#F59798' } },
          { value: 888, name: '团购', itemStyle: { color: '#ACCBFD' } },
          { value: 310, name: '支付宝', itemStyle: { color: '#D1B1FD' } },
          { value: 234, name: '欠款', itemStyle: { color: '#8E96DA' } },
          { value: 135, name: '扫码支付', itemStyle: { color: '#BADBB6' } },
          { value: 785, name: '店内活动', itemStyle: { color: '#70A798' } }
        ]
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
