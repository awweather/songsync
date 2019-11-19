import axios from "axios";
import { __exportStar } from "tslib";
import ServiceProvidersEnum from "../enums/ServiceProviders";

const url = "auth/";

class OAuthService {
  static linkAccount(service: String) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const res = await axios.get(url + `${service}`);
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }

  static linkPandora(data: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const res = await axios.post(url + "pandora", data);
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default OAuthService;
