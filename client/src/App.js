import React, { Component } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

import "./App.css";

class App extends Component {
  state = {
    nom: "",
    prix: 0,
    description: "",
  };

  handleChange = ({ target: { value, name } }) => {
    console.log(value);
    this.setState({ [name]: value });
  };

  createAndDownloadPdf = () => {
    axios
      .post("/create-pdf", this.state)
      .then(() => axios.get("fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "newPdf.pdf");
      });
  };

  render() {
    return (
      <form class="form">
        <h2>ADD a Product</h2>
        <h6 className="label"> enter the Product name </h6>
        <input type="text" name="nom" onChange={this.handleChange} />
        <h6 className="label"> enter the Product price </h6>
        <input type="number" name="prix" onChange={this.handleChange} />
        <h6 className="label"> add a description </h6>
        <input type="text" name="description" onChange={this.handleChange} />
        <div>
          <span class="fa fa-phone" />
          001 1023 567
          <span class="fa fa-envelope-o" /> Turnburn@gmail.com
        </div>
        <button onClick={this.createAndDownloadPdf}>Download PDF</button>
      </form>
    );
  }
}

export default App;
