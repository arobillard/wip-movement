const BASE_URL = '/api/classes/';
const BASE_SETUP = {
  method: 'POST',
  headers: new Headers({
    'Content-Type': 'application/json'
  })
}

const getAll = async () => {
  try {
    let res = await fetch(BASE_URL, BASE_SETUP)
    return await res.json();
  } catch (err) {
    return [];
  }
}

const getOne = async id => {
  try {
    let res = await fetch(BASE_URL + id, BASE_SETUP)
    return await res.json();
  } catch (err) {
    throw new Error('WOOPS');
  }
}

module.exports = {
  getAll,
  getOne
}