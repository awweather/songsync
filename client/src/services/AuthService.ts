import axios from "axios";
import { __exportStar } from "tslib";

const url = "auth/";

//This works for now, but should probably use proxy
//See vue.config.js
const api = axios.create({
  baseURL: `http://localhost:5000`})

class AuthService {
  //Get Posts
  static login(data: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const res = await api.post(url + 'login', data);
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }

  static register(data: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const res = await api.post(url + 'register', data);
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }

  static linkAccount(data: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const res = await api.get(url + `${data.service}`, data);
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default AuthService;
