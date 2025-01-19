import http from "../axiosInstance";

class transactionDataService {
  create(data) {
    return http.post("/transaction", data);
  }
  read() {
    return http.get("/transaction");
  }

  update(id, data) {
    return http.put(`/transaction/${id}`, data);
  }
  delete(id) {
    return http.delete(`/transaction/${id}`);
  }
  getSingle(id) {
    return http.get(`/transaction/${id}`);
  }
}

const transactionService = new transactionDataService();
export default transactionService;
