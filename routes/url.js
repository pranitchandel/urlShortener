const express = require("express");
const validUrl = require("valid-url");
const router = express.Router();
const shortid = require("shortid");
const Url = require("../models/URLSchema");

const baseUrl = "http:localhost:5000";

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  console.log(longUrl);
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base ");
  }

  const urlCode = shortid.generate();

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({
        longUrl,
      });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        await url.save();
        res.json(JSON.stringify(url));
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(401).json("invalid longUrl");
  }
});

router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({
      urlCode: req.params.code,
    });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;
