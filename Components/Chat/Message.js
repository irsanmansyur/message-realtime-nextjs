import { useRecoilValue } from "recoil";
import { userAtom } from "../../Store/UserStore";
import MessageToUser from "./MessageToUser";
import MessageUser from "./MessageUser";
const Message = ({ message }) => {
  const user = useRecoilValue(userAtom)
  return user.id === message.from_user ?
    <MessageUser message={message} /> :
    <MessageToUser message={message} />
};

export default Message;