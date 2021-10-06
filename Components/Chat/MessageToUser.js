const MessageToUser = ({ message: { message } }) => {
  return (
    <div className="p-3 mb-[2px] border rounded-md w-auto bg-white font-medium text-gray-800 max-w-[80%] inline-block">
      <p className="overflow-x-hidden">{message}</p>
    </div>
  );
};

export default MessageToUser;