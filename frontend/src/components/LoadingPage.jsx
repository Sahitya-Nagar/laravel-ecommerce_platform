import React from 'react'
import Logo from '../assets/images/logoFinal.jpg';

const LoadingPage = () => {

  return (
    <div className="loading-page">
    <div className="loading-content">
        <img src={Logo} alt="Loading..." className="loading-logo" />
        <p>Loading ...</p>
    </div>
    </div>

  )
}

export default LoadingPage
