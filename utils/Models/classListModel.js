// 导入
// 请求的URL地址配置文件
import config from '../url.js';
// 请求类
import Http from '../Http.js';

// 页面模型类
class classListModel extends Http {
  /**
   * 获取用户列表
   * @param object data 请求的参数
   * @return promsie
   */
  getClassList({ data = {current:1} }) {
    return this.httpReq({
      url: config.getClassListData,
      data
    })
  }
  //根据课程状态查询
  getClassStatus({ data = { status } }) {
    return this.httpReq({
      url: config.getClassListData,
      data
    })
  }
   //根据课程类型查询
   getClassType({ data = { status } }) {
    return this.httpReq({
      url: config.getClassListData,
      data
    })
  }
   //根据课程名称查询
   getClassName({ data = { status } }) {
    return this.httpReq({
      url: config.getClassListData,
      data
    })
  }
}

// 导出
export default new classListModel;
