import { Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/id';
function HalamanStatis() {
  const { id } = useParams();
  const [DataStatic, setDataStatic] = useState([]);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(null);
    axios
      .get('http://adminmesuji.embuncode.com/api/static-page/' + id)
      .then(function (Umum) {
        setDataStatic(Umum.data.data);
        setLoading(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);
  return (
    <section className="section">
      <Container>
        <div className="card mt-4">
          {Loading ? (
            <div className="card-body">
              <div className="header-static">
                <div className="title-static">
                  <h2 className="font-size-title">{DataStatic.title}</h2>
                </div>
                <div className="meta-static">
                  <div className="pt-2 pb-2 info-meta-static">
                    <Link className="time-created-at" to="#">
                      created at {moment(DataStatic.created_at).format('Do MMMM YYYY')}
                    </Link>
                    <Link className="created-post-by" to="#">
                      created by {DataStatic.created_by}
                    </Link>
                  </div>
                </div>
                <div className="pt-2 pb-2 icon-meta-static">
                  <Link className="icon-created-at" to="#">
                    <i className="fa-solid fa-calendar"></i>
                    update at {moment(DataStatic.updated_at).format('Do MMMM YYYY')}
                  </Link>
                  <Link className="icon-created-by" to="#">
                    <i className="fa-solid fa-user"></i>
                    update by {DataStatic.updated_by}
                  </Link>
                </div>
              </div>
              <div className="content-static">
                <p dangerouslySetInnerHTML={{ __html: DataStatic.content }}></p>
              </div>
            </div>
          ) : (
            <Spinner animation="border" role="status" className="m-auto">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </div>
      </Container>
    </section>
  );
}

export default HalamanStatis;
