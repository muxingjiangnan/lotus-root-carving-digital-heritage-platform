import { Typography } from 'antd'

const { Title } = Typography

/**
 * 页面标题组件
 * @param {Object} props
 * @param {string} props.title - 主标题
 * @param {string} [props.subtitle] - 副标题
 * @param {string} [props.bgImage] - 背景图片地址
 * @param {boolean} [props.dark=false] - 是否使用深色主题
 */
function PageHeader({ title, subtitle, bgImage, dark = false }) {
  const baseStyle = {
    textAlign: 'center',
    padding: bgImage ? '80px 16px 60px' : '40px 0 20px',
    background: bgImage
      ? `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.45)), url(${bgImage}) center/cover no-repeat`
      : 'transparent',
    color: dark ? '#fff' : 'inherit',
    borderRadius: bgImage ? '0 0 24px 24px' : 0,
    marginBottom: bgImage ? 32 : 0,
  }

  return (
    <div style={baseStyle}>
      <Title
        level={2}
        style={{
          color: dark ? '#fff' : '#8B4513',
          fontFamily: "'Noto Serif SC', 'Source Han Serif SC', serif",
          fontWeight: 700,
          letterSpacing: 2,
          margin: 0,
          fontSize: 32,
        }}
      >
        {title}
      </Title>
      {subtitle && (
        <p
          style={{
            color: dark ? 'rgba(255,255,255,0.9)' : '#7A7A7A',
            fontSize: 16,
            marginTop: 12,
            maxWidth: 640,
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.8,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default PageHeader
