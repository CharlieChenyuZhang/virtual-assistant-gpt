import axios from "axios";

// Search for Tweets within the past seven days
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'

const endpointUrl = ""; // FIXME: comment me back
// const endpointUrl = "";

const instance = axios.create({
  baseURL: endpointUrl,
  timeout: 1000,
});

// TODO: note the logic has been moved to repo https://github.com/CharlieChenyuZhang/chatgpt-backend
export default async function getRecentTweets(portfolios) {
  // Edit query parameters below
  // specify a search query, and any additional fields that are required
  // by default, only the Tweet ID and text fields are returned

  // TODO: loop through twitterHandles and create a new data structure to store the result
  // {twitterHand1: [], twitterHand2: []}

  try {
    const res = await instance.get(`/twitter?portfolios=${portfolios}`);
    const res2 = await instance.get(`/`);
    console.log("res1", res);
    console.log("res2", res2);
    if (res?.status === 200) {
      return res.data;
    } else {
      throw new Error("Twitter returns a non 200 code", res);
    }
  } catch (error) {
    // TODO: add logging here
    return { error: "something went wrong with Twitter APIs" };
  }
}
