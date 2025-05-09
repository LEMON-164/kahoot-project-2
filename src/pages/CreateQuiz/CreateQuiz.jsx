import React, { use, useEffect, useState } from 'react';
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
  InputNumber,
} from 'antd';
import {
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined,
  CopyOutlined,
  CloseOutlined,
  ArrowLeftOutlined,
  SaveOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import './CreateQuiz.css';
import {
  getQuizQuestions,
  updateQuizQuestion,
  createQuizQuestion,
  deleteQuizQuestion,
} from '../../services/QuizServices';
import { useLocation, useNavigate } from 'react-router-dom';
const { Sider, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const answerStyles = [
  { color: 'red', icon: '▲' },
  { color: 'blue', icon: '◆' },
  { color: 'yellow', icon: '●' },
  { color: 'green', icon: '■' },
];

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const CreateQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const quizId = location.pathname.split('/').pop();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [timeLimit, setTimeLimit] = useState(20);
  const [saveStatus, setSaveStatus] = useState('');


  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleAddQuestion = async () => {
    try {
      const response = await createQuizQuestion(quizId, {
        QuizId: quizId,
        Text: 'New Question',
        TimeLimit: 20,
        ImageFile: null,
        ImageData: null,
        Option1: '',
        Option2: '',
        Option3: '',
        Option4: '',
        CorrectOptions: '',
        OrderIndex: questions.length,
        CreatedTime: new Date().toISOString(),
        Status: 'Active',
      });
      setQuestions([...questions, response.data]);
      setSelectedQuestion(questions.length);
      setAnswers(['', '', '', '']);
      setCorrectAnswer('');
    } catch (error) {
      console.error('Error creating quiz question:', error);
    }
  };

  const handleRemoveQuestion = async (index) => {
    // const updatedQuestions = questions.filter((_, i) => i !== index);
    // setQuestions(updatedQuestions);
    // if (selectedQuestion >= updatedQuestions.length) {
    //   setSelectedQuestion(updatedQuestions.length - 1);
    // }
    try {
      await deleteQuizQuestion(questions[index].questionId);
      setQuestions(questions.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting quiz question:', error);
    }
  };

  const handleSaveQuestion = async () => {

    const question = getQuestion();
    const updatedData = {
      QuestionId: question.QuestionId,
      QuizId: quizId,
      Text: question.text,
      TimeLimit: timeLimit,
      ImageFile: question.imageFile || null,
      ImageData: null,
      Option1: answers[0],
      Option2: answers[1],
      Option3: answers[2],
      Option4: answers[3],
      OrderIndex: question.orderIndex,
      CorrectOptions: correctAnswer,
      Status: capitalizeFirstLetter(question.status),
    };
    // try {
    //   const response = await updateQuizQuestion(
    //     question.questionId,
    //     updatedData
    //   );
    // } catch (error) {
    //   console.error('Error updating quiz question:', error);
    // }
    try {
      setSaveStatus('saving');
      await updateQuizQuestion(question.questionId, updatedData); // chú ý: QuestionId viết hoa
      setSaveStatus('saved');

      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Error updating quiz question:', error);
    }
  };

  const getQuestion = () => {
    const question = questions.find((q) => q.questionId === selectedQuestion);
    return question;
  };

  useEffect(() => {
    const fetchQuizQuestion = async () => {
      const response = await getQuizQuestions(quizId);
      setQuestions(response.data);
      setSelectedQuestion(response.data[0].questionId);
      setAnswers([
        response.data[0].option1,
        response.data[0].option2,
        response.data[0].option3,
        response.data[0].option4,
      ]);
      setCorrectAnswer(response.data[0].correctOptions);
      setTimeLimit(response.data[0].timeLimit);
    };
    fetchQuizQuestion();
  }, [quizId]);

  useEffect(() => {
    console.log('Correct Answer:', correctAnswer);
  }, [correctAnswer]);

  useEffect(() => {
    console.log('Questions:', questions);
  }, [questions]);


  return (
    <Layout className="createquiz-container">
      {/* Sidebar */}
      <Sider width={200} className="quiz-sider">
        <div className="quiz-sider-scroll">
          {questions.map((q, index) => (
            <div
              key={q.questionId}
              className={`question-thumb ${selectedQuestion === q.questionId ? 'selected' : ''
                }`}
              onClick={() => {
                setSelectedQuestion(q.questionId);
                setAnswers([q.option1, q.option2, q.option3, q.option4]);
                setCorrectAnswer(q.correctOptions);
                setTimeLimit(q.timeLimit);
              }}
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
              {/* <p>{q.text}</p> */}
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
      </Sider>

      {/* Main Content */}
      <Content className="quiz-content">
        <Title level={4} className="quiz-title">
          Bắt đầu nhập câu hỏi
        </Title>
        {getQuestion() && (
          <Input
            className="question-input-text"
            placeholder="Nhập câu hỏi"
            value={getQuestion().text || ''}
            onChange={(e) => {
              setQuestions(
                questions.map((q) =>
                  q.questionId === selectedQuestion
                    ? { ...q, text: e.target.value }
                    : q
                )
              );
            }}
          />
        )}
        <div className="w-10 h-10 overflow-hidden rounded-full item-center justify-center">
          {(getQuestion()?.imageFile || getQuestion()?.imageUrl) && <img
            width={300}
            height={300}
            src={
              getQuestion()?.imageFile
                ? URL.createObjectURL(getQuestion().imageFile)
                : getQuestion()?.imageUrl
            }
            style={{ border: '50%', objectFit: 'cover' }}
          />}
        </div>

        <div className="media-upload-box">
          <Upload
            accept="image/*"
            showUploadList={false}
            beforeUpload={(file) => {
              setQuestions((prev) =>
                prev.map((q) =>
                  q.questionId === selectedQuestion ? { ...q, imageFile: file } : q
                )
              );
              return false; // Ngăn auto-upload
            }}
          >
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
                  className={`${styleClass} ${correctAnswer?.split(',')?.includes((i + 1).toString())
                    ? 'selected' : ''
                    }`}
                  onClick={() => {
                    if (isFilled) {
                      setQuestions(
                        questions.map((q) => {
                          if (q.questionId === selectedQuestion) {
                            const correctAns = correctAnswer?.split(',')?.includes((i + 1).toString())
                              ? correctAnswer.replace(`,${(i + 1)}`, '').replace((i + 1), '')
                              : correctAnswer?.length > 0 ?
                                correctAnswer + ',' + (i + 1) : (i + 1).toString();
                            setCorrectAnswer(correctAns);
                            return { ...q, correctOptions: correctAns };
                          }
                          return q;
                        })
                      );
                    }
                  }}
                >
                  <div className="answer-header-b">
                    <span className="answer-icon">{answerStyles[i].icon}</span>
                    {isFilled && (
                      <Checkbox
                        checked={correctAnswer?.split(',')?.includes((i + 1).toString())}
                        onChange={() => {
                          setQuestions(
                            questions.map((q) => {
                              if (q.questionId === selectedQuestion) {
                                const correctAns = correctAnswer?.split(',')?.includes((i + 1).toString())
                                  ? correctAnswer.replace(`,${(i + 1)}`, '').replace((i + 1), '')
                                  : correctAnswer?.length > 0 ?
                                    correctAnswer + ',' + (i + 1) : (i + 1).toString();
                                setCorrectAnswer(correctAns);
                                return { ...q, correctOptions: correctAns };
                              }
                              return q;
                            })
                          );
                        }}
                        className="answer-checkbox"
                      />
                    )}
                  </div>
                  <Input
                    className="answer-input"
                    placeholder={`Thêm đáp án ${i + 1} ${i >= 2 ? '(không bắt buộc)' : ''
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
          <p className="setting-label">Giới hạn thời gian</p>
          <InputNumber
            min={5}
            max={60}
            value={timeLimit}
            onChange={(value) => setTimeLimit(value)}
          />
        </div>

        <div className="setting-actions">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/UserMenu')}
          >
            Quay lại
          </Button>
          {/* <Button icon={<SaveOutlined />} onClick={handleSaveQuestion}>
            Lưu
          </Button> */}
          <Button
            icon={saveStatus === 'saved' ? <CheckOutlined /> : <SaveOutlined />}
            onClick={handleSaveQuestion}
            loading={saveStatus === 'saving'}
          >
            {saveStatus === 'saved' ? 'Đã lưu' : 'Lưu'}
          </Button>
        </div>
      </Sider>
    </Layout>
  );
};

export default CreateQuiz;
