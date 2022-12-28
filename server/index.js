const express = require("express");
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const cors = require("cors");
const Product = require("../server/model/product");

const pdfTemplate = require("./documents");

const app = express();
const mongoose = require("mongoose");
// nconectou server m3e database
mongoose.connect(
  "mongodb://localhost:27017/product",
  { useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//post request
app.post("/create-pdf", async (req, res) => {
  const { nom, prix, description } = req.body;
  console.log("here");
  console.log(req.body);
  const savedprod = await new Product({ nom, prix, description }).save();
  console.log(savedProd);
  //nasn3ou template pdf from the userdata w n7otouha f result.pdf
  pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf");
  // nb3thou pdf as a response
  return res.sendFile(`${__dirname}/result.pdf`);
});

app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
  console.log("aaaaa");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
