import { useEffect, useState } from "react";
import { sendMessageUtils } from "../../Utils/Messages";

const CreateChat = ({ to_user, is_callback = false }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault()
    let res = await sendMessageUtils({ message, user_id: to_user.id })
    setMessage("");
    is_callback && res.status && is_callback(res.data);
  }
  return (
    <div className="bg-gray-100 p-3 relative">
      <form onSubmit={sendMessage}>
        <textarea name="message" id="message" className="resize-none pl-2 rounded-lg text-black border border-green-500 focus:outline-none py-3 pr-[50px] w-full" rows={1} onChange={e => setMessage(e.target.value)} value={message} />
        <div className="control_send absolute right-0 top-0 h-full grid place-items-center pr-5">
          <button type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateChat;