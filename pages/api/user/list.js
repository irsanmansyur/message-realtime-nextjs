
export default function handler(req, res) {
  const { authorization } = req.headers;
  fetch(process.env.base_api + "user/list", {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": authorization,
    },
  }).then(rs => rs.json()).then(rs =>
    res.status(200).json(rs)
  ).catch(rs => res.status(404).json(rs))
}