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
    return new Error('WOOPS');
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

module.exports = {
  getAll,
  getOne,
  getSearch
}