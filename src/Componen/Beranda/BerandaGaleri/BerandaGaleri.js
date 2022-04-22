import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment-with-locales-es6";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Container, Carousel } from "react-bootstrap";

const BerandaGaleri = () => {
  const [DataDokumen, setDataDokumen] = useState();
  const [DataResponse, setDataResponses] = useState();
  const [DataResponseVideo, setDataResponsesVideo] = useState();

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

  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/video-gallery?instansi_id=10")
      .then(function (response) {
        console.log("console ini galery2: " + response.data.data.data);
        setDataResponsesVideo(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "http://adminmesuji.embuncode.com/api/dokumen?instansi_id=10&per_page=4"
      )
      .then(function (dokumen) {
        console.log("console dokumen: " + dokumen.data.data.data);
        setDataDokumen(dokumen.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <div className="style-Berandagaleri">
        {" "}
        <Row>
          <Col md={9}>
            <div className="style-btn hot-news">
              <h3>
                {" "}
                <strong>Gallery</strong> Foto{" "}
              </h3>
            </div>

            <Carousel fade className="style-caraousel">
              {DataResponse != null ? (
                DataResponse &&
                DataResponse.map((item, idx) => {
                  return item.image_gallery_item.map((itm, idx) => {
                    return (
                      <Carousel.Item key={idx}>
                        <img
                          className="size-image-dalam"
                          src={itm.image_file_data}
                          width="100"
                          height="100"
                        />

                        <Carousel.Caption>
                          <h3>{itm.description}</h3>
                          <Link to={"/Foto"}>
                            <p className="tag-p">
                              {" "}
                              <strong>Gambar Lainnya</strong>{" "}
                            </p>
                          </Link>
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
          </Col>

          <Col>
            <div className="style-btn hot-news">
              <h3>
                {" "}
                <strong>Dokumen </strong> Terbaru{" "}
              </h3>
            </div>
            <div className="dokumen-bg">
              {DataDokumen != null ? (
                DataDokumen &&
                DataDokumen.map((item, index) => {
                  return item.dokumen_item.map((itm, idx) => {
                    return (
                      <>
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
                                    Created on:{" "}
                                  </span>

                                  {moment(itm.created_at).format("L")}
                                  {/* {itm.created_at} | */}
                                  <span className="text_blue">
                                    {" "}
                                    Created by:{" "}
                                  </span>
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
                      </>
                    );
                  });
                })
              ) : (
                <Box sx={{ width: "100%" }}>
                  <LinearProgress />
                </Box>
              )}
            </div>
            <div>
              <Link to={"/Beranda/dokumen"}>
                <p className="tag-p">
                  {" "}
                  <strong>Dokumen Lainnya </strong>
                </p>
              </Link>
            </div>
          </Col>
        </Row>
        <div className="style-btn hot-news">
          <h3>
            {" "}
            <strong>Gallery </strong> Video
          </h3>
        </div>
        <div className="untuk-vidio" id="vidio">
          <Row xs={1} md={3} className="g-4 coba">
            {console.log("DataVideo :>> ", DataResponseVideo)}
            {DataResponseVideo &&
              DataResponseVideo.map((item, index) => {
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
          <div>
            <Link to={"/video"}>
     
              <p className="tag-p">
                {" "}
                <strong>Video Lainnya </strong>
              </p>
             
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BerandaGaleri;
