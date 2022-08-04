import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/leaderboard.css";
import ReactPaginate from 'react-paginate';
import { ethers } from "ethers";
import GetAccount from "../hooks/GetAccount"

const Leaderboard = () => {
  const addr = GetAccount()
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const start = 3;
  const [start1, setstart] = useState(0);
  const [pageNumber,setpagenumber] = useState(0);

  const usersPerpage = 7
  const pagesVisited = pageNumber*usersPerpage+start
  
  const displayusers = data.slice(pagesVisited,[pagesVisited+usersPerpage]).map((item,key) =>{
    return (
      <tr>
      <th scope="row">{key+start1+4}</th>
      <td>{item.score}</td>
      <td>
        {item.address.substring(0, 5) +
          "..." +
          item.address.substring(
            item.address.length - 5,
            item.address.length
          )}
      </td>
    </tr>
    )
  })

  const pageCount = Math.ceil(data.length/usersPerpage)

  const PageChange = ({selected}) => {
    setpagenumber(selected)
    setstart(selected*usersPerpage)
  }

  async function getData() {
    await fetch("http://localhost:3008/leaderboard/")
      .then((res) => {
        res.json().then((data1) => {
          setData(data1);
        });
      })
      .catch((e) => console.log(e.message));
  }

  useEffect(() => {
    getData();
    getData1();
  }, [])
  

  async function getData1(){
    await fetch(`http://localhost:3008/leaderboard/${addr}`)
    .then((res) => {
      res.json().then((data1) => {
        setData1(data1);
      });
    })
    .catch((e) => console.log(e.message));
  }

  console.log(data1)

  return (
    <div className="Nav">
      <Navbar />
      <div className="leftright">
        <div className="left" id="style-14">
          <div className="toppers">
            <div className="leader-holder">
              <img src="./1.svg" />
              <div className="leader-p-holder">
                <p className="leader-p1">
                  {data.length != 0 ? data[0].score : null}
                </p>
                <p className="leader-p2">
                  {data.length != 0
                    ? data[0].address.substring(0, 5) +
                      "..." +
                      data[0].address.substring(
                        data[0].address.length - 5,
                        data[0].address.length
                      )
                    : null}
                </p>
              </div>
            </div>
            <div className="leader-holder">
              <img src="./2.svg" />
              <div className="leader-p-holder">
                <p className="leader-p1">
                  {data.length != 0 ? data[1].score : null}
                </p>
                <p className="leader-p2">
                  {data.length != 0
                    ? data[1].address.substring(0, 5) +
                      "..." +
                      data[1].address.substring(
                        data[1].address.length - 5,
                        data[1].address.length
                      )
                    : null}
                </p>
              </div>
            </div>
            <div className="leader-holder">
              <img src="./3.svg" />
              <div className="leader-p-holder">
                <p className="leader-p1">
                  {data.length != 0 ? data[2].score : null}
                </p>
                <p className="leader-p2">
                  {data.length != 0
                    ? data[2].address.substring(0, 5) +
                      "..." +
                      data[2].address.substring(
                        data[2].address.length - 5,
                        data[2].address.length
                      )
                    : null}
                </p>
              </div>
            </div>
          </div>

          <table class="table table-borderless text-white table">
            <tbody>
              {displayusers}
            </tbody>
          </table>
          {/* <div className="d-flex table1 mt-5">
            <button className="load mr-5">LOAD MORE</button>
            <button className="load">JUMP TO MY POSITION</button>
          </div> */}
          <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={PageChange}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
           />
        </div>
        <div className="right">
          <h1 className="head1">See who's on top</h1>
          <div className="d-flex flex-row justify-center home">
            <div className="liendiv">
              <hr className="line mr-2" />
            </div>
            <h1 className="head2"> of the game</h1>
          </div>
          <p className="para">
            Radio signals transmitted from a controller device control the
            actions of a remote device. In radio communication, used in radio
            and television broadcasting, cell phoation, used in radio and
            television broadcasting, cell phones, two-way radios, wireless
            networking and satellite communication among numerous other uses.
          </p>
          <article className="score1 mt-5">
            {data1.length != 0 && (<h1 className="score2">Your position on the Leaderboard - {data1.leaderboard} </h1>)}
            {data1.length == 0 && (<h1 className="score2"> Invest in super cool player NFTs </h1>)}
          </article>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Leaderboard;