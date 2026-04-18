import request from './request';

export const createQuestion = (data) => request.post('/questions', data);
export const getApprovedQuestions = (category) => request.get('/questions', { params: category ? { category } : {} });
export const getAllQuestions = () => request.get('/questions/admin');
export const getQuestionDetail = (id) => request.get(`/questions/${id}`);
export const getComments = (id) => request.get(`/questions/${id}/comments`);
export const createComment = (id, data) => request.post(`/questions/${id}/comments`, data);
export const deleteQuestion = (id) => request.delete(`/questions/${id}`);
export const deleteComment = (questionId, commentId) => request.delete(`/questions/${questionId}/comments/${commentId}`);
export const auditQuestion = (id, data) => request.put(`/questions/${id}/audit`, data);
