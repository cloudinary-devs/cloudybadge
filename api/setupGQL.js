require("dotenv").config();
// Define constant
// Endpoint URL
const url = "https://graphql.fauna.com/graphql";
// Your personal access token
const token = process.env.FAUNADB;
const axios = require("axios");

// The Authorization in the header of the request
const headers = { Authorization: `bearer ${token}` };

const post = async (query) => await axios.post(url, { query }, { headers });

module.exports = {
  headers,
  url,
  post,
};
