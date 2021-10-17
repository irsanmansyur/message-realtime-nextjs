import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { toUserAtom, userAtom } from "../../Store/UserStore";
import { getMessagesMoreUtils, getMessagesUtils } from "../../Utils/Messages";
import Bounced from "../Loading/Bounced";
import Message from "./Message";
import { MessageChannel, MessageEchoChannel } from "../../Utils/Pusher";
const ListMessages = ({ newMessage }) => {
  const [loadin, setLoadin] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(newMessage);
  const toUser = useRecoilValue(toUserAtom)
  const user = useRecoilValue(userAtom)
  const messagesEndRef = useRef(null)
  const loadMessages = async () => {
    setLoadin(true)
    let res = await getMessagesUtils(toUser.id);
    if (res) {
      setMessages(res.data.reverse())
      if (res.next_page_url)
        setNextPage(res.next_page_url + "&id=" + toUser.id)
    }
    setLoadin(false)
  }
  useEffect(() => {
    if (!loadin && !loadMore) {
      let elLiLast = messagesEndRef.current;
      let elUl = elLiLast.closest("ul");
      elUl.scrollTop = elUl.scrollHeight;
    }
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    user.id && MessageChannel(user.id, toUser.id, data => {
      if (data.message) {
        setMessage(data.message);
      }
    })
  }, [user]);
  useEffect(async () => {
    await loadMessages()
    return () => {
      setMessages([])
    };
  }, [toUser]);

  useEffect(() => {
    if (message) {
      let msgs = [...messages, message]
      setMessages(msgs)
    }
  }, [message]);
  useEffect(() => {
    if (newMessage) {
      setMessage(newMessage)
    }
  }, [newMessage]);

  const handelScroll = async (e) => {
    let element = e.target
    const { scrollHeight: positionScroll } = element;
    if (element.scrollTop === 0) {
      if (nextPage) {
        let res = await getMessagesMoreUtils(nextPage);
        if (res) {
          setLoadMore(true)
          const msgs = [...res.data.reverse(), ...messages];
          setMessages(msgs)
          element.scrollTop = (element.scrollHeight - positionScroll);
          if (res.next_page_url)
            setNextPage(res.next_page_url + "&id=" + toUser.id)
          else
            setNextPage(false)
        }
      }
    }
  }
  return !loadin ?
    <ul className="px-3 py-[5px] overflow-y-auto" style={{ maxHeight: "calc(100% - 70px)" }} onScroll={handelScroll}>
      {messages.map((message, i) => {
        return <li key={i}>
          <Message message={message} />
        </li>
      })}
      <li ref={messagesEndRef}></li>
    </ul> :
    <div className="h-screen flex items-center justify-center">
      <Bounced />
    </div>
};
export default ListMessages;