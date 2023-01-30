import http from '../http-common';

class UserService {
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
}

export default new UserService();
