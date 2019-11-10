import axios from "axios";
import { __exportStar } from "tslib";

const url = "auth/";

class AuthService {
  //Get Posts
  static login(data: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const res = await axios.post(url + 'login', data);
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }

  static register(data: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const res = await axios.post(url + 'register', data);
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }

  static linkAccount(data: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const res = await axios.get(url + `${data.service}`, data);
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default AuthService;
