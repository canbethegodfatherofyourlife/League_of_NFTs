import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/profile.css";
import { CategoryData } from "../data";
import { MetaData } from "../metadata";
import GetAccount from "../hooks/GetAccount"
import abi from '../artifacts/auction.json'
import GetContract from '../hooks/GetContract';
import { Connect } from '../components/ConnectButton';
import {ethers} from 'ethers'

const Profile = () => {
  const [ playerid, setplayerid ] = useState( 0 );
  const contract = GetContract();
  const addr = GetAccount()
  const [data1, setData1] = useState([])
  let sendnftbut = useState(
    localStorage.getItem("getnft") ? localStorage.getItem("getnft") : false
  );
  const [nftCount, setnftCount] = useState(0)
  const [editname, setname] = useState("");
  const [sellVal, setsellVal] = useState(0);
  const {ethereum}=window;
  let name = localStorage.getItem("name")
    ? localStorage.getItem("name")
    : "silver_blue";

    let showbutton = useState(
      localStorage.getItem("withdraw") ? localStorage.getItem("withdraw") : true
    );

    const edit = () => {
      name = localStorage.setItem("name", editname);
    };

    const contractABI = abi.abi;
    const contractAddress = "0x77086505161c2eee97F07F0f49c5A5AD04aBe464";

    const withdraw = async () => {
      if (typeof ethereum !== "undefined") {
        console.log("MetaMask is installed!");
        const provider = new ethers.providers.Web3Provider(ethereum);
        const tempSigner = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          tempSigner
        );
        const transaction = await contract.return_money(addr);
        await transaction.wait();
        localStorage.setItem("withdraw", false);
      } else {
        console.log("Metamask not found!");
      }
    };

  async function getPlayer1 () {
    await fetch( `http://localhost:3008/auction/${addr}` )
      .then( ( res ) => {
        res.json().then( ( data1 ) => {
          setplayerid( data1[ 2 ] );
          console.log( data1[ 2 ])
        } );
      } )
      .catch( ( e ) => console.log( e.message ) );
  }


  async function topaddressfn() {
    await fetch("http://localhost:3008/auction/") 
      .then((res) => {
        res.json().then((resp) => {
          console.log(resp);
          if (resp.includes(addr)) {
            localStorage.setItem("getnft", true);
          }
        });
      })
      .catch((e) => console.log(e.message));
  }

  const claimNft=async()=>{
    await contract.awardItem(addr,MetaData[playerid])
    console.log(MetaData[playerid])
  }

 console.log(playerid)

  const updateSellAmt = async () => {
    await fetch(`http://localhost:3008/profile/${addr}`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sell: true,
        sellAmount: sellVal,
      }),
    }).then((res) => {
      res.json().then((resp) => {
        getData1();
      });
    });
  };

  async function getData1(){
    await fetch(`http://localhost:3008/leaderboard/${addr}`)
    .then((res) => {
      res.json().then((data1) => {
        setData1(data1);
      });
    })
    .catch((e) => console.log(e.message));
  }

  useEffect( () => {
    getPlayer1()
    getData1()
    getNftCount()
  },[])

  const getNftCount = async () => {
    const val  = await contract.balanceOf(addr)
    setnftCount(val.toString())
    console.log(val.toString())
  }
  
  console.log(MetaData[Number(playerid)])

  if((typeof addr === 'string') || addr.props.children !== 'Disconnected'){
    return (
      <div className="Nav">
        <Navbar />
        <div className="profile">
          {Object.keys(data1).length != 0 && playerid != 0 ? (
            <img
              src={CategoryData[playerid][1]}
              className="profile-img full-withradius border"
            />
          ) : (
            <img src="./sports-betting.jpeg" className="profile-img" />
          )}
          <div className="profile-content">
            <div className="profile-info">
              <img src="./Ellipse2.svg" className="mt-1 mr-2 ml-1" />
              <div className="profile-info2">
                <div className="profile-info1">
                  <p className="username">{name}</p>
                  <p></p>
                  <img
                    src="./Vector.svg"
                    className="ml-2"
                    data-toggle="modal"
                    data-target="#exampleModal1"
                  />
                </div>
  
                <div
                  class="modal fade"
                  id="exampleModal1"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Enter your nickname
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
                            value={editname}
                            onChange={(e) => setname(e.target.value)}
                          />
                          <span class="placeholder">Enter your nickname</span>
                        </div>
                      </div>
  
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                          onClick={() => setname("")}
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={() => edit()}
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="address">
                {addr.substring(0, 5) +
                  "..." +
                  addr.substring(addr.length - 5, addr.length)}
              </p>
              </div>
            </div>
  
            {Object.keys(data1).length != 0 ? (
              <h1 className="title1">You currently own</h1>
            ) : (
              <h1 className="title1">Invest in cool player NFTs</h1>
            )}
            <h1 className="title2">
              {Object.keys(data1).length  != 0 && playerid != 0 ? (
                CategoryData[playerid][0]
              ) : (
                <h1 className="title3">
                  Go the trading page and start your journey!
                </h1>
              )}
            </h1>
            <p className="subtitle5 mt-5 mb-5 ml-1">
              Here's your score we calculate by summing up the scores of the players you have held till now. Also, there's the number of transactions you have done till now and your position on the leaderboard. 
            </p>
            <div className="icons-desc">
              <div className="icon1">
                <div></div>
                <p className="subtitle">
                  {Object.keys(data1).length != 0 ? data1[0].score : " - "}
                  Score
                </p>
              </div>
              <div className="icon2">
                {Object.keys(data1).length != 0}
                <div>
                  <img src="./Coin.svg" />
                </div>
                 <p className="subtitle mr-1">
                  {Object.keys(data1).length != 0
                    ? data1[0].history.length
                    : " - "}
                  Transactions
                </p>  
              </div>
              <div className="icon3">
                <div>
                  <img src="./Stats.svg" />
                </div>
                 <p className="subtitle">
                  {Object.keys(data1).length != 0 ? data1.leaderboard : " - "}
                  Rank
                </p> 
              </div>
            </div>
            <p className="subtitle5 mt-5 mb-5 ml-1">
              If you are among the top 20% bidders, congrats man you can claim your player NFT right away.If you want to buy another player you can just sell the current NFT by listing it with the price you feel fit.
              After the tournament begins no need to claim NFT as it'll be transferred directly to your account. 
            </p>
  
            <div className="d-flex mt-2">
               {showbutton[0] == "false" ? (
              <button
                type="button"
                class="sellbut"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                SELL NFT
              </button>
                ) : null}

              {showbutton[0] == "true" ? (
                <button class="sellbut" type="button" onClick={() => withdraw()}>
                  Withdraw Funds!
                </button>
              ) : null}
  
                <button
                  class="sellbut"
                  type="button"
                  onClick={() => topaddressfn()}
                >
                  Get address
                </button>
  
              {(Number(nftCount) < 1 && showbutton[0] == "false") ? (
                <button class="sellbut" type="button" onClick={() => claimNft()}>
                  Claim NFT
                </button>
              ) : null}
            </div>
  
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
                      Sell or Update Price
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
                        value={sellVal}
                        onChange={(e) => setsellVal(e.target.value)}
                      />
                      <span class="placeholder">Enter Price</span>
                    </div>
                  </div>
  
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={() => setsellVal(0)}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={() => updateSellAmt()}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {Object.keys(data1).length != 0 ? (
              <>
                <h1 className="transaction">Previous Transactions</h1>
                <table class="table table-borderless text-white mb-5">
                  <thead>
                    <tr className="tablehead">
                      <th scope="col">Card Player Id</th>
                      <th scope="col">Card Player Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data1[0].history.map((item) => (
                      <tr>
                        <th scope="row">{item}</th>
                        <td>{CategoryData[item][0]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <h1 className="transaction mb-5">
                Your Transactions will be shown here!
              </h1>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }else{
    return(
      <div className="prof">
        <Connect />
      </div>
    )
  }
  
 
};

export default Profile;
