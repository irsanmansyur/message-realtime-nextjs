import { parseCookies } from "nookies";


const myHeader = (token = null, data) => {
  const cookies = parseCookies()
  return {
    "Accept": "application/json",
    "Authorization": "Bearer " + (token ? token : cookies.token),
    "Content-Type": "application/json"
  }
}
export { myHeader };
