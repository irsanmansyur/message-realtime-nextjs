import CekStatus from "../people/CekStatus";
import Image from "next/image"
const TopbarChat = ({ user }) => {
  return (
    <div className="flex items-center bg-green-500 sm:p-3 justify-between">
      <div className="flex items-center">
        <Image src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg" className="w-[60px] h-[60px] rounded-full p-2 shadow-sm" width={40} height={40} />
        <span className="my-2 md:text-2xl font-mono font-bold text-white ml-2">{user.name}</span></div>
      <CekStatus lastActivity={user.last_activity} last_online={user.last_online} />
    </div>
  );
};

export default TopbarChat;