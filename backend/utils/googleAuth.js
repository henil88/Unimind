const { google } = require("googleapis");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const oAuth2 = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  /* this is redirect url we write postmessage  */
  `${process.env.FRONTEND_URL}+/api/auth/loginOauth2`
);

async function googleLink(req, res) {
  /* this is use for ganrate redirect link*/
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  const url = oAuth2.generateAuthUrl({
    access_type: "offline",
    prompt: "consent select_account",
    scope: scopes,
  });
  res.redirect(url);
}
module.exports = { oAuth2, googleLink };
