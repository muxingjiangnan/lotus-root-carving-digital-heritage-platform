import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { Layout } from 'antd'

const { Content } = Layout

// 莲花 SVG 装饰（更精致的多层花瓣 + 金色描边）
function LotusDecoration() {
  return (
    <svg
      viewBox="0 0 200 200"
      style={{
        position: 'absolute',
        top: '6%',
        right: '8%',
        width: 360,
        height: 360,
        opacity: 0.14,
        pointerEvents: 'none',
      }}
    >
      <defs>
        <linearGradient id="lotusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#f3e9dc" />
        </linearGradient>
        <linearGradient id="lotusStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C5A065" />
          <stop offset="100%" stopColor="#8B4513" />
        </linearGradient>
      </defs>
      {/* 外层花瓣 */}
      <path
        fill="url(#lotusGrad)"
        stroke="url(#lotusStroke)"
        strokeWidth="0.8"
        d="M100 12 C125 55, 170 75, 188 100 C170 125, 125 145, 100 188 C75 145, 30 125, 12 100 C30 75, 75 55, 100 12 Z"
      />
      {/* 中层花瓣 */}
      <path
        fill="url(#lotusGrad)"
        stroke="url(#lotusStroke)"
        strokeWidth="0.6"
        d="M100 30 C118 62, 152 78, 168 100 C152 122, 118 138, 100 170 C82 138, 48 122, 32 100 C48 78, 82 62, 100 30 Z"
      />
      {/* 内层花瓣 */}
      <path
        fill="url(#lotusGrad)"
        stroke="url(#lotusStroke)"
        strokeWidth="0.5"
        d="M100 48 C112 70, 136 82, 146 100 C136 118, 112 130, 100 152 C88 130, 64 118, 54 100 C64 82, 88 70, 100 48 Z"
      />
      {/* 花蕊横竖 */}
      <ellipse cx="100" cy="100" rx="56" ry="18" fill="url(#lotusGrad)" opacity="0.6" />
      <ellipse cx="100" cy="100" rx="18" ry="56" fill="url(#lotusGrad)" opacity="0.6" />
    </svg>
  )
}

// 根雕木纹装饰线
function WoodGrainDecoration() {
  return (
    <svg
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '40%',
        opacity: 0.08,
        pointerEvents: 'none',
      }}
      preserveAspectRatio="none"
      viewBox="0 0 400 200"
    >
      <path
        fill="none"
        stroke="#fff"
        strokeWidth={2}
        d="M0,180 Q100,140 200,180 T400,160 M0,190 Q120,150 240,190 T480,170"
      />
    </svg>
  )
}

// 红色篆刻印章
function SealStamp() {
  return (
    <svg
      viewBox="0 0 80 80"
      style={{
        width: 56,
        height: 56,
        marginTop: 28,
        opacity: 0.85,
      }}
    >
      <rect
        x="4"
        y="4"
        width="72"
        height="72"
        rx="4"
        fill="none"
        stroke="#C94C4C"
        strokeWidth="3"
      />
      <rect
        x="10"
        y="10"
        width="60"
        height="60"
        rx="2"
        fill="none"
        stroke="#C94C4C"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <text
        x="40"
        y="36"
        textAnchor="middle"
        fill="#C94C4C"
        fontSize="18"
        fontWeight="700"
        fontFamily="'Noto Serif SC', serif"
        letterSpacing="2"
      >
        匠心
      </text>
      <text
        x="40"
        y="58"
        textAnchor="middle"
        fill="#C94C4C"
        fontSize="18"
        fontWeight="700"
        fontFamily="'Noto Serif SC', serif"
        letterSpacing="2"
      >
        传承
      </text>
    </svg>
  )
}

// 文化标签
function CultureTags() {
  const tags = [
    { icon: '🪵', title: '匠心', desc: '一刀一琢' },
    { icon: '📜', title: '传承', desc: '千年技艺' },
    { icon: '🌸', title: '焕新', desc: '数字守护' },
  ]

  return (
    <div style={{ marginTop: 40, display: 'flex', gap: 28 }}>
      {tags.map((tag, index) => (
        <div
          key={tag.title}
          className="culture-tag"
          style={{
            textAlign: 'center',
            opacity: 0,
            animation: `fadeInUp 0.6s ease-out ${0.4 + index * 0.15}s forwards`,
          }}
        >
          <div style={{ fontSize: 24, marginBottom: 6 }}>{tag.icon}</div>
          <div
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: '#F3E9DC',
              letterSpacing: 2,
              fontFamily: "'Noto Serif SC', serif",
            }}
          >
            {tag.title}
          </div>
          <div
            style={{
              fontSize: 13,
              opacity: 0.7,
              marginTop: 4,
              letterSpacing: 1,
            }}
          >
            {tag.desc}
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * 认证页面布局组件
 * @param {Object} props
 * @param {React.ReactNode} props.children - 表单内容
 */
function AuthLayout({ children }) {
  const { pathname } = useLocation()
  const leftRef = useRef(null)

  // 路由切换时自动滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // 左侧品牌区入场动画
  useEffect(() => {
    const el = leftRef.current
    if (!el) return
    el.animate(
      [{ opacity: 0, transform: 'translateX(-24px)' }, { opacity: 1, transform: 'translateX(0)' }],
      { duration: 700, easing: 'ease-out', fill: 'forwards' }
    )
  }, [])

  return (
    <Layout style={{ minHeight: '100vh', background: '#fff' }}>
      <Content style={{ padding: 0, margin: 0, display: 'flex' }}>
        <div
          className="auth-container"
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
          }}
        >
          {/* 左侧品牌区 */}
          <div
            className="auth-left"
            ref={leftRef}
            style={{
              flex: '1 1 55%',
              background: 'linear-gradient(135deg, #5D4037 0%, #3E2723 100%)',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '64px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* 宣纸纹理叠加 */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'radial-gradient(ellipse at 20% 30%, rgba(197,160,101,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(139,69,19,0.05) 0%, transparent 50%)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
            <LotusDecoration />
            <WoodGrainDecoration />
            <div style={{ position: 'relative', zIndex: 1, maxWidth: 520 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 32,
                  fontSize: 32,
                  border: '1px solid rgba(243,233,220,0.2)',
                }}
              >
                🪷
              </div>
              <h1
                style={{
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  fontWeight: 700,
                  margin: 0,
                  lineHeight: 1.2,
                  letterSpacing: 3,
                  color: '#F3E9DC',
                  fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'SimSun', serif",
                  textShadow: '0 2px 12px rgba(0,0,0,0.3), 0 0 40px rgba(197,160,101,0.12)',
                }}
              >
                莲花根雕
                <br />
                非遗数字平台
              </h1>
              {/* 渐变金线分隔 */}
              <div
                style={{
                  width: 60,
                  height: 2,
                  marginTop: 20,
                  background: 'linear-gradient(90deg, #C5A065, rgba(197,160,101,0.3), transparent)',
                  borderRadius: 1,
                }}
              />
              <p
                style={{
                  fontSize: 'clamp(16px, 1.6vw, 20px)',
                  color: 'rgba(243,233,220,0.88)',
                  marginTop: 20,
                  lineHeight: 1.8,
                  maxWidth: 420,
                  fontFamily: "'Noto Serif SC', serif",
                  letterSpacing: 1,
                }}
              >
                一刀一琢皆匠心，一莲一藕承千年。
                <br />
                在这里，数字化守护传统技艺，让根雕艺术焕发新生。
              </p>
              <CultureTags />
              <SealStamp />
            </div>
          </div>

          {/* 右侧表单区 */}
          <div
            className="auth-right"
            style={{
              flex: '1 1 45%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#FAF8F5',
              padding: '40px 24px',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 440,
                animation: 'authSlideUp 0.6s ease-out',
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </Content>

      <style>{`
        @keyframes authSlideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 992px) {
          .auth-container {
            flex-direction: column !important;
          }
          .auth-left {
            display: none !important;
          }
          .auth-right {
            flex: '1 1 auto' !important;
            min-height: 100vh !important;
            padding: 24px 16px !important;
          }
        }
      `}</style>
    </Layout>
  )
}

export default AuthLayout
