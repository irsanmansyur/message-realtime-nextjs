import { useState } from 'react';
import MessageSuccess from '../../Components/alert/MessageSuccess';
import Link from "next/link"
import InputText from '../../Components/Input/InputText';
import MessageError from '../../Components/alert/MessageError';
import nookies from "nookies"
import { utilsCekLogin } from '../../Utils/Common';
const register = () => {
  const [data, setData] = useState({ email: '', password: '', password_confirmation: '', name: '' });
  const [errors, setErrors] = useState({ name: false, password: false });
  const [progress, setProgress] = useState(false);
  const [message, setMessage] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const inputChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value })
  }
  const handleSubmit = async e => {
    setMessage(false)
    setMessageError(false)
    setErrors({})
    e.preventDefault();
    if (progress)
      return false
    setProgress(true);
    try {
      const respon = await fetch(process.env.base_api + "register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }).then(res => res.json());
      if (respon.user) {
        setMessage("Register berhasil silahkan login kembali");
        setData({ email: '', password: '' });
      } else {
        setErrors(respon.errors)
        setMessageError(respon.message)
      }
    } catch (e) {
      setMessageError("Failed to Connect API")
    }
    setProgress(false);
  }
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 md:w-[750px] sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:rotate-6 sm:rounded-3xl" />
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl md:p-20">
          <div className="max-w-md mx-auto">
            <div className="grid place-items-center">
              <h1 className="text-2xl mb-3">Register Page</h1>
              <img className="h-20 w-20 md:w-[200px] md:h-[200px]" src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg" />
            </div>
            <div className="message py-2">
              {message && <MessageSuccess message="Registrasi Berhasil">
                Silahkan Login <Link href="/login"><a className="font-bold hover:text-gray-100">Disini</a></Link>
              </MessageSuccess>}
              {messageError && <MessageError message={messageError} />}
            </div>

            <div className="divide-y divide-gray-200">
              <form onSubmit={handleSubmit}>
                <InputText value={data.name} name="name" label="Nama" id="name" error={errors.name ?? false} isInput={inputChange} />
                <InputText value={data.email} type="email" name="email" label="Email" id="email" error={errors.email ?? false} isInput={inputChange} />
                <InputText value={data.password} name="password" label="Password" id="password" type="password" error={errors.password ?? false} isInput={inputChange} />
                <InputText value={data.password_confirmation} type="password" name="password_confirmation" label="Password" id="password_confirmation" error={errors.password_confirmation ?? false} isInput={inputChange} />
                <button type="submit" disabled={progress} className="w-full py-2 rounded-full bg-green-600 text-gray-100 focus:outline-none text-center flex justify-center">
                  {progress ?
                    <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg> :
                    <span>Register</span>}
                </button>
              </form>
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7 mt-7">
                <p>have a account.?</p>
                <p>
                  <Link href="/login">
                    <a className="text-green-500 hover:text-green-700"> Login! </a>
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
  const user = await utilsCekLogin(ctx);
  if (user)
    return {
      redirect: {
        destination: "/"
      }
    }
  return {
    props: { user }
  }
}

export default register;