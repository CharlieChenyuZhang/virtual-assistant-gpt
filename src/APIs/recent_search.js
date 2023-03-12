import axios from "axios";

// Search for Tweets within the past seven days
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.REACT_APP_NEXT_PUBLIC_BEARER_TOKEN;
const endpointUrl = "/2/tweets/search/recent";
const params = {
  "tweet.fields": "created_at,id,public_metrics,referenced_tweets,text",
  max_results: 100,
};

const instance = axios.create({
  baseURL: endpointUrl,
  timeout: 1000,
  headers: {
    "User-Agent": "v2RecentSearchJS",
    authorization: `Bearer ${token}`,
  },
  params,
});

export default async function getRecentTweets(portfolios) {
  // Edit query parameters below
  // specify a search query, and any additional fields that are required
  // by default, only the Tweet ID and text fields are returned

  // TODO: loop through twitterHandles and create a new data structure to store the result
  // {twitterHand1: [], twitterHand2: []}

  let result = {};

  for (const portfolio of portfolios) {
    try {
      instance.defaults.params.query = `from:${portfolio} -is:retweet -is:reply`;
      const res = await instance.get("/");
      if (res?.status === 200) {
        console.log("res.data", res.data);
        result[portfolio] = res?.data?.data;
      } else {
        throw new Error("Twitter returns a non 200 code", res);
      }
    } catch (error) {
      // TODO: add logging here
      return { error: "something went wrong with Twitter APIs" };
    }
  }

  return result;
}
