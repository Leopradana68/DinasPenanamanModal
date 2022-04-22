import React, { useRef, useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Marquee from "react-fast-marquee";

const HeaderAtas = () => {
  let url = window.location.href;
  var lastPart = url.split("/").pop();
  console.log("url", lastPart);
  const logoRef = useRef();
  useEffect(() => {
    if (
      lastPart == "foto" ||
      lastPart == "vidio" ||
      lastPart == "pdf" ||
      lastPart == "ProfileDisdik"
    ) {
      console.log("logoRef", logoRef);
      logoRef.current.hidden = true;
    }
  }, []);

  const [DataPimpinan, setDataPimpinan] = useState([]);
  const axios = require("axios");
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/instansi/detail/10")
      .then(function (pimpinan) {
        setDataPimpinan(pimpinan.data.data);
        console.log("console kepala gambar: " + pimpinan.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Row>
      <Col ref={logoRef} className="logo">
        <Row>
          <Col className="style-marque">
            <Marquee>
              --Selamat Datang Di {DataPimpinan.nama_instansi}--
            </Marquee>
          </Col>
        </Row>
        <hr></hr>
        <Container>
          <div>
            <div className="footer-widget">
              <div className="footer-logo">
                <a href="/" className="a-su">
                  <img
                    src={DataPimpinan.logo_instansi}
                    className="img-fluid"
                    alt="logo"
                  />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Col>
    </Row>
  );
};

export default HeaderAtas;
