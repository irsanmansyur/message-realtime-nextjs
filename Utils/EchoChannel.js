import Echo from "laravel-echo";
var isEcho = null;
const MessageEchoChannel = (userID, toUserID) => {
  const MyEcho = isEcho = new Echo({
    broadcaster: 'pusher',
    key: process.env.PUSHER_APP_KEY,
    cluster: process.env.PUSHER_APP_CLUSTER,
    encrypted: true
  });

  MyEcho.channel('messageTo' + userID + "For" + toUserID)
    .listen('sendMessage', (e) => {
      console.log(e);
      console.log(`User Online :  ${userID} ` + (Math.random() + 1).toString(36).substring(7))
      // this.messages.push({
      //   message: e.message.message,
      //   user: e.user
      // });
    });
}
export { MessageEchoChannel, isEcho }