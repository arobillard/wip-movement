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

export default {
  signup,
  getUser,
  login,
  logout,
}