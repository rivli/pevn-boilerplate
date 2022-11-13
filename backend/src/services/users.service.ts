import { sign } from "jsonwebtoken";

export default class UserService {
  static async getToken(login: string, password: string) {
    return new Promise((resolve, reject) => {
      // Here some authentication
      if (login !== "a" && password !== "12345") reject("wrong credentioals");

      sign(
        {
          login,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) reject(err);
          resolve(token);
        }
      );
    });
  }

  static async getAuthUser(login: string) {
    // Here some db request for user info

    return {
      login,
      name: "Abc",
      last_name: "Abcd",
    };
  }
}
