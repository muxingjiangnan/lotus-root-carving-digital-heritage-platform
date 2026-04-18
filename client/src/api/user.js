import request from './request';

export const getUsers = (params) => request.get('/users', { params });
export const updateUserRole = (id, role) => request.put(`/users/${id}/role`, { role });
export const deleteUser = (id) => request.delete(`/users/${id}`);
