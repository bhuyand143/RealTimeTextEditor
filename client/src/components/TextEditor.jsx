import React, { useCallback, useEffect, useState } from 'react'
import Quill from 'quill'
import "quill/dist/quill.snow.css"
import { io } from 'socket.io-client'
import { useParams } from 'react-router'



const TextEditor = (props) => {

  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['image', 'blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }], [{ 'align': [] }],
    ['clean']
  ];

  const { updateClient } = props;
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()
  const { id: documentId } = useParams()
  const userid = localStorage.getItem('userid')


  useEffect(() => {
    const s = io("http://localhost:3001")
    setSocket(s);
    return () => {
      s.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket == null || quill == null) return;
    socket.on('updateUser', (client) => {
      updateClient(client);
    })
  }, [socket])

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once('load-document', (document) => {
      quill.enable()
      quill.setContents(document)
    })
    socket.emit('get-document', documentId, userid)
  }, [socket, quill, documentId])

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta) => {
      quill.updateContents(delta)
    }
    socket.on('receive-changes', handler);

    return () => {
      socket.off('receive-changes', handler)
    }
  }, [socket, quill])

  useEffect(() => {
    if (socket == null || quill == null) return;
    const interval = setInterval(() => {
      socket.emit('save-document', quill.getContents())
    }, 2000);

    return () => {
      clearInterval(interval);
    }
  }, [socket, quill])

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== 'user') return
      socket.emit("send-changes", delta)
    }
    quill.on('text-change', handler);

    return () => {
      quill.off('text-change', handler)
    }
  }, [socket, quill])

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = ''
    const editor = document.createElement('div');
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: 'snow', modules: {
        toolbar: toolbarOptions
      }
    })
    q.disable();
    q.setText('Loading...')
    setQuill(q);
  }, [])



  return (
    <>
      <div className='contain' ref={wrapperRef}></div>

    </>
  )
}

export default TextEditor