import apiClient from './apiClient';

// Tạo instance Axios với cấu hình mặc định

export const getQuizById = async (quizId) => {
  try {
    const response = await apiClient.get(`/api/quizzes/GetQuizById/${quizId}`);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error getting quiz with ID ${quizId}:`, error);
    throw error;
  }
};

export const createQuiz = async (quizData) => {
  try {
    const response = await apiClient.post('/api/quizzes', quizData);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating quiz:', error);
    throw error;
  }
};

export const updateQuiz = async (quizId, updatedData) => {
  try {
    const response = await apiClient.put(`/api/quizzes/${quizId}`, updatedData);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating quiz with ID ${quizId}:`, error);
    throw error;
  }
};

export const deleteQuiz = async (quizId) => {
  try {
    const response = await apiClient.delete(`/api/quizzes/${quizId}`);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error deleting quiz with ID ${quizId}:`, error);
    throw error;
  }
};

export const getAllQuiz = async () => {
  try {
    const response = await apiClient.get('/api/quizzes');
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting all quizzes:', error);
    throw error;
  }
};

export const getQuizQuestions = async (quizId) => {
  try {
    const response = await apiClient.get(`/quizzes/${quizId}/questions`);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error getting quiz question with ID ${quizId}:`, error);
    throw error;
  }
};

export const updateQuizQuestion = async (questionId, updatedData) => {
  try {
    const response = await apiClient.putForm(
      `/api/questions/${questionId}`,
      updatedData
    );
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating quiz question with ID ${questionId}:`, error);
    throw error;
  }
};

export const createQuizQuestion = async (quizId, questionData) => {
  try {
    const response = await apiClient.postForm(`/api/questions`, questionData);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error creating quiz question with ID ${quizId}:`, error);
    throw error;
  }
};

export const deleteQuizQuestion = async (questionId) => {
  try {
    const response = await apiClient.delete(`/api/questions/${questionId}`);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error deleting quiz question with ID ${questionId}:`, error);
    throw error;
  }
};

export const getSessionSummary = async (sessionId) => {
  try {
    const response = await apiClient.get(`/api/gamesession/${sessionId}/summary`);
    console.log('Response:', response.data);
    return response.data;
  } catch (err) {
    console.error("Failed to load session summary:", err);
  }
};

export const getAllSessions = async () => {
  try {
    const response = await apiClient.get(`/api/gamesession/GetAll`);
    console.log('Response:', response.data);
    return response.data;
  } catch (err) {
    console.error("Failed to load session summary:", err);
  }
}
