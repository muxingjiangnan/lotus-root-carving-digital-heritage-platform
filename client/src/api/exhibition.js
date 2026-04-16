import request from './request';

export const getExhibition = () => request.get('/exhibition');
export const updateExhibition = (data) => request.put('/exhibition', data);
