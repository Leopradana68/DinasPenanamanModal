import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useState, useEffect, useLayoutEffect, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Foto() {
  const [images, setImages] = useState(null);
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/image-gallery?instansi_id=10")
      .then(function (response) {
        setImages(response.data.data.data);
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

  var i = 1;
  return (
    <Fragment>
      <br></br>
      <Container>
        <h3>Gallery Foto</h3>
        <p>
          {" "}
          <strong> Foto Dinas Penanaman Modal</strong>{" "}
        </p>
      </Container>
      <Container className="sec-pad">
        <div className="gallery-filter">
          <ul></ul>
        </div>

        <Row xs={1} md={3} className="g-4">
          {/* {console.log(images)} */}
          {images != null ? (
            <>
              {images &&
                images.map((item, index) => {
                  return item.image_gallery_item.map((itm, idx) => {
                    return (
                      <Col id="image" md={6} sm={12} xs={12} lg={4} key={idx}>
                        <a href={`#lightbox-` + i}>
                          <div className="tile">
                            <img
                              src={itm.image_file_data}
                              alt={itm.image_file_name}
                            />
                            <div className="text">
                              <h1>{handleLength(itm.description, 20)}</h1>
                              {/* <h2 className="animate-text">More lorem ipsum bacon ipsum.</h2> */}
                              <p className="animate-text">{itm.description} </p>
                              <div className="dots">
                                <span></span>
                                <span></span>
                                <span></span>
                              </div>
                            </div>
                          </div>
                        </a>
                        <div
                          className="lightbox"
                          id={`lightbox-` + i}
                          key={++i}
                        >
                          <div className="content">
                            <img
                              src={itm.image_file_data}
                              alt={itm.image_file_name}
                            />
                            <div className="title">{itm.image_file_name}</div>
                            <Link className="close" to="/foto"></Link>
                          </div>
                        </div>
                      </Col>
                    );
                  });
                })}
            </>
          ) : (
            <Spinner animation="border" role="status" className="m-auto">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </Row>
        <div className="gallery-filter">
          <ul></ul>
        </div>
      </Container>
    </Fragment>
  );
}
export default Foto;
