import React, { Fragment } from "react";
import { Carousel, Container } from "react-bootstrap";
import "./Carousels.css";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const Carousels = () => {
  const [DataResponse, setDataResponses] = useState();
  const axios = require("axios");

  useEffect(() => {
    axios
      .get(
        "http://adminmesuji.embuncode.com/api/image-gallery?instansi_id=10&per_page=1"
      )
      .then(function (response) {
        console.log("console ini galery1: " + response.data.data.data);
        setDataResponses(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <Carousel fade className="style-galery">
        {DataResponse != null ? (
          DataResponse &&
          DataResponse.map((item, idx) => {
            return item.image_gallery_item.map((itm, idx) => {
              return (
                <Carousel.Item key={idx}>
                   <iframe
                        id="player"
                        type="text/html"
                        src={`https://www.youtube.com/embed/${item.video_url}?`}
                        className="player-wrapper"
                        style={{ width: "100%", height: "100%" }}
                        frameBorder="0"
                      ></iframe>

                  <Carousel.Caption>
                    <h3>{itm.description}</h3>
                  
                  </Carousel.Caption>
                </Carousel.Item>
              );
            });
          })
        ) : (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
      </Carousel>
    </Container>
  );
};

export default Carousels;
