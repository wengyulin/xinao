import { fetch } from "../../utils";
import { stringify } from "qs";

export const getUserInfo = (username: string, password: string) => fetch(`user/login?${stringify({
  username,
  password
})}`);
