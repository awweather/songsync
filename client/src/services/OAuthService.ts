import axios from "axios";
import { __exportStar } from "tslib";

const url = "auth/";

class OAuthService {
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

export default OAuthService;
