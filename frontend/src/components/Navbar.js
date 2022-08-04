import React, { useState, useEffect } from 'react'
import {
    NavLink
  } from "react-router-dom";
import "../styles/navbar.css"
import { Connect } from './ConnectButton';


const Navbar1 = () => {

  return (
    <div>
        <nav class="navbar navbar-expand-lg cl">
  <div className="margined">
    <img src="./logo.PNG" className="logo" />
    <NavLink id='p1' to="/">Pro NFT League</NavLink>
  </div>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item mr-4">
        <NavLink id='p2' to="/profile">Profile</NavLink>
      </li>
      <li class="nav-item mr-4">
        <NavLink id='p3' to="/leaderboard">Leaderboard</NavLink>
      </li>
      <li class="nav-item mr-4">
        <NavLink id='p4' to="/auction">Auction</NavLink>
      </li>
      <li class="nav-item mr-4">
        <NavLink id='p5' to="/trading">Trading</NavLink>
      </li>
    </ul>
  </div>
        </nav>
        <Connect />
    </div>
  )
}

export default Navbar1