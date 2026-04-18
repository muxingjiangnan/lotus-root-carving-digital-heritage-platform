import { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Space,
  Spin,
  message,
  Card,
  Tabs
} from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { getExhibition, updateExhibition } from '../../api/exhibition';

const { Option } = Select;
const { TextArea } = Input;

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'clean']
  ]
};

const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'link'
];

const ExhibitionEditPage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    getExhibition()
      .then((res) => {
        form.setFieldsValue({
          title: res.title,
          historyContent: res.historyContent || '',
          coursesContent: res.coursesContent || '',
          projectContent: res.projectContent || '',
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
    } catch {
      // request interceptor handles error message
    } finally {
      setSaving(false);
    }
  };

  const tabItems = [
    {
      key: 'basic',
      label: '基础信息',
      children: (
        <Form.Item
          label="展厅标题"
          name="title"
          rules={[{ required: true, message: '请输入展厅标题' }]}
        >
          <Input placeholder="展厅标题" />
        </Form.Item>
      )
    },
    {
      key: 'content',
      label: '展厅内容板块',
      children: (
        <>
          <Form.Item
            label="一、莲花根雕历史与文化"
            name="historyContent"
            rules={[{ required: true, message: '请输入内容' }]}
          >
            <ReactQuill
              theme="snow"
              modules={quillModules}
              formats={quillFormats}
              style={{ background: '#fff' }}
            />
          </Form.Item>
          <Form.Item
            label="二、非遗数字化课程"
            name="coursesContent"
            rules={[{ required: true, message: '请输入内容' }]}
          >
            <ReactQuill
              theme="snow"
              modules={quillModules}
              formats={quillFormats}
              style={{ background: '#fff' }}
            />
          </Form.Item>
          <Form.Item
            label="三、莲韵非遗 · 数字传承项目"
            name="projectContent"
            rules={[{ required: true, message: '请输入内容' }]}
          >
            <ReactQuill
              theme="snow"
              modules={quillModules}
              formats={quillFormats}
              style={{ background: '#fff' }}
            />
          </Form.Item>
        </>
      )
    },
    {
      key: 'sections',
      label: '展厅精选',
      children: (
        <Form.List name="sections">
          {(fields, { add, remove, move }) => (
            <div>
              {fields.map(({ key, name, ...restField }, index) => (
                <Card key={key} size="small" style={{ marginBottom: 16 }}>
                  <Space
                    align="baseline"
                    style={{ display: 'flex', marginBottom: 8 }}
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'type']}
                      rules={[{ required: true, message: '请选择类型' }]}
                      style={{ marginBottom: 0 }}
                    >
                      <Select placeholder="类型" style={{ width: 120 }}>
                        <Option value="text">文本段落</Option>
                        <Option value="image">图片</Option>
                        <Option value="video">视频</Option>
                      </Select>
                    </Form.Item>
                    <Button
                      icon={<ArrowUpOutlined />}
                      onClick={() => move(index, index - 1)}
                      disabled={index === 0}
                    />
                    <Button
                      icon={<ArrowDownOutlined />}
                      onClick={() => move(index, index + 1)}
                      disabled={index === fields.length - 1}
                    />
                    <MinusCircleOutlined
                      onClick={() => remove(name)}
                      style={{
                        color: 'red',
                        fontSize: 18,
                        cursor: 'pointer'
                      }}
                    />
                  </Space>
                  <Form.Item
                    {...restField}
                    name={[name, 'content']}
                    rules={[
                      { required: true, message: '请输入内容或URL' }
                    ]}
                  >
                    <TextArea
                      rows={2}
                      placeholder={
                        form.getFieldValue(['sections', name, 'type']) ===
                        'text'
                          ? '输入文本内容'
                          : '输入资源URL'
                      }
                    />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, 'caption']}>
                    <Input placeholder="说明文字（可选）" />
                  </Form.Item>
                </Card>
              ))}
              <Button
                type="dashed"
                onClick={() =>
                  add({ type: 'text', content: '', caption: '' })
                }
                block
                icon={<PlusOutlined />}
              >
                添加内容块
              </Button>
            </div>
          )}
        </Form.List>
      )
    }
  ];

  return (
    <div>
      <h2>展厅内容编辑</h2>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <Spin size="large" />
        </div>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          style={{ marginTop: 24 }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
          />
          <Form.Item style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit" loading={saving}>
              保存展厅内容
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default ExhibitionEditPage;
