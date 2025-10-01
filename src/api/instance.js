const axios = require("axios").default;
import config from "../utils/config";

const instance = axios.create({
  baseURL: config.apiHost ?? "https://dhub.yaludev.com",
  timeout: 120000,
  // headers: { "X-Custom-Header": "foobar" },
});

module.exports = instance;
