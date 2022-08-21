import React, { useState } from "react";
import "../styles/home.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import video from '../vid.mp4'

const Home = () => {


  return (
    <div className="Nav">
      <Navbar />
      <div className='d-flex'>
        <div>
          <div className="head1">Play & Earn.</div>
          <div className="d-flex flex-row justify-center home">
            <h1 className="head2"> Leverage your cricketing knowledge.</h1>
          </div>
          <p className="para">
            Are you the crazy cricket fan who can't afford to miss a single IPL match? You have the uncanny ability to memorise every single stats of players and correctly predict who's gonna do well! But, alas there is no monetary incentive 😭. Don't worry we are here just for you guys! 
          </p>
        </div>
        <img src='sports-betting.jpeg' className='bet'/>
      </div>
      <div className="button-pos">
        <a href='#faq'>
          <button className="learn-button1">GO TO FAQS</button>
        </a>
      </div>
      <div class="wrapper mt-5 pb-5">
        <marquee behavior="alternate">
          <span class="marquee txt">
            Rewards • Secure transactions • IPL Seasons • Player NFTs
          </span>
        </marquee>
        <marquee behavior="alternate">
          <span class="marquee txt">
            Trading NFTs • IPL • Bonus Prizes • Auction favourite players • Earn money
          </span>
        </marquee>
      </div>
      <h1 className="mb-3 ml-5 howItWorks">How it works</h1>
      <div className="working pb-5">
        <p className="working-para mr-5">
          The most exciting and easy-to-use trading cum NFT marketplace built on Web3 is here. Just follow these simple steps and start earning! Put your cricketing knowledge to test and buy in form players and try to maximise your score. Also, you can trade player nfts and book short term profits.
        </p>
        <div className="text-center">

        </div>
      </div>

        <div className="demo-holder">
          <div className="demo-setter">
            <h1 className="demo-heading my-2">1. Choose your player</h1>
            <p className="demo-para my-2">
              Bid for a player whose capabilities you believe in the most.
              As the tournament begins you can <br />choose to buy player NFTs directly.
            </p>
          </div>
          <div className="demo-setter">
            <h1 className="demo-heading my-2">2. Claim NFTs</h1>
            <p className="demo-para my-2">
              You have the option to claim player NFTs if your bid is in the top 20%.
              <br /> Otherwise, you have the option to withdraw your funds.
            </p>
          </div>
          <div className="demo-setter">
            <h1 className="demo-heading my-2">3. Trade player NFTs</h1>
            <p className="demo-para my-2">
              Put your cricketing expertise to test and buy players in excellent form. <br />
              Trade nfts and try to book short-term profits.
            </p>
          </div>
          <div className="demo-setter">
            <h1 className="demo-heading my-2">4. Get cash rewards</h1>
            <p className="demo-para my-2">
              At the end, you can avail exclusive cash rewards <br />based on your cummulative score
              tallied throughout the league.
            </p>
          </div>
        </div>


      <div className="d-flex">
        {/* <img src="https://www.canva.com/design/DAFHDlOsAFU/zob3X4tP-fEFtZBdTCBmzg/edit?utm_content=DAFHDlOsAFU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" className="img2" /> */ }
        <video src={ video } width="600" height="500" controls className="ml-4">
        </video>
        <div className="ml-5">
          <h1 class="head3 mt-5">Unlock the world of Web3 & start earning now!</h1>
          <p className="para2 mt-5">150+ Player NFTs</p>
          <p className="para2 mt-3">100+ Prize Pool</p>
          <p className="para2 mt-3">5000 + Bids Placed</p>
        </div>
      </div>

      <div id="faq" className="faqfather mt-5 ml-5">
        <div className="faqchild1">
          <h1 className="FAQheading" >What the FAQ?</h1>
          <p className="para1 mt-2">
            How can we help you? Have a look at the most frequently asked questions of the users of our platform.
          </p>
    
        </div>
        <div className="faqchild2">
          <div id="accordion" class="myaccordion">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h2 class="mb-0 p-3">
                  <button
                    class="d-flex align-items-center justify-content-between btn btn-link collapsed accordion"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    What is the problem we are trying to solve?
                    <span class="fa-stack fa-sm">
                      <i class="fas fa-circle fa-stack-2x"></i>
                      <i class="fas fa-plus fa-stack-1x fa-inverse"></i>
                    </span>
                  </button>
                </h2>
              </div>
              <div
                id="collapseOne"
                class="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div class="card-body">
                  <p className='acc'>
                    Cricket in India is an emotion. And, IPL rules over the hearts of millions of cricket fans over the world. But, for the huge amount of time they invest in it, what do they get except entertainment?. 
                    <br/>
                    Though participating committees like BCCI, sponsors, broadcasters and big businessmen make huge sums of money, meanwhile, the backbone of the entire system - the fans are having no monetary incentives.
                    This is exactly what we are trying to address.
                  </p>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-header" id="headingTwo">
                <h2 class="mb-0 p-3">
                  <button
                    class="d-flex align-items-center justify-content-between btn btn-link collapsed accordion"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    What's in it for the users? 
                    <span class="fa-stack fa-2x">
                      <i class="fas fa-circle fa-stack-2x"></i>
                      <i class="fas fa-plus fa-stack-1x fa-inverse"></i>
                    </span>
                  </button>
                </h2>
              </div>
              <div
                id="collapseTwo"
                class="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordion"
              >
                <div class="card-body">
                  <p className='acc'>
                    Users can trade player nfts and book regular profits by anticipating which nft could have an upside in the immediate future. 
                    Finally, at the end of the tournament we are going to reward users with highest scores, so they must try to maximise their scores by buying NFTs of players in good form.
                  </p>

                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-header" id="headingThree">
                <h2 class="mb-0 p-3">
                  <button
                    class="d-flex align-items-center justify-content-between btn btn-link collapsed accordion"
                    data-toggle="collapse"
                    data-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    What is the vision we have for the next 2 years?
                    <span class="fa-stack fa-2x">
                      <i class="fas fa-circle fa-stack-2x"></i>
                      <i class="fas fa-plus fa-stack-1x fa-inverse"></i>
                    </span>
                  </button>
                </h2>
              </div>
              <div
                id="collapseThree"
                class="collapse"
                aria-labelledby="headingThree"
                data-parent="#accordion"
              >
                <div class="card-body">
                  <p className='acc'>
                    We plan to launch the product before next year's IPL. Further we have plans to extend our product to other sports leagues as well like NBA, La Liga, Serie A, and even worldcups.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
