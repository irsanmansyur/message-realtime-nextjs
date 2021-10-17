const MessageUser = ({ message: { message, time } }) => {
  return (
    <div className="flex justify-end pt-2 pl-10 mb-2">
      <span className="bg-gray-200 h-auto text-gray-900 text-xs md:text-sm font-normal rounded-sm px-1 p-1 items-end flex justify-end">{message} <span className="text-gray-400 pl-1" style={{ fontSize: 8 }}>{time}</span></span>
    </div>
  );
};

export default MessageUser;