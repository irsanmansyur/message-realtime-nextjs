import Router from 'next/router';
import Head from 'next/head'
import { utilsCekLogin } from '../Utils/Common'
import Logout from '../Components/Logout';
import { useRecoilState } from 'recoil';
import { userAtom } from '../Store/AuthAtom';
import { useEffect } from 'react';

export default function Dashboard({ user: isUser }) {
  const [user, setUser] = useRecoilState(userAtom);
  const is_logout = () => {
    Router.push("/login");
  }
  useEffect(() => {
    setUser(isUser)
  }, []);
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen flex items-center justify-center">
        <Logout isCallback={is_logout} />
      </div>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const user = await utilsCekLogin(ctx);
  if (!user) {
    return {
      redirect: {
        destination: '/login',
      },
    }
  }
  return {
    props: { user }, // will be passed to the page component as props
  }
}