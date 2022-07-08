const mongoose = require("mongoose");
const axios = require("axios");

exports.InstaLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await axios.post(
      "https://www.instagram.com/accounts/login/ajax/",
      new URLSearchParams({
        username: username,
        enc_password: "#PWD_INSTAGRAM_BROWSER:0:&:" + password,
      }),
      {
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          origin: "https://www.instagram.com",
          referer: "https://www.instagram.com/",
          "sec-ch-ua":
            '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "user-agent":
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.62 Safari/537.36",
          "x-asbd-id": "198387",
        },
      }
    );
    var mess;
    const cookies = response.cookies;
    const data = response.text;
    if (data.userId) {
      mess = {
        message: "Login  Sucessfull",
        login: `${cookies.sessionid}:${cookies.csrftoken}:${cookies.ds_user_id}:${username.user}`,
      };
    } else if (data.checkpoint_required) {
      mess = {
        message: "Login  CheckPoint",
      };
    } else {
      mess = {
        message: "Error Password Or User",
      };
    }
    return res.status(200).send(mess);
  } catch (err) {
    return res.status(500).send(err);
  }
};


exports.InstaFollow = async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await axios.post(
      "https://www.instagram.com/accounts/login/ajax/",
      new URLSearchParams({
        username: username,
        enc_password: "#PWD_INSTAGRAM_BROWSER:0:&:" + password,
      }),
      {
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          origin: "https://www.instagram.com",
          referer: "https://www.instagram.com/",
          "sec-ch-ua":
            '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "user-agent":
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.62 Safari/537.36",
          "x-asbd-id": "198387",
        },
      }
    );
    var mess;
    const cookies = response.cookies;
    const data = response.text;
    if (data.userId) {
      mess = {
        message: "Login  Sucessfull",
        login: `${cookies.sessionid}:${cookies.csrftoken}:${cookies.ds_user_id}:${username.user}`,
      };
    } else if (data.checkpoint_required) {
      mess = {
        message: "Login  CheckPoint",
      };
    } else {
      mess = {
        message: "Error Password Or User",
      };
    }
    return res.status(200).send(mess);
  } catch (err) {
    return res.status(500).send(err);
  }
};


exports.InstaCheck = async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await axios.post(
      "https://www.instagram.com/accounts/login/ajax/",
      new URLSearchParams({
        username: username,
        enc_password: "#PWD_INSTAGRAM_BROWSER:0:&:" + password,
      }),
      {
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          origin: "https://www.instagram.com",
          referer: "https://www.instagram.com/",
          "sec-ch-ua":
            '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "user-agent":
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.62 Safari/537.36",
          "x-asbd-id": "198387",
        },
      }
    );
    var mess;
    const cookies = response.cookies;
    const data = response.text;
    if (data.userId) {
      mess = {
        message: "Login  Sucessfull",
        login: `${cookies.sessionid}:${cookies.csrftoken}:${cookies.ds_user_id}:${username.user}`,
      };
    } else if (data.checkpoint_required) {
      mess = {
        message: "Login  CheckPoint",
      };
    } else {
      mess = {
        message: "Error Password Or User",
      };
    }
    return res.status(200).send(mess);
  } catch (err) {
    return res.status(500).send(err);
  }
};