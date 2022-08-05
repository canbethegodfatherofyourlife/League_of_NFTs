import React from 'react'
import '../styles/footer.css'
import { FaInstagram,FaTwitter,FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer">
        <div className="sidebar">
            <FaInstagram className="icons"/>
            <FaTwitter  className="icons"/>
            <FaLinkedinIn className="icons"/>
        </div>
        <div className="footer-content">
            <h1 className="head33">Ready to start earning? Connect your wallet and place your bids in the Auction Page!</h1>
            <p className="para3 mt-5 mb-5">Unlock the world of opportunities, start earning using your cricketing knowledge and get super cool NFTs of your favourite players. Trade player NFTs and try to maximise your scores to get cool prizes from us.</p>
            <img src='./iplwinner.jpg' className="img-footer"/>
        </div>
    </div>
  )
}

export default Footer