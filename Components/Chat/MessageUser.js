const MessageUser = ({ message: { message } }) => {
  return (
    <div className="flex justify-end my-2">
      <div className="p-3 my-[2px] border rounded-md w-auto bg-green-400 font-medium text-white max-w-[80%]">
        <p className="overflow-x-hidden">{message}</p>
      </div>
    </div>
  );
};

export default MessageUser;