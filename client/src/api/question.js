import request from './request';

export const createQuestion = (data) => request.post('/questions', data);
export const getApprovedQuestions = () => request.get('/questions');
export const getAllQuestions = () => request.get('/questions/admin');
export const auditQuestion = (id, data) => request.put(`/questions/${id}/audit`, data);
