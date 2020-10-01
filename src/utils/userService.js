import tokenService from './tokenService';

const BASE_URL = '/api/users/';
const SETUP_BODY = body => {
  return {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(body)
  }
}

const signup = async (user) => {
  try {
    let res = await fetch(BASE_URL + 'signup', SETUP_BODY(user));
    res = await res.json();
    if (res.err) throw new Error(res.err)
    return tokenService.setToken(res.token);
  } catch (err) {
    throw new Error(err.message);
  }
}

const getUser = () => {
  return tokenService.getuserFromtoken();
}

const login = async creds => {
  try {
    let res = await fetch(BASE_URL + 'login', SETUP_BODY(creds));
    res = await res.json();
    if (res.err) throw new Error(res.err)
    return tokenService.setToken(res.token);
  } catch (err) {
    throw new Error(err.message);
  }
}

const logout = () => {
  tokenService.removeToken();
}

const saveClass = async (classId, userId) => {
  try {
    let res = await fetch(BASE_URL + 'save-class', SETUP_BODY({ userId, classId }));
    res = await res.json();
    if (res.err) throw new Error(res.err);
    return res.token;
  } catch (err) {
    throw new Error(err.message);
  }
}

const unSaveClass = async (classId, userId) => {
  try {
    let res = await fetch(BASE_URL + 'unsave-class', SETUP_BODY({ userId, classId }));
    res = await res.json();
    if (res.err) throw new Error(res.err);
    return res;
  } catch (err) {
    throw new Error(err.message);
  }
}

export default {
  signup,
  getUser,
  login,
  logout,
  saveClass,
  unSaveClass,
}