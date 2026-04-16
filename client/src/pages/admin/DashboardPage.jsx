import { Card, Row, Col } from 'antd';

const DashboardPage = () => {
  return (
    <div>
      <h2>管理首页</h2>
      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card title="展厅管理">
            <p>编辑非遗文化展厅的图文内容</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="作品管理">
            <p>增删改查数字作品库中的根雕作品</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="课程管理">
            <p>维护在线微课程及章节视频</p>
          </Card>
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card title="问答审核">
            <p>审核用户提交的问题并给出回复</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
