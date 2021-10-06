import { myHeader } from "../../../Utils/Api";
import nookies, { parseCookies } from "nookies"

export default function handler(req, res) {
  const { authorization } = req.headers;
  fetch(process.env.base_api_prod + "user", {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": authorization,
    },
  }).then(rs => rs.json()).then(rs =>
    res.status(200).json(rs)
  ).catch(rs => res.status(404).json(rs))
}