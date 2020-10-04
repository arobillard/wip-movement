const BASE_URL = '/api/admin/';
const BASE_SETUP = body => ({
  method: 'POST',
  headers: new Headers({
    'Content-Type': 'application/json'
  }),
  body: JSON.stringify(body)
})

const newClass = async formData => {
  try {
    if (formData.featured) {
      await fetch(BASE_URL + 'remove-feature', BASE_SETUP({}));

    }
    let videoResponse = await uploadToAmazon(formData.video, 'upload-class');
    let pictureResponse = await uploadToAmazon(formData.screenshot, 'upload-screenshot');

    if (videoResponse.ok && pictureResponse.ok) {
      let video = await videoResponse.json();
      let screenshot = await pictureResponse.json();
      let form = {
        ...formData,
        tags: convertTags(formData.tags),
        video: video.videoUrl,
        screenshot: screenshot.screenshotUrl,
      }
      let classRes = await fetch('/api/classes/add', BASE_SETUP(form));
      classRes = await classRes.json();
      if (classRes.err) throw new Error(classRes.err.match(/Prerecorded validation failed/) ? 'Required field missing..' : classRes.err);
      return classRes;
    } else {
      throw new Error(videoResponse.ok ? pictureResponse.err : videoResponse.err);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

const getAllClasses = async () => {
  try {
    let res = await fetch(BASE_URL + 'classes/', BASE_SETUP({}));
    res = await res.json();
    if (res.err) throw new Error(res.err);
    return res;
  } catch (err) {
    throw new Error(err.message);
  }
}

const getOneClass = async id => {
  try {
    let res = await fetch(BASE_URL + `classes/${id}`, BASE_SETUP({})).then(r => r.json());
    if (res.err) throw new Error(res.err);
    return res.thisClass;
  } catch (err) {
    throw new Error(err.message);
  }
}

const deleteOneClass = async id => {
  try {
    let res = await fetch(`api/classes/${id}/delete`, BASE_SETUP({}));
    res = await res.json();
    if (res.err) throw new Error(res.err);
    return res;
  } catch (err) {
    throw new Error(err.message);
  }
}

//================================================================
//      HELPERS
//================================================================

async function uploadToAmazon(file, where) {
  let formData = new FormData();
  formData.append('file', file);
  let res = await fetch(BASE_URL + where, {
    method: 'POST',
    body: formData
  });
  return res;
}

function convertTags(arr) {
  if (arr.length === 1 && arr[0] === '') return []
  return arr.map(el => el.replace(/\W/g, ''))
}

export default {
  newClass,
  getAllClasses,
  getOneClass,
  deleteOneClass
}