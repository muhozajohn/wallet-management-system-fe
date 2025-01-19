import http from "../axiosInstance";

class budgetDataService {
  create(data) {
    return http.post("/budget", data);
  }
  read() {
    return http.get("/budget");
  }

  update(id, data) {
    return http.put(`/budget/${id}`, data);
  }
  delete(id) {
    return http.delete(`/budget/${id}`);
  }
  getSingle(id) {
    return http.get(`/budget/${id}`);
  }
}

const budgetService = new budgetDataService();
export default budgetService;
