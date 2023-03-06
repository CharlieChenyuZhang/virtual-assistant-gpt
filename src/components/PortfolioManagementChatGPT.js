import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InteractiveUI from "./InteractiveUI";
import logo from "../assets/betafellowship.png";
import portfolio1 from "../assets/portfolios/beta-p-1.png";
import portfolio2 from "../assets/portfolios/beta-p-2.png";
import portfolio3 from "../assets/portfolios/beta-p-3.png";
import betaCompanies from "../assets/portfolios/beta-companies.png";
// import betaPortfolios from "../assets/portfolios/beta-updated-portfolio.png";
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
import getRecentTweets from "../APIs/recent_search";
import { sort, pick, grabTwitterhandles } from "../helpers/libraries";

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

const Step = styled.span`
  margin-right: 15px;
`;

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const PortfolioManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPortfolios, setShowPortfolios] = useState(false);
  const [wholeEmail, setWholeEmail] = useState("");
  const [summaryPrompt, setSummaryPrompt] = useState(""); // FIXME: update the summaryPrompt once I fetch the data from twitter

  const callOpenAI = async (prompt) => {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    return completion;
  };

  async function generateEmail() {
    try {
      try {
        // it saved the previous convo between the AI and bot
        setIsLoading(true);
        const prompt = `Hi, I want to create a personalized reporting newslette for Beta Fellowship. Beta Fellowship offer funding, mentorship and networking opportunities for Chinese and American audiences. The goal of the newsletter is to advertise what Beta Fellowship is, and provide a weekly update for the venture capital on the portfolio startups. Below is the weekly update of the portfolio companies:
        ${summaryPrompt}
        Could you please suggest a body text for my newsletter with a separate paragraph for the weekly updates of the portfolio companies? Write in a friendly and welcoming tone.`;
        let completion = await callOpenAI(prompt);
        setWholeEmail(
          wholeEmail + "\n\n\n\n" + completion.data.choices[0].message.content
        );
        setIsLoading(false);
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

  // input: {Instacart: [], Rippling: []}
  // output: Instacart has tweeted ... Rippling has tweeted ...
  async function summarize(_input) {
    const input = {
      Instacart: [
        {
          public_metrics: {
            retweet_count: 5,
            reply_count: 10,
            like_count: 20,
            quote_count: 0,
            impression_count: 2531,
          },
          id: "1632429219459334144",
          text: "Sundays are for carting, cleaning, and csleeping in.",
          created_at: "2023-03-05T17:13:49.000Z",
          edit_history_tweet_ids: ["1632429219459334144"],
        },
        {
          referenced_tweets: [{ type: "quoted", id: "1631754117029957633" }],
          public_metrics: {
            retweet_count: 2,
            reply_count: 8,
            like_count: 12,
            quote_count: 0,
            impression_count: 3617,
          },
          id: "1631773549307240448",
          text: "👀 https://t.co/aUspuv0okQ",
          created_at: "2023-03-03T21:48:25.000Z",
          edit_history_tweet_ids: ["1631773549307240448"],
        },
        {
          public_metrics: {
            retweet_count: 1,
            reply_count: 5,
            like_count: 11,
            quote_count: 0,
            impression_count: 1790,
          },
          id: "1631745643717820436",
          text: "Happy National Cold Cuts Day to everyone except people that pronounce it bo-LOG-na.",
          created_at: "2023-03-03T19:57:32.000Z",
          edit_history_tweet_ids: ["1631745643717820436"],
        },
        {
          public_metrics: {
            retweet_count: 0,
            reply_count: 5,
            like_count: 12,
            quote_count: 0,
            impression_count: 3030,
          },
          id: "1631691995822293005",
          text: "I asked AI to write my Friday Tweets for me, and, well, see yah later 👋 https://t.co/ksNoFJLqAx",
          created_at: "2023-03-03T16:24:21.000Z",
          edit_history_tweet_ids: ["1631691995822293005"],
        },
        {
          public_metrics: {
            retweet_count: 1,
            reply_count: 2,
            like_count: 5,
            quote_count: 0,
            impression_count: 1667,
          },
          id: "1631374825129115648",
          text: "Happy National Banana Cream Pie Day! Not just the favorite pie of clowns!",
          created_at: "2023-03-02T19:24:02.000Z",
          edit_history_tweet_ids: ["1631374825129115648"],
        },
      ],
      Rippling: [
        {
          public_metrics: {
            retweet_count: 1,
            reply_count: 0,
            like_count: 6,
            quote_count: 0,
            impression_count: 481,
          },
          text: "✅ So you want to hire globally…\n✅ And you want to stay compliant…\n🤔 But you’re not sure where to start?\n\nWe have the checklists you need for hiring, paying, and classifying workers—and everything in between. https://t.co/yN65pww1ad",
          id: "1631753847122145280",
          created_at: "2023-03-03T20:30:08.000Z",
          edit_history_tweet_ids: ["1631753847122145280"],
        },
        {
          public_metrics: {
            retweet_count: 0,
            reply_count: 0,
            like_count: 6,
            quote_count: 0,
            impression_count: 384,
          },
          text: "The freelance revolution is already underway. Are you on board? 🚂\n\nHiring freelancers is a great way to scale flexibly and reduce headcount costs—but getting it wrong can have major legal risks.\n\nLearn the ropes at our free webinar: https://t.co/CUZSsYCyf5 https://t.co/sIPPoaLCDG",
          id: "1631376099337728002",
          created_at: "2023-03-02T19:29:06.000Z",
          edit_history_tweet_ids: ["1631376099337728002"],
        },
        {
          public_metrics: {
            retweet_count: 1,
            reply_count: 0,
            like_count: 11,
            quote_count: 0,
            impression_count: 594,
          },
          text: "💬 Comprehensive has entered the chat.\n\nGood news: Rippling now integrates with @ComprehensiveIO 🎉 Seamlessly run compensation reviews in Comprehensive by automatically syncing real-time employee data from Rippling. \nhttps://t.co/dU43c2v3xF",
          id: "1631002030327070720",
          created_at: "2023-03-01T18:42:41.000Z",
          edit_history_tweet_ids: ["1631002030327070720"],
        },
      ],
    };

    let onelineSummary = "";

    const composeParagraph = (companyName) => {
      let oneliner = input[companyName].reduce((prev, curr) => {
        return prev + " " + curr.text;
      }, "");
      console.log(
        "composeParagraph",
        `${companyName} has tweeted the followings. ${oneliner}`
      );
      return `${companyName} has tweeted the followings. ${oneliner}`;
    };

    setIsLoading(true);
    for (const companyName in input) {
      try {
        try {
          // it saved the previous convo between the AI and bot
          const prompt = `We introduce Extreme TLDR generation, a new form of extreme summarization for paragraphs. TLDR generation involves high source compression, removes stop words and summarizes the paragraph whilst retaining meaning. The result is the shortest possible summary that retains all of the original meaning and context of the paragraph. 
          Example
  
          Paragraph: ${composeParagraph(companyName)}
          
          INSERT TEXT TO SUMMARIZE HERE
          
          Extreme TLDR:`;
          const res = await callOpenAI(prompt);
          onelineSummary += res.data.choices[0].message.content + "\n\n";
        } catch (error) {
          // Consider adjusting the error handling logic for your use case
          if (error.response) {
            console.error(error.response.status, error.response.data);
          } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
          }
        }
      } catch (error) {
        // Consider implementing your own error handling logic here
        console.error(error);
      }
    }

    setIsLoading(false);
    return onelineSummary;
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

          {/* <div>
            <Button
              onClick={() => {
                setShowPortfolios(!showPortfolios);
              }}
            >
              toggle the display of portfolios
            </Button>
          </div> */}
          {/* <PortfolioImg src={portfolio3} alt="portfolio"></PortfolioImg> */}
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

          {/* <h1 style={{ textAlign: "center", marginTop: "80px" }}>
            Companies Where Beta Fellows Are Coming From
          </h1>
          <PortfolioImg src={betaCompanies} alt="portfolio"></PortfolioImg> */}
          {/* <PortfolioImg src={betaPortfolios} alt="portfolio"></PortfolioImg> */}
          <div style={{ marginTop: "50px" }}>
            <Step>Step 1: choose portfolios</Step>
          </div>
          <div style={{ margin: "50px 0" }}>
            <TextField
              id="outlined-multiline-static"
              label="Portfolios Twitter Handles"
              disabled
              multiline
              fullWidth
              rows={2}
              defaultValue="Default Value"
              value={grabTwitterhandles()}
              // onChange={(e) => {
              //   setSummaryPrompt(e.target.value);
              // }}
            />
          </div>

          <Step>Step 2:</Step>
          <Button
            disabled={isLoading ? true : false}
            onClick={() => {
              getRecentTweets()
                .then(async (res) => {
                  const NUMBER_OF_PICKS = 5;
                  const summary = await summarize(
                    pick(sort(res), NUMBER_OF_PICKS)
                  );
                  setSummaryPrompt(summary);
                })
                .catch((err) => {
                  // FIXME: display error message and log it
                });
            }}
          >
            generate summaries
          </Button>

          <div style={{ margin: "50px 0" }}>
            <TextField
              id="outlined-multiline-static"
              label="AI Generated Portfoils Update"
              multiline
              fullWidth
              rows={8}
              defaultValue="Default Value"
              value={summaryPrompt}
              onChange={(e) => {
                setSummaryPrompt(e.target.value);
              }}
            />
          </div>

          <Step>Step 3:</Step>
          <Button
            onClick={async () => {
              await generateEmail();
            }}
            disabled={isLoading || !summaryPrompt ? true : false}
          >
            generate a newsletter
          </Button>

          <div
            style={{
              minHeight: "300px",
              marginBottom: "100px",
              marginTop: "50px",
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: wholeEmail.trim().replaceAll("\n", "<br />"),
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
