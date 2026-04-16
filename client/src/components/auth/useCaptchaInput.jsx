import { useState, useEffect, useCallback } from 'react';
import { Input, Space } from 'antd';

const CaptchaCanvas = ({ code, onClick }) => {
  const canvasRef = (node) => {
    if (!node) return;
    const ctx = node.getContext('2d');
    const width = node.width;
    const height = node.height;

    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 6; i++) {
      ctx.strokeStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.3)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }

    ctx.font = 'bold 22px Arial';
    ctx.textBaseline = 'middle';
    const startX = 10;
    for (let i = 0; i < code.length; i++) {
      ctx.save();
      ctx.translate(startX + i * 26, height / 2);
      ctx.rotate((Math.random() - 0.5) * 0.4);
      ctx.fillStyle = `rgb(${50 + Math.random() * 100},${50 + Math.random() * 100},${50 + Math.random() * 100})`;
      ctx.fillText(code[i], 0, 0);
      ctx.restore();
    }

    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.2})`;
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={120}
      height={42}
      onClick={onClick}
      title="点击刷新"
      style={{
        borderRadius: 8,
        cursor: 'pointer',
        border: '1px solid #d9d9d9',
      }}
    />
  );
};

const useCaptchaInput = ({ value, onChange, placeholder = '请输入验证码' } = {}) => {
  const [code, setCode] = useState('');

  const refresh = useCallback(() => {
    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    setCode(result);
    if (onChange) {
      onChange({ target: { value: value || '' } });
    }
  }, [onChange, value]);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return {
    code,
    refresh,
    isValid: (input) => input && input.toLowerCase() === code.toLowerCase(),
    render: (
      <Space>
        <Input
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          maxLength={4}
          style={{ width: 140 }}
        />
        <CaptchaCanvas code={code} onClick={refresh} />
      </Space>
    ),
  };
};

export default useCaptchaInput;
