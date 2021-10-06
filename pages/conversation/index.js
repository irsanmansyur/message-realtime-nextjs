import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import CreateChat from '../../Components/Chat/CreateChat';
import List from '../../Components/Chat/ListMessages';
import TopbarChat from '../../Components/Chat/TopbarChat';
import People from '../../Components/People';
import { authPage } from '../../Middleware/Auth';
import { userAtom } from '../../Store/UserStore';
import { removeUserToken, utilsCekLogin } from '../../Utils/Common';

const conversation = ({ user: isUser }) => {
  const [user, setUser] = useRecoilState(userAtom);
  isUser && useEffect(() => {
    user !== isUser && setUser(isUser)
  }, [isUser]);
  return (
    <div className="h-screen bg-white flex overflow-hidden relative">
      <div className="w-1/3 h-full bg-gray-50 overflow-y-auto">
        <People />
      </div>
      <div className="w-2/3 bg-green-50 relative">
        Kosong
      </div>
    </div>

  );
};
export async function getServerSideProps(ctx) {
  let token = authPage(ctx)
  const user = await utilsCekLogin(token);
  if (!user) {
    removeUserToken(ctx)
    return {
      redirect: {
        destination: '/login',
      },
    }
  }
  return {
    props: {
      user
    }
  }
}
export default conversation;