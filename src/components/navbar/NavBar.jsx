// eslint-disable-next-line no-unused-vars
import React from 'react'
import './navbar.scss'
import logo from '../../img/daijoubust-logo.png'
// import { Link} from 'react-router-dom'

const NavBar = () => {
    return (
        <div className='nav-container'>
            <div className='flex'>
            <img src={logo} height={50} width={50} alt="" />
            <h1><a href="https://github.com/Daijoubust">aijoubust</a></h1>
            </div>
            {/* <h1><Link to ="/pokemonlist">Pokemon List</Link></h1>
            <h1><Link to ="/randomizer">Randomizer</Link></h1> */}
        </div>
    )
}

export default NavBar