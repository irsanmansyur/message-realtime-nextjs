import { parseCookies } from "nookies";
import { myHeader } from "./Api";
import { myPusher } from "./Pusher";

const getMessagesUtils = async (id) => {
  try {
    if (id) return await fetch(`/api/message/${id}`, {
      headers: myHeader(),
    }).then(res => res.json());
  } catch (error) {
    return false;
  }
};

const getMessagesMoreUtils = async (url) => {
  try {
    return await fetch("/api/message/more", {
      method: "POST",
      body: JSON.stringify({ url }),
      headers: myHeader(),
    }).then(res => res.json());
  } catch (error) {
    return false;
  }
};
const sendMessageUtils = async (data) => {
  const cookies = parseCookies()
  try {
    return await fetch(process.env.base_api + `conversation/send`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + cookies.token,
        "Content-Type": "application/json",
        "X-Socket-Id": myPusher.connection.socket_id
      },
    }).then(res => res.json());
  } catch (error) {
    return false;
  }
};

export { getMessagesUtils, sendMessageUtils, getMessagesMoreUtils };