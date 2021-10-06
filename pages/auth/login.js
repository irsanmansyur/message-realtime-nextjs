import axios from 'axios';
import Link from "next/link";
import { useState } from 'react';
import MessageError from '../../Components/alert/MessageError';
import InputText from '../../Components/Input/InputText';
import Router from 'next/router';
import { setUserToken, utilsCekLogin } from '../../Utils/Common';
import { authPage, unAuthPage } from '../../Middleware/Auth';
export const login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [isErrors, setIsErrors] = useState({});
  const [messageError, setMessageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inputChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value })
  }
  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true)
    setMessageError(false)
    setIsErrors({})

    try {
      const respon = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data)
      }).then(res => res.json());
      if (!respon.errors) {
        setUserToken(respon.token)
        setData({ email: '', password: '' });
        Router.replace('/conversation');
      } else {
        setIsErrors(respon.errors)
        setMessageError(respon.message)
      }
    } catch (e) {
      setMessageError("Error : " + e.message)
    }
    setIsLoading(false)
  }
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="grid place-items-center mb-3">
              <img className="h-20 w-20 md:w-[200px] md:h-[200px]" src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg" />
              <h1 className="text-4xl mt-3">Login Page</h1>
            </div>
            <div className="message py-2">
              {messageError && <MessageError message={messageError} />}
            </div>

            <div className="divide-y divide-gray-200">
              <form onSubmit={handleSubmit}>
                <InputText value={data.email} name="email" label="Email" type="email" id="email" error={isErrors.email ?? false} isInput={inputChange} />
                <InputText value={data.password} name="password" type="password" label="Password" id="password" error={isErrors.password ?? false} isInput={inputChange} />
                <a href="#" className="text-xs text-green-400 hover:text-green-500 float-right mb-4">Forgot Password?</a>
                <button disabled={isLoading} type="submit" className="w-full py-2 rounded-full bg-green-600 text-gray-100 focus:outline-none flex justify-center">    {isLoading ? <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg> : "Login"}</button>
              </form>
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7 mt-7">
                <p>Don't have a account.?</p>
                <p>
                  <Link href="/register">
                    <a className="text-green-500 hover:text-green-700"> Register Here </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  let token = unAuthPage(ctx);
  return {
    props: {}
  }
}

export default login;