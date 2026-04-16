import request from './request';

export const getArtworks = (params) => request.get('/artworks', { params });
export const getArtworkById = (id) => request.get(`/artworks/${id}`);
export const createArtwork = (data) => request.post('/artworks', data);
export const updateArtwork = (id, data) => request.put(`/artworks/${id}`, data);
export const deleteArtwork = (id) => request.delete(`/artworks/${id}`);
