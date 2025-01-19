import http from "../axiosInstance";

class categoryDataService {
  create(data) {
    return http.post("/category", data);
  }
  read() {
    return http.get("/category");
  }

  update(id, data) {
    return http.put(`/category/${id}`, data);
  }
  delete(id) {
    return http.delete(`/category/${id}`);
  }
  getSingle(id) {
    return http.get(`/category/${id}`);
  }
}

const categoryService = new categoryDataService();
export default categoryService;
