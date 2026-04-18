import { useState, useEffect, useCallback } from 'react'

/**
 * 莲印归顶 —— 艺术感回到顶部按钮
 *
 * 设计概念：
 * - 圆形印章造型，赭石棕底色呼应根雕木质
 * - 中央莲花 + 向上箭头 SVG，寓意"莲开向上，回归本源"
 * - hover 时底色渐变为松绿，呼应莲叶意象
 */
function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  const handleScroll = useCallback(() => {
    setVisible(window.scrollY > 300)
  }, [])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [handleScroll])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      aria-label="回到顶部"
      onClick={scrollToTop}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        right: 'clamp(16px, 4vw, 40px)',
        bottom: 'clamp(24px, 4vw, 40px)',
        zIndex: 999,
        width: 52,
        height: 52,
        borderRadius: '50%',
        border: `1.5px solid ${hovered ? '#E8C880' : '#C5A065'}`,
        backgroundColor: hovered ? '#2F5D50' : '#8B4513',
        boxShadow: '0 4px 16px rgba(139, 69, 19, 0.25)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.9)',
        transition: 'opacity 0.4s ease-out, transform 0.4s ease-out, background-color 0.35s ease, border-color 0.35s ease',
        pointerEvents: visible ? 'auto' : 'none',
        padding: 0
      }}
    >
      {/* 莲花 + 向上箭头 SVG */}
      <svg
        width="26"
        height="26"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transition: 'transform 0.35s ease',
          transform: hovered ? 'scale(1.1) translateY(-1px)' : 'scale(1)'
        }}
      >
        {/* 五瓣莲花轮廓 */}
        <g stroke="#FDFBF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* 顶部花瓣 */}
          <path d="M24 8C24 8 20 14 20 18C20 22 24 22 24 22C24 22 28 22 28 18C28 14 24 8 24 8Z" />
          {/* 右上花瓣 */}
          <path d="M32 14C32 14 30 20 27 23C24 26 24 22 24 22C24 22 28 18 32 14Z" />
          {/* 右下花瓣 */}
          <path d="M34 26C34 26 28 28 24 26C20 24 24 22 24 22C24 22 30 22 34 26Z" />
          {/* 左下花瓣 */}
          <path d="M14 26C14 26 18 22 24 22C24 22 28 24 24 26C20 28 14 26 14 26Z" />
          {/* 左上花瓣 */}
          <path d="M16 14C16 14 20 18 24 22C24 22 24 26 21 23C18 20 16 14 16 14Z" />
        </g>
        {/* 中央向上箭头 */}
        <path
          d="M24 16L24 28M24 16L19 21M24 16L29 21"
          stroke="#FDFBF6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* 底部小圆点（莲心） */}
        <circle cx="24" cy="31" r="1.5" fill="#FDFBF6" />
      </svg>

      {/* hover 时显现的 "顶" 字 */}
      <span
        style={{
          fontSize: 10,
          fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'SimSun', serif",
          color: '#FDFBF6',
          letterSpacing: 1,
          marginTop: 1,
          opacity: hovered ? 0.9 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(-4px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          lineHeight: 1
        }}
      >
        顶
      </span>
    </button>
  )
}

export default BackToTop
