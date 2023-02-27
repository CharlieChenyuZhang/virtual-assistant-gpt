import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InteractiveUI from "./InteractiveUI";
import logo from "../assets/betafellowship.png";
import portfolio1 from "../assets/portfolios/beta-p-1.png";
import portfolio2 from "../assets/portfolios/beta-p-2.png";
import portfolio3 from "../assets/portfolios/beta-p-3.png";
import betaCompanies from "../assets/portfolios/beta-companies.png";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CircularProgress from "@mui/material/CircularProgress";
import { Configuration, OpenAIApi } from "openai";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from "react-twitter-embed";

const Header = styled.div`
  margin-top: 3rem;
`;

const Logo = styled.img`
  width: 12rem;
  height: 4.5rem;
  /* position: fixed; */
`;

const PortfolioImg = styled.img`
  width: 100%;
  /* height: 30rem; */
  /* position: fixed; */
`;

const TweetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 400px;
  overflow: scroll;
  margin: auto;
`;

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const PortfolioManagement = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit() {
    try {
      try {
        // it saved the previous convo between the AI and bot
        setIsLoading(true);
        let completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: ``, // FIXME:
          temperature: 0.7,
          max_tokens: 2000,
        });
        const resp = completion.data.choices[0].text;
      } catch (error) {
        setIsLoading(false);
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
          console.error(error.response.status, error.response.data);
        } else {
          console.error(`Error with OpenAI API request: ${error.message}`);
        }
      }
    } catch (error) {
      setIsLoading(false);
      // Consider implementing your own error handling logic here
      console.error(error);
    }
  }

  return (
    <div>
      <div className="container">
        <Header>
          <Logo src={logo} alt="listening"></Logo>
          {/* <TwitterTimelineEmbed
            sourceType="profile"
            screenName="_chenyuzhang"
            options={{ height: 400, width: 400 }}
          /> */}
          {/* <PortfolioImg src={portfolio1} alt="portfolio"></PortfolioImg>
          <PortfolioImg src={portfolio2} alt="portfolio"></PortfolioImg> */}
          <PortfolioImg src={portfolio3} alt="portfolio"></PortfolioImg>
          <TweetsContainer>
            <TwitterTweetEmbed
              tweetId={"1499076368818049025"}
              placeholder={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <CircularProgress />
                </div>
              }
              // options={{ width: "100%" }}
            />
            <TwitterTweetEmbed
              tweetId={"1602756721243435008"}
              placeholder={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <CircularProgress />
                </div>
              }
              // options={{ width: "200px" }}
            />
            <TwitterTweetEmbed
              tweetId={"1618672173685821441"}
              placeholder={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <CircularProgress />
                </div>
              }
              // options={{ width: "200px" }}
            />
            <TwitterTweetEmbed
              tweetId={"1590413388424704000"}

              // options={{ width: "200px" }}
            />
            <TwitterTweetEmbed
              tweetId={"1628092687093207041"}

              // options={{ width: "200px" }}
            />
            <TwitterTweetEmbed
              tweetId={"1417792765782499329"}

              // options={{ width: "200px" }}
            />
            <TwitterTweetEmbed
              tweetId={"1629244892026396672"}

              // options={{ width: "200px" }}
            />
            <TwitterTweetEmbed
              tweetId={"1629232898124529664"}

              // options={{ width: "200px" }}
            />
          </TweetsContainer>

          <h1 style={{ textAlign: "center", marginTop: "80px" }}>
            Companies Where Beta Fellows Are Coming From
          </h1>
          <PortfolioImg src={betaCompanies} alt="portfolio"></PortfolioImg>
        </Header>
      </div>
    </div>
  );
};

export default PortfolioManagement;
