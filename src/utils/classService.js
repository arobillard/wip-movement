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

const getRandom = async (num) => {
  try {
    let res = await fetch(BASE_URL + 'random/' + num, BASE_SETUP);
    res = await res.json();
    if (res.err) throw new Error(res.err);
    return res;
  } catch (err) {
    throw new Error(err.essage)
  }
}
const getSimilar = async (id, num) => {
  try {
    let res = await fetch(BASE_URL + `similar/${id}/${num}`, BASE_SETUP);
    res = await res.json();
    if (res.err) throw new Error(res.err);
    return res;
  } catch (err) {
    console.log('uhoh')
    throw new Error(err.message)
  }
}

const getSaves = async id => {
  try {
    let res = await fetch(BASE_URL + 'saves/' + id, BASE_SETUP);
    res = await res.json();
    if (res.err) throw new Error(res.err);
    return res;
  } catch (err) {
    throw new Error(err.message);
  }
}

const getUserClasses = async list => {
  try {
    let res = await fetch(BASE_URL + 'user-classes', {
      ...BASE_SETUP,
      body: JSON.stringify({
        list
      })
    })
    return resConverter(res);
  } catch (err) {
    throw new Error(err.message);
  }
}

const writeComment = async (id, comment) => {
  try {
    let res = await fetch(BASE_URL + `${id}/comment`, {
      ...BASE_SETUP,
      body: JSON.stringify(comment)
    })
    res = await res.json();
    let newClass = await getOne(res.class._id);
    if (newClass.err) throw new Error(newClass.err);
    return newClass.class;
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  getAll,
  getOne,
  getSearch,
  getFeatured,
  getRandom,
  getSimilar,
  getSaves,
  getUserClasses,
  writeComment
}

async function resConverter(res) {
  let r = await res.json();
  if (r.err) throw new Error(r.err);
  return r;
}