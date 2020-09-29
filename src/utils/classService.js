const BASE_URL = '/api/classes/';
const BASE_SETUP = {
  method: 'POST',
  headers: new Headers({
    'Content-Type': 'application/json'
  })
}

const getAll = async () => {
  try {
    let res = await fetch(BASE_URL, BASE_SETUP);
    return await res.json();
  } catch (err) {
    return [];
  }
}

const getOne = async id => {
  try {
    let res = await fetch(BASE_URL + id, BASE_SETUP);
    return await res.json();
  } catch (err) {
    throw new Error('WOOPS');
  }
}

const getSearch = async search => {
  try {
    let res = await fetch(BASE_URL + 'search/' + search, BASE_SETUP);
    return await res.json();
  } catch (err) {
    throw new Error('No Classes Found..')

  }
}

const getFeatured = async () => {
  try {
    let res = await fetch(BASE_URL + 'feature', BASE_SETUP);
    res = await res.json();
    if (res.err) throw new Error(res.err);
    return res;
  } catch (err) {
    throw new Error(err.message)
  }
}

const get4Random = async () => {
  try {
    let res = await fetch(BASE_URL + 'random', BASE_SETUP);
    res = await res.json();
    if (res.err) throw new Error(res.err);
    return res;
  } catch (err) {
    throw new Error(err.essage)
  }
}

module.exports = {
  getAll,
  getOne,
  getSearch,
  getFeatured,
  get4Random
}