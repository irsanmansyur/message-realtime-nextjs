import nookies, { destroyCookie } from "nookies"
import { myHeader } from "./Api";
function getToken(ctx) {
  let cookie = nookies.get(ctx);
  return cookie.token ?? null;
}
const removeUserToken = (ctx = null) => {
  if (ctx)
    return nookies.destroy(ctx, 'token');
  destroyCookie(ctx, 'token');
}
const setUserToken = (token) => {
  nookies.set(null, "token", token)
}
const utilsCekLogin = async (token) => {
  try {
    let res = await fetch(process.env.base_api + "user", {
      headers: myHeader(token)
    }).then(res => res.json());
    if (res.data) {
      res.data.token = token;
      return res.data
    }
    return null
  } catch (e) {
    return null;
  }
}

export { utilsCekLogin, setUserToken, removeUserToken }
