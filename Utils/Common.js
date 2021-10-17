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
  let auth = "Bearer " + token;
  try {
    const resp = await fetch(process.env.base_url + "api/auth/user", {
      headers: {
        "Authorization": auth
      }
    }).then(rs => {
      return rs.json()
    })
    if (resp.data) {
      resp.data.token = token;
      return resp.data
    }
  } catch (error) {
    console.log(error.message);
    return null
  }
}
export { utilsCekLogin, setUserToken, removeUserToken }
