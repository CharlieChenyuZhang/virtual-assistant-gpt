import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "./trusli-icon.png";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CircularProgress from "@mui/material/CircularProgress";
import { Configuration, OpenAIApi } from "openai";

const WaitListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 7rem;
  padding-bottom: 8rem;
  text-align: left;
  align-items: center;
`;

const Header = styled.div`
  margin-top: 3rem;
`;

const Logo = styled.img`
  width: 6rem;
  height: 4rem;
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
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;

  background-image: linear-gradient(
    to right,
    #f6d365 0%,
    #fda085 51%,
    #f6d365 100%
  );

  :hover {
    background-position: right center;
    text-decoration: none;
  }
`;

const Category = styled.div`
  margin-top: 15px;
`;

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const EmailCompose = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [supplierName, setSupplierName] = useState("");

  const [wholeEmail, setWholeEmail] = useState("");

  const template = `
      Hi ${supplierName ? supplierName : "[supplier_first_name]"}, <br />
      <br />
      Thanks for sending us quote. We reviewed and have a few suggestions.
      <ol>
        <li>
          We have researched comparable suppliers and offerings. We are
          wondering whether we can get a 40% discount?
        </li>
        <li>
          If we buy more than 10 licenses, can we get a further volume discount?
        </li>
        <li>Would you be open to waive the support and maintenance fee? </li>
        <li>Can we have a payment term of 90 days? </li>
        <li>Can you also delete the auto renewal provision? </li>
        <li>
          We would like to be able to cancel this purchase when we want to. Can
          we include this as part of the terms?
        </li>
      </ol>
      Here at Trusli, we consider our suppliers as strategic partners. We are
      trying our best to find a win-win for us. We appreciate your flexibility
      and hope this will become a long term, beneficial account for you.
      <br />
      <br />
      Best,
      <br />
      <br />
      ${senderName ? senderName : "[sender_first_name]"}`;

  async function onSubmit() {
    try {
      try {
        // it saved the previous convo between the AI and bot
        setIsLoading(true);
        let completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `Help me polish the following email. Please use a polite and professional tone throughout the email to argue for a better deal.  Keep the number the same. Follow the email structure with HTML code to showcase line break. ${template}`,
          temperature: 0.7,
          max_tokens: 2000,
        });
        setWholeEmail(completion.data.choices[0].text);
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
    document.getElementsByTagName("title")[0].text = "Trusli - Email Composer";
  });

  return (
    <div>
      <div className="container">
        <Header>
          <Logo src={logo} alt="listening"></Logo>
        </Header>

        <WaitListContainer>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="sender's first name"
              variant="standard"
              onChange={(e) => {
                setSenderName(e.target.value);
              }}
            />
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "flex-end", marginTop: "15px" }}
          >
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="supplier's first name"
              variant="standard"
              onChange={(e) => {
                setSupplierName(e.target.value);
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Category>Category: Software</Category>
          </Box>
          <Button
            onClick={async () => {
              await onSubmit();
              setIsLoading(false);
            }}
          >
            generate new
          </Button>
          <h4 style={{ marginTop: "40px" }}>Original Tempalte:</h4>
          <div dangerouslySetInnerHTML={{ __html: template }} />

          <h4 style={{ marginTop: "40px" }}>ChatGPT Polished Email:</h4>
          {!isLoading ? (
            <div dangerouslySetInnerHTML={{ __html: wholeEmail }} />
          ) : (
            <CircularProgress style={{ marginTop: "50px" }} />
          )}
        </WaitListContainer>
      </div>
    </div>
  );
};

export default EmailCompose;
