import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/trading.css";
import { CategoryData } from "../data";


const Trading = () => {
 

  return (
    <div className="Nav">
      <Navbar />
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
                <div className="selectTeamDiv">SELECT YOUR TEAM!</div>
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
              {" "}
              CSK{" "}
            </button>
            <button className="teamName" onClick={() => teamNameHandler("MI")}>
              {" "}
              MI{" "}
            </button>
            <button className="teamName" onClick={() => teamNameHandler("GT")}>
              {" "}
              GT{" "}
            </button>
            <button className="teamName" onClick={() => teamNameHandler("RR")}>
              {" "}
              RR{" "}
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
                  {" "}
                  {item}{" "}
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
          {showBut && (
            <button class="button-75" role="button">
              <span class="text" onClick={() => buy()}>
                BUY IT NOW!
              </span>
            </button>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Trading;
