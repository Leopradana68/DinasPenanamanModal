import { Card, Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { MdDateRange } from "react-icons/md";
import { HiClipboardList } from "react-icons/hi";
import moment from "moment-with-locales-es6";
import { FaRegEye } from "react-icons/fa";

function DataArtikel() {
  const { id } = useParams();

  const [DetailArtikel, setDetailArtikel] = useState([]);
  const [DetailPopuler, setDetailPopuler] = useState([]);

  useEffect(() => {
    const axios = require("axios");

    axios
      .get(
        "http://adminmesuji.embuncode.com/api/article?instansi_id=10&per_page=4&sort_by=total_hit"
      )
      .then(function (response) {
        setDetailPopuler(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function handleLength(valeu, lengths) {
    if (valeu.length < lengths) {
      return valeu;
    } else {
      return valeu.substring(0, lengths);
    }
  }

  useEffect(() => {
    const axios = require("axios");

    // Make a request for a user with a given ID
    axios
      .get("http://adminmesuji.embuncode.com/api/article/" + id)
      .then(function (response) {
        // handle success
        console.log("ini artikel :>>", response);
        console.log(response.data.data.data);

        setDetailArtikel(response.data.data);
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
    
      <Row>
        
        <Col md={9}>
        <Container>
          <Card className="card-deco">
            <Card.Img variant="top" src={DetailArtikel.image_file_data} />
            <Card.Body>
              <Card.Title className="txt-deco">
                {DetailArtikel.title}
              </Card.Title>
              <p className="p-deco">
                <span>
                  {" "}
                  <MdDateRange size={22} />
                  {
                    (moment.locale("id-ID"),
                    moment(DetailArtikel.created_at).format("L"))
                  }
                </span>
                &ensp;
                <span>
                  {" "}
                  <HiClipboardList size={22} /> {DetailArtikel.news_category_id}{" "}
                </span>
                &ensp;
                <span>
                  {" "}
                  <FaRegEye size={22} /> {DetailArtikel.total_hit}x Dibaca{" "}
                </span>
              </p>
              <Card.Text
                dangerouslySetInnerHTML={{
                  __html: DetailArtikel.content,
                }}
              ></Card.Text>
            </Card.Body>
          </Card>
          </Container>
        </Col>
     

        <Col md={3}>
          <div className="populer-deco">
            <h3>
              <strong>Artikel</strong> Populer
            </h3>
            {console.log("console ini ku :" + DetailPopuler)}
            {DetailPopuler &&
              DetailPopuler.map((item, index) => {
                return (
                  <div className="box post-list">
                    <div className="content">
                      <div className="post">
                        <div className="left">
                          <img
                            className="style-img-popular"
                            src={item.image_file_data}
                            alt="/"
                          />
                        </div>
                        <p>
                            <span>
                              {" "}
                              <MdDateRange size={22} />
                              {
                                (moment.locale("id-ID"),
                                moment(item.created_at).format("L"))
                              }
                            </span>
                            &ensp;
                            <span>
                              {" "}
                              <HiClipboardList size={22} />{" "}
                              {item.news_category_id}{" "}
                            </span>
                            &ensp;
                            <span>
                              {" "}
                              <FaRegEye size={22} /> {item.total_hit}x Dibaca{" "}
                            </span>
                          </p>
                        <div className="right">
                          <a href={`/artikel/DetailArtikel/${item.id}`}>
                            <h5>{handleLength(item.title, 30)}</h5>
                          </a>
                          <p className="style-intro">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: handleLength(item.intro, 80),
                              }}
                            />
                          </p>
                     
                          <a
                            href={`/artikel/DetailArtikel/${item.id}`}
                            className="readmore"
                          >
                            <strong>Baca Selengkapnya</strong>
                          </a>
                          <hr></hr>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </Col>
      </Row>
  
  );
}

export default DataArtikel;
