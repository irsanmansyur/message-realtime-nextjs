import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { toUserAtom } from "../../Store/UserStore";
import { OnlineChannel } from "../../Utils/Pusher";
import CekStatus from "./CekStatus";
const User = ({ user: isUser }) => {
  const router = useRouter()
  const [user, setUser] = useState(isUser);
  const last_activity = new Date(user.last_activity);
  const current_time = new Date();
  const totalSeconds = parseInt(Math.floor((current_time - (last_activity)) / 1000));
  let totalTimeLogin = 60 * 1;
  const [seconds, setSeconds] = useState(totalSeconds > totalTimeLogin ? 0 : totalTimeLogin - totalSeconds);

  const toUser = useRecoilValue(toUserAtom)
  useEffect(() => {
    OnlineChannel(user, async (data) => {
      setUser(data.user)
    })
  }, []);
  const changeToUser = (e, id) => {
    e.preventDefault();
    try {
      if (toUser.id)
        router.replace(`/conversation/${id}`)
      else
        router.push(`/conversation/${id}`)

    } catch (error) {
      console.log(error.message);
    }
  }
  return toUser.id !== user.id ?
    <a onClick={e => changeToUser(e, user.id)}>
      <div className="flex justify-between content-center hover:bg-green-50 p-3 rounded-md hover:shadow-sm mb-[1px]">
        <div className="flex items-center">
          <Image src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg" width={60} height={60} alt="Picture of the author" className="w-[60px] h-[60px] rounded-full p-2 shadow-sm" />
          <div className="ml-2">
            <span className="text-lg font-bold">{user.name}</span>
            <p className="text-gray-500">{user.last_chat}</p>
          </div>
        </div>
        <CekStatus lastActivity={user.last_activity} last_online={user.last_online} />
      </div>
    </a>
    : <div className="flex justify-between content-center bg-green-100 p-3 rounded-md shadow-sm mb-[1px]">
      <div className="flex items-center">
        <Image src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg" width={60} height={60} alt="Picture of the author" className="w-[60px] h-[60px] rounded-full p-2 shadow-sm" />
        <div className="ml-2">
          <span className="text-lg font-bold">{user.name}</span>
          <p className="text-gray-500">{user.last_chat}</p>
        </div>
      </div>
      <CekStatus lastActivity={user.last_activity} last_online={user.last_online} />
    </div>
};
export default User;