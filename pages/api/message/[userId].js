
export default function handler(req, res) {
  const { authorization } = req.headers;
  const userId = req.query.userId;
  fetch(process.env.base_api + `conversation/show?id=${userId}`, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": authorization,
    },
  }).then(rs => rs.json()).then(rs => {
    return res.status(200).json(rs)
  }
  ).catch(rs => res.status(404).json(rs))
}