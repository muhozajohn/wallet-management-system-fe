import http from "../axiosInstance";

class budgetcategoryDataService {
  create(data) {
    return http.post("/budgetcategory", data);
  }
  read() {
    return http.get("/budgetcategory");
  }

  update(id, data) {
    return http.put(`/budgetcategory/${id}`, data);
  }
  delete(id) {
    return http.delete(`/budgetcategory/${id}`);
  }
  getSingle(id) {
    return http.get(`/budgetcategory/${id}`);
  }
}

const budgetcategoryService = new budgetcategoryDataService();
export default budgetcategoryService;
