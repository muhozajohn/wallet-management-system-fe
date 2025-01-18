import http from "../axiosInstance";

class loginDataService {
  login(data) {
    return http.post("/users/auth", data);
  }
  signup(data) {
    return http.post("/users", data);
  }
  update(id, data) {
    return http.put(`/users/${id}`, data);
  }
  getSingle(id) {
    return http.get(`/users/${id}`);
  }
}

const loginService = new loginDataService();
export default loginService;