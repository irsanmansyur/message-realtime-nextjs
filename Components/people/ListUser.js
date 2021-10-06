import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { usersAtom } from "../../Store/UserStore";
import { usersUtils } from "../../Utils/User";
import User from "./User";

const ListUser = () => {
  const [users, setUsers] = useRecoilState(usersAtom);
  useEffect(async () => {
    setUsers(await usersUtils())
  }, []);
  return (
    <ul>
      {
        users.map((us, i) => {
          return (
            <li key={i}>
              <User user={us} />
            </li>
          )
        })
      }
    </ul>
  );
};

export default ListUser;