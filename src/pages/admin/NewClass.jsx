import React, { useState, useEffect } from 'react'

export default function NewClass() {

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    instructor: 'Caitlin Elmslie',
    dueDate: '',
    videoFile: {},
  })

  const handleChange = e => {
    if (e.target.name === 'videoFile') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0]
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
    alert('submited');
  }

  return (
    <form className="my-form" onSubmit={handleSubmit}>
      <div>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />
        <label htmlFor="name" className={`label ${formData.name ? 'typed' : ''}`}>Name</label>
      </div>
      <div className="form-description">
        <textarea name="description" id="description" value={formData.description} onChange={handleChange} required />
        <label htmlFor="description" className={`label ${formData.description ? 'typed' : ''}`}>Description</label>
      </div>
      <div className="row">
        <div className="large-half">
          <input type="text" name="instructor" id="instructor" value={formData.instructor} onChange={handleChange} required />
          <label htmlFor="instructor" className={`label ${formData.instructor ? 'typed' : ''}`}>Instructor</label>
        </div>
        <div className="large-half">
          <input type="datetime-local" name="dueDate" id="dueDate" onChange={handleChange} required />
          <label htmlFor="dueDate" className={`label typed`}>Due Date</label>
        </div>
      </div>
      <div>
        <input type="file" name="videoFile" id="videoFile" onChange={handleChange} required />
        <label htmlFor="videoFile" className='label typed' >Video File</label>
      </div>
    </form>
  )
}
