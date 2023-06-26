import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar(props) {
  let navigate = useNavigate()

  function logoutClick() {
    sessionStorage.clear()
    navigate('/')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light shadow" >
        <div className="container-fluid">
          <span className="navbar-brand" style={{letterSpacing:'2px', fontFamily:'arial'}}>USER POST</span>
          {
            props.logoutButton ? <button className='btn btn-warning' onClick={() => { logoutClick() }}>Logout</button> : ''
          }
        </div>
      </nav>
    </>
  )
}

export default Navbar