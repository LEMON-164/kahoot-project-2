import React, { useState } from 'react';
import {
  Layout,
  Input,
  Upload,
  Button,
  Select,
  Typography,
  Row,
  Col,
  Card,
  Checkbox,
} from 'antd';
import {
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined,
  CopyOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import './CreateQuiz.css';

const { Sider, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const answerStyles = [
  { color: 'red', icon: '▲' },
  { color: 'blue', icon: '◆' },
  { color: 'yellow', icon: '●' },
  { color: 'green', icon: '■' },
];

const CreateQuiz = () => {
  const [questions, setQuestions] = useState([{ id: 0, type: 'Trắc nghiệm' }]);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleAddQuestion = () => {
    const newQuestion = { id: Date.now(), type: 'Trắc nghiệm' };
    setQuestions([...questions, newQuestion]);
    setSelectedQuestion(questions.length);
    setAnswers(['', '', '', '']);
    setCorrectAnswer(null);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    if (selectedQuestion >= updatedQuestions.length) {
      setSelectedQuestion(updatedQuestions.length - 1);
    }
  };

  return (
    <Layout className="createquiz-container">
      {/* Sidebar */}
      <Sider width={200} className="quiz-sider">
        <div className="quiz-sider-scroll">
          {questions.map((q, index) => (
            <div
              key={q.id}
              className={`question-thumb ${
                selectedQuestion === index ? 'selected' : ''
              }`}
              onClick={() => setSelectedQuestion(index)}
            >
              <div className="question-thumb-header">
                <span className="question-number">Câu {index + 1}</span>
                <CloseOutlined
                  className="remove-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveQuestion(index);
                  }}
                />
              </div>
              <p>{q.type}</p>
              <div className="question-preview" />
            </div>
          ))}
        </div>
        <Button
          className="add-question-btn"
          icon={<PlusOutlined />}
          onClick={handleAddQuestion}
        >
          Thêm câu hỏi
        </Button>
        <Button className="add-slide-btn">Thêm slide</Button>
      </Sider>

      {/* Main Content */}
      <Content className="quiz-content">
        <Title level={4} className="quiz-title">
          Bắt đầu nhập câu hỏi
        </Title>

        <div className="media-upload-box">
          <Upload>
            <Button icon={<UploadOutlined />}>Tải tệp tin lên</Button>
          </Upload>
        </div>

        <Row gutter={[16, 16]}>
          {[0, 1, 2, 3].map((i) => {
            const isFilled = !!answers[i];
            const styleClass = isFilled
              ? `answer-card answer-${answerStyles[i].color}`
              : 'answer-card default';

            return (
              <Col span={12} key={i}>
                <Card
                  className={`${styleClass} ${
                    correctAnswer === i ? 'selected' : ''
                  }`}
                  onClick={() => isFilled && setCorrectAnswer(i)}
                >
                  <div className="answer-header-b">
                    <span className="answer-icon">{answerStyles[i].icon}</span>
                    {isFilled && (
                      <Checkbox
                        checked={correctAnswer === i}
                        onChange={() => setCorrectAnswer(i)}
                        className="answer-checkbox"
                      />
                    )}
                  </div>
                  <Input
                    className="answer-input"
                    placeholder={`Thêm đáp án ${i + 1} ${
                      i >= 2 ? '(không bắt buộc)' : ''
                    }`}
                    value={answers[i]}
                    onChange={(e) => handleAnswerChange(i, e.target.value)}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </Content>

      {/* Settings Panel */}
      <Sider width={280} className="quiz-settings" theme="light">
        <div className="setting-group">
          <p className="setting-label">Loại câu hỏi</p>
          <Select defaultValue="Trắc nghiệm" style={{ width: '100%' }}>
            <Option value="Trắc nghiệm">Trắc nghiệm</Option>
          </Select>
        </div>

        <div className="setting-group">
          <p className="setting-label">Giới hạn thời gian</p>
          <Select defaultValue="20 giây" style={{ width: '100%' }}>
            <Option value="5 giây">5 giây</Option>
            <Option value="10 giây">10 giây</Option>
            <Option value="20 giây">20 giây</Option>
            <Option value="30 giây">30 giây</Option>
          </Select>
        </div>

        <div className="setting-group">
          <p className="setting-label">Điểm</p>
          <Select defaultValue="Tiêu chuẩn" style={{ width: '100%' }}>
            <Option value="Tiêu chuẩn">Tiêu chuẩn</Option>
            <Option value="Không tính điểm">Không tính điểm</Option>
          </Select>
        </div>

        <div className="setting-group">
          <p className="setting-label">Đáp án để chọn</p>
          <Select defaultValue="Chọn một đáp án" style={{ width: '100%' }}>
            <Option value="Chọn một đáp án">Chọn một đáp án</Option>
            <Option value="Chọn nhiều đáp án">Chọn nhiều đáp án</Option>
          </Select>
        </div>

        <div className="setting-actions">
          <Button icon={<CopyOutlined />}>Sao chép</Button>
          <Button danger icon={<DeleteOutlined />}>
            Xoá
          </Button>
        </div>
      </Sider>
    </Layout>
  );
};

export default CreateQuiz;