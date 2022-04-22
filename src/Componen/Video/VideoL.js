import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Container } from "react-bootstrap";

function VideoL() {
  const [DataVideo, setDataVideo] = useState([]);

  useEffect(() => {
    const axios = require("axios");

    // Make a request for a user with a given ID
    axios
      .get("http://adminmesuji.embuncode.com/api/video-gallery?instansi_id=10")
      .then(function (response) {
        // handle success
        console.log("ini video :>>", response);
        console.log(response.data.data.data);

        setDataVideo(response.data.data.data);
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
        <h3>Gallery video</h3>
        <p>
          {" "}
          <strong> Video Dinas Penanaman Modal</strong>{" "}
        </p>
      </Container>

      <div className="untuk-vidio" id="vidio">
        <Row xs={1} md={3} className="g-4 coba">
          {console.log("DataVideo :>> ", DataVideo)}
          {DataVideo &&
            DataVideo.map((item, index) => {
              return item.image_gallery_item.map((item, idx) => {
                return (
                  <Col
                    md={6}
                    sm={12}
                    xs={12}
                    lg={4}
                    key={idx}
                    className="style-vid"
                  >
                    <div className="tile-videos">
                      <iframe
                        id="player"
                        type="text/html"
                        src={`https://www.youtube.com/embed/${item.video_url}?`}
                        className="player-wrapper"
                        style={{ width: "100%", height: "100%" }}
                        frameBorder="0"
                      ></iframe>
                      <div className="text-videos">
                        <p className="animate-text-videos">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Col>
                );
              });
            })}
        </Row>
      </div>
    </Fragment>
  );
}
export default VideoL;
