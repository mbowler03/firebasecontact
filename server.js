require("dotenv").config();
const express = require("express");
const app = express();
const port = 3001;
const { google } = require("googleapis");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/test", (req, res) => {
  console.log("body", req.body);
  const { jwt, accessToken, to, subject, message, from } = req.body;
  const auth = new google.auth.OAuth2();
  auth.generateAuthUrl({
    access_type: "offline",
  });
  console.log("access_type: ", auth);
  auth.setCredentials({
    access_token: accessToken,
    // refresh_token: refresh_token,
  });

  const gmail = google.gmail({ version: "v1", auth });
  const str = `To: ${to}
Subject: ${'test'}
Message: ${'message'}`;
  // console.log("str", str);
  const raw = new Buffer.from(str.replace("\n", "\r\n"))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  gmail.users.messages.send(
    {
      userId: from,
      resource: {
        raw,
      },
    },
    (err, result) => {
      if (err) {
        console.log("err", err);
      }
      console.log("result", result);
      res.send(JSON.stringify(result));
    }
  );
});

app.listen(port, () => console.log(`Server running on port ${port}`));