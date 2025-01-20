import http from "../axiosInstance";

class subcategoryDataService {
  create(data) {
    return http.post("/subcategory", data);
  }
  read() {
    return http.get("/subcategory");
  }

  update(id, data) {
    return http.put(`/subcategory/${id}`, data);
  }
  delete(id) {
    return http.delete(`/subcategory/${id}`);
  }
  getSingle(id) {
    return http.get(`/subcategory/${id}`);
  }
}

const subcategoryService = new subcategoryDataService();
export default subcategoryService;
