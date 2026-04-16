import { useEffect, useRef } from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

// 莲花 SVG 装饰
const LotusDecoration = () => (
  <svg
    viewBox="0 0 200 200"
    style={{
      position: 'absolute',
      top: '10%',
      right: '10%',
      width: 320,
      height: 320,
      opacity: 0.12,
      pointerEvents: 'none',
    }}
  >
    <defs>
      <linearGradient id="lotusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff" />
        <stop offset="100%" stopColor="#f3e9dc" />
      </linearGradient>
    </defs>
    <path
      fill="url(#lotusGrad)"
      d="M100 20 C120 60, 160 80, 180 100 C160 120, 120 140, 100 180 C80 140, 40 120, 20 100 C40 80, 80 60, 100 20 Z"
    />
    <ellipse cx="100" cy="100" rx="60" ry="20" fill="url(#lotusGrad)" />
    <ellipse cx="100" cy="100" rx="20" ry="60" fill="url(#lotusGrad)" />
  </svg>
);

// 根雕木纹装饰线
const WoodGrainDecoration = () => (
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
);

const AuthLayout = ({ children }) => {
  const leftRef = useRef(null);

  useEffect(() => {
    const el = leftRef.current;
    if (!el) return;
    el.animate(
      [{ opacity: 0, transform: 'translateX(-24px)' }, { opacity: 1, transform: 'translateX(0)' }],
      { duration: 700, easing: 'ease-out', fill: 'forwards' }
    );
  }, []);

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
            <LotusDecoration />
            <WoodGrainDecoration />
            <div style={{ position: 'relative', zIndex: 1, maxWidth: 520 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 32,
                  fontSize: 32,
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
                  letterSpacing: 2,
                }}
              >
                莲花根雕
                <br />
                非遗数字平台
              </h1>
              <p
                style={{
                  fontSize: 'clamp(16px, 1.6vw, 20px)',
                  opacity: 0.85,
                  marginTop: 24,
                  lineHeight: 1.8,
                  maxWidth: 420,
                }}
              >
                一刀一琢皆匠心，一莲一藕承千年。
                <br />
                在这里，数字化守护传统技艺，让根雕艺术焕发新生。
              </p>
              <div style={{ marginTop: 48, display: 'flex', gap: 24 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 700 }}>200+</div>
                  <div style={{ fontSize: 14, opacity: 0.7, marginTop: 4 }}>馆藏作品</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 700 }}>50+</div>
                  <div style={{ fontSize: 14, opacity: 0.7, marginTop: 4 }}>非遗课程</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 700 }}>1w+</div>
                  <div style={{ fontSize: 14, opacity: 0.7, marginTop: 4 }}>注册用户</div>
                </div>
              </div>
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
  );
};

export default AuthLayout;
