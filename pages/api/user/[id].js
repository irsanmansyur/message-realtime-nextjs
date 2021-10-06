
export default function handler(req, res) {
  const { authorization } = req.headers;
  const userId = req.query.id;
  fetch(process.env.base_api_prod + `user/show/${userId}`, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": authorization,
    },
  }).then(rs => rs.json()).then(rs =>
    res.status(200).json(rs)
  ).catch(rs => res.status(404).json(rs))
}