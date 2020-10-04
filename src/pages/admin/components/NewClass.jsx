import React, { useState } from 'react'
import '../../../styles/components/forms.css';

import adminService from '../../../utils/adminService';

const defaultForm = {
  name: '',
  description: '',
  instructor: 'Caitlin Elmslie',
  dueDate: '',
  screenshot: {},
  video: {},
  type: 'C',
  tags: [''],
  featured: false
}

export default function NewClass() {

  const [formData, setFormData] = useState(defaultForm)
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = e => {
    if (e.target.name === 'type') {
      setFormData({
        ...formData,
        type: e.target.value
      })
    } else if (e.target.name === 'video' || e.target.name === 'screenshot') {
      let file = e.target.files[0];
      setFormData({
        ...formData,
        [e.target.name]: file
      })
    } else if (e.target.name === 'tags') {
      setFormData({
        ...formData,
        tags: e.target.value.split(', ')
      })
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    console.log('hello')
    try {
      await adminService.newClass(formData);
      setSuccessMessage('Success!');
      setFormData(defaultForm);
    } catch (err) {
      setErrMsg(err.message);
    }
    setLoading(false);
  }

  return (
    <form className="my-form" autoComplete="off" onSubmit={handleSubmit}>
      {errMsg && <p className="err-message">{errMsg}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} /* required */ />
        <label htmlFor="name" className={`label ${formData.name ? 'typed' : ''}`}>Name</label>
      </div>
      <div className="form-description">
        <textarea name="description" id="description" value={formData.description} onChange={handleChange} /* required */ />
        <label htmlFor="description" className={`label ${formData.description ? 'typed' : ''}`}>Description</label>
      </div>
      <div className="row">
        <div className="large-half">
          <input type="text" name="instructor" id="instructor" value={formData.instructor} onChange={handleChange} /* required */ />
          <label htmlFor="instructor" className={`label ${formData.instructor ? 'typed' : ''}`}>Instructor</label>
        </div>
        <div className="large-half">
          <input type="datetime-local" name="dueDate" id="dueDate" onChange={handleChange} /* required */ />
          <label htmlFor="dueDate" className={`label typed`}>Due Date</label>
        </div>
      </div>
      <div>
        <input type="file" name="video" id="video" onChange={handleChange} /* required */ />
        <label htmlFor="video" className='label typed' >Video File</label>
      </div>
      <div>
        <input type="file" name="screenshot" id="screenshot" onChange={handleChange} /* required */ />
        <label htmlFor="screenshot" className='label typed' >Screen Shot</label>
      </div>
      <div>
        <input type="text" name="tags" id="tags" value={formData.tags.join(', ')} onChange={handleChange} placeholder="tag1, tag2" /* required */ />
        <label htmlFor="tags" className={`label ${formData.tags[0] !== '' ? 'typed' : ''}`}>Tags</label>
      </div>
      <div className="row">
        <div className="selectDiv">
          <select name="type" id="type" onChange={handleChange}>
            <option value="C">Collab</option>
            <option value="D">Dance</option>
            <option value="P">Pilates</option>
            <option value="M">Movement Breakdown</option>
          </select>
          <label htmlFor="tags" className='label typed'>Type</label>
        </div>
        <div className="featured-check">
          <label htmlFor="featured">Featured?</label>
          <input type="checkbox" id="featured" name="featured" />
        </div>
        {loading ? <div className="loading"><i className="fas fa-circle-notch fa-spin"></i></div> : <button type="submit">Submit</button>}
      </div>
    </form>
  )
}
