// 违禁词列表（可根据需要扩展）
const forbiddenWords = [
  '傻逼', '傻B', 'sb', 'SB', '他妈的', 'tmd', 'TMD', '卧槽', '我操', '我靠',
  '草泥马', 'cnm', 'CNM', '尼玛', 'nmsl', 'NMSL', '废物', '垃圾', '去死',
  '狗屎', '滚蛋', '脑残', '贱人', '婊子', '骚货', '蠢货', '混蛋', '王八蛋',
  '畜生', '杂种', '逼', '操', '艹'
];

// 联系方式检测正则
const contactPatterns = [
  { name: '手机号', regex: /(?:^|\D)(1[3-9]\d{9})(?:\D|$)/ },
  { name: 'QQ号', regex: /(?:qq|QQ|扣扣)\s*[：:]?\s*\d{5,11}/i },
  { name: '微信号', regex: /(?:微信|vx|v信|wei信|微xin|薇信|wx|wechat)\s*[：:]?\s*[a-zA-Z0-9_-]{6,20}/i },
  { name: '邮箱', regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/ },
  { name: '电话诱导', regex: /(?:电话|联系电话|联系方式|打我电话|打给我|联系我|加我|加v|加微|加微信)\s*[：:]?\s*\d+/i }
];

function checkForbiddenWords(text) {
  if (!text) return { pass: true };
  const lowerText = text.toLowerCase();
  for (const word of forbiddenWords) {
    if (lowerText.includes(word.toLowerCase())) {
      return { pass: false, reason: '评论包含不合规内容，请修改后重试' };
    }
  }
  return { pass: true };
}

function checkContactInfo(text) {
  if (!text) return { pass: true };
  for (const pattern of contactPatterns) {
    if (pattern.regex.test(text)) {
      return { pass: false, reason: '评论不能包含联系方式，请修改后重试' };
    }
  }
  return { pass: true };
}

function checkContent(text) {
  let result = checkForbiddenWords(text);
  if (!result.pass) return result;
  result = checkContactInfo(text);
  if (!result.pass) return result;
  return { pass: true };
}

module.exports = {
  checkForbiddenWords,
  checkContactInfo,
  checkContent
};
