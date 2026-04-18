/**
 * 内容审核工具
 * 用于检测用户提交内容中的违禁词和联系方式，保障平台内容合规
 */

// 违禁词词库（可根据运营需要随时扩展）
const forbiddenWords = [
  '傻逼', '傻B', 'sb', 'SB', '他妈的', 'tmd', 'TMD', '卧槽', '我操', '我靠',
  '草泥马', 'cnm', 'CNM', '尼玛', 'nmsl', 'NMSL', '废物', '垃圾', '去死',
  '狗屎', '滚蛋', '脑残', '贱人', '婊子', '骚货', '蠢货', '混蛋', '王八蛋',
  '畜生', '杂种', '逼', '操', '艹'
]

// 联系方式检测规则（手机号 / QQ / 微信 / 邮箱 / 电话诱导）
const contactPatterns = [
  { name: '手机号', regex: /(?:^|\D)(1[3-9]\d{9})(?:\D|$)/ },
  { name: 'QQ号', regex: /(?:qq|QQ|扣扣)\s*[：:]?\s*\d{5,11}/i },
  { name: '微信号', regex: /(?:微信|vx|v信|wei信|微xin|薇信|wx|wechat)\s*[：:]?\s*[a-zA-Z0-9_-]{6,20}/i },
  { name: '邮箱', regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/ },
  { name: '电话诱导', regex: /(?:电话|联系电话|联系方式|打我电话|打给我|联系我|加我|加v|加微|加微信)\s*[：:]?\s*\d+/i }
]

/**
 * 检测文本中是否包含违禁词
 * @param {string} text 待检测文本
 * @returns {Object} { pass: boolean, reason?: string }
 */
function detectForbiddenWords(text) {
  if (!text) return { pass: true }

  const lowerText = text.toLowerCase()
  for (const word of forbiddenWords) {
    if (lowerText.includes(word.toLowerCase())) {
      return { pass: false, reason: '评论包含不合规内容，请修改后重试' }
    }
  }

  return { pass: true }
}

/**
 * 检测文本中是否包含联系方式
 * @param {string} text 待检测文本
 * @returns {Object} { pass: boolean, reason?: string }
 */
function detectContactInfo(text) {
  if (!text) return { pass: true }

  for (const pattern of contactPatterns) {
    if (pattern.regex.test(text)) {
      return { pass: false, reason: '评论不能包含联系方式，请修改后重试' }
    }
  }

  return { pass: true }
}

/**
 * 综合内容审核入口
 * 依次进行违禁词检测和联系方式检测
 * @param {string} text 待检测文本
 * @returns {Object} { pass: boolean, reason?: string }
 */
function checkContent(text) {
  let auditResult = detectForbiddenWords(text)
  if (!auditResult.pass) return auditResult

  auditResult = detectContactInfo(text)
  if (!auditResult.pass) return auditResult

  return { pass: true }
}

module.exports = {
  detectForbiddenWords,
  detectContactInfo,
  checkContent
}
