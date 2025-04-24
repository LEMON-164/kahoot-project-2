import apiClient from './apiClient';

// Tạo instance Axios với cấu hình mặc định

export const getQuizById = async (quizId) => {
  try {
    const response = await apiClient.get(`/api/quiz/GetQuizById/${quizId}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting quiz with ID ${quizId}:`, error);
    throw error;
  }
};

export const createQuiz = async (quizData) => {
  try {
    const response = await apiClient.post('/api/quiz/CreateQuiz', quizData);
    return response.data;
  } catch (error) {
    console.error('Error creating quiz:', error);
    throw error;
  }
};

export const updateQuiz = async (quizId, updatedData) => {
  try {
    const response = await apiClient.put(`/api/quiz/UpdateQuiz/${quizId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating quiz with ID ${quizId}:`, error);
    throw error;
  }
};

export const deleteQuiz = async (quizId) => {
  try {
    const response = await apiClient.delete(`/api/quiz/DeleteQuiz/${quizId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting quiz with ID ${quizId}:`, error);
    throw error;
  }
};

