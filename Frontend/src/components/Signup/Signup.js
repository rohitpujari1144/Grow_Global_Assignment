import { useNavigate } from 'react-router-dom'
import './signup.css'
import React, { useState } from 'react'
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from '../Navbar/Navbar';

function Signup() {
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

    function nameValidate() {
        const name = document.getElementById('name')
        const nameError = document.getElementById('nameError')
        if (name.value === "") {
            nameError.innerHTML = `*Required`
        }
        else {
            nameError.innerHTML = ''
        }
    }

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

    var i = 0
    function showPasswordClick() {
        const password = document.getElementById('password')
        const securityCode = document.getElementById('securityCode')
        if (i === 0 || i % 2 === 0) {
            password.removeAttribute('type')
            securityCode.removeAttribute('type')
        }
        else {
            password.setAttribute('type', 'password')
            securityCode.setAttribute('type', 'password')
        }
        i++
    }

    function registerClick() {
        const name = document.getElementById('name')
        const nameError = document.getElementById('nameError')
        const email = document.getElementById('email')
        const emailError = document.getElementById('emailError')
        const password = document.getElementById('password')
        const passwordError = document.getElementById('passwordError')
        const securityCode = document.getElementById('securityCode')
        const securityCodeError = document.getElementById('securityCodeError')
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/

        if (name.value === "") {
            nameError.innerHTML = `*Required`
        }
        else {
            if (name.value.length < 3) {
                nameError.innerHTML = `*Invalid`
            }
            else {
                nameError.innerHTML = ''
            }
        }
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
        if (password.value === "") {
            passwordError.innerHTML = `*Required`
        }
        else {
            if (password.value.length < 6 || password.value.length > 15) {
                passwordError.innerHTML = `*Password should be between 6 to 15`
            }
            else {
                passwordError.innerHTML = ''
            }
        }
        if (securityCode.value === "") {
            securityCodeError.innerHTML = `*Required`
        }
        else {
            if (securityCode.value.length < 6 || securityCode.value.length > 15) {
                securityCodeError.innerHTML = `*Security code should be between 6 to 15`
            }
            else {
                securityCodeError.innerHTML = ''
            }
        }
        if (nameError.innerHTML === "" && emailError.innerHTML === "" && passwordError.innerHTML === "" && securityCodeError.innerHTML === "") {
            const signupDetails = {
                name: name.value,
                email: email.value,
                password: password.value,
                securityCode: securityCode.value
            }
            axios.post(`https://grow-global-assignment-backend.onrender.com/signup`, signupDetails)
                .then((response) => {
                    if (response.data.message === "signup successful") {
                        // alert('signup successful')
                        setOpen(true)
                        setTimeout(() => {
                            navigate('/')
                        }, 2000);
                    }
                    else {
                        emailError.innerHTML = `*Email address already exist`
                        setTimeout(() => {
                            emailError.innerHTML = ''
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
                        <h3 >Signup</h3>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="name" autoComplete='off' onKeyUp={() => { nameValidate() }} />
                        <span className='text-center text-danger' id='nameError'></span>
                    </div>
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
                    <div className="mt-3">
                        <label htmlFor="securityCode" className="form-label">Account Security Code</label>
                        <input type="password" className="form-control" id="securityCode" aria-describedby="emailHelp" placeholder='account security code' autoComplete='off' onKeyUp={() => { securityCodeValidate() }} />
                        <span className='text-center text-danger' id='securityCodeError'></span>
                    </div>
                    <div className="form-check mt-3">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={() => { showPasswordClick() }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">Show Password & Security Code</label>
                    </div>
                    <div className="text-center mt-4">
                        <button type="button" className="btn btn-outline-primary" onClick={() => { registerClick() }}>Register</button>
                    </div>
                    <div className='text-center mt-3'>
                        <h6 className='text-primary backToLogin' onClick={() => { navigate('/') }}>back to login</h6>
                    </div>
                </form>
            </div>
            {
                open ? <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message="Signup Successful" action={action} /> : ''
            }
        </>
    )
}

export default Signup