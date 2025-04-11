require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dns = require("dns");
const mongoose = require('mongoose');
// Basic Configuration
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String
});

const Url = mongoose.model('Url', urlSchema);


app.post('/api/shorturl', (req, res, next) => {
  const inputUrl = req.body.url;
  const urlObj = new URL(inputUrl);
  let host = urlObj.host;
  const shortUrl = Math.floor(Math.random() * 99999).toString(); 

  dns.lookup(host, (err, address) => {
    if (err) {
      return res.json({error: "Invalid URL"});
    }

    const url = new Url({
      originalUrl: inputUrl,
      shortUrl: shortUrl
    });

    url.save((err, data) => {
      if (err) {
        return res.json({error: "Database err"});
      }

      res.json({
        originalUrl: inputUrl,
        shortUrl: shortUrl
      });
    });
  });
});

app.get("/api/shorturl/:shortUrl", (req, res) => {
  const shortUrl = req.params.shortUrl;

  Url.findOne({ shortUrl: shortUrl }, (err, data) => {
    if (err) {
      return res.json({error: "Database error"}); 
    }
    if (data) {
      res.redirect(data.originalUrl)
    } else {
      res.json({error: "No short URL found"});
    }
  });
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

exports.UrlModel = Url;