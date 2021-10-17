import Image from "next/image"
const MessageToUser = ({ message: { message, time } }) => {
  return (
    <div className="flex items-center pr-10 mb-2">
      <Image src="https://i.imgur.com/IAgGUYF.jpg" className="rounded-full shadow-xl w-[30px] h-[30px]" width={20} height={20} />
      <span className="flex ml-1 h-auto bg-green-600 text-gray-200 text-xs md:text-sm font-normal rounded-sm px-1 p-1 items-end">{message}<span className="text-gray-300 pl-1" style={{ fontSize: 8 }}>{time}</span></span>
    </div>
  );
};

export default MessageToUser;