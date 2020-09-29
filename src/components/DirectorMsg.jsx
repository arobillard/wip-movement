import React, { useState, useEffect } from 'react'

import textService from '../utils/textService';

export default function DirectorMsg() {

  const [text, setText] = useState({});
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    const fetchText = async () => {
      try {
        let res = await textService.getDirectorMsg();
        setText(res);
      } catch (err) {
        setErrMsg(err.message);
      }
    }
    fetchText();
  }, [])

  return (
    <section className="director-msg">
      <div className="director-contents">
        {errMsg && <p className="err-message">{errMsg}</p>}
        <h3>{text.title}</h3>
        <div className="paragraphs">
          {text.paragraphs && <>
            {text.paragraphs.map((p, i) => <p key={p[0] + i}>{p}</p>)}
          </>}
        </div>
        <div className="signature">
          <p><span>Caitlin Elmslie,</span> MA BSc BA</p>
          {text.paragraphs && <>
            {text.signature.map((p, i) => <p key={p[0] + i}>{p}</p>)}
          </>}
        </div>
      </div>
      <img src="images/caitlin_elmslie_headshot.jpg" alt="" />
    </section>
  )
}
