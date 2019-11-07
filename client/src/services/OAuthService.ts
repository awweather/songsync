import axios from "axios";
import { __exportStar } from "tslib";

const url = "oauth/";

//This won't work without using proxy in vue.config.js
//Otherwise you get a CORS, but I'm not sure how to fix it
const api = axios.create({
  baseURL: `http://localhost:8888`})

class AuthService {
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
