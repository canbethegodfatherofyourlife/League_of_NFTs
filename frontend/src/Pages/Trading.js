import React from "react";
import { useState, useEffect } from "react";
import { ethers } from 'ethers';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/trading.css";
import { PlayerIdData } from "../playerToid";
import { iplData } from "../iplData";
import { CategoryData } from "../data";
import GetAccount from "../hooks/GetAccount"
import GetContract from '../hooks/GetContract'
import GetSigner from '../hooks/GetSigner'

const Trading = () => {
  const [showPlayer, setshowPlayer] = useState(false);
  const [showImage, setshowImage] = useState(false);
  const [showBut, setshowBut] = useState(true);
  const [sellerAddress, setsellerAddress] = useState("");
  const addr = GetAccount();
  const [data, setData] = useState([]);
  const [team, setTeam] = useState([]);
  const [nftCount, setnftCount] = useState(0)
  const [playerId, setPlayerId] = useState(0);
  const [sellamt, setsellamt] = useState(0);
  const[TokenID,setTokenID]=useState('');
  const signer = GetSigner();


  const teamNameHandler = (e) => {
    setTeam(iplData[e]);
    setshowPlayer(true);
  };

  const contract = GetContract();
  const account = GetAccount();

const showToken=async(sellerAddres)=>{
  console.log(sellerAddres)
  var id = await contract.showTokenID(ethers.utils.getAddress(sellerAddres));
  setTokenID(id.toString());
  console.log('Token',id.toString());
}

useEffect( () => {
  getNftCount()
})

const approveNft = async() => {
    await contract.approve(account,TokenID);
}

const transferNft = async() => {
    const owner = await contract.ownerOf(TokenID);
    console.log(owner);
    const tx = await signer.sendTransaction({
        to: owner,
        value : ethers.utils.parseEther(sellamt.toString()), //Pass amount decided by the seller in the auction contract
    })
    await contract.transferFrom(owner,account,TokenID);
    console.log(tx);

    await fetch( `http://localhost:3008/trading/${ addr }/${ playerId }/${ sellerAddress }`, {
      method: "PATCH",
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify( [ {
        playerId: 0,
        sell: false,
        sellAmount: 0
      }, {
        playerId: playerId
      } ] ),
    } ).then( ( res ) => {
      res.json().then( ( resp ) => {
        console.log( 'Done!' )
      } );
    } );
}

  const playerNameHandler = async(e) => {
    setshowImage(true);
    setPlayerId(PlayerIdData[e]);
    await getAddress(PlayerIdData[e]);
    await getData1(PlayerIdData[e]);
  };

  async function getData1 ( playerId ) {
    await fetch( `http://localhost:3008/trading/${ addr }/${ playerId }` )
      .then( ( res ) => {
        res.json().then( ( data1 ) => {
          setData( data1 );
          return;
        } );
      } )
      .catch( ( e ) => console.log( e.message ) );
  }


  async function getAddress ( playerId ) {
    await fetch( `http://localhost:3008/trading/${ playerId }` )
      .then( ( res ) => {
        res.json().then( ( data1 ) => {
          if ( data1[0][0] === false ) {
            setshowBut( false );
          } else {
            setsellerAddress( data1[ 2 ] )
            showToken(data1[2])
            setsellamt( data1[ 1 ] )
            setshowBut( true );
          }
          return;
        } );
      } )
      .catch( ( e ) => console.log( e.message ) );
  }

  const getNftCount = async () => {
    const val  = await contract.balanceOf(addr)
    setnftCount(val.toString())
    console.log(val.toString())
  }
  


  return (
    <div className="Nav">
      <Navbar />
      <div className="selectTeamDiv mt-5">TRADE YOUR PLAYER NFTs</div>
      <h2 className="ht">Select a team and choose the player you want to trade.</h2>
      <div className="Details">
        <div class="accordion" id="accordionExample">
          <div class="card">
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
              onClick={() => teamNameHandler("CSK")}
            >
              CSK
            </button>
            <button className="teamName" onClick={() => teamNameHandler("MI")}>
              MI
            </button>
            <button className="teamName" onClick={() => teamNameHandler("GT")}>
              GT
            </button>
            <button className="teamName" onClick={() => teamNameHandler("RR")}>
              RR
            </button>
          </div>
        </div>
      </div>

      {!showPlayer ? (
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
                  <div className="selectTeamDiv">SELECT YOUR PLAYER!</div>
                </button>
              </h2>
            </div>

            <div
              id="collapseOne1"
              class=" show collapse mt-3"
              aria-labelledby="headingOne"
              data-parent="#accordionExample1"
            >
              {team.map((item, val) => (
                <button
                  className="teamName"
                  onClick={() => playerNameHandler(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {!showImage ? (
        <></>
      ) : (
        <div className="NFTDetails">
          {playerId != 0 ? (
            <img src={CategoryData[playerId][1]} className="PlayerNFT" />
          ) : (
            <div class="spinner-border text-warning" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          )}
          <div className="Price">
            {data.map((item, val) => (
              <button className="priceButton">{item[1]}</button>
            ))}
          </div>
          {(showBut && nftCount == 0 ) && (
            <>
            <button class="button-75" role="button" onClick={()=>approveNft()} >
              <span class="text" >
                Approve NFT Transfer
              </span>
            </button>
            <button class="button-75 mt-2" role="button" onClick={()=>transferNft()} >
              <span class="text" >
                BUY IT NOW!
              </span>
            </button>
            </>

          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Trading;
