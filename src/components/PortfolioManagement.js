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

const Button = styled.a`
  margin-top: 1rem;
  font-weight: 700;
  font-size: 1.125rem;
  border: solid 1px;
  cursor: pointer;
  padding: 0.25rem 0.75rem;
  width: fit-content;

  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  /* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  background-image: ${(props) =>
    props.disabled
      ? `linear-gradient(
      to right,
      lightgrey 0%,
      grey 51%,
      grey 100%
    )`
      : `linear-gradient(
    to right,
    #f6d365 0%,
    #fda085 51%,
    #f6d365 100%
  )`};

  :hover {
    background-position: right center;
    text-decoration: none;
  }
`;

const EmailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 7rem;
  padding-bottom: 8rem;
  /* justify-content: center; */
  text-align: left;
  align-items: center;
`;

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const PortfolioManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPortfolios, setShowPortfolios] = useState(false);
  const [wholeEmail, setWholeEmail] = useState("");
  const [summaryPrompt, setSummaryPrompt] = useState(
    `Fieldguide: raised 1 M dollars. \nChenyu Inc.: lauhcned the feature.`
  );
  async function onSubmit() {
    try {
      try {
        // it saved the previous convo between the AI and bot
        setIsLoading(true);
        let completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `Hi, I want to create a personalized reporting newslette for Beta Fellowship. Beta Fellowship offer funding, mentorship and networking opportunities for Chinese and American audiences. The goal of the newsletter is to advertise what Beta Fellowship is, and provide a weekly update for the venture capital on the portfolio startups. Below is the weekly update of the portfolio companies:
          ${summaryPrompt}
          Could you please suggest a body text for my newsletter with a separate paragraph for the weekly updates of the portfolio companies? Write in a friendly and welcoming tone.`,
          temperature: 0.7,
          max_tokens: 3000,
        });
        setWholeEmail(
          wholeEmail + "\n\n\n\n" + completion.data.choices[0].text
        );
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

  useEffect(() => {
    document.getElementsByTagName("title")[0].text = "Beta Fellowship";
  });

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
          <h1 style={{ margin: "50px 0" }}>
            <i>
              <b>Proof of Concept:</b>
            </i>
            <br></br> please use &nbsp;
            <span style={{ backgroundColor: "yellow" }}>Chrome</span> on your{" "}
            <span style={{ backgroundColor: "yellow" }}>laptop</span> browser
            for it to work
          </h1>
          <PortfolioImg src={portfolio3} alt="portfolio"></PortfolioImg>
          <Button
            onClick={() => {
              setShowPortfolios(!showPortfolios);
            }}
          >
            toggle the display of portfolios
          </Button>
          {showPortfolios && (
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
          )}

          <h1 style={{ textAlign: "center", marginTop: "80px" }}>
            Companies Where Beta Fellows Are Coming From
          </h1>
          <PortfolioImg src={betaCompanies} alt="portfolio"></PortfolioImg>

          <Button
            onClick={async () => {
              await onSubmit();
              setIsLoading(false);
            }}
            disabled={isLoading ? true : false}
          >
            generate weekly newsletter
          </Button>

          <div style={{ marginTop: "50px" }}>
            <TextField
              id="outlined-multiline-static"
              label="Portfolio Summary Prompt"
              multiline
              fullWidth
              rows={4}
              defaultValue="Default Value"
              value={summaryPrompt}
              onChange={(e) => {
                setSummaryPrompt(e.target.value);
              }}
            />
          </div>
          <div style={{ minHeight: "300px", marginBottom: "100px" }}>
            <div
              dangerouslySetInnerHTML={{
                __html: wholeEmail.replaceAll("\n", "<br />"),
              }}
            />

            {isLoading && <CircularProgress style={{ marginTop: "50px" }} />}
          </div>
        </Header>
      </div>
    </div>
  );
};

export default PortfolioManagement;
