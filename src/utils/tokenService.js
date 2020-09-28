const setToken = token => {
  localStorage.setItem('token', token);
}

const getToken = () => {
  let token = localStorage.getItem('token');
  if (token) {
    const payload = parseToken(token);
    if (payload.exp < Date.now() / 1000) {
      removeToken();
      token = null;
    }
  }
  return token;
}

const getuserFromtoken = () => {
  const token = getToken();
  return token ? parseToken(token).user : null;
}

const parseToken = token => {
  return JSON.parse(atob(token.split('.')[1]));
}

const removeToken = () => {
  localStorage.removeItem('token');
}

export default {
  setToken,
  getToken,
  getuserFromtoken,
  removeToken
}