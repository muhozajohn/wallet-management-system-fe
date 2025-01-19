import http from "../axiosInstance";

class accountDataService {
  create(data) {
    return http.post("/account", data);
  }
  read() {
    return http.get("/account");
  }
  totalbalance() {
    return http.get("/account/balances/types");
  }
  update(id, data) {
    return http.put(`/account/${id}`, data);
  }
  delete(id) {
    return http.delete(`/account/${id}`);
  }
  getSingle(id) {
    return http.get(`/account/${id}`);
  }
}

const accountService = new accountDataService();
export default accountService;
