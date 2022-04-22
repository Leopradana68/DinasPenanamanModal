import React from "react";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Col, Container, Row } from "react-bootstrap";
import moment from "moment-with-locales-es6";
import { MdDateRange } from "react-icons/md";
import { HiClipboardList } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";

function ArtikelBeranda() {
  const [DataArtikel, setDataaArtikel] = useState([]);
  const [DataPopuler, setDataPopuler] = useState();

  // Artikel Terbaru Api
  useEffect(() => {
    const axios = require("axios");

    // Make a request for a user with a given ID
    axios
      .get(
        "http://adminmesuji.embuncode.com/api/article?instansi_id=10&per_page=3&sort_type=desc&sort_by=created_at"
      )
      .then(function (Terbaru) {
        // handle success
        // console.log("response :>>", response);
        // console.log(response.data.data.data);

        setDataaArtikel(Terbaru.data.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  // Artikel Populer Api
  useEffect(() => {
    const axios = require("axios");

    // Make a request for a user with a given ID
    axios
      .get(
        "http://adminmesuji.embuncode.com/api/article?instansi_id=10&per_page=4&sort_type=desc&sort_by=total_hit"
      )
      .then(function (Populer) {
        // handle success
        // console.log("response :>>", response);
        // console.log(response.data.data.data);

        setDataPopuler(Populer.data.data.data);
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
    <Container>
      <Row>
        {/* ====== Menampilkan artikel terbaru diberanda====== */}
        <Col md={8}>
          <div className="style-btn hot-news">
            <h3> <strong>Artikel  </strong>Terbaru</h3>
          </div>
          <div>
            {DataArtikel &&
              DataArtikel.map((item, index) => {
                return (
                  <>
                    <Card>
                      <Card.Img
                        variant="top"
                        src={item.image_file_data}
                        className="ukuran-img image-card-type"
                      />
                      <Card.Body>
                        <Card.Title className="title-nya">
                          <a href={`/Beranda/DetailArtikel/${item.id}`}>
                            {item.title}
                          </a>
                        </Card.Title>
                        <p>
                          <span>
                            {" "}
                            <MdDateRange size={20} />
                            {
                              (moment.locale("id-ID"),
                              moment(item.created_at).format("L"))
                            }{" "}
                          </span>
                          |
                          <span>
                            {" "}
                            <HiClipboardList size={20} />{" "}
                            {item.news_category_id}{" "}
                          </span>
                          |
                          <span>
                            {" "}
                            <FaRegEye size={20} /> {item.total_hit}x dibaca{" "}
                          </span>
                        </p>
                        <Card.Text>{item.intro}</Card.Text>
                        <p className="read-more-nya">
                          <a href={`/Beranda/DetailArtikel/${item.id}`}>
                            <strong>Baca Selengkapnya</strong>
                          </a>
                        </p>
                      </Card.Body>
                    </Card>

                    <br />
                  </>
                );
              })}
          </div>
        </Col>
        {/* ====== Menampilkan artikel populer diberanda====== */}
        <Col md={4}>
          <div className="style-btn hot-news">
            <h3> <strong>Artikel  </strong>Populer</h3>
          </div>
          <div className="main-pop">
            {DataPopuler &&
              DataPopuler.map((item, index) => {
                return (
                  <div class="cards-type">
                    <div class="card__image">
                      <img
                        src={item.image_file_data}
                        alt=""
                        className="image-card-type"
                      />
                    </div>
                    <div class="card__info">
                      <Link to={`/Beranda/DetailArtikel/${item.id}`}>
                        <h5>{item.title}</h5>
                      </Link>

                      <p>
                        <span>
                          {" "}
                          <MdDateRange size={20} />
                          {
                            (moment.locale("id-ID"),
                            moment(item.created_at).format("L"))
                          }{" "}
                        </span>
                        |
                        <span>
                          {" "}
                          <HiClipboardList size={20} /> {item.news_category_id}{" "}
                        </span>
                        |
                        <span>
                          {" "}
                          <FaRegEye size={20} /> {item.total_hit}x dibaca{" "}
                        </span>
                      </p>
                      <p className="read-more-nya">
                        <a href={`/Beranda/DetailArtikel/${item.id}`}>
                         <strong> Baca Selengkapnya </strong>
                        </a>
                      </p>
                      <hr />
                    </div>
                  </div>
                );
              })}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ArtikelBeranda;
