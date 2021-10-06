import Router from 'next/router';
import { useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { toUserAtom, userAtom } from "../Store/UserStore";
import { removeUserToken } from "../Utils/Common";
import { userLogoutUtils } from '../Utils/User';

const Logout = ({ isCallback = false }) => {
  const [user, setUser] = useRecoilState(userAtom)
  const setToUser = useResetRecoilState(toUserAtom)
  const [isLoading, setIsLoading] = useState(false);
  const isSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (!isLoading) {
      let respon = await userLogoutUtils()
      removeUserToken()
      if (respon) {
        setToUser({})
        setUser({})
        if (isCallback)
          return isCallback()
      }
      Router.replace("/login");
    }
    setIsLoading(false)
  }
  return (
    <form onSubmit={isSubmit}  >
      <button type="submit" disabled={isLoading} className="group  bg-green-600 hover:bg-green-500 text-white p-2 rounded-lg font-bold font-mono focus:outline-none">
        <div className="flex">
          {isLoading ? <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg> :
            <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:animate-bounce group-hover:pt-1 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>}
          <span className="ml-1"> Logout </span>
        </div>
      </button>
    </form>

  );
};

export default Logout;