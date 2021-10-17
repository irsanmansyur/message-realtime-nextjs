import { myHeader } from "./Api";

const toUserUtils = async (token, userId) => {
  try {
    return await fetch(process.env.base_url + `api/user/${userId}`, {
      headers: myHeader(token)
    }).then(res => res.json());
  } catch (error) {
    return {};
  }
};
const userRefreshUtils = async (user) => {
  try {
    return await fetch(process.env.base_api + `user/refresh/${user.id}`, {
      headers: myHeader()
    }).then(res => res.json());
  } catch (error) {
    return {};
  }
};
const usersUtils = async () => {
  try {
    let res = await fetch(`/api/user/list`, {
      headers: myHeader()
    }).then(r => r.json());
    if (res.status) return res.data;
  } catch (error) {
    return [];
  }
  return [];
};

const userLogoutUtils = async () => {
  try {
    let res = await fetch(process.env.base_url + `api/auth/logout`, {
      method: "POST",
      headers: myHeader()
    }).then(r => r.json());
    if (res.status) return true;
  } catch (error) {
    return false;
  }
  return false;
};
export { toUserUtils, usersUtils, userLogoutUtils, userRefreshUtils };