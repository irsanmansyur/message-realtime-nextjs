export default function handler(req, res) {
  const { authorization } = req.headers;
  fetch(process.env.base_api_prod + "logout", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": authorization,
    }
  }).then(res => res.json()).then(rs =>
    res.status(200).json(rs)
  ).catch(rs => res.status(404).json(rs))
}