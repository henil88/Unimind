const { google } = require("googleapis");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

/* this is use for ganrate redirect link*/
const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

const oAuth2 = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  /* this is redirect url we write postmessage  */
  "http://localhost:3000/api/auth/loginOauth2"
);

const url = oAuth2.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: scopes,
});

console.log("Login with Google here:", url);

module.exports = oAuth2;
