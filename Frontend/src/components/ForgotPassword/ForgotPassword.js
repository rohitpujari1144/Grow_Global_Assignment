import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from '../Navbar/Navbar';

function ForgotPassword() {
  let navigate = useNavigate()
  const [open, setOpen] = useState(false);

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

  function emailValidate() {
    const email = document.getElementById('email')
    const emailError = document.getElementById('emailError')
    if (email.value === "") {
      emailError.innerHTML = `*Required`
    }
    else {
      emailError.innerHTML = ''
    }
  }

  function securityCodeValidate() {
    const securityCode = document.getElementById('securityCode')
    const securityCodeError = document.getElementById('securityCodeError')
    if (securityCode.value === "") {
      securityCodeError.innerHTML = `*Required`
    }
    else {
      securityCodeError.innerHTML = ''
    }
  }

  function newPasswordValidate() {
    const newPassword = document.getElementById('newPassword')
    const newPasswordError = document.getElementById('newPasswordError')
    if (newPassword.value === "") {
      newPasswordError.innerHTML = `*Required`
    }
    else {
      newPasswordError.innerHTML = ''
    }
  }

  var i = 0
  function showPasswordClick() {
    const newPassword = document.getElementById('newPassword')
    const securityCode = document.getElementById('securityCode')
    if (i === 0 || i % 2 === 0) {
      newPassword.setAttribute('type', 'text')
      securityCode.setAttribute('type', 'text')
    }
    else {
      newPassword.setAttribute('type', 'password')
      securityCode.setAttribute('type', 'password')
    }
    i++
  }

  function changePasswordClick() {
    const email = document.getElementById('email')
    const emailError = document.getElementById('emailError')
    const securityCode = document.getElementById('securityCode')
    const securityCodeError = document.getElementById('securityCodeError')
    const newPassword = document.getElementById('newPassword')
    const newPasswordError = document.getElementById('newPasswordError')
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/

    if (email.value === "") {
      emailError.innerHTML = `*Required`
    }
    else {
      if (email.value.match(emailPattern)) {
        emailError.innerHTML = ''
      }
      else {
        emailError.innerHTML = `*Invalid`
      }
    }
    if (securityCode.value === "") {
      securityCodeError.innerHTML = `*Required`
    }
    else {
      securityCodeError.innerHTML = ''
    }
    if (newPassword.value === "") {
      newPasswordError.innerHTML = `*Required`
    }
    else {
      if (newPassword.value.length < 6 || newPassword.value.length > 15) {
        newPasswordError.innerHTML = `*Password should be between 6 to 15`
      }
      else {
        newPasswordError.innerHTML = ''
      }
    }
    if (emailError.innerHTML === '' && securityCodeError.innerHTML === '' && newPasswordError.innerHTML === '') {
      const updatedPassword = {
        password: newPassword.value
      }
      axios.put(`https://grow-global-assignment-backend.onrender.com/updateUser/${email.value}/${securityCode.value}`, updatedPassword)
        .then((response) => {
          if (response.data.message === 'password updated') {
            setOpen(true)
            setTimeout(() => {
              navigate('/')
            }, 2000);
          }
          else {
            document.getElementById('passwordCodeError').innerHTML = `*Invalid email address/security code`
            setTimeout(() => {
              document.getElementById('passwordCodeError').innerHTML = ''
            }, 3500);
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  return (
    <>
      <Navbar logoutButton={false} />

      <div className="col-3 shadow rounded p-4 mt-4 position-absolute top-50 start-50 translate-middle">
        <form id='signupForm'>
          <div className='text-center text-primary'>
            <h4>Change Password</h4>
          </div>
          <div className="mt-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="text" className="form-control" id="email" aria-describedby="emailHelp" placeholder="email address" autoComplete='off' onKeyUp={() => { emailValidate() }} />
            <span className='text-center text-danger' id='emailError'></span>
          </div>
          <div className="mt-3">
            <label htmlFor="securityCode" className="form-label">Account Security Code</label>
            <input type="password" className="form-control" id="securityCode" aria-describedby="emailHelp" placeholder='account security code' autoComplete='off' onKeyUp={() => { securityCodeValidate() }} />
            <span className='text-center text-danger' id='securityCodeError'></span>
          </div>
          <div className="mt-3">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <input type="password" className="form-control" id="newPassword" aria-describedby="emailHelp" placeholder='password' autoComplete='off' onKeyUp={() => { newPasswordValidate() }} />
            <span className='text-center text-danger' id='newPasswordError'></span>
          </div>
          <div className="form-check mt-3">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={() => { showPasswordClick() }} />
            <label className="form-check-label" htmlFor="flexCheckDefault">Show security code & password</label>
          </div>
          <div className='text-center mt-2'>
            <span className='text-danger' id='passwordCodeError'></span>
          </div>
          <div className="text-center mt-3">
            <button type="button" className="btn btn-outline-primary" onClick={() => { changePasswordClick() }}>Change Password</button>
          </div>
          <div className='text-center mt-3'>
            <h6 className='text-primary backToLogin' onClick={() => { navigate('/') }}>back to login</h6>
          </div>
        </form>
      </div>
      {
        open ? <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message="Password Successfully Changed" action={action} /> : ''
      }
    </>
  )
}

export default ForgotPassword