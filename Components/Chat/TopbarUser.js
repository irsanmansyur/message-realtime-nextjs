import React from 'react';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../Store/UserStore';
import Logout from '../Logout';

const TopbarUser = () => {
  const user = useRecoilValue(userAtom)
  return (
    <div className="profile flex flex-col place-items-center">
      <img src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg" className="w-[90px] h-[90px] rounded-full p-2 shadow-sm" />
      <h2 className="my-2 text-2xl font-mono font-bold">{user.name}</h2>
      <Logout />
    </div>

  );
};

export default TopbarUser;