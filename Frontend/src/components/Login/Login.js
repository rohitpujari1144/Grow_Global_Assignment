import './login.css'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from '../Navbar/Navbar';

function Login() {
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

  function passwordValidate() {
    const password = document.getElementById('password')
    const passwordError = document.getElementById('passwordError')
    if (password.value === "") {
      passwordError.innerHTML = `*Required`
    }
    else {
      passwordError.innerHTML = ''
    }
  }

  var i = 0
  function showPasswordClick() {
    const password = document.getElementById('password')
    if (i === 0 || i % 2 === 0) {
      password.removeAttribute('type')
    }
    else {
      password.setAttribute('type', 'password')
    }
    i++
  }

  async function loginClick() {
    const email = document.getElementById('email')
    const emailError = document.getElementById('emailError')
    const password = document.getElementById('password')
    const passwordError = document.getElementById('passwordError')

    if (email.value === "") {
      emailError.innerHTML = `*Required`
    }
    else {
      emailError.innerHTML = ''
    }
    if (password.value === "") {
      passwordError.innerHTML = `*Required`
    }
    else {
      passwordError.innerHTML = ''
    }
    if (emailError.innerHTML === '' && passwordError.innerHTML === '') {
      axios.get(`https://grow-global-assignment-backend.onrender.com/login/${email.value}/${password.value}`)
        .then((response) => {
          if (response.data.message === "login successful") {
            sessionStorage.setItem('email', email.value)
            // alert('login successful')
            setOpen(true)
            setTimeout(() => {
              navigate('/home')

            }, 2000);
          }
          else {
            document.getElementById('loginError').innerHTML = `*Invalid email address/password`
            setTimeout(() => {
              document.getElementById('loginError').innerHTML = ''
            }, 4000);
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

      <div className="col-3 shadow rounded p-4 position-absolute top-50 start-50 translate-middle">
        <div className='text-center text-primary'>
          <h3 >Login</h3>
        </div>
        <form>
          <div className="mt-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="text" className="form-control" id="email" aria-describedby="emailHelp" placeholder="email address" autoComplete='off' onKeyUp={() => { emailValidate() }} />
            <span className='text-center text-danger' id='emailError'></span>
          </div>
          <div className="mt-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" aria-describedby="emailHelp" placeholder='password' autoComplete='off' onKeyUp={() => { passwordValidate() }} />
            <span className='text-center text-danger' id='passwordError'></span>
          </div>
          <div className="form-check mt-3">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={() => { showPasswordClick() }} />
            <label className="form-check-label" htmlFor="flexCheckDefault">Show Password</label>
          </div>
          <div className='text-center mt-2'>
            <span id='loginError' className="text-danger"></span>
          </div>
          <div className="text-center mt-3">
            <button type="button" className="btn btn-outline-primary" onClick={() => { loginClick() }}>Login</button>
          </div>
          <div className='text-center mt-3'>
            <h6>new user? <span className='text-primary hoverText' onClick={() => { navigate('/signup') }}>create new account</span></h6>
          </div>
          <div className='text-center mt-3'>
            <h6>forgot password? <span className='text-primary hoverText' onClick={() => { navigate('/change-password') }}>click here</span></h6>
          </div>
        </form>
      </div>
      {
        open ? <Snackbar open={open} autoHideDuration={2500} onClose={handleClose} message="Login Successful" action={action} /> : ''
      }
    </>
  )
}

export default Login