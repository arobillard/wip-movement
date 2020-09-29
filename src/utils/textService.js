const BASE_URL = '/api/text/';
const BASE_SETUP = {
  method: 'POST',
  headers: new Headers({
    'Content-Type': 'application/json'
  })
}

const getDirectorMsg = async () => {
  try {
    let res = await fetch(BASE_URL + 'director', BASE_SETUP);
    res = await res.json();
    if (res.err) throw new Error(res.err);
    return res;
  } catch (err) {
    throw new Error(err.message);
  }
}

export default {
  getDirectorMsg
}