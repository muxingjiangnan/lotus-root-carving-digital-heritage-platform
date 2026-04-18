import { Progress } from 'antd'

/**
 * 计算密码强度得分
 * @param {string} [value=''] - 密码值
 * @returns {number} 强度得分 (0-5)
 */
function _calculateStrength(value = '') {
  let score = 0
  if (value.length >= 6) score += 1
  if (value.length >= 10) score += 1
  if (/[A-Z]/.test(value)) score += 1
  if (/[0-9]/.test(value)) score += 1
  if (/[^A-Za-z0-9]/.test(value)) score += 1
  return score
}

// 密码强度等级映射表
const strengthLevelMap = [
  { percent: 0, status: 'exception', text: '太短', color: '#ff4d4f' },
  { percent: 20, status: 'exception', text: '弱', color: '#ff4d4f' },
  { percent: 40, status: 'exception', text: '较弱', color: '#ff7a45' },
  { percent: 60, status: 'active', text: '中等', color: '#faad14' },
  { percent: 80, status: 'success', text: '强', color: '#52c41a' },
  { percent: 100, status: 'success', text: '非常强', color: '#237804' },
]

/**
 * 密码强度指示器组件
 * @param {Object} props
 * @param {string} [props.value] - 当前密码值
 */
function PasswordStrength({ value }) {
  const score = _calculateStrength(value)
  const info = strengthLevelMap[score]

  return (
    <div style={{ marginTop: 4 }}>
      <Progress
        percent={info.percent}
        showInfo={false}
        strokeColor={info.color}
        size="small"
        status={info.status}
        style={{ marginBottom: 4 }}
      />
      <div style={{ fontSize: 12, color: info.color, textAlign: 'right' }}>
        密码强度：{info.text}
      </div>
      <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
        建议包含大小写字母、数字及特殊符号，长度至少10位
      </div>
    </div>
  )
}

export default PasswordStrength
