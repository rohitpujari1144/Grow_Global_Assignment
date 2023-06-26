import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button, TextField } from '@mui/material'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import Navbar from '../Navbar/Navbar';

function Home() {
  let [newPostModal, setNewPostModal] = useState(false)
  let [editPostModal, setEditPostModal] = useState(false)
  let [usersPosts, setUsersPosts] = useState([])
  let [editingPost, setEditingPost] = useState([])
  let [popMessage, setPopupMessage] = useState('')
  let [open, setOpen] = useState(false);
  const email = sessionStorage.getItem('email')

  useEffect(() => {
    axios.get(`https://grow-global-assignment-backend.onrender.com/getPost/${email}`)
      .then((response) => {
        setUsersPosts(response.data.data)
        console.log(usersPosts);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [setUsersPosts, email, usersPosts])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function modalClose() {
    setNewPostModal(false)
    setEditPostModal(false)
  }

  function postTitleValidate() {
    const postTitle = document.getElementById('postTitle')
    const postTitleError = document.getElementById('postTitleError')

    if (postTitle.value === "") {
      postTitleError.style = 'margin-left:75px'
      postTitleError.innerHTML = `*Required`
    }
    else {
      postTitleError.innerHTML = ``
    }

  }

  function postBodyValidate() {
    const postBody = document.getElementById('postBody')
    const postBodyError = document.getElementById('postBodyError')
    if (postBody.value === "") {
      postBodyError.style = 'margin-left:75px'
      postBodyError.innerHTML = `*Required`
    }
    else {
      postBodyError.innerHTML = ``
    }
  }

  async function createPostClick() {
    const postTitle = document.getElementById('postTitle')
    const postTitleError = document.getElementById('postTitleError')
    const postBody = document.getElementById('postBody')
    const postBodyError = document.getElementById('postBodyError')

    if (postTitle.value === "") {
      postTitleError.style = 'margin-left:75px'
      postTitleError.innerHTML = `*Required`
    }
    else {
      postTitleError.innerHTML = ``
    }
    if (postBody.value === "") {
      postBodyError.style = 'margin-left:75px'
      postBodyError.innerHTML = `*Required`
    }
    else {
      postBodyError.innerHTML = ``
    }
    if (postTitleError.innerHTML === `` && postBodyError.innerHTML === ``) {
      let newPostDetails = {
        postTitle: postTitle.value,
        postBody: postBody.value,
        createdAt: new Date().toLocaleString(),
        createdBy: email
      }
      await axios.post(`https://grow-global-assignment-backend.onrender.com/newPost`, newPostDetails)
        .then((response) => {
          if (response.data.message === "post created successfully") {
            setNewPostModal(false)
            setTimeout(() => {
              setPopupMessage('New Post Created')
              setOpen(true)
            }, 1000);
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  function editClick(post) {
    setEditPostModal(true)
    setEditingPost(post)
  }

  function deleteClick(post) {
    axios.delete(`https://grow-global-assignment-backend.onrender.com/deletePost/${post._id}`)
      .then((response) => {
        setPopupMessage('Post Successfully Deleted')
        setOpen(true)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function updatePostClick() {
    const editingPostTitle = document.getElementById('editingPostTitle')
    const editingPostTitleError = document.getElementById('editingPostTitleError')
    const editingPostBody = document.getElementById('editingPostBody')
    const editingPostBodyError = document.getElementById('editingPostBodyError')

    if (editingPostTitle.value === "") {
      editingPostTitleError.style = 'margin-left:75px'
      editingPostTitleError.innerHTML = `*Required`
    }
    else {
      editingPostTitleError.innerHTML = ``
    }
    if (editingPostBody.value === "") {
      editingPostBodyError.style = 'margin-left:75px'
      editingPostBodyError.innerHTML = `*Required`
    }
    else {
      editingPostBodyError.innerHTML = ``
    }
    if (editingPostTitleError.innerHTML === `` && editingPostBodyError.innerHTML === ``) {
      const editingPostDetails = {
        postTitle: document.getElementById('editingPostTitle').value,
        postBody: document.getElementById('editingPostBody').value
      }
      axios.put(`https://grow-global-assignment-backend.onrender.com/updatePost/${editingPost._id}`, editingPostDetails)
        .then((response) => {
          setEditPostModal(false)
          setTimeout(() => {
            setPopupMessage('Post Successfully Edited')
            setOpen(true)
          }, 1500);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  function editingPostTitleValidate() {
    const editingPostTitle = document.getElementById('editingPostTitle')
    const editingPostTitleError = document.getElementById('editingPostTitleError')

    if (editingPostTitle.value === "") {
      editingPostTitleError.style = 'margin-left:75px'
      editingPostTitleError.innerHTML = `*Required`
    }
    else {
      editingPostTitleError.innerHTML = ``
    }

  }

  function editingPostBodyValidate() {
    const editingPostBody = document.getElementById('editingPostBody')
    const editingPostBodyError = document.getElementById('editingPostBodyError')
    if (editingPostBody.value === "") {
      editingPostBodyError.style = 'margin-left:75px'
      editingPostBodyError.innerHTML = `*Required`
    }
    else {
      editingPostBodyError.innerHTML = ``
    }
  }
  return (
    <>
      <Navbar logoutButton={true} />
      {/* new post modal start */}
      <Modal className='shadow' size='lg' isOpen={newPostModal} toggle={() => { modalClose() }}>
        <ModalHeader toggle={() => { modalClose() }} >New Post</ModalHeader>
        <ModalBody>
          <div className="container border rounded">
            <div>
              <div className='mt-2 d-flex justify-content-center'>
                <TextField id="postTitle" label="Post Title" variant="standard" style={{ width: '80%' }} autoComplete='off' onKeyUp={() => { postTitleValidate() }} /><br />
              </div>
              <span id='postTitleError' className='text-danger'></span>

            </div>
            <div className='mt-2 d-flex justify-content-center'>
              <TextField id="postBody" label="Post body" multiline rows={9} variant="standard" style={{ width: '80%' }} autoComplete='off' onKeyUp={() => { postBodyValidate() }} /><br />
            </div>
            <span id='postBodyError' className='text-danger'></span>

            <div className='d-flex justify-content-start mt-3 mb-3' style={{ marginLeft: '75px' }}>
              <Button variant="contained" onClick={() => { createPostClick() }}>Create</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* new post modal end */}

      {/* edit post modal start */}
      <Modal className='shadow' size='lg' isOpen={editPostModal} toggle={() => { modalClose() }}>
        <ModalHeader toggle={() => { modalClose() }} >Edit Post</ModalHeader>
        <ModalBody>
          <div className="container border rounded">
            <div>
              <div className='mt-2 d-flex justify-content-center'>
                <TextField id="editingPostTitle" label="Post Title" variant="standard" style={{ width: '80%' }} defaultValue={editingPost.postTitle} onKeyUp={() => { editingPostTitleValidate() }} /><br />
              </div>
              <span id='editingPostTitleError' className='text-danger'></span>
            </div>
            <div className='mt-2 d-flex justify-content-center'>
              <TextField id="editingPostBody" label="Post body" multiline rows={9} variant="standard" style={{ width: '80%' }} defaultValue={editingPost.postBody} onKeyUp={() => { editingPostBodyValidate() }} /><br />
            </div>
            <span id='editingPostBodyError' className='text-danger'></span>

            <div className='d-flex justify-content-start mt-3 mb-3' style={{ marginLeft: '75px' }}>
              <Button variant="contained" onClick={() => { updatePostClick() }}>Save Changes</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* edit post modal end */}

      <div className="container border rounded mt-5 mb-4 p-3">
        <div className='d-flex justify-content-between'>
          <div>
            <h3 style={{ color: 'blue' }}>Posts</h3>
          </div>
          <div>
            <button className='btn btn-outline-primary' onClick={() => { setNewPostModal(true) }}>Create New Post</button>
          </div>
        </div>
        <div className='d-grid justify-content-evenly' style={{ gridTemplateColumns: 'auto auto auto auto' }}>
          {
            usersPosts?usersPosts.map((e, i) => {
              return (
                <div key={i} className="card shadow border-0 mt-4" style={{ width: '18rem', height: '30rem' }}>
                  <div className="card-body">
                    <h5 className="card-title" style={{ height: '50px', overflowY: 'auto' }}>{e.postTitle}</h5>
                    <p className="card-text" style={{ height: '320px', overflowY: 'auto' }}>{e.postBody}</p>
                    <div className='position-absolute bottom-0 start-0 ms-2 mb-1'>
                      <button className='btn btn-sm btn-outline-primary' onClick={() => { editClick(e) }}>Edit <i className="fa-regular fa-pen-to-square"></i></button>
                      <button className='btn btn-sm btn-outline-danger ms-3' onClick={() => { deleteClick(e) }}>Delete <i className="fa-solid fa-trash"></i></button><br />
                      <span><i className="fa-regular fa-clock mt-3"></i> {e.createdAt}</span>
                    </div>
                  </div>
                </div>
              )
            }):""
          }
        </div>
      </div>
      {
        open ? <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={popMessage} action={action} /> : ''
      }
    </>
  )
}

export default Home 