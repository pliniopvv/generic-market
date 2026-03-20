import axios from "axios";

export default class AuthService {
  login(username, password) {
    const user = {
      username,
      password,
    };

    return axios.post("http://localhost:3000/auth/login", user);
  }
}
