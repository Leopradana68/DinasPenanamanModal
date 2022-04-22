import {
  Row,
  Col,
  Container,
  ListGroup,
  Badge,
  Pagination,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import Card from "react-bootstrap/Card";
import {
  useEffect,
  useState,
  useCallback,
  Fragment,
  useLayoutEffect,
} from "react";
import { Link } from "react-router-dom";
import { MdDateRange } from "react-icons/md";
import { HiClipboardList } from "react-icons/hi";
import { FaRegEye } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { useLocation } from 'react-router-dom';
import moment from "moment";
import "moment/locale/id";
// import { useParams } from 'react-router-dom';
function Artikelku() {
  // const { slug } = useParams();
  const [DataResponse, setDataResponses] = useState(0);

  const [IPages, setIPages] = useState([]);
  let iPages = [];
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [Categories, setDataCategories] = useState([]);
  const [PostPopular, setPostPopular] = useState([]);
  const [ArticleCategories, setArticleCategories] = useState();
  const [IsAda, setIsAda] = useState(0);
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/article/categories/10")
      .then(function (response) {
        setDataCategories(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "http://adminmesuji.embuncode.com/api/article?instansi_id=10&per_page=5&sort_type=desc&sort_by=total_hit"
      )
      .then(function (response) {
        setPostPopular(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function handleLength(value, lengths) {
    if (value.length < lengths) {
      return value;
    } else {
      return (
        value
          .substring(0, lengths)
          .substring(0, value.substring(0, lengths).lastIndexOf(" ")) + "..."
      );
    }
  }

  useEffect(() => {
    gettingData(1);
  }, []);
  // let tooglePaginate = true;
  function gettingData(page, slug, title) {
    let urlTitle = "";
    if (title != null) {
      urlTitle = "&title=" + title;
    } else {
      urlTitle = "";
    }
    setDataResponses(null);
    let url = "";
    if (slug == null) {
      url =
        "http://adminmesuji.embuncode.com/api/article?instansi_id=10" +
        urlTitle +
        "&per_page=4&page=" +
        page;
    } else {
      url =
        "http://adminmesuji.embuncode.com/api/article?instansi_id=10" +
        urlTitle +
        "&per_page=4&slug=" +
        slug +
        "&page=" +
        page;
    }
    axios
      .get(url)
      .then(function (response) {
        setDataResponses(response.data.data.data);

        iPages = [];
        // if (tooglePaginate) {
        for (let number = 1; number <= response.data.data.last_page; number++) {
          iPages.push(
            <Pagination.Item
              onClick={() => {
                slug == null ? gettingData(number) : gettingData(number, slug);
              }}
              key={number}
              active={number === response.data.data.current_page}
            >
              {number}
            </Pagination.Item>
          );
          setIPages(iPages);
          // tooglePaginate = false;
        }
        // }
        forceUpdate();

        setIsAda(response.data.data.total);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function handleArticleChange(artikelSlug) {
    // console.log('artikelSlug', artikelSlug);

    gettingData(1, artikelSlug);

    setArticleCategories(artikelSlug);
  }
  function handleSearchChange(value) {
    // console.log('value', value.target.value);
    if (value.key === "Enter") {
      if (value.target.value !== "") {
        gettingData(1, null, value.target.value);
      } else {
        gettingData(null, null);
      }
    }
  }
  return (
    <Container>
      <br></br>

      <h3>Artikel</h3>
      <p>
        {" "}
        <strong> Artikel Dinas Penanaman Modal</strong>{" "}
      </p>

      <Row>
        <Col lg={8} md={12} sm={12} xs={12}>
          <Row>
            {DataResponse !== null ? (
              IsAda !== 0 ? (
                DataResponse &&
                DataResponse.map((item, index) => {
                  return (
                    <Col md={12} key={index}>
                      <Col md={12}>
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
                      </Col>
                    </Col>
                  );
                })
              ) : (
                <h2>Data tidak ada</h2>
              )
            ) : (
              <Spinner animation="border" role="status" className="m-auto">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
            <Col md={12}>
              <Pagination>{IPages}</Pagination>
            </Col>
          </Row>
        </Col>
        <Col lg={4} md={12} sm={12} xs={12}>
          <div className="sidebar sidebar-right">
            <div className="seacrh-widget">
              <div className="has-search">
                <span className="form-control-feedback">
                  <FontAwesomeIcon icon={faSearch} size="1x" />
                </span>
                <input
                  className="searching-data"
                  onKeyDown={handleSearchChange}
                  type="text"
                  placeholder="Search Articles"
                />
              </div>
            </div>
            <div className="single-sidebar category-widget">
              <div className="title">
                <h3>
                  <strong>Kategori </strong> Artikel
                </h3>
              </div>

              <div id="category" className="category-list">
                <ListGroup as="ol">
                  {Categories &&
                    Categories.map((value, idx) => {
                      return (
                        <Fragment key={idx}>
                          {/* <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" key={idx}> */}
                          {ArticleCategories === value.slug ? (
                            <ListGroup.Item
                              as="li"
                              onClick={() => handleArticleChange(value.slug)}
                              className="d-flex justify-content-between align-items-start kategori-list-article kategori-list-article-active"
                              key={idx}
                            >
                              <div className="me-auto">
                                {value.nama_kategori}
                              </div>
                              <Badge variant="primary" pill>
                                {value.artikel_count}
                              </Badge>
                            </ListGroup.Item>
                          ) : (
                            <ListGroup.Item
                              as="li"
                              onClick={() => handleArticleChange(value.slug)}
                              className="d-flex justify-content-between align-items-start kategori-list-article "
                              key={idx}
                            >
                              <div className="me-auto">
                                {value.nama_kategori}
                              </div>
                              <Badge variant="primary" pill>
                                {value.artikel_count}
                              </Badge>
                            </ListGroup.Item>
                          )}
                          {/* </ListGroup.Item> */}
                        </Fragment>
                      );
                    })}
                </ListGroup>
              </div>
            </div>

            {/* ====== Menampilkan artikel populer diberanda====== */}

            <div className="style-btn hot-news">
              <h3>
                <strong>Artikel </strong> Populer
              </h3>
            </div>
            <div className="main-pop">
              {PostPopular &&
                PostPopular.map((item, index) => {
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
                            <HiClipboardList size={20} />{" "}
                            {item.news_category_id}{" "}
                          </span>
                          |
                          <span>
                            {" "}
                            <FaRegEye size={20} /> {item.total_hit}x dibaca{" "}
                          </span>
                        </p>
                        <p className="read-more-nya">
                          <a href={`/Beranda/DetailArtikel/${item.id}`}>
                            <strong>Baca Selengkapnya</strong>
                          </a>
                        </p>
                        <hr />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Artikelku;
