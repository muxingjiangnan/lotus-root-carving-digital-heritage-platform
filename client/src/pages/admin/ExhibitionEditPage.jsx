import { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Space, Spin, message, Card } from 'antd';
import { MinusCircleOutlined, PlusOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { getExhibition, updateExhibition } from '../../api/exhibition';

const { Option } = Select;
const { TextArea } = Input;

const ExhibitionEditPage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getExhibition()
      .then((res) => {
        form.setFieldsValue({
          title: res.title,
          sections: res.sections || []
        });
      })
      .finally(() => setLoading(false));
  }, [form]);

  const handleSave = async (values) => {
    setSaving(true);
    try {
      await updateExhibition(values);
      message.success('保存成功');
    } catch (error) {
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2>展厅内容编辑</h2>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}><Spin size="large" /></div>
      ) : (
        <Form form={form} layout="vertical" onFinish={handleSave} style={{ marginTop: 24 }}>
          <Form.Item label="展厅标题" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.List name="sections">
            {(fields, { add, remove, move }) => (
              <div>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Card key={key} size="small" style={{ marginBottom: 16 }}>
                    <Space align="baseline" style={{ display: 'flex', marginBottom: 8 }}>
                      <Form.Item {...restField} name={[name, 'type']} rules={[{ required: true }]}>
                        <Select placeholder="类型" style={{ width: 120 }}>
                          <Option value="text">文本段落</Option>
                          <Option value="image">图片</Option>
                          <Option value="video">视频</Option>
                        </Select>
                      </Form.Item>
                      <Button icon={<ArrowUpOutlined />} onClick={() => move(index, index - 1)} disabled={index === 0} />
                      <Button icon={<ArrowDownOutlined />} onClick={() => move(index, index + 1)} disabled={index === fields.length - 1} />
                      <MinusCircleOutlined onClick={() => remove(name)} style={{ color: 'red', fontSize: 18, cursor: 'pointer' }} />
                    </Space>
                    <Form.Item {...restField} name={[name, 'content']} rules={[{ required: true, message: '请输入内容或URL' }]}>
                      <TextArea rows={2} placeholder={form.getFieldValue(['sections', name, 'type']) === 'text' ? '输入文本内容' : '输入资源URL'} />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, 'caption']}>
                      <Input placeholder="说明文字（可选）" />
                    </Form.Item>
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add({ type: 'text', content: '', caption: '' })} block icon={<PlusOutlined />}>
                  添加内容块
                </Button>
              </div>
            )}
          </Form.List>
          <Form.Item style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit" loading={saving}>保存展厅内容</Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default ExhibitionEditPage;
