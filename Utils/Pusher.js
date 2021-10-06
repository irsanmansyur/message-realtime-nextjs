import Pusher from 'pusher-js';
import { myHeader } from './Api';
const myPusher = new Pusher(process.env.PUSHER_APP_KEY, {
  cluster: process.env.PUSHER_APP_CLUSTER,
  authEndpoint: process.env.base_api + "broadcasting/auth",
  auth: { headers: myHeader() },
});
const MessageChannel = (userID, toUserID, is_callback = false) => {
  const channel = myPusher.subscribe('messageTo' + userID + "For" + toUserID);
  channel.bind(`sendMessage`, async function (data) {
    is_callback && is_callback(data);
  });
}
const OnlineChannel = (user, is_callback = false) => {
  const channel = myPusher.subscribe('userOnline_' + user.id);
  channel.bind(`isOnline`, async function (data) {
    is_callback && is_callback(data);
  });
}

export { MessageChannel, OnlineChannel, myPusher }
