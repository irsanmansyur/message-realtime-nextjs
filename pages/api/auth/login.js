export default function handler(req, res) {
  fetch(process.env.base_api + "login", {
    method: "POST",
    body: req.body,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  }).then(res => res.json()).then(rs =>
    res.status(200).json(rs)
  ).catch(rs => res.status(404).json(rs))
}