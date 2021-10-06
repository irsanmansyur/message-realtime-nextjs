import nookies, { destroyCookie } from "nookies"

const unAuthPage = (ctx) => {
  const allCookies = nookies.get(ctx)
  if (allCookies.token)
    return ctx.res.writeHead(302, {
      Location: "/conversation"
    }).end();
  return true
}
const authPage = (ctx) => {
  const allCookies = nookies.get(ctx)
  if (!allCookies.token)
    return ctx.res.writeHead(302, {
      Location: "/login"
    }).end();
  return allCookies.token;
}
export { authPage, unAuthPage }