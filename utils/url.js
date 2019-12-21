//确定不变的域名
// const domain = 'http://www.quotor.cn';
const domain = 'http://192.168.3.21:9999';
const token = 'd464f259-1c96-42eb-a36a-62abecb52b93';
export default {
  // 客户列表（包括会员和散客）
  getClientData: `${domain}/acad/member/list?access_token=${token}`,
  getCardsData: `${domain}/acad/member/card/list/memberId?access_token=${token}`,
  getConsumeData: `${domain}/acad/order/list/consume/record?access_token=${token}`,
  getClassListData: `${domain}/acad/course/list?access_token=${token}`,

}