import axios from "axios";
import { __exportStar } from "tslib";

const service = axios.create({
  withCredentials: true
})
const url = "auth/";

class AuthService {
  //Get Posts
  static login(data: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const res = await service.post(url + 'login', data);
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }

  static getUser() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const res = await service.get(url + 'user');
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }

  static register(data: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const res = await service.post(url + 'register', data);
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
