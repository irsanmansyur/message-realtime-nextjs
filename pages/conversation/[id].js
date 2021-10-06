import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import CreateChat from '../../Components/Chat/CreateChat';
import ListMessages from '../../Components/Chat/ListMessages';
import TopbarChat from '../../Components/Chat/TopbarChat';
import People from '../../Components/People';
import { authPage } from '../../Middleware/Auth';
import { toUserAtom, userAtom } from '../../Store/UserStore';
import { utilsCekLogin } from '../../Utils/Common';
import { MessageChannel } from '../../Utils/Pusher';
import { toUserUtils } from '../../Utils/User';


const ChatUser = ({ user: isUser, toUser: to_user }) => {
  const [user, setUser] = useRecoilState(userAtom);
  const [toUser, setToUser] = useRecoilState(toUserAtom);
  isUser && useEffect(() => {
    user !== isUser && setUser(isUser);
    toUser !== to_user && setToUser(to_user);
  }, [isUser, to_user]);
  const [message, setMessage] = useState(false);

  return (
    <div className="h-screen bg-white flex overflow-hidden relative">
      <div className="w-1/3 h-full bg-gray-50 overflow-y-auto border border-right border-gray-100">
        <People toUser={toUser} />
      </div>
      <div className="w-2/3 bg-green-50 relative">
        <TopbarChat user={toUser} />
        <ListMessages newMessage={message} />
        <div className="absolute bottom-0 w-full">
          <CreateChat user={user} to_user={toUser} is_callback={message => setMessage(message)} />
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps = async ({ params: { id }, ...ctx }) => {
  let token = authPage(ctx)
  const user = await utilsCekLogin(token);
  if (!user) {
    return {
      redirect: {
        destination: '/login',
      },
    }
  }
  const toUser = await toUserUtils(user.token, id)
  return {
    props: {
      user,
      toUser
    }
  }
}

export default ChatUser;
