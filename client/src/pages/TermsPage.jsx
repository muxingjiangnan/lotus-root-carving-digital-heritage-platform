import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

// 章节样式配置
const sectionBaseStyle = { marginBottom: 28 }

const headingBaseStyle = {
  fontSize: 18,
  fontWeight: 700,
  color: '#3E2723',
  marginBottom: 12,
  paddingLeft: 12,
  borderLeft: '3px solid #C5A065',
  fontFamily: "'Noto Serif SC', 'Source Han Serif SC', serif",
  letterSpacing: 1
}

const paragraphBaseStyle = {
  fontSize: 15,
  lineHeight: 1.9,
  color: '#4A4A4A',
  textIndent: '2em',
  marginBottom: 8
}

/**
 * 用户协议页面
 */
function TermsPage() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FDFBF6',
        fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'SimSun', serif"
      }}
    >
      {/* 顶部装饰条 */}
      <div
        style={{
          height: 4,
          background: 'linear-gradient(90deg, #5D4037, #C5A065, #5D4037)'
        }}
      />

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px 64px' }}>
        {/* 标题区 */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          {/* 篆刻印章 */}
          <svg
            viewBox="0 0 100 100"
            style={{
              width: 64,
              height: 64,
              margin: '0 auto 16px',
              display: 'block'
            }}
          >
            <rect x="6" y="6" width="88" height="88" rx="6" fill="none" stroke="#C94C4C" strokeWidth="4" />
            <text x="50" y="44" textAnchor="middle" fill="#C94C4C" fontSize="22" fontWeight="700" fontFamily="'Noto Serif SC', serif">
              诚信
            </text>
            <text x="50" y="74" textAnchor="middle" fill="#C94C4C" fontSize="22" fontWeight="700" fontFamily="'Noto Serif SC', serif">
              立约
            </text>
          </svg>

          <h1
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#3E2723',
              margin: 0,
              letterSpacing: 4
            }}
          >
            用户协议
          </h1>
          <p
            style={{
              fontSize: 14,
              color: '#8B7E74',
              marginTop: 8,
              letterSpacing: 1
            }}
          >
            最后更新日期：2026年4月18日
          </p>
        </div>

        {/* 引言 */}
        <div
          style={{
            background: 'rgba(197,160,101,0.08)',
            borderRadius: 8,
            padding: '20px 24px',
            marginBottom: 32,
            border: '1px solid rgba(197,160,101,0.15)'
          }}
        >
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.8,
              color: '#5D4037',
              margin: 0,
              textAlign: 'center',
              fontStyle: 'italic'
            }}
          >
            "取自然之形，运匠心之巧，传千年之艺，开数字之新。"
          </p>
        </div>

        {/* 第一章 */}
        <div style={sectionBaseStyle}>
          <div style={headingBaseStyle}>一、平台宗旨</div>
          <p style={paragraphBaseStyle}>
            莲花根雕非遗数字平台（以下简称"本平台"）是一个非营利性的文化公益项目，致力于莲花根雕非物质文化遗产的数字化记录、展示、研究与传播。本平台不以营利为目的，所有展示内容均服务于非遗保护与公众教育。
          </p>
        </div>

        {/* 第二章 */}
        <div style={sectionBaseStyle}>
          <div style={headingBaseStyle}>二、账号注册与使用</div>
          <p style={paragraphBaseStyle}>
            用户可自愿注册本平台账号。注册时须提供真实有效的用户名、手机号及邮箱地址。账号仅限注册用户本人用于学习、研究与欣赏非遗文化内容，不得转让、借用或出售。
          </p>
          <p style={paragraphBaseStyle}>
            用户在使用本平台服务时，应当遵守国家法律法规，尊重社会公德，不得利用本平台从事任何违法违规活动。
          </p>
        </div>

        {/* 第三章 */}
        <div style={sectionBaseStyle}>
          <div style={headingBaseStyle}>三、内容版权与知识产权</div>
          <p style={paragraphBaseStyle}>
            本平台展示的所有根雕作品图片、技艺视频、文字介绍、传承人访谈等内容，其版权归 respective 作者、非遗传承人或授权机构所有。平台仅获得展示授权，不享有作品的所有权。
          </p>
          <p style={paragraphBaseStyle}>
            用户可在本平台内浏览、学习上述内容，但未经授权，不得以任何形式复制、转载、商用或用于其他平台的二次传播。如需引用，请注明出处并遵守相关法律法规。
          </p>
        </div>

        {/* 第四章 */}
        <div style={sectionBaseStyle}>
          <div style={headingBaseStyle}>四、用户行为规范</div>
          <p style={paragraphBaseStyle}>
            用户在本平台发布评论、提问或参与互动时，应遵守以下规范：禁止发布含有违法、色情、暴力、歧视、诽谤等内容；禁止冒充非遗传承人或专家身份；禁止恶意刷量、攻击服务器或干扰平台正常运营；禁止发布与非遗文化无关的商业广告。
          </p>
          <p style={paragraphBaseStyle}>
            对于违反上述规范的用户，平台有权采取删除内容、限制功能、封禁账号等措施，并保留追究法律责任的权利。
          </p>
        </div>

        {/* 第五章 */}
        <div style={sectionBaseStyle}>
          <div style={headingBaseStyle}>五、免责声明</div>
          <p style={paragraphBaseStyle}>
            本平台尽力确保所展示内容的准确性与时效性，但非遗技艺流派众多、传承方式各异，平台内容可能无法完全涵盖所有传承体系，亦不代表唯一权威解释。用户在评论区发表的观点仅代表其个人立场，与本平台无关。
          </p>
          <p style={paragraphBaseStyle}>
            因不可抗力或技术原因导致的服务中断、数据丢失，本平台将尽力恢复但不承担相应赔偿责任。
          </p>
        </div>

        {/* 第六章 */}
        <div style={sectionBaseStyle}>
          <div style={headingBaseStyle}>六、协议变更</div>
          <p style={paragraphBaseStyle}>
            本平台保留根据法律法规变化或运营需要适时更新本协议的权利。协议内容发生重要变更时，平台将在显著位置公告通知。用户继续使用本平台服务即视为接受更新后的协议。
          </p>
        </div>

        {/* 第七章 */}
        <div style={sectionBaseStyle}>
          <div style={headingBaseStyle}>七、联系我们</div>
          <p style={paragraphBaseStyle}>
            如对本协议有任何疑问，或需反馈平台内容问题，请通过平台留言功能或邮件与我们联系。我们将尽快予以回复。
          </p>
        </div>

        {/* 底部返回 */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            style={{
              borderRadius: 8,
              borderColor: '#C5A065',
              color: '#8B4513',
              fontFamily: "'Noto Serif SC', serif"
            }}
          >
            返回上一页
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TermsPage
