import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/auction.css";
import { iplData } from "../iplData";
import { PlayerIdData } from "../playerToid";
import { ethers } from "ethers";
import { CategoryData } from "../data";
import GetAccount from "../hooks/GetAccount"
import abi from "../artifacts/auction.json";

const contractABI = abi.abi;
const contractAddress = "0x77086505161c2eee97F07F0f49c5A5AD04aBe464";

const Auction = () => {
  const addr = GetAccount()
  const [ showPlayer, setshowPlayer ] = useState( false );
  const [ showButtons, setshowButtons ] = useState( false );
  const [ placeBid, setplaceBid ] = useState( false );
  const [ bidAmount, setbidAmount ] = useState( 0 );

  const [ data, setData ] = useState( [] );

  const [ team, setTeam ] = useState( [] );


  const [ playerId, setPlayerId ] = useState( 0 );
  const [ sellVal, setsellVal ] = useState( 0 );
  const [ playerid, setplayerid ] = useState( 0 );

  const { ethereum } = window;

  const teamNameHandler = ( e ) => {
    setTeam( iplData[ e ] );
    setshowPlayer( true );
  };

  const playerNameHandler = ( e ) => {
    // fetch from backend the value of bidAmount
    // if(bidAmount>0){
    //   setplaceBid(true)
    // }
    setshowButtons( true );
    setPlayerId( PlayerIdData[ e ] );
    getData1( PlayerIdData[ e ] );
  };

  const placeBidHandler = async () => {
    if ( typeof ethereum !== "undefined" ) {
      console.log( "MetaMask is installed!" );
      const provider = new ethers.providers.Web3Provider( ethereum );
      const tempSigner = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        tempSigner
      );
      const newbidAmount = bidAmount;
      const transaction = await contract.make_bid( {
        value: ethers.utils.parseEther( ( newbidAmount ).toString() )
      } );
      await transaction.wait()
      setplaceBid( true );
      placebid();
    } else {
      console.log( "Metamask not found!" );
    }
  };

  async function placebid () {
    await fetch( `http://localhost:3008/auction/${ addr }/${ playerId }`, {
      method: "POST",
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify( {
        address: addr,
        playerId: playerId,
        bid: bidAmount,
      } ),
    } ).then( ( res ) => {
      res.json().then( ( resp ) => {
        console.log( "resp", resp );
      } );
    } );
  }

  async function getPlayer () {
    await fetch( `http://localhost:3008/auction/${ addr }` )
      .then( ( res ) => {
        res.json().then( ( data1 ) => {
          setplaceBid( data1[ 0 ] );
          setbidAmount( data1[ 1 ] );
          setplayerid( data1[ 2 ] );
        } );
      } )
      .catch( ( e ) => console.log( e.message ) );
  }

  async function getData1 ( playerId ) {
    await fetch( `http://localhost:3008/auction/${ addr }/${ playerId }` )
      .then( ( res ) => {
        res.json().then( ( data1 ) => {
          setData( data1 );
        } );
      } )
      .catch( ( e ) => console.log( e.message ) );
  }

  const updateSellAmt = async () => {
    await fetch( `http://localhost:3008/auction/${ addr }/${ playerId }`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify( {
        bid: sellVal,
      } ),
    } ).then( ( res ) => {
      res.json().then( ( resp ) => {
        setbidAmount( sellVal );
        setsellVal( 0 );
      } );
    } );
  };

  const saveChange = async () => {
    if ( typeof ethereum !== "undefined" ) {
      console.log( "MetaMask is installed!" );
      const provider = new ethers.providers.Web3Provider( ethereum );
      const tempSigner = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        tempSigner
      );
      const newbidAmount = sellVal;
      const transaction = await contract.make_bid( {
        value: ethers.utils.parseEther( ( newbidAmount - bidAmount ).toString() )
      } );
      await transaction.wait()
      await updateSellAmt();
    } else {
      console.log( "Metamask not found!" );
    }
  };

  useEffect( () => {
    getPlayer()
  }, [] )


  return (
    <div className="Nav">
      <Navbar />
      <div className="selectTeamDiv mt-5">PLACE ( UPDATE ) YOUR BIDS!</div>
      <h2 className="ht">Select a team and choose the player you want to bid on.</h2>
      <div className="Details">
        <div class="accordion" id="accordionExample">
          <div>
            <h2 class="mb-0">
              <button
                class=" cardInnerBox btn btn-link btn-block text-left"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <div className="selectTeamDiv1">SELECT YOUR TEAM!</div>
              </button>
            </h2>
          </div>

          <div
            id="collapseOne"
            class=" show collapse"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <button
              className="teamName mt-3"
              onClick={ () => teamNameHandler( "CSK" ) }
            >
              CSK
            </button>
            <button className="teamName" onClick={ () => teamNameHandler( "MI" ) }>
              MI
            </button>
            <button className="teamName" onClick={ () => teamNameHandler( "GT" ) }>
              GT
            </button>
            <button className="teamName" onClick={ () => teamNameHandler( "RR" ) }>
              RR
            </button>
          </div>
        </div>
      </div>

      { !showPlayer ? (
        <></>
      ) : (
        <div className="Details">
          <div class="accordion" id="accordionExample1">
            <div class="card">
              <h2 class="mb-0">
                <button
                  class=" cardInnerBox btn btn-link btn-block text-left"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne1"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <div className="selectTeamDiv"> SELECT YOUR PLAYER! </div>
                </button>
              </h2>
            </div>

            <div
              id="collapseOne1"
              class=" show collapse mt-3"
              aria-labelledby="headingOne"
              data-parent="#accordionExample1"
            >
              { team.map( ( item, val ) => (
                <button
                  className="teamName"
                  onClick={ () => playerNameHandler( item ) }
                >
                  { item }
                </button>
              ) ) }
            </div>
          </div>
        </div>
      ) }

      { !showButtons ? (
        <></>
      ) : (
        <div className="Panel">
          <div className="Bid">
            <button className="tradingButton">
              Highest Bid -
              { data.length != 0 ? (
                data[ data.length - 1 ].toFixed( 4 )
              ) : (
                <div class="spinner-border text-warning" role="status"></div>
              ) }
            </button>
            <button className="tradingButton">
              Lowest Bid -
              { data.length != 0 ? (
                data[ 0 ].toFixed( 4 )
              ) : (
                <div class="spinner-border text-warning" role="status"></div>
              ) }
            </button>
          </div>

          <div className="Bid">
            {/* <button className='tradingButton'>Base price</button> */ }
            {/* <button className='tradingButton'>Place your</button> */ }
            { (!placeBid && ((typeof addr === 'string') || addr.props.children !== 'Disconnected')) && (
              <div class="input-block">
                <input
                  type="text"
                  name="input-text"
                  id="input-text"
                  required
                  spellcheck="false"
                  value={ bidAmount }
                  onChange={ ( e ) => setbidAmount( e.target.value ) }
                />
                <span class="placeholder">Enter your bid</span>
              </div>
            ) }
          </div>
          { (!placeBid && ((typeof addr === 'string') || addr.props.children !== 'Disconnected')) && (
            <button onClick={ () => placeBidHandler() } className="PlaceBid">
              Place Bid
            </button>
          ) }

          { !placeBid ? (
            <></>
          ) : (
            <div className="Bid">
              <button className="tradingButton">
                Your bid - { bidAmount } ({ CategoryData[ playerid ][ 0 ] })
              </button>
              { playerid == playerId && (
                <button
                  type="button"
                  className="button-63"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Update Bid
                </button>
              ) }

              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Update Bid
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>

                    <div class="modal-body">
                      <div class="input-block">
                        <input
                          type="text"
                          name="input-text"
                          id="input-text"
                          required
                          spellcheck="false"
                          value={ sellVal }
                          onChange={ ( e ) => setsellVal( e.target.value ) }
                        />
                        <span class="placeholder">Enter Price</span>
                      </div>
                    </div>

                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                        onClick={ () => setsellVal( 0 ) }
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={ () => saveChange() }
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) }
        </div>
      ) }

      <Footer />
    </div>
  );
};

export default Auction;
