import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const PrivacyPage = () => {
  const navigate = useNavigate();

  const sectionStyle = {
    marginBottom: 28,
  };

  const headingStyle = {
    fontSize: 18,
    fontWeight: 700,
    color: '#3E2723',
    marginBottom: 12,
    paddingLeft: 12,
    borderLeft: '3px solid #C5A065',
    fontFamily: "'Noto Serif SC', 'Source Han Serif SC', serif",
    letterSpacing: 1,
  };

  const paragraphStyle = {
    fontSize: 15,
    lineHeight: 1.9,
    color: '#4A4A4A',
    textIndent: '2em',
    marginBottom: 8,
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FDFBF6',
        fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'SimSun', serif",
      }}
    >
      {/* 顶部装饰条 */}
      <div
        style={{
          height: 4,
          background: 'linear-gradient(90deg, #5D4037, #C5A065, #5D4037)',
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
              display: 'block',
            }}
          >
            <rect
              x="6"
              y="6"
              width="88"
              height="88"
              rx="6"
              fill="none"
              stroke="#C94C4C"
              strokeWidth="4"
            />
            <text
              x="50"
              y="44"
              textAnchor="middle"
              fill="#C94C4C"
              fontSize="22"
              fontWeight="700"
              fontFamily="'Noto Serif SC', serif"
            >
              守密
            </text>
            <text
              x="50"
              y="74"
              textAnchor="middle"
              fill="#C94C4C"
              fontSize="22"
              fontWeight="700"
              fontFamily="'Noto Serif SC', serif"
            >
              护私
            </text>
          </svg>

          <h1
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#3E2723',
              margin: 0,
              letterSpacing: 4,
            }}
          >
            隐私政策
          </h1>
          <p
            style={{
              fontSize: 14,
              color: '#8B7E74',
              marginTop: 8,
              letterSpacing: 1,
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
            border: '1px solid rgba(197,160,101,0.15)',
          }}
        >
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.8,
              color: '#5D4037',
              margin: 0,
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            "谨守用户信息，如护匠人眼目；最小化收集，最大化尊重。"
          </p>
        </div>

        {/* 第一章 */}
        <div style={sectionStyle}>
          <div style={headingStyle}>一、信息收集范围</div>
          <p style={paragraphStyle}>
            本平台坚持最小化收集原则。在您注册和使用过程中，我们可能收集的信息仅限于：用户名（用于展示）、手机号码（用于账号安全与找回）、电子邮箱（用于系统通知与密码找回）、登录密码（经加密处理后存储）。
          </p>
          <p style={paragraphStyle}>
            我们不会收集您的身份证号、银行卡信息、地理位置或其他与平台服务无关的敏感个人信息。
          </p>
        </div>

        {/* 第二章 */}
        <div style={sectionStyle}>
          <div style={headingStyle}>二、信息使用目的</div>
          <p style={paragraphStyle}>
            我们收集的上述信息仅用于以下目的：完成账号注册与身份验证、保障账号安全与登录服务、在必要时向您发送系统通知（如评论回复提醒）、协助您找回密码。我们不会将您的个人信息用于任何商业营销或第三方广告投放。
          </p>
        </div>

        {/* 第三章 */}
        <div style={sectionStyle}>
          <div style={headingStyle}>三、信息存储与安全</div>
          <p style={paragraphStyle}>
            您的登录密码采用 bcrypt 算法进行不可逆加密存储，即使是平台管理员也无法查看您的明文密码。所有用户数据存储于受保护的服务器中，并采取了合理的访问控制与技术防护措施。
          </p>
          <p style={paragraphStyle}>
            本平台服务器部署于中国大陆境内，用户数据不会跨境传输。我们将定期评估数据安全风险，及时修补可能存在的安全漏洞。
          </p>
        </div>

        {/* 第四章 */}
        <div style={sectionStyle}>
          <div style={headingStyle}>四、信息共享与披露</div>
          <p style={paragraphStyle}>
            本平台承诺：不会向任何第三方出售、出租或共享您的个人信息；不会将您的数据用于本隐私政策所述目的之外的任何用途。
          </p>
          <p style={paragraphStyle}>
            仅在以下法定情形下，我们可能依法向有关部门披露您的信息：应法律法规要求、应政府机关或司法机关的合法要求、为维护平台及其他用户的合法权益所必需。
          </p>
        </div>

        {/* 第五章 */}
        <div style={sectionStyle}>
          <div style={headingStyle}>五、Cookie 与本地存储</div>
          <p style={paragraphStyle}>
            本平台仅使用维持登录状态所必需的本地存储技术（如 localStorage 存储登录令牌），不使用任何第三方追踪 Cookie 或行为分析工具。您可随时通过浏览器清除本地存储，但清除后将需要重新登录。
          </p>
        </div>

        {/* 第六章 */}
        <div style={sectionStyle}>
          <div style={headingStyle}>六、用户权利</div>
          <p style={paragraphStyle}>
            您对自己的个人信息享有以下权利：查阅和更正您的账号信息；注销账号并要求删除个人数据（注销后您的评论等内容将被匿名化处理或删除）；拒绝接收非必要的系统通知。
          </p>
          <p style={paragraphStyle}>
            如需行使上述权利，请通过平台留言功能或管理员邮箱与我们联系，我们将在合理期限内予以处理。
          </p>
        </div>

        {/* 第七章 */}
        <div style={sectionStyle}>
          <div style={headingStyle}>七、政策更新</div>
          <p style={paragraphStyle}>
            本隐私政策可能因法律法规变化或平台运营需要进行更新。重大变更时，我们将在平台显著位置发布公告。继续使用本平台服务即视为接受更新后的隐私政策。
          </p>
        </div>

        {/* 第八章 */}
        <div style={sectionStyle}>
          <div style={headingStyle}>八、联系我们</div>
          <p style={paragraphStyle}>
            如您对本隐私政策有任何疑问，或认为您的个人信息权益受到侵害，请通过平台留言功能与我们取得联系。我们将认真对待每一项反馈，并在合理时间内予以回复。
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
              fontFamily: "'Noto Serif SC', serif",
            }}
          >
            返回上一页
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
