// 导入
// 请求的URL地址配置文件
import config from '../url.js';
// 请求类
import Http from '../Http.js';

// 页面模型类
class VipModel extends Http {
  /**
   * 获取用户列表
   * @param object data 请求的参数
   * @return promsie
   */
  getVipClientList({ data = { member: 1, current: 1 } }) {
    return this.httpReq({
      url: config.getClientData,
      data
    })
  }
  getClientList({ data = { member: 2, current: 1 } }) {
    return this.httpReq({
      url: config.getClientData,
      data
    })
  }

  search({ data = { name } }) {
    return this.httpReq({
      url: config.getClientData,
      data
    })
  }
  // 到店频次
  searchTimes({ data = { reachShopFrequency } }) {
    return this.httpReq({
      url: config.getClientData,
      data
    })
  }
  //客户来源查询接口
  searchResource({ data = { channel } }) {
    return this.httpReq({
      url: config.getClientData,
      data
    })
  }
  //时间分类查询接口
  searchTime({ data = { notReachShopDays } }) {
    return this.httpReq({
      url: config.getClientData,
      data
    })
  }
  //所在店铺查询
  searchShop({ data = {} }) {
    return this.httpReq({
      url: config.getClientData,
      data
    })
  }
  //根据id获取当前客户的卡信息
  getCardsData({ data = { id } }) {
    return this.httpReq({
      url: config.getCardsData,
      data
    });
  }
  //获取当前客户的消费记录
  getConsumeData({ data = { id } }) {
    return this.httpReq({
      url: config.getConsumeData,
      data
    });
  }
}

// 导出
export default new VipModel;
