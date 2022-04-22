import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Fragment } from "react";
import moment from "moment-with-locales-es6";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";

function Dokumen() {
  const [DataDokumen, setDataDokumen] = useState([]);

  useEffect(() => {
    const axios = require("axios");

    // Make a request for a user with a given ID
    axios
      .get("http://adminmesuji.embuncode.com/api/dokumen?instansi_id=10")
      .then(function (response) {
        // handle success
        console.log("ini dokumen :>>", response);
        console.log(response.data.data.data);

        setDataDokumen(response.data.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  return (
    <Fragment>
      <br></br>
      <Container>
        <h3>Dokumen</h3>
        <p>
          {" "}
          <strong> Dokumen Dinas Penanaman Modal</strong>{" "}
        </p>
      </Container>

      {console.log("DataDokumen :>> ", DataDokumen)}
      {DataDokumen &&
        DataDokumen.map((item, index) => {
          return item.dokumen_item.map((itm, idex) => {
            return (
              <Container>
                <div className="row offerList">
                  <div className="col-md-12">
                    <div className="media p-2">
                      <div className="media-body">
                        <h5 className="mt-0">
                          <a
                            href={
                              "/pdf/" +
                              item.slug +
                              "/" +
                              itm.dokumen_file_name.replace(/\s/g, "")
                            }
                          >
                            {itm.dokumen_file_name}
                          </a>
                        </h5>
                        <p className="text_grey mb-0 ">
                          <span className="text_blue">
                            Created on: {moment(itm.created_at).format("L")}
                          </span>

                          <span className="text_blue"> Created by: </span>
                          {itm.created_by}
                        </p>
                        <span className="badge badge-pill badge-primary">
                          {" "}
                          Update By: {itm.updated_by}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            );
          });
        })}
    </Fragment>
  );
}
export default Dokumen;
