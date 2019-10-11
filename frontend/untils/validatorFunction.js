// 最多一位小数
export const oneDecimal = str => {
  const reg = /^\d+(\.\d{1})?$/;
  return reg.test(str);
};
//价格，最多两位小数
export const priceReg = str => {
  const reg = /^\d+(\.\d{1,2})?$/;
  return reg.test(str);
};
// 数字
export const numberReg = str => {
  const reg = /^[0-9]+.?[0-9]*$/;
  return reg.test(str);
};

// 手机正则
export const mobileReg = str => {
  const reg = /^1[356789]\d{9}$/;
  return reg.test(str);
};

//身份证号正则
export const idCardReg = str => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(str);
};

// url
export const urlReg = str => {
  const reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/;
  return reg.test(str.trim());
};

/* 是否邮箱*/
export const isEmail = str => {
  const reg = /^[0-9A-Za-z][-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/;
  return reg.test(str.trim());
};
