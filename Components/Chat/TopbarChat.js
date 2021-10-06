import CekStatus from "../people/CekStatus";

const TopbarChat = ({ user }) => {
  return (
    <div className="flex items-center bg-green-500 p-3 justify-between">
      <div className="flex items-center">
        <img className="w-[60px] h-[60px] rounded-full p-2 shadow-sm" src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg" />
        <span className="my-2 text-2xl font-mono font-bold text-white">{user.name}</span>
      </div>
      <CekStatus lastActivity={user.last_activity} last_online={user.last_online} />
    </div>
  );
};

export default TopbarChat;