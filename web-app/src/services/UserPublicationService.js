import http from '../http-common';

class UserPublicationService {
  getAll() {
    return http.get('/users');
  }

  get(id) {
    return http.get(`/users/${id}`);
  }

  getUserPublications(id) {
    return http.get(`/publications/user/${id}`);
  }

  create(data) {
    return http.post('/users', data);
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }

  update(id, data) {
    return http.put(`/users/${id}`, data);
  }

  deletePublication(id) {
    return http.delete(`/publications/${id}`);
  }

  updatePublication(id, data) {
    return http.put(`/publications/${id}`, data);
  }

  createPublication(userId, data) {
    data.student_id = userId;
    return http.post(`/publications`, data);
  }

  bulkDeletePublications(ids) {
    return http.delete(`/publications`, { params: { publicationIds: ids } });
  }
}

export default new UserPublicationService();
